import { useTheme } from '@tamagui/core';
import { Star, Map as MapIcon, User } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.iconLink.val,
        tabBarInactiveTintColor: theme.iconDisabled.val,
        tabBarStyle: {
          backgroundColor: theme.backgroundSecondary.val,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <Star color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ focused, color }) => <MapIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused, color }) => <User color={color} />,
        }}
      />
      <Tabs.Screen
        name="[profile]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
