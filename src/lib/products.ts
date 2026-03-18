import fs from "fs";
import path from "path";
import { Product } from "@/types";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

export function getAllProducts(): Product[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

export function saveAllProducts(products: Product[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getRelatedProducts(id: string, limit = 3): Product[] {
  return getAllProducts()
    .filter((p) => p.id !== id && p.inStock)
    .slice(0, limit);
}

// Keep a named export for backwards compatibility with static pages
export const products = getAllProducts();

