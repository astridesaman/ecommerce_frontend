import axios from "axios";


const API_URL = process.env.API_URL 

// Types pour les données
export interface Product {
  id?: number;
  name: string;
  price: number;

}

export interface User {
  id: number;
  name: string;
  email: string;

}

export interface Order {
  productId: number;
  quantity: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getCurrentUser(userId: number): Promise<User | null> {
  const res = await fetch(`${API_URL}/me?user_id=${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function loginUser(email: string, password: string): Promise<{ access_token: string; user: User }> {
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export async function createOrder(orderData: Order): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

