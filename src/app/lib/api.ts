import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const addProduct = async (product: { name: string; price: number }) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
};

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getCurrentUser(userId: number) {
  const res = await fetch(`${API_URL}/me?user_id=${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}


export async function createOrder(orderData: any) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

