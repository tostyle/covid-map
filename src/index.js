import L from "leaflet";
import states from "./data.json";
console.log(!!states);
const map = L.map("app").setView([15.87, 100.9925], 8);
var info = L.control({ position: "topright" });

const geojson = L.geoJson(states, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);
info.onAdd = function(map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function(props) {
  this._div.innerHTML =
    "<p><b>Infected</b></p>" +
    (props
      ? "<b>" + props.name + "</b><br />" + props.density + " people"
      : "Hover over a state");
};
info.addTo(map);
function getColor(d) {
  return d > 50
    ? "#0868ac"
    : d > 20
    ? "#2f8ec0"
    : d > 10
    ? "#55b0c8"
    : d > 5
    ? "#7bccc4"
    : d > 2
    ? "#a5dcbe"
    : d > 1
    ? "#ccebca"
    : "#ccebca";
}

function style(feature) {
  return {
    weight: 2,
    opacity: 0.7,
    color: "white",
    dashArray: "2",
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.density)
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#277FCA",
    dashArray: "",
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

// 	var div = L.DomUtil.create('div', 'info legend'),
// 		grades = [1, 70, 80, 100, 130, 1000],
// 		labels = [],
// 		from, to;

// 	for (var i = 0; i < grades.length; i++) {
// 		from = grades[i];
// 		to = grades[i + 1];

// 		labels.push(
// 			'<i style="background:' + getColor(from + 1) + '"></i> ' +
// 			from + (to ? '&ndash;' + to : '+'));
// 	}

// 	div.innerHTML = labels.join('<br>');
// 	return div;
// };

// legend.addTo(map);

const geoJson = L.geoJson(states, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

var overLayers = {
  Thailand: geoJson
};

L.control.layers(overLayers).addTo(map);
