import {
  useFonts,
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { TamaguiProvider } from '@tamagui/core';
import { SplashScreen, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useColorScheme } from 'react-native';
import NavThemeProvider from 'src/styles/NavThemeProvider';
import config from 'tamagui.config';

function RootNavigation() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="auth"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const theme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    // The native splash screen will stay visible for as long as there
    // are `<SplashScreen />` components mounted. This component can be nested.

    return <SplashScreen />;
  }

  return (
    <>
      <Head>
        <title>Clubben</title>
        <meta name="description" content="Clubben party app" />
        <meta property="og:description" content="Clubben party app" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="expo:handoff" content="true" />
        <meta property="expo:spotlight" content="true" />
      </Head>

      <TamaguiProvider config={config} defaultTheme={theme ?? undefined}>
        <NavThemeProvider>
          <RootNavigation />
        </NavThemeProvider>
      </TamaguiProvider>
    </>
  );
}
