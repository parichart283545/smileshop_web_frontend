// connect api
import axios from 'axios'
import * as CONST from '../../../../Constants'
import {encodeURLWithParams}  from '../../Common/components/ParamsEncode'

const PRODUCT_URL = `${CONST.API_URL}/Product`

export const addProduct = (payload) => {
  debugger;
  return axios.post(`${PRODUCT_URL}/addproductr`, payload);
};

export const editProduct = (payload, id) => {
  return axios.put(`${PRODUCT_URL}/editproductr`, payload);
};

export const deleteProduct = (id) => {
  return axios.delete(`${PRODUCT_URL}/removeproductr/${id}`);
};

export const getProduct = (id) => {
  return axios.get(`${PRODUCT_URL}/getproductById/${id}`);
};

export const getProductFilter = (orderingField,ascendingOrder,page,recordsPerPage,Name) => {
    let payload = {
        page,
        recordsPerPage,
        orderingField,
        ascendingOrder,
        Name
    }
    return axios.get(encodeURLWithParams(`${PRODUCT_URL}/getproductfilter`,payload))
}