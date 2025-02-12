import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="todo"
        options={{ headerShown: true, title: 'Todo App' }}
      />
      <Stack.Screen
        name="weather"
        options={{ headerShown: true, title: 'Weather App' }}
      />
      <Stack.Screen
        name="camera-gallery"
        options={{ headerShown: true, title: 'Camera & Gallery' }}
      />
    </Stack>
  );
}
