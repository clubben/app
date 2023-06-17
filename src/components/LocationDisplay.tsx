import { Stack, StackProps } from '@tamagui/core';
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps';

import { Text } from './Text';

type LocationDisplayProps = Omit<StackProps, 'onPress'> & {
  onPress?: (event: MapPressEvent) => void;
  initialRegion?: Region;
  region?: Region;
  onRegionChangeComplete?: (region: Region) => void;
  address?: any;
};

const LocationDisplay = (props: LocationDisplayProps) => {
  const {
    initialRegion,
    region,
    onRegionChangeComplete,
    onPress,
    address,
    ...rest
  } = props;

  const markerLat = (initialRegion ?? region)?.latitude;
  const markerLng = (initialRegion ?? region)?.longitude;

  return (
    <Stack borderRadius="$md" overflow="hidden" position="relative" {...rest}>
      <MapView
        style={{ flex: 1 }}
        showsCompass={false}
        rotateEnabled={false}
        showsPointsOfInterest={false}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={onPress ?? undefined}
        region={region}>
        {markerLat && markerLng && (
          <Marker
            coordinate={{
              latitude: markerLat,
              longitude: markerLng,
            }}>
            <Stack position="relative" justifyContent="center">
              <Stack
                position="absolute"
                alignSelf="center"
                height={40}
                borderRadius={25}
                aspectRatio={1}
                bc="$backgroundAccent"
                opacity={0.5}
              />
              <Stack
                zIndex={5}
                height={10}
                borderRadius={5}
                aspectRatio={1}
                bc="$backgroundAccent"
              />
            </Stack>
          </Marker>
        )}
      </MapView>
      {address && (
        <Stack
          m="$s"
          py="$xs"
          px="$s"
          bc="$backgroundOverlayPrimary"
          borderRadius="$m"
          position="absolute">
          <Text variant="caption" color="$accentPrimary">
            {address.street} {address.addressNumber}, {address.region}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

export default LocationDisplay;
