import axios from 'axios';
import { Product } from '../../types';

const API_URL = "http://127.0.0.1:3000/products";

export const fetchProducts = async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};
