import http from "../plugins/http";
import { AxiosInstance } from "axios";
export const getPokemonAll = async (
    limit: number = 10,
    offset: number = 0
): Promise<any> => {
    return await http.get<AxiosInstance>(
        `pokemon?limit=${limit}&offset=${offset === 1 ? 0 : offset}`
    );
};

export const getPokemonByName = async (name: string): Promise<any> => {
    return await http.get<AxiosInstance>(`pokemon/${name}`);
};

export const getPokemonByType = async (type: string): Promise<any> => {
    return await http.get<AxiosInstance>(`type/${type}`);
};

