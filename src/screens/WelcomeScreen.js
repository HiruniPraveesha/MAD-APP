import React, { useEffect } from 'react';
import { View, Text, StyleSheet,ActivityIndicator, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the Login screen after 3 seconds (3000ms)
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to </Text>
      <Text style={styles.appName}>Travel Space</Text>
      <ActivityIndicator size="large" color="#226b94" style={styles.spinner} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90acbb",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 20,
    color: '#226b94', // Match app theme
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomeScreen;