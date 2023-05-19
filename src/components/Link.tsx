import { Link as NLink } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';

import { Text } from './Text';

type LinkProps1 = {
  children: React.ReactNode;
  href: LinkProps['href'];
};

export default function Link({ children, href }: LinkProps1) {
  return (
    <NLink href={href}>
      <Text variant="link">{children}</Text>
    </NLink>
  );
}
