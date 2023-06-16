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
import {Circle, Fill, Stroke, Style} from 'ol/style';
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

function drawline(coordinates, map) {
  const lineFeature = new Feature({
    geometry: new LineString([...coordinates]),
  });
  var lineSource = new VectorSource({
    features: [lineFeature],
  });
  var lineLayer = new VectorLayer({
    source: lineSource,
  });
  map.addLayer(lineLayer);
  let index = 0;
  const animateMarker = () => {
    if (index < coordinates.length) {
      let marker = coordinates[index];
      index++;
      // var markerFeature = new Feature({
      //   geometry: new Point(marker), // Replace with your marker's coordinates
      // });
      // var markerSource = new VectorSource({
      //   features: [markerFeature],
      // });
      // var markerLayer = new VectorLayer({
      //   source: markerSource,
      //   style: new Style({
      //     fill: new Fill({
      //       color: 'rgba(255, 0, 0, 0.2)',
      //     }),
      //     stroke: new Stroke({
      //       color: '#343434',
      //       width: 2,
      //     }),
      //     image: new Circle({
      //       radius: 4,
      //       fill: new Fill({
      //         color: 'rgba(28,255,43,0.82)',
      //       }),
      //     }),
      //   }),
      // });
      // map.addLayer(markerLayer);
      updateMarkers([marker]);
      setTimeout(animateMarker, 2000);
    }
  };
  animateMarker();
}
// Create a marker layer
var markerLayer = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.2)',
    }),
    stroke: new Stroke({
      color: '#343434',
      width: 2,
    }),
    image: new Circle({
      radius: 4,
      fill: new Fill({
        color: 'rgba(28,255,43,0.82)',
      }),
    }),
  }),
});
function clearMarkers() {
  markerLayer.getSource().clear();
}
// Update the marker layer with new markers
function updateMarkers(newMarkerData) {
  clearMarkers();
  newMarkerData.forEach(function (markerData) {
    console.log({markerData});
    addMarker(markerData);
  });
}
// Add a marker to the layer
function addMarker(markerData) {
  var marker = new Feature({
    geometry: new Point(markerData),
  });
  markerLayer.getSource().addFeature(marker);
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
map.addLayer(markerLayer);
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
