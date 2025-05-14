import { 
  getCurrentUser, 
  signIn, 
  signOut, 
  fetchAuthSession,
  type AuthSession
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
      // Check if we have stored credentials
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
          
          await login(email, password, true);
          return;
        }
      }
      
      // Fall back to regular session check
      const session = await getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberAccount: boolean = false) => { 
    try {
      await signIn({ username: email, password });
      setIsAuthenticated(true);
      
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
      refreshManager.current.scheduleRefresh(async () => {
        try {
          await getSession();
        } catch (error) {
          await logout();
        }
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      refreshManager.current.clearRefresh();
      await AsyncStorage.multiRemove([
        '@auth:rememberAccount',
        '@auth:email',
        '@auth:password'
      ]);
    } catch (error) {
      console.error('Logout error:', error);
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
      getSession
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