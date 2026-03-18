import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, saveAllProducts } from "@/lib/products";
import { Product } from "@/types";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/products/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const product = getAllProducts().find((p) => p.id === id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT /api/admin/products/[id] — update a product
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  let body: Partial<Product>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate price if provided
  if (body.price !== undefined) {
    const price = Number(body.price);
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }
    body.price = price;
  }

  // Check SKU uniqueness when changing SKU
  if (body.sku && body.sku !== products[index].sku) {
    if (products.some((p) => p.sku === body.sku && p.id !== id)) {
      return NextResponse.json({ error: "SKU already exists" }, { status: 409 });
    }
  }

  // Merge changes — never allow changing the id
  const updated: Product = {
    ...products[index],
    ...body,
    id, // protect id from being overwritten
  };

  products[index] = updated;
  saveAllProducts(products);

  return NextResponse.json(updated);
}

// DELETE /api/admin/products/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  products.splice(index, 1);
  saveAllProducts(products);

  return NextResponse.json({ ok: true });
}
