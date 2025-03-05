import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../zustand/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPVerification() {
  const inputRefs = useRef([]);
  const { phoneNumber, otp, setOtp } = useStore();

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      console.log('Verifying OTP:', otpValue, phoneNumber, otp);
      await AsyncStorage.setItem('access_token', 'mytoken');
      router.push({
        pathname: '/webview',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>Code sent to {phoneNumber}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.button, !otp.every(digit => digit) && styles.buttonDisabled]} 
          onPress={handleVerify}
          disabled={!otp.every(digit => digit)}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10, // Add space between input boxes
    marginBottom: 30,
  },
  otpInput: {
    width: 50, // Slightly smaller width
    height: 50, // Slightly smaller height
    borderWidth: 1,
    borderColor: '#007AFF', // Use a more vibrant border color
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#F0F4F7', // Light background for better visual separation
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});