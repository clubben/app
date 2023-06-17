import { Party } from '@buf/jonas_clubben.bufbuild_es/party/v1/party_pb';
import { Stack, getTokens, useTheme } from '@tamagui/core';
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Marker, Point } from 'react-native-maps';
import { ANIMATE_TO_PARTY_DURATION } from 'utils/constants';

import { Text } from '../Text';

type PartyMarkerProp = {
  party: Party;
  isShown: boolean;
  isSelected: boolean;
  onPress: (party: Party) => void;
};

const PartyMarker = ({
  party,
  isShown,
  onPress,
  isSelected,
}: PartyMarkerProp) => {
  const theme = useTheme();
  const tokens = getTokens();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showMarker, setShowMarker] = useState(isShown);

  const STORY_HEIGHT = 60;
  const aspectRatio = 0.7;
  const anchorWidth = STORY_HEIGHT * aspectRatio * 0.2;

  const offset: Point = { x: 0.0, y: -(STORY_HEIGHT / 2) };

  useEffect(() => {
    if (showMarker) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [showMarker, fadeAnim]);

  useEffect(() => {
    if (!isShown) {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setShowMarker(false);
      }, 400);
    } else {
      setShowMarker(true);
    }
  }, [isShown, fadeAnim]);

  useEffect(() => {
    if (isSelected) {
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: ANIMATE_TO_PARTY_DURATION,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: ANIMATE_TO_PARTY_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelected, scaleAnim]);

  if (!showMarker || !party.position) {
    return null;
  }

  return (
    <Marker.Animated
      coordinate={{
        latitude: party.position.latitude,
        longitude: party.position.longitude,
      }}
      centerOffset={offset}
      anchor={offset}
      style={{
        alignItems: 'center',
        backgroundColor: theme['backgroundPrimary'].val,
        height: STORY_HEIGHT,
        aspectRatio,
        borderRadius: tokens.radius.$md.val,
        position: 'relative',

        zIndex: isSelected ? 1 : 0,

        // Since RN doesn't have a transform origin we use translateY to change the center of the transformation.
        // see https://medium.com/swlh/the-heart-of-react-native-transform-e0f4995ebdb6
        transform: [
          { translateY: STORY_HEIGHT / 2 },
          { scale: scaleAnim },
          { translateY: -STORY_HEIGHT / 2 },
        ],

        // Bind opacity to animated value
        opacity: fadeAnim,
      }}
      tracksViewChanges={false}
      onPress={() => onPress(party)}>
      <Stack
        width={0}
        height={0}
        borderLeftColor="transparent"
        borderLeftWidth={anchorWidth}
        borderRightColor="transparent"
        borderRightWidth={anchorWidth}
        borderTopColor="$backgroundPrimary"
        borderTopWidth={anchorWidth}
        position="absolute"
        bottom={-anchorWidth}
        alignSelf="center"
      />
      <Text
        variant="caption"
        position="absolute"
        textAlign="center"
        top="100%"
        width={80}
        mt={anchorWidth}>
        {party.title}
      </Text>
    </Marker.Animated>
  );
};

export default React.memo(PartyMarker);
