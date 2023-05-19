import { Link as NLink } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';

import { Text, TextProps } from './Text';

type LinkProps1 = TextProps & {
  children: React.ReactNode;
  href: LinkProps['href'];
};

export default function Link(props: LinkProps1) {
  const { children, href, ...rest } = props;
  return (
    <NLink href={href}>
      <Text variant="link" {...rest}>
        {children}
      </Text>
    </NLink>
  );
}
