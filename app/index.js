// app/index.js
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function PhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    if (phoneNumber.length >= 10) {
      router.push({
        pathname: '/otp',
        params: { phone: phoneNumber }
      });
    }
  };

  const goToWebView = () => {
    router.push('/webview');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Phone Number</Text>
        
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          maxLength={15}
        />

        <TouchableOpacity 
          style={[styles.button, phoneNumber.length < 10 && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={phoneNumber.length < 10}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity 
          style={[styles.button, styles.webViewButton]} 
          onPress={goToWebView}
        >
          <Text style={styles.buttonText}>Open WebView</Text>
        </TouchableOpacity> */}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  webViewButton: {
    backgroundColor: '#34C759',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});