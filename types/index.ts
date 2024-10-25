interface ProductInfo {
  mpn: string;
  name: string;
  description: string;
  weight: number;
  slug: string;
  features: string;
  specs: string;
  condition: string;
  importProductUpdate: boolean;
  tagsUpdate: boolean;
  attributesUpdate: boolean;
  useCnetGalleryFlag: boolean;
  source: string;
  rank: number;
  sales: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  brandId: string;
  feedId: string;
  supplier: number;
  upc: string;
  breadcrumbs: Breadcrumb[];
  attributeList: AttributeListItem[];
  inventories: Inventory[];
  attributevalues: AttributeValue[];
  attributes: Attribute[];
  brand: Brand;
  images: Image[];
  reviews: Review[];
}

interface Breadcrumb {
  id: string;
  name: string;
  metaKeywords: string;
  metaDescription: string;
  slug: string;
  path: string;
}

interface AttributeListItem {
  code: string;
  value: string;
  name: string;
  filterableFlag: boolean;
}

interface Inventory {
  enabledFlag: boolean;
  qty: number;
  sku: string;
  primaryFlag: boolean;
  stockOutThreshold: number;
  salePrice: number;
  markedUpPrice: number;
  itemCost: number;
  wholesaleCost: number;
  retailPrice: number;
  markedUpRetailPrice: number;
  sale: number;
  markupData: MarkupData;
  vendorProductId: string;
  freeShippingFlag: boolean;
  condition: string;
  holdDeliveryFlag: boolean;
  bundleInventories: any;
  id: string;
  productId: string;
  vendorId: string;
  vendor: Vendor;
  shippingStrategies: ShippingStrategy[];
}

interface MarkupData {
  applyMarkup: boolean;
  stateMarkup: Record<string, PriceInfo> | {};
  vendorMarkup: PriceInfo;
  vendorStateMarkup: Record<string, PriceInfo>;
}

interface PriceInfo {
  salePrice: number;
  retailPrice: number;
}

interface Vendor {
  code: string;
  name: string;
  displayName: string;
  markupMultiplier: number;
  nonMarkupItems: string[];
  message: string;
  type: string;
  id: string;
  _logo: Logo;
  _secondaryLogo: Logo;
}

interface Logo {
  caption: string;
  description: string;
  source: string;
  sourceCdn: string;
  primaryFlag: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  id: string | null;
  productId: string | null;
}

interface ShippingStrategy {
  code: string;
  id: string;
  shippingMethodId: string;
  shippingMethod: ShippingMethod;
}

interface ShippingMethod {
  code: string;
  label: string;
  transportMode: string;
  id: string;
}

interface AttributeValue {
  value: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  productId: string;
  attributeCode: string;
}

interface Attribute {
  code: string;
  name: string;
  filterableFlag: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Brand {
  name: string;
  displayName: string;
  description: string;
  slug: string;
  id: string;
}

interface Image {
  caption: string;
  description: string;
  source: string;
  sourceCdn: string;
  primaryFlag: boolean;
  productId: string;
}

interface Review {}

export type {
  ProductInfo,
  Breadcrumb,
  AttributeListItem,
  Inventory,
  MarkupData,
  PriceInfo,
  Vendor,
  Logo,
  ShippingStrategy,
  ShippingMethod,
  AttributeValue,
  Attribute,
  Brand,
  Image,
  Review,
};
