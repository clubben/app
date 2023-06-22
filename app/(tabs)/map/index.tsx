import { Party } from '@buf/jonas_clubben.bufbuild_es/party/v1/party_pb';
import {
  BottomSheetBackgroundProps,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Stack } from '@tamagui/core';
import PartyBottomSheetDetails from 'components/Map/PartyBottomSheetDetails';
import PartyMarker from 'components/Map/PartyMarker';
import { partyClient } from 'data/apis/clients';
import { Stack as ExpoStack, useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';
import { useLocation } from 'hooks/useLocation';
import debounce from 'lodash.debounce';
import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import MapView, { LongPressEvent, Region } from 'react-native-maps';
import { regionToBBox, getZoomLevelFromRegion } from 'src/utils/geo';
import { getHashesWithinBbox } from 'src/utils/geohash';
import { ANIMATE_TO_PARTY_DURATION } from 'utils/constants';

import { CreatePartyParams } from './create-party';

const ZOOM_LEVEL = {
  HOUSE: 20,
  NEIGHBOORHOOD: 18,
  DISTRICT: 16,
  CITY: 12,
  STATE: 8,
};

export default function Map() {
  const theme = useColorScheme();
  const router = useRouter();
  const { authState } = useAuth();
  const { width, height } = useWindowDimensions();
  const { location } = useLocation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const mapRef = createRef<MapView>();
  const [selectedParty, setSelectedParty] = useState<Party | undefined>(
    undefined
  );
  const [parties, setParties] = useState<Party[]>([]);

  const initialRegion = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : undefined;

  const [zoom, setZoom] = useState(
    initialRegion ? getZoomLevelFromRegion(initialRegion, width) : undefined
  );

  // we debounce it by 100 milliseconds to not overload JS thread
  const debouncedSetZoom = useMemo(
    () =>
      debounce((reg: Region) => {
        setZoom(getZoomLevelFromRegion(reg, width));
      }, 100),
    [width]
  );

  async function fetchViewableParties(reg: Region) {
    const currentZoom = getZoomLevelFromRegion(reg, width);
    if (ZOOM_LEVEL.DISTRICT < currentZoom) {
      const bbox = regionToBBox(reg, { height, width });
      const hashes = getHashesWithinBbox(bbox, currentZoom);
      if (hashes && hashes.length > 0) {
        const res = await partyClient.getPartiesByGeohashes({
          geohashes: hashes,
        });
        setParties(old => {
          const newParties = [...old];
          for (let i = 0; i < res.parties.length; i++) {
            const idx = newParties.findIndex(v => v.id === res.parties[i].id);
            if (idx === -1) {
              newParties.push(res.parties[i]);
            }
          }
          return newParties;
        });
      }
    }
  }

  const onMapLongPress = (event: LongPressEvent) => {
    if (authState === 'authenticated') {
      router.push({
        pathname: '/map/create-party',
        params: {
          lat: event.nativeEvent.coordinate.latitude.toString(),
          lng: event.nativeEvent.coordinate.longitude.toString(),
        } as CreatePartyParams,
      });
    } else {
      router.push('/auth');
    }
  };

  const onPartyPress = useCallback(
    (party: Party) => setSelectedParty(party),
    []
  );

  useEffect(() => {
    if (selectedParty?.position) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: selectedParty.position.latitude,
            longitude: selectedParty.position.longitude,
          },
        },
        { duration: ANIMATE_TO_PARTY_DURATION }
      );
      bottomSheetModalRef.current?.present(selectedParty);
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [selectedParty, mapRef]);

  useEffect(() => {
    // TODO: init with own parties and friends parties
    if (initialRegion) {
      fetchViewableParties(initialRegion);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Map</title>
      </Head>

      <ExpoStack.Screen
        options={{ title: i18n.t('map.titel'), headerShown: false }}
      />

      <BottomSheetModalProvider>
        <MapView
          ref={mapRef}
          style={styles.map}
          rotateEnabled={false}
          showsPointsOfInterest={false}
          initialRegion={initialRegion}
          onRegionChangeComplete={fetchViewableParties}
          onRegionChange={debouncedSetZoom}
          onLongPress={onMapLongPress}
          userInterfaceStyle={theme ?? undefined}>
          {zoom &&
            parties.map(p => (
              <PartyMarker
                key={p.id}
                isShown={ZOOM_LEVEL.DISTRICT < zoom}
                party={p}
                isSelected={p.id === selectedParty?.id}
                onPress={onPartyPress}
              />
            ))}
        </MapView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['30%', '90%']}
          index={0}
          handleComponent={BottomSheetHandle}
          backgroundComponent={BottomSheetBackground}
          onDismiss={() => {
            setSelectedParty(undefined);
          }}>
          {({ data }: { data: Party }) => (
            <PartyBottomSheetDetails party={data} />
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const BottomSheetBackground = ({ style }: BottomSheetBackgroundProps) => {
  return (
    <Stack
      bc="$backgroundPrimary"
      borderRadius={30}
      shadowColor="black"
      shadowOpacity={0.2}
      shadowRadius={10}
      style={style}
    />
  );
};

const BottomSheetHandle = (_: BottomSheetHandleProps) => {
  return (
    <Stack ai="center" jc="center" bc="transparent" my="$md">
      <Stack bc="$backgroundOverlayPrimary" br={2} height={5} width={50} />
    </Stack>
  );
};
