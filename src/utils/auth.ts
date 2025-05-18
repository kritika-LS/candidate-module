import {
    getCurrentUser,
    fetchAuthSession,
    fetchUserAttributes,
  } from 'aws-amplify/auth';
  
  export async function getAuthDetails() {
    try {
      const sessionResult = await fetchAuthSession();
      const idToken = sessionResult.tokens?.idToken?.toString();
      const accessToken = sessionResult.tokens?.accessToken?.toString();
    //   const refreshToken = sessionResult.tokens?.refreshToken?.toString();

    console.log('Session result:', sessionResult);
  
      const currentUser = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();
  
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