const axios = require("axios");
const fs = require("fs");
const thailand = require("./thailand.json");
const provinces = require("./province.json");
const API_KEY = "nRI3saq8f5RmzMVwUrZrXASsqDqc2Bne";

const getTotalByProvince = () =>
  axios({
    method: "GET",
    headers: {
      "api-key": API_KEY
    },
    url:
      "https://opend.data.go.th/get-ckan/datastore_search?resource_id=5c91fc06-72c4-40fd-b426-bf2dfb9b27f4"
  });

getTotalByProvince().then(({ data }) => {
  const { records } = data.result;
  const dataMapping = records.reduce((recordMapping, record) => {
    const key = provinces[record.Province]
      ? provinces[record.Province].engName
      : "N/A";
    recordMapping[key] = record["Count of no"];
    return recordMapping;
  }, {});
  console.log(dataMapping);
  const features = thailand.features.map(feature => {
    const density = dataMapping[feature.properties.name] || 0;
    const properties = { ...feature.properties, density };
    return {
      ...feature,
      properties
    };
  });
  console.log(features);
  const covidData = {
    type: "FeatureCollection",
    features
  };
  fs.writeFileSync(
    __dirname + "/../src/data.json",
    JSON.stringify(covidData, null, 2)
  );
});
