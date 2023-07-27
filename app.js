import { polygonContains } from 'https://cdn.skypack.dev/d3-polygon@3';
import * as ls from './localStorage.js';

const outputEl = document.querySelector('main');

const dataAPI = '';
const searchUrlBase = '';

navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

/**
 * geoSuccess
 * @description Fetch external or local data, find neighborhood, update DOM,
 * set local data
 * @param {Geolocation} position - Geolocation interface
 */
async function geoSuccess(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const alt = position.coords.altitude;
  const point = [long, lat];
  let hoods;

  if (!ls.isAvailable() || !ls.get('NEIGHBORHOODSv1')) {
    const response = await fetch(dataAPI);
    hoods = await response.json();
  } else {
    hoods = JSON.parse(ls.get('NEIGHBORHOODSv1'));
  }

  const name = findHood(hoods, point);

  updateDOM(name, lat, long, alt);

  if (ls.isAvailable() && !ls.get('NEIGHBORHOODSv1')) {
    ls.set('NEIGHBORHOODSv1', JSON.stringify(hoods));
  }
}

function geoError(error) {
  outputEl.textContent = error.message;
}

/**
 * findHood
 * @param {object} data - GeoJSON data
 * @param {array} point - [long, lat]
 * @returns {string|undefined} - the name of the neighborhood(s) or undefined
 */
function findHood(data, point) {
  const hoods = data.features;
  const hood = hoods.filter((feature) => {
    // Two feature types: polygon, multipolygon
    const polygon =
      feature.geometry.type === 'Polygon'
        ? feature.geometry.coordinates[0]
        : feature.geometry.coordinates[0][0];

    return polygonContains(polygon, point);
  });

  if (hood.length === 1) {
    return hood[0].properties['FeatureName'];
  } else if (hood.length > 1) {
    return hood.map((h) => h.properties['FeatureName']).join(' or ');
  } else {
    return undefined;
  }
}

/**
 * updateDOM
 * @description Update DOM with neighborhood and position data
 * @param {string|undefined} name - name of neighborhood(s)
 * @param {string} lat - latitude
 * @param {string} long - longitude
 * @param {string} alt - altitude
 */
function updateDOM(name, lat, long, alt) {
  const FT_IN_M = 3.28084;
  const _lat = parseFloat(lat).toFixed(4);
  const _long = parseFloat(long).toFixed(4);
  const _alt = Math.round(parseFloat(alt).toFixed(2) * FT_IN_M);
  let nameEl;

  if (!name) {
    nameEl = `<h2>It appears you aren't in $CITY</h2>`;
  } else {
    const searchUrlFull = `${searchUrlBase}${name}`;
    nameEl = `<h2><a href="${searchUrlFull}">${name}</a></h2>`;
  }

  const summary = `
  <ul>
    <li>Latitude: ${_lat}°</li>
    <li>Longitude: ${_long}°</li>
    <li>Altitude: ${_alt} ft</li>
  </ul>`;

  outputEl.innerHTML = nameEl + summary;
}
