import { ThemeProvider } from '@react-navigation/native';
import { getTokens, useTheme } from '@tamagui/core';
import { useColorScheme } from 'react-native';

type NavThemeProviderProps = {
  children: React.ReactNode;
};
export default function NavThemeProvider({ children }: NavThemeProviderProps) {
  const theme = useTheme();
  const { color } = getTokens();
  const scheme = useColorScheme();

  return (
    <ThemeProvider
      value={{
        colors: {
          background: theme.backgroundPrimary.val,
          border: theme.borderSecondary.val,
          card: theme.backgroundSecondary.val,
          primary: color.accentPrimary.val,
          text: theme.textPrimary.val,
          notification: theme.backgroundSecondary.val,
        },
        dark: scheme === 'dark',
      }}>
      {children}
    </ThemeProvider>
  );
}
