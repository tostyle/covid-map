const csvtojsonV2 = require("csvtojson/v2");
const fs = require("fs");
(async function() {
  const rows = await csvtojsonV2().fromFile(__dirname + "/province.csv");
  console.log(rows);
  const mapping = rows.reduce((mapProvince, row) => {
    return {
      ...mapProvince,
      [row.thaiName]: row
    };
  }, {});

  fs.writeFileSync(
    __dirname + "/../src/province.json",
    JSON.stringify(mapping, null, 2)
  );
})();
