import axios from "axios";

const API_KEY = "nRI3saq8f5RmzMVwUrZrXASsqDqc2Bne";

export const getTotalByProvince = axios({
  method: "GET",
  headers: {
    "api-key": API_KEY
  },
  url:
    "https://opend.data.go.th/get-ckan/datastore_search?resource_id=5c91fc06-72c4-40fd-b426-bf2dfb9b27f4"
});
