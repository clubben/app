import { useRouter } from 'expo-router';
import { LinkProps as LinkProps1 } from 'expo-router/build/link/Link';

import { Text, TextProps } from './Text';

type LinkProps = {
  children: React.ReactNode;
} & Omit<TextProps, 'href'> &
  (
    | {
        onPress: () => void;
      }
    | {
        href: LinkProps1['href'];
      }
  );

export default function Link(props: LinkProps) {
  const { children, ...rest } = props;
  const router = useRouter();

  if ('href' in rest) {
    const { href, ...textProps } = rest;
    return (
      <Text
        variant="link"
        {...textProps}
        onPress={() => router.push(href)}
        pressStyle={{
          opacity: 0.3,
        }}>
        {children}
      </Text>
    );
  } else {
    return (
      <Text
        variant="link"
        {...rest}
        onPress={rest.onPress}
        pressStyle={{
          opacity: 0.3,
        }}>
        {children}
      </Text>
    );
  }
}
