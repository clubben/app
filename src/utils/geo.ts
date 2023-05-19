import SphericalMercator from '@mapbox/sphericalmercator';
const merc = new SphericalMercator();

export type Region = {
  latitude: number;
  longitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
};

export type BBox = {
  northLatitude: number;
  southLatitude: number;
  westLongitude: number;
  eastLongitude: number;
};

// see https://gist.github.com/mpontus/a6a3c69154715f2932349f0746ff81f2
export const getZoomLevelFromRegion = (
  region: Region,
  viewportWidth: number
) => {
  const { longitudeDelta } = region;
  // Normalize longitudeDelta which can assume negative values near central meridian
  const lngD = (360 + longitudeDelta) % 360;

  // Calculate the number of tiles currently visible in the viewport
  const tiles = viewportWidth / 256;

  // Calculate the currently visible portion of the globe
  const portion = lngD / 360;

  // Calculate the portion of the globe taken up by each tile
  const tilePortion = portion / tiles;

  // Return the zoom level which splits the globe into that number of tiles
  return Math.log2(1 / tilePortion);
};

export type Viewport = {
  width: number;
  height: number;
};

export const regionToBBox = (
  region: Region,
  viewport: Viewport,
  zoom?: number
): BBox => {
  const { latitude, longitude } = region;
  const zoomLevel = zoom || getZoomLevelFromRegion(region, viewport.width);
  const { width, height } = viewport;

  const [x, y] = merc.px([longitude, latitude], zoomLevel);
  const xmin = Math.floor(x - width / 2);
  const xmax = xmin + width;
  const ymin = Math.floor(y - height / 2);
  const ymax = ymin + height;

  const [westLongitude, northLatitude] = merc.ll([xmin, ymin], zoomLevel);
  const [eastLongitude, southLatitude] = merc.ll([xmax, ymax], zoomLevel);

  return {
    northLatitude,
    southLatitude,
    westLongitude,
    eastLongitude,
  };
};
