import turfArea from '@turf/area';
import bboxPolygon from '@turf/bbox-polygon';
import turfIntersect from '@turf/intersect';
import { decodeBboxBase32, getHashesWithinBboxBase32 } from 'geohashing';

import {
  BBox,
  getZoomLevelFromRegion,
  Region,
  regionToBBox,
  Viewport,
} from './geo';

export function getGeoHashLengthForZoom(zoom: number): number {
  if (zoom < 5) {
    return 1;
  }
  if (zoom < 7.5) {
    return 2;
  }
  if (zoom < 10.5) {
    return 3;
  }
  if (zoom < 12.7) {
    return 4;
  }
  if (zoom < 15.3) {
    return 5;
  }
  if (zoom < 17.9) {
    return 6;
  } else {
    return 7;
  }
}

export function getHashesWithinBbox(bbox: BBox, zoom: number): string[] {
  const viewPoly = bboxPolygon([
    bbox.westLongitude,
    bbox.southLatitude,
    bbox.eastLongitude,
    bbox.northLatitude,
  ]);
  const viewArea = turfArea(viewPoly);

  const hashLength = getGeoHashLengthForZoom(zoom);
  const geohashes = getHashesWithinBboxBase32(
    bbox.southLatitude,
    bbox.westLongitude,
    bbox.northLatitude,
    bbox.eastLongitude,
    hashLength
  );

  // sorts the geohash by their area portion on the screen
  const sortedHashes = geohashes
    .map(hash => {
      const { maxLat, maxLng, minLat, minLng } = decodeBboxBase32(hash);
      const geohashPoly = bboxPolygon([minLng, minLat, maxLng, maxLat]);
      const union = turfIntersect(geohashPoly, viewPoly);
      const area = union ? turfArea(union) : 0;
      const portion = area / viewArea;
      return {
        hash,
        portion,
      };
    })
    .sort((a, b) => {
      if (a.portion < b.portion) {
        return 1;
      } else if (a.portion > b.portion) {
        return -1;
      } else {
        return 0;
      }
    });

  let portionSum = 0;
  const result: string[] = [];
  for (let i = 0; i < sortedHashes.length; i++) {
    if (portionSum < 0.8) {
      result.push(sortedHashes[i].hash);
      portionSum += sortedHashes[i].portion;
    }
  }

  // Allow max 4 geohashes per time
  if (result.length > 4) {
    const elementsToRemove = result.length - 4;
    result.splice(result.length - elementsToRemove, elementsToRemove);
  }

  return result;
}

export function getHashesWithinRegion(
  reg: Region,
  viewPort: Viewport
): string[] {
  const { width, height } = viewPort;
  const zoom = getZoomLevelFromRegion(reg, width);
  const bbox = regionToBBox(reg, { width, height }, zoom);
  return getHashesWithinBbox(bbox, zoom);
}
