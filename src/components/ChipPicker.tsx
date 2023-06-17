import { Stack } from '@tamagui/core';
import { LinearGradient } from '@tamagui/linear-gradient';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Chip } from './Chip';
import { ScrollView } from './ScrollView';

type ChipPickerProps = {
  items: string[];
  selectedChips: string[];
  onDeselect: (chip: string) => void;
  onSelect: (music: string) => void;
};

const ChipPicker = (props: ChipPickerProps) => {
  const scheme = useColorScheme();

  return (
    <Stack position="relative">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        py="$m"
        px="$m"
        horizontal
        //bc="$background-neutral-faded"
      >
        {[
          ...props.selectedChips.map(item => (
            <Chip
              key={item}
              isHighlighted
              mr="$sm"
              onPress={() => props.onDeselect(item)}>
              <Chip.Text>{item}</Chip.Text>
            </Chip>
          )),
          ...props.items.map(item => (
            <Chip key={item} onPress={() => props.onSelect(item)} mr="$sm">
              <Chip.Text>{item}</Chip.Text>
            </Chip>
          )),
        ]}
      </ScrollView>
      <LinearGradient
        colors={[
          '$backgroundPrimary',
          scheme === 'light' ? 'rgba(255,255,255,0)' : 'transparent',
          scheme === 'light' ? 'rgba(255,255,255,0)' : 'transparent',
          '$backgroundPrimary',
        ]}
        locations={[0.001, 0.08, 0.92, 0.999]}
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
      />
    </Stack>
  );
};

export default ChipPicker;
