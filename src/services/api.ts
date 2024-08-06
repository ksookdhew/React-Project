import { Product } from "../models/Products.ts";

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
}

