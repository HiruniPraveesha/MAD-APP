import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';

const RegisterScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = useFormHandler({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    password: '',
    reenterPassword: '',
  });

  const handleRegister = () => {
    const isValid = validate({
      firstName: { required: true },
      lastName: { required: true },
      mobileNo: { required: true, numeric: true, length: 10 },
      email: { required: true, email: true },
      password: { required: true, passwordComplexity: true },
      reenterPassword: { required: true, match: 'password' },
    });

    if (!isValid) return;

    // Check if passwords match (This part can be redundant with the match rule)
    if (values.password !== values.reenterPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    Alert.alert('Registration Successful');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Please fill all the details below!</Text>
      <InputField
        label="First Name"
        value={values.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        error={errors.firstName}
      />
      <InputField
        label="Last Name"
        value={values.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        error={errors.lastName}
      />
      <InputField
        label="Mobile Number"
        keyboardType="phone-pad"
        value={values.mobileNo}
        onChangeText={(value) => handleChange('mobileNo', value)}
        error={errors.mobileNo}
      />
      <InputField
        label="Email"
        keyboardType="email-address"
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
      <InputField
        label="Re-enter Password"
        secureTextEntry
        value={values.reenterPassword}
        onChangeText={(value) => handleChange('reenterPassword', value)}
        error={errors.reenterPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    marginTop : 0
  },
  instructionText: {
    fontSize: 16, 
    color: '#333', 
    fontWeight: '500', 
    textAlign: 'center', 
    marginBottom:2, 
  },
});

export default RegisterScreen;
