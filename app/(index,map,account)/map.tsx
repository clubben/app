import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { hashBase32ArrayToMultiPolygon } from 'geohashing';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import MapView, { Geojson, Region } from 'react-native-maps';
import { BBox, regionToBBox, getZoomLevelFromRegion } from 'src/utils/geo';
import { getHashesWithinBbox } from 'src/utils/geohash';

function bboxToGeohashJson(bbox: BBox, zoom: number) {
  const hashes = getHashesWithinBbox(bbox, zoom);
  return hashBase32ArrayToMultiPolygon(hashes);
}

export default function Map() {
  const { width, height } = useWindowDimensions();
  const [reg, setReg] = useState<Region | undefined>(undefined);

  const zoom = reg ? getZoomLevelFromRegion(reg, width) : 20;
  const bbox = reg ? regionToBBox(reg, { height, width }, zoom) : undefined;

  const geohashPolygon = bbox ? bboxToGeohashJson(bbox!, zoom) : undefined;

  return (
    <>
      <Head>
        <title>Map</title>
      </Head>
      <MapView style={{ flex: 1 }} onRegionChangeComplete={reg => setReg(reg)}>
        {geohashPolygon && (
          <Geojson
            geojson={{
              type: 'FeatureCollection',
              features: [geohashPolygon],
            }}
            fillColor="rgba(0, 0, 100, 0.3)"
          />
        )}
      </MapView>
    </>
  );
}
