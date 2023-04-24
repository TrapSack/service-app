import axios from 'axios';
import qs from 'qs';
import { ITablesContainer } from './interfaces';

type QueryString = string | string[] | number;

const _api = axios.create({
  baseURL: 'http://localhost:8801/'
});

const get = async <T = never>(url: string, query?: any) => {
  const params = qs.stringify(query);

  const response = await _api.get<T>(`${url}?${params}`);

  return response;
};

export const api = {
  getTables: (params?: any) => get<ITablesContainer>('/tables', params)
};
