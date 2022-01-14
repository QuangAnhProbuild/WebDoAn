// const instance = axios.create({
//   baseURL: "https://maps.googleapis.com/maps/api/place/textsearch",
// headers: {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// },
// });
import axios from "axios";

const instance = axios.create({
  baseURL: "https://cars-rental-api.herokuapp.com",
  // baseURL: " https://api.thecoffeehouse.com/api/v5/stores",
  timeout: 5000,
});
// https://api.thecoffeehouse.com/api/v5/stores/all-pickup
export const getList = (params) => instance.get("/products/", params);
export const getListVoucher = (params) => instance.get("/vouchers/", params);
export const postList = (data) => instance.post("/products/", data);
