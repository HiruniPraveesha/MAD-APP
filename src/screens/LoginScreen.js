import React from 'react';
import { View, StyleSheet, Alert,Image,Text } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';

const LoginScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = useFormHandler({
    email: '',
    password: '',
  });

  const users = [
    { 
      firstName: 'Hiruni', 
      lastName: 'Perera', 
      mobileNo: '0740601617',
      email: 'hiruni@gmail.com', 
      password: 'password123' 
    },
    { 
      firstName: 'Praveesha', 
      lastName: 'Perera', 
      mobileNo: '0987654321',
      email: 'praveesha@gmail.com', 
      password: 'pravi123' 
    },
  ];
  

  const handleLogin = () => {
    const isValid = validate({
      email: { required: true },
      password: { required: true },
    });
  
    if (isValid) {
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );
  
      if (user) {
        Alert.alert('Login Successful');
        const username = user.firstName; 
        navigation.navigate('Home', { username, user });
      } else {
        Alert.alert('Invalid credentials');
      }
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>  
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.appName}>Travel Space</Text>
      <Text style={styles.exploreText}>Explore all latest aviation news</Text>
      <InputField
        label="Email"
        value={values.email}
        onChangeText={(value) => handleChange('email', value)}
        error={errors.email}
      />
      <InputField
        label="Password"
        secureTextEntry
        value={values.password}
        onChangeText={(value) => handleChange('password', value)}
        error={errors.password}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.text1}>Don't have an account yet ?</Text>
      <Button
        title="Create Account"
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  registerButton: {
    marginTop: 6,
    backgroundColor: '#6C757D',
  },
  welcomeText: {
    fontSize: 20, 
    fontWeight: '600', 
    color: '#226b94',
    textAlign: 'center', 
   
  },
  logo: {
    width: 150, 
    height: 150,
  },
  logoContainer: {
    alignItems: 'center',    
  },
  appName: {
    fontSize: 36, 
    fontWeight: 'bold', 
    color: '#226b94', 
    letterSpacing: 2, 
    textAlign: 'center', 
    fontFamily: 'Cochin', 
  },
  exploreText: {
    fontSize: 15, 
    fontStyle: 'italic', 
    color: '#000', 
    textAlign: 'center',
    marginBottom: 15, 
  },
  text1: {
    fontSize: 15, 
    fontStyle: 'italic', 
    color: '#000', 
    marginTop: 15, 
  },
  
});

export default LoginScreen;
