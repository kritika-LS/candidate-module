import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { loginSchema, signUpSchema } from '../../utils/validationSchemas';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'AuthScreen'>;

interface LoginValues {
  email: string;
  password: string;
}


interface SignUpValues extends LoginValues {
  confirmPassword: string;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ route }) => {
  const [isLogin, setIsLogin] = useState<boolean>(route.params?.isLogin ?? true);

  const initialValues: LoginValues | SignUpValues = isLogin
    ? { email: '', password: '' }
    : { email: '', password: '', confirmPassword: '' };

  const handleSubmit = (values: LoginValues | SignUpValues) => {
    if (isLogin) {
      console.log('Login values:', values);
    } else {
      console.log('Sign Up values:', values);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Welcome Back!' : 'Create an Account'}</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={isLogin ? loginSchema : signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            {!isLogin && 'confirmPassword' in values && (
              <>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry
                  style={styles.input}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </>
            )}

            <TouchableOpacity onPress={() => handleSubmit()} style={styles.submitButton}>
              <Text style={styles.submitText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
              <Text style={styles.toggleText}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
  submitButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, marginTop: 10 },
  submitText: { color: 'white', textAlign: 'center', fontSize: 16 },
  toggleText: { textAlign: 'center', color: 'blue', marginTop: 10 },
  error: { color: 'red', fontSize: 12, marginBottom: 5 },
});

export default AuthScreen;
