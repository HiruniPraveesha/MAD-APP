import React from 'react';
<<<<<<< HEAD
import { View, StyleSheet, Alert, Text } from 'react-native';
=======
import { View, StyleSheet, Alert } from 'react-native';
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
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
<<<<<<< HEAD
      mobileNo: { required: true, numeric: true, length: 10 },
      email: { required: true, email: true },
      password: { required: true, passwordComplexity: true },
      reenterPassword: { required: true, match: 'password' },
=======
      mobileNo: { required: true },
      email: { required: true },
      password: { required: true, minLength: 6 },
      reenterPassword: { required: true },
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
    });

    if (!isValid) return;

<<<<<<< HEAD
    // Check if passwords match (This part can be redundant with the match rule)
=======
    // Check if passwords match
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
    if (values.password !== values.reenterPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

<<<<<<< HEAD
    Alert.alert('Registration Successful');
=======
    Alert.alert('Registration Successful', JSON.stringify(values));
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.instructionText}>Please fill all the details below!</Text>
=======
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
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
<<<<<<< HEAD
    marginTop : 0
  },
  instructionText: {
    fontSize: 16, 
    color: '#333', 
    fontWeight: '500', 
    textAlign: 'center', 
    marginBottom:2, 
=======
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
  },
});

export default RegisterScreen;
