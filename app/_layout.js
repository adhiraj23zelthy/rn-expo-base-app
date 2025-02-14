// app/_layout.js
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();
  const isLoggedIn = false;

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/webview');
    }
  }, [isLoggedIn]);

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Phone Number',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="otp" 
        options={{ 
          title: 'OTP Verification',
          headerShown: true,
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="webview" 
        options={{ 
          title: 'Web Content',
          headerShown: false,
          headerLeft: () => null,
          gestureEnabled: false,
          headerBackVisible: false
        }} 
      />
    </Stack>
  );
}