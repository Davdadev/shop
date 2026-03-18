import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "hex-cube",
    name: "HEX CUBE",
    sku: "FC-001",
    price: 24.99,
    description: "Satisfying 6-sided fidget cube",
    longDescription: "The HEX CUBE is precision 3D printed with PLA+ for maximum durability. Each face features a unique tactile interaction—click buttons, smooth rollers, a joystick, a silent pad, a toggle switch, and a spinning dial. Engineered for focus and stress relief, the hexagonal form factor feels perfectly balanced in hand.",
    category: "cubes",
    tags: ["cube", "multi-function", "clicking"],
    color: "#1a1a2e",
    accentColor: "#f97316",
  },
  {
    id: "gyro-spinner",
    name: "GYRO SPINNER",
    sku: "FC-002",
    price: 19.99,
    description: "Tri-blade gyroscopic spinner",
    longDescription: "The GYRO SPINNER features an aerodynamically optimized tri-blade design with a precision steel bearing center. Ultra-smooth rotation for up to 3+ minutes on a single spin. The geometric blade profile creates a mesmerizing optical pattern during use. Perfect for focus enhancement and anxiety relief.",
    category: "spinners",
    tags: ["spinner", "bearing", "gyroscopic"],
    color: "#0d1b2a",
    accentColor: "#22d3ee",
  },
  {
    id: "click-ring",
    name: "CLICK RING",
    sku: "FC-003",
    price: 14.99,
    description: "Wearable clicking ring",
    longDescription: "The CLICK RING is a discreet, wearable fidget tool that fits over your finger like a band. Features a satisfying click mechanism embedded in the band that provides auditory and tactile feedback without drawing attention. Available in multiple sizes and completely silent mode optional.",
    category: "wearables",
    tags: ["ring", "wearable", "clicking", "discreet"],
    color: "#1a0a0a",
    accentColor: "#ef4444",
  },
  {
    id: "infinity-loop",
    name: "INFINITY LOOP",
    sku: "FC-004",
    price: 34.99,
    description: "Continuous loop flipper",
    longDescription: "The INFINITY LOOP is a masterpiece of mechanical design. Two interconnected loops rotate around each other in a continuous, mesmerizing motion. The satisfying resistance and smooth-over feel makes this our most addictive fidget tool. Complex enough to require concentration, simple enough to use anywhere.",
    category: "loops",
    tags: ["loop", "flipper", "complex", "premium"],
    color: "#0a1a0a",
    accentColor: "#22c55e",
  },
  {
    id: "ball-bearing-cube",
    name: "BALL BEARING CUBE",
    sku: "FC-005",
    price: 29.99,
    description: "Bearings inside cube for smooth clicking",
    longDescription: "The BALL BEARING CUBE takes the classic fidget cube to the next level. Precision steel ball bearings are embedded into each face, providing ultra-smooth operation and a satisfying weight. The cube itself is weighted for perfect balance. Roller bearings create a distinctive, deeply satisfying feedback.",
    category: "cubes",
    tags: ["cube", "bearings", "smooth", "premium"],
    color: "#1a1500",
    accentColor: "#eab308",
  },
  {
    id: "flex-chain",
    name: "FLEX CHAIN",
    sku: "FC-006",
    price: 22.99,
    description: "Articulated flexible chain",
    longDescription: "The FLEX CHAIN is 24 precisely articulated links printed as a single piece—no assembly required. The innovative print-in-place design means each link flows seamlessly into the next. The chain can be stretched, twisted, looped, and reformed endlessly. A true showcase of 3D printing engineering.",
    category: "chains",
    tags: ["chain", "flexible", "articulated", "unique"],
    color: "#0a0a1a",
    accentColor: "#a855f7",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: string, limit = 3): Product[] {
  return products.filter((p) => p.id !== id).slice(0, limit);
}
