import type { LimitConfig } from '@/types/types';
import axios from 'axios';

export async function fetchData(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}


export async function putData(url: string, data: LimitConfig) {
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        throw error;
    }
}