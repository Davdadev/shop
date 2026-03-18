import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, saveAllProducts } from "@/lib/products";
import { Product } from "@/types";
import { nanoid } from "nanoid";

// GET /api/admin/products — list all products
export async function GET() {
  const products = getAllProducts();
  return NextResponse.json(products);
}

// POST /api/admin/products — create a new product
export async function POST(req: NextRequest) {
  let body: Partial<Product>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required fields
  const required = ["name", "price", "description", "longDescription", "category", "sku"];
  for (const field of required) {
    if (!body[field as keyof Product]) {
      return NextResponse.json(
        { error: `Field "${field}" is required` },
        { status: 400 }
      );
    }
  }

  const price = Number(body.price);
  if (isNaN(price) || price < 0) {
    return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
  }

  const products = getAllProducts();

  // Check SKU uniqueness
  if (products.some((p) => p.sku === body.sku)) {
    return NextResponse.json({ error: "SKU already exists" }, { status: 409 });
  }

  // Generate a URL-safe ID from the name if not provided
  const id =
    body.id?.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") ||
    `${body.name!.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${nanoid(4)}`;

  // Check ID uniqueness
  if (products.some((p) => p.id === id)) {
    return NextResponse.json({ error: "Product ID already exists" }, { status: 409 });
  }

  const newProduct: Product = {
    id,
    name: String(body.name),
    sku: String(body.sku),
    price,
    description: String(body.description),
    longDescription: String(body.longDescription),
    category: String(body.category || "other"),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    color: String(body.color || "#111111"),
    accentColor: String(body.accentColor || "#f97316"),
    inStock: body.inStock !== false,
    featured: body.featured === true,
  };

  products.push(newProduct);
  saveAllProducts(products);

  return NextResponse.json(newProduct, { status: 201 });
}
