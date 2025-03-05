// app/webview.js
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function WebViewScreen() {
    const [token, setToken] = useState('');
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      setToken(token);
    };
    useEffect(() => {
      fetchToken();
    }, []);
    console.log(token);
  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        style={styles.webview}
        source={{ uri: 'https://www.zelthy.com' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: { 
    flex: 1,
  },
});