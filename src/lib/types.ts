export type ProductVariant = {
  id: string;
  sku: string;
  option: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  image: string;
};

export type Product = {
  id: string;
  handle: string;
  slug: string;
  title: string;
  vendor: string;
  category: string;
  productType: string;
  googleCategory: string;
  tags: string[];
  status: string;
  published: boolean;
  price: number;
  compareAtPrice: number;
  stock: number;
  images: string[];
  imageAlt: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  concerns: string[];
  ingredients: string[];
  variants: ProductVariant[];
};

export type Review = {
  id: string;
  productSlug: string;
  sourceProduct: string;
  rating: number;
  content: string;
  author: string;
  date: string;
  media: string;
};

export type StoreOrderItem = {
  title: string;
  sku: string;
  quantity: number;
  price: number;
};

export type StoreOrder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  financialStatus: string;
  fulfillmentStatus: string;
  total: number;
  subtotal: number;
  shipping: number;
  currency: string;
  createdAt: string;
  city: string;
  province: string;
  paymentMethod: string;
  customer: string;
  items: StoreOrderItem[];
  notes: string;
};

export type CartProduct = {
  slug: string;
  title: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};
