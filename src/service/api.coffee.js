import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thecoffeehouse.com/api",
  timeout: 1000,
});
// https://api.thecoffeehouse.com/api/v5/stores/all-pickup
export const getProduct = (params) => instance.get("/v2/menu", params);
