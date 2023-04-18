import axios from 'axios';
import qs from 'qs';

type QueryString = string | string[] | number;

const _api = axios.create({
  baseURL: '123'
});

const testTimeout = async (data: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });

const get = async (url: string, query?: any) => {
  const params = qs.stringify(query);

  // console.log(params);

  // const response = await _api.get(`${url}?${params}`);

  const responseData = await testTimeout({ sessionId: '123' }).then((res) => res);

  return responseData;
};

export const api = {
  testGet: (params?: any) => get('/pizda', params)
};
