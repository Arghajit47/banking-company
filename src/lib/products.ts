"use client";

import useSWR from "swr";

export interface Product {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ProductsResponse {
  products: Product[];
}

const PRODUCT_ICON_MAP: Record<string, string> = {
  checking: "/assets/icons/icon_product_1.svg",
  savings: "/assets/icons/icon_product_2.svg",
  loans: "/assets/icons/icon_product_3.svg",
  insurance: "/assets/icons/icon_product_1.svg",
  investing: "/assets/icons/icon_product_2.svg",
  credit: "/assets/icons/icon_product_3.svg",
};

const PRODUCT_ICON_FALLBACK = "/assets/icons/icon_product_1.svg";

export function getProductIconPath(icon: string): string {
  return PRODUCT_ICON_MAP[icon] ?? PRODUCT_ICON_FALLBACK;
}

const fetcher = async (url: string): Promise<ProductsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Products data request failed: ${response.status}`);
  }
  return response.json();
};

export function useProductsData() {
  return useSWR<ProductsResponse>("/api/products", fetcher, {
    revalidateOnFocus: false,
  });
}
