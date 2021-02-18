// connect api
import axios from 'axios'
import * as CONST from '../../../../Constants'
import {encodeURLWithParams}  from '../../Common/components/ParamsEncode'

const PRODUCTGROUP_URL = `${CONST.API_URL}/ProductGroup`

export const addProductGroup = (payload) => {
  debugger;
  return axios.post(`${PRODUCTGROUP_URL}/addproductgroup`, payload);
};

export const editProductGroup = (payload) => {
  return axios.put(`${PRODUCTGROUP_URL}/editproductgroup`, payload);
};

export const deleteProductGroup = (id) => {
  return axios.delete(`${PRODUCTGROUP_URL}/removeproductgroup/${id}`);
};
 
export const getProductGroup = ()=>{
  return axios.get(`${PRODUCTGROUP_URL}/getallproductgroups`);
};

export const getProductGroupById = (id) => {
    return axios.get(`${PRODUCTGROUP_URL}/getproductgroupById/${id}`);
  };

export const getProductGroupFilter = (OrderingField, AscendingOrder, Page, RecordsPerPage, Name) => 
   {
    let payload = {
        OrderingField,
        AscendingOrder,
        Page,
        RecordsPerPage,
        Name
  }
    return axios.get(encodeURLWithParams(`${PRODUCTGROUP_URL}/getproductgroupfilter`,payload))
}