import http from '../plugins/http';
import { AxiosInstance } from 'axios';
export const getPokemonAll = async (limit:number= 10, offset:number = 0): Promise<any> => {
  return await http.get<AxiosInstance>(`pokemon?limit=${limit}&offset=${offset}`);
};

export const getPokemonByName = async (name: string): Promise<any> => {
  return await http.get<AxiosInstance>(`pokemon/${name}`);
}