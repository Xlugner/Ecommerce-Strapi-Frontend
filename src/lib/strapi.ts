// Cliente para conectar con Strapi
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Función helper para hacer requests a Strapi
 * @param endpoint - El endpoint de la API (ej: '/api/products')
 * @param params - Parámetros de query
 */
async function fetchFromStrapi(endpoint: string, params?: Record<string, any>) {
  const url = new URL(endpoint, STRAPI_URL);

  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Strapi fetch error:', error);
    return null;
  }
}

/**
 * Obtiene la URL completa de una imagen de Strapi
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ============= PRODUCTOS =============

export interface Product {
  id: number;
  documentId?: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  featured?: boolean;
  image?: Array<{
    id: number;
    name: string;
    url: string;
    alternativeText?: string;
  }>;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Obtiene todos los productos
 */
export async function getProducts(): Promise<Product[]> {
  const data = await fetchFromStrapi('/api/products', {
    'populate': '*',
  });
  return data?.data || [];
}

/**
 * Obtiene productos destacados
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await fetchFromStrapi('/api/products', {
    'filters[featured][$eq]': true,
    'populate': '*',
  });
  // Filtrar y validar que todos los productos tengan la estructura esperada
  return (data?.data || []).filter((product: any) => product?.id && product?.name);
}

/**
 * Obtiene un producto por slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchFromStrapi('/api/products', {
    'filters[slug][$eq]': slug,
    'populate': '*',
  });
  return data?.data?.[0] || null;
}

// ============= CATEGORÍAS =============

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Obtiene todas las categorías
 */
export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromStrapi('/api/categories');
  return data?.data || [];
}

/**
 * Obtiene una categoría por slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchFromStrapi('/api/categories', {
    'filters[slug][$eq]': slug,
  });
  return data?.data?.[0] || null;
}

/**
 * Obtiene productos por categoría
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await fetchFromStrapi('/api/products', {
    'filters[category][slug][$eq]': categorySlug,
    'populate': '*',
  });
  return data?.data || [];
}

// ============= CONFIGURACIÓN DE LA TIENDA =============

export interface StoreConfig {
  id: number;
  storeName: string;
  description: string;
  logo?: {
    id: number;
    name: string;
    url: string;
  };
  email: string;
  phone: string;
  whatsappNumber: string;
  address?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Obtiene la configuración de la tienda
 */
export async function getStoreConfig(): Promise<StoreConfig | null> {
  const data = await fetchFromStrapi('/api/store-config', {
    'populate': '*',
  });
  return data?.data || null;
}

// ============= HERO SECTION =============

export interface HeroSection {
  id: number;
  images: Array<{
    id: number;
    name: string;
    url: string;
    alternativeText?: string;
  }>;
}

/**
 * Obtiene el contenido de la Hero Section
 */
export async function getHeroSection(): Promise<HeroSection | null> {
  const response = await fetchFromStrapi('/api/hero-section', {
    'populate': 'images',
  });
  return response?.data || null;
}