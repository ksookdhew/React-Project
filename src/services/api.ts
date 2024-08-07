import {Categories, Product} from "../models/Products.ts";

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
}

export async function getAllCategories(): Promise<Categories> {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    return await response.json();
}

export async function getProductInCategory(category: string): Promise<Product[]> {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return await response.json();
}

export async function getProductWithId(id: string): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await response.json();
}
