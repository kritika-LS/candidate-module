import {
  getCurrentUser,
  signIn,
  signOut,
  fetchAuthSession,
  resetPassword, 
  confirmResetPassword,
  fetchUserAttributes,
  type AuthSession,
  resendSignUpCode
} from 'aws-amplify/auth';
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

class TokenRefreshManager {
  private refreshTimer: NodeJS.Timeout | null = null;
  private refreshInterval: number = 15 * 60 * 1000; // 15 minutes

  scheduleRefresh(callback: () => void): void {
    this.clearRefresh();
    this.refreshTimer = setTimeout(callback, this.refreshInterval);
  }

  clearRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }
}

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberAccount?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  getSession: () => Promise<AuthSession | null>;
  getAuthDetails: () => Promise<{
    idToken: string | null;
    accessToken: string | null;
    userAttributes: Record<string, any>;
    userId: string | null;
    username: string | null;
    groups: string[];
  } | null>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  handleResendCode: (username: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const refreshManager = useRef<TokenRefreshManager>(new TokenRefreshManager());

  const getSession = async (): Promise<AuthSession | null> => {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        await getCurrentUser();
        setIsAuthenticated(true);
        return session;
      }
      return null;
    } catch (error) {
      setIsAuthenticated(false);
      return null;
    }
  };

  const checkAuthState = async () => {
    try {
      const authState = await AsyncStorage.getItem('@auth:isAuthenticated');
      if (authState === 'true') {
        setIsAuthenticated(true);
      }

      // Check if we have stored credentials and attempt silent sign-in
      const rememberAccount = await AsyncStorage.getItem('@auth:rememberAccount');
      if (rememberAccount === 'true') {
        const encryptedEmail = await AsyncStorage.getItem('@auth:email');
        const encryptedPassword = await AsyncStorage.getItem('@auth:password');

        if (encryptedEmail && encryptedPassword) {
          const email = CryptoJS.AES.decrypt(
            encryptedEmail,
            'your-secret-key'
          ).toString(CryptoJS.enc.Utf8);

          const password = CryptoJS.AES.decrypt(
            encryptedPassword,
            'your-secret-key'
          ).toString(CryptoJS.enc.Utf8);

          try {
            await login(email, password, true); // Attempt login with stored credentials
            return;
          } catch (loginError) {
            console.error("Silent login failed:", loginError);
            // Clear stored credentials if silent login fails
            await AsyncStorage.multiRemove([
              '@auth:rememberAccount',
              '@auth:email',
              '@auth:password',
              '@auth:isAuthenticated'
            ]);
          }
        }
      }

      // If not remembered or silent login failed, check for a valid session
      if (!isAuthenticated) {
        const session = await getSession();
        setIsAuthenticated(!!session);
      }
    } catch (error) {
      console.error("checkAuthState error:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberAccount: boolean = false) => {
    try {
      await signIn({ username: email, password });
      await getAuthDetails();
      setIsAuthenticated(true);
      // await AsyncStorage.setItem('@auth:isAuthenticated', 'true');

      if (rememberAccount) {
        const encryptedEmail = CryptoJS.AES.encrypt(
          email,
          'your-secret-key'
        ).toString();

        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          'your-secret-key'
        ).toString();

        await AsyncStorage.setItem('@auth:rememberAccount', 'true');
        await AsyncStorage.setItem('@auth:email', encryptedEmail);
        await AsyncStorage.setItem('@auth:password', encryptedPassword);
      }

      // Schedule token refresh
      // refreshManager.current.scheduleRefresh(async () => {
      //   try {
      //     await getSession();
      //   } catch (error) {
      //     await logout();
      //   }
      // });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      await AsyncStorage.setItem('@auth:isAuthenticated', 'false'); // Persist auth state
      refreshManager.current.clearRefresh();
      await AsyncStorage.multiRemove([
        '@auth:rememberAccount',
        '@auth:email',
        '@auth:password',
        '@auth:isAuthenticated'
      ]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getAuthDetails = async() => {
    try {
      const sessionResult = await fetchAuthSession();
      const idToken = sessionResult.tokens?.idToken?.toString() || null;
      const accessToken = sessionResult.tokens?.accessToken?.toString() || null;
      //   const refreshToken = sessionResult.tokens?.refreshToken?.toString();

      const currentUser = await getCurrentUser();
      const userAttributes: Record<string, any> = await fetchUserAttributes();

      await AsyncStorage.setItem('auth_token', accessToken || '');

      let groups: string[] = [];
      if (currentUser) {
        try {
          // In v6, groups are often part of the ID token or user attributes.
          // You might need to inspect these to find the groups.
          // The exact location depends on your Cognito setup.

          // Option 1: Check ID Token claims (if groups are there)
          const parsedIdToken = idToken ? JSON.parse(atob(idToken.split('.')[1])) : null;
          if (parsedIdToken && parsedIdToken['cognito:groups']) {
            groups = parsedIdToken['cognito:groups'];
          }

          // Option 2: Check user attributes (if groups are stored as an attribute)
          if (userAttributes && userAttributes['cognito:groups']) {
            groups = JSON.parse(userAttributes['cognito:groups'] as string);
          }
          // You might have a custom attribute for groups instead of the default 'cognito:groups'
          else if (userAttributes && userAttributes['custom:groups']) {
            groups = JSON.parse(userAttributes['custom:groups'] as string);
          }
        } catch (error) {
          console.log('Error extracting user groups:', error);
        }
      }

      return {
        idToken,
        accessToken,
        // refreshToken,
        userAttributes,
        userId: currentUser?.userId || null,
        username: currentUser?.username || null,
        groups,
      };
    } catch (error) {
      console.log('Error getting authentication details:', error);
      return null;
    }
  }

  const forgotPasswordHandler = async (email: string) => {
    try {
      console.log('Forgot Password:', email);
      await resetPassword({username:email});
    } catch (error) {
      console.error("Forgot Password Error:", error);
      throw error;
    }
  };
  
  const resetPasswordHandler = async (email: string, code: string, newPassword: string) => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword: newPassword
      });
    } catch (error) {
      console.error("Reset Password Error:", error);
      throw error;
    }
  };

  const handleResendCode = async (username:string) => {
    try {
      await resendSignUpCode({ username });
      console.log('Verification code resent successfully');
      // Optionally, display a success message to the user
    } catch (error) {
      console.log('Error resending verification code:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };
      
  useEffect(() => {
    checkAuthState();

    return () => {
      refreshManager.current.clearRefresh();
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      login,
      logout,
      getSession,
      getAuthDetails,
      forgotPassword: forgotPasswordHandler,
      resetPassword: resetPasswordHandler,
      handleResendCode,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};