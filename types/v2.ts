interface Product {
  legacy_id: string;
  id: string;
  mpn: string;
  name: string;
  description: string;
  features: string; // HTML string
  specs: string; // HTML string
  images: string[]; // Array of image URLs
  link: string; // Product link
  price: string; // Price as a string (e.g., "99.99 USD")
  sale_price: string; // Sale price as a string (e.g., "2.98 USD")
  availability: string; // e.g., "in stock"
  condition: string; // e.g., "new"
  brand: Brand; // Nested brand object
  vendorName: string; // Vendor name
  size: string; // Size information (if available)
  color: string; // Color information (if available)
  gender: string; // Gender information (if available)
  material: string; // Material information (if available)
  category: string; // Category information (if available)
}

interface Brand {
  name: string; // Brand name
  displayName?: string; // Optional display name
  description?: string; // Optional description
  slug?: string; // Optional slug
  id: string; // Brand ID
}
export type {
  Product,
  Brand,
};
