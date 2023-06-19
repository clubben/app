import { Stack } from '@tamagui/core';
import { LinearGradient } from '@tamagui/linear-gradient';
import { useI18n } from 'hooks/i18n';
import React, { useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextLayoutEventData,
  useColorScheme,
} from 'react-native';

import Link from './Link';
import { YStack } from './Stacks';
import { Text } from './Text';

const COLLAPSED_NUMBER_OF_LINES = 3;

type CollapsibleParagraphProps = {
  children: React.ReactNode;
};
const CollapsibleParagraph = ({ children }: CollapsibleParagraphProps) => {
  const theme = useColorScheme();
  const i18n = useI18n();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [normalNumberOfLines, setNormalNumberOfLines] = useState<
    number | undefined
  >(undefined);

  const shouldBeExpandableAndCollapsable =
    normalNumberOfLines !== undefined &&
    normalNumberOfLines >= COLLAPSED_NUMBER_OF_LINES;

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      //console.log(e.nativeEvent.lines.length.toString());
      setNormalNumberOfLines(e.nativeEvent.lines.length);
    },
    []
  );

  return (
    <YStack position="relative">
      <Text
        ellipse={shouldBeExpandableAndCollapsable && isCollapsed}
        numberOfLines={
          shouldBeExpandableAndCollapsable && isCollapsed
            ? COLLAPSED_NUMBER_OF_LINES
            : undefined
        }
        onTextLayout={onTextLayout}>
        {children}
      </Text>
      {shouldBeExpandableAndCollapsable && (
        <Stack position="absolute" bottom={0} right={0}>
          <LinearGradient
            colors={[
              theme === 'light' ? 'rgba(255,255,255,0)' : 'transparent',
              '$backgroundPrimary',
            ]}
            position="absolute"
            top={0}
            bottom={0}
            left={-20}
            right={0}
            locations={[0.0, 0.2]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            pointerEvents="none"
          />
          <Link
            onPress={() => {
              setIsCollapsed(old => !old);
            }}>
            {isCollapsed ? i18n.t('readMore') : i18n.t('readLess')}
          </Link>
        </Stack>
      )}
    </YStack>
  );
};

export default CollapsibleParagraph;
