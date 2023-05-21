import { GetProps, setupReactNative, styled } from '@tamagui/web';
import { ScrollView as ScrollViewNative } from 'react-native';

setupReactNative({
  ScrollView: ScrollViewNative,
});

export const ScrollView = styled(ScrollViewNative, {
  name: 'ScrollView',
  scrollEnabled: true,
});

export type ScrollViewProps = GetProps<typeof ScrollView>;
