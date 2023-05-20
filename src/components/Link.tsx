import { Link as NLink, useRouter } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';

import { Text, TextProps } from './Text';

type LinkProps1 = TextProps & {
  children: React.ReactNode;
  href: LinkProps['href'];
};

export default function Link(props: LinkProps1) {
  const { children, href, ...rest } = props;
  const router = useRouter();

  return (
    <Text
      variant="link"
      {...rest}
      onPress={() => router.push(props.href)}
      pressStyle={{
        opacity: 0.3,
      }}>
      {children}
    </Text>
  );
}
