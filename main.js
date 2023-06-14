import ImageLayer from 'ol/layer/Image.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {fromLonLat, transform} from 'ol/proj';
import {} from 'ol/';
// import * as ol from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import LineString from 'ol/geom/LineString';
import image from './assets/map.svg';
// import { easing } from 'ol/animation';
// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
const extent = [0, 0, 1024, 1024];
const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});
function addpoint(coordinates = [0, 0], map) {
  var markerFeature = new Feature({
    geometry: new Point(coordinates), // Replace with your marker's coordinates
  });
  var markerSource = new VectorSource({
    features: [markerFeature],
  });
  var markerLayer = new VectorLayer({
    source: markerSource,
  });
  map.addLayer(markerLayer);
}
function drawline(coordinates, map) {
  // var startFeature = new Feature({
  //   geometry: new Point(start), // Replace with your marker's coordinates
  // });
  // var endFeature = new Feature({
  //   geometry: new Point(end), // Replace with your marker's coordinates
  // });
  const lineFeature = new Feature({
    geometry: new LineString([...coordinates]),
  });
  var markerSource = new VectorSource({
    features: [lineFeature],
  });
  var markerLayer = new VectorLayer({
    source: markerSource,
  });
  map.addLayer(markerLayer);
}
const map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: image,
        projection: projection,
        imageExtent: extent,
      }),
    }),
  ],
  target: 'map',
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 0,
    maxZoom: 5,
  }),
});
// addpoint ([300,600],map)
// addpoint ([300,700],map)
drawline(
  [
    [300, 600],
    [400, 700],
    [200, 800],
    [600, 900],
    [700, 1000],
  ],
  map
);
