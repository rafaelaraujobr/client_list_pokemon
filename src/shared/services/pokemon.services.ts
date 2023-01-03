import http from '../plugins/http';
import { AxiosInstance } from 'axios';
export const getPokemonAll = async (limit:number= 10, offset:number = 0): Promise<any> => {
  return await http.get<AxiosInstance>(`pokemon?limit=${limit}&offset=${offset}`);
};

export const getPokemonById = async (id: number): Promise<any> => {
  return await http.get<AxiosInstance>(`pokemon/${id}`);
}