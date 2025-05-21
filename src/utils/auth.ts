import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getCurrentUser,
    fetchAuthSession,
    fetchUserAttributes,
  } from 'aws-amplify/auth';
  
  export async function getAuthDetails() {
    try {
      console.log('getAuthDetails: Attempting to fetch session...');
      const sessionResult = await fetchAuthSession();
      const idToken = sessionResult.tokens?.idToken?.toString() || null;
      const accessToken = sessionResult.tokens?.accessToken?.toString() || null;
      //   const refreshToken = sessionResult.tokens?.refreshToken?.toString();

      console.log('getAuthDetails: Session Result:', sessionResult);
      console.log('getAuthDetails: Fetched ID Token:', idToken);
      console.log('getAuthDetails: Fetched Access Token:', accessToken);

      if (accessToken) {
        await AsyncStorage.setItem('auth_token', accessToken);
        console.log('getAuthDetails: auth_token successfully stored in AsyncStorage:', accessToken);
      } else {
        console.warn('getAuthDetails: Access token is null or undefined. Not storing in AsyncStorage.');
      }

      const currentUser = await getCurrentUser();
      const userAttributes: Record<string, any> = await fetchUserAttributes();

      await AsyncStorage.setItem('auth_token', accessToken || '');

      let groups: string[] = [];
      if (currentUser) {
        try {
          const parsedIdToken = idToken ? JSON.parse(atob(idToken.split('.')[1])) : null;
          if (parsedIdToken && parsedIdToken['cognito:groups']) {
            groups = parsedIdToken['cognito:groups'];
          }

          if (userAttributes && userAttributes['cognito:groups']) {
            groups = JSON.parse(userAttributes['cognito:groups'] as string);
          }
          
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