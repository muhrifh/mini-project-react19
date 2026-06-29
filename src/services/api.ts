import type { AuthResponse, ProductsResponse, Product, ProductFormData } from "@/types";

const BASE_URL = "https://dummyjson.com";

class ApiService {
  private getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  }

  async getMe(token: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    return response.json();
  }

  async getProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
    const response = await fetch(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  }

  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await fetch(
      `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    return response.json();
  }

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error("Product not found");
    }

    return response.json();
  }

  async addProduct(data: ProductFormData): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/add`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    return response.json();
  }

  async updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return response.json();
  }

  async deleteProduct(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return response.json();
  }
}

export const api = new ApiService();
