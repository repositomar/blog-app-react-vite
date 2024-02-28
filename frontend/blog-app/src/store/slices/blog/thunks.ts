import { setAllEntries, setEntries } from '.';
import { blogApi } from '../../../api/blogApi';

export const getEntries = (page = 0, limit = 5, search = '') => {
  return async (dispatch: any, getState: any) => {

    const { data } = await blogApi.get(`/entries?page=${page}&limit=${limit}&search=${search}`);

    dispatch(setEntries({ entries: data.data, count: data.totalRecords }));
  }
}

export const getAllEntries = (page = 0, limit = 5, search = '') => {
  return async (dispatch: any, getState: any) => {

    const { data } = await blogApi.get(`/entries?page=${page}&limit=${limit}&search=${search}`);
    dispatch(setAllEntries({ totalRecords: data.totalRecords }));
  }
}