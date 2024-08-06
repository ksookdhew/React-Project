import {Categories, Product} from "../models/Products.ts";

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
}

export async function getAllCategories(): Promise<Categories> {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    return await response.json();
}