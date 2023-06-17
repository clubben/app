import { ConnectError } from '@bufbuild/connect';
import {
  useFonts,
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { TamaguiProvider } from '@tamagui/core';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import * as Burnt from 'burnt';
import { SplashScreen, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { LogBox, useColorScheme } from 'react-native';
import AuthProvider from 'src/contexts/auth/AuthProvider';
import NavThemeProvider from 'src/styles/NavThemeProvider';
import config from 'tamagui.config';

LogBox.ignoreLogs([/ConnectError/]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (
        err instanceof ConnectError &&
        query.state.data !== undefined &&
        query.state.data !== null
      ) {
        Burnt.toast({
          title: err.rawMessage,
          preset: 'error',
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err, variables) => {
      if (err instanceof ConnectError) {
        Burnt.toast({
          title: err.rawMessage,
          preset: 'error',
        });
      }
    },
  }),
});

export default function RootLayout() {
  const theme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
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

      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config} defaultTheme={theme ?? undefined}>
          <NavThemeProvider>
            <AuthProvider>
              <RootNavigation />
            </AuthProvider>
          </NavThemeProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </>
  );
}
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
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
