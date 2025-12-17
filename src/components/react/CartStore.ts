import { atom, map } from 'nanostores';
import type { CartItem } from '../../lib/types';

// Estado de apertura del carrito
export const isCartOpen = atom(false);

// Mapa de items del carrito
export const cartItems = map<Record<string, CartItem>>({});

// --- ACCIONES ---

export function addCartItem(product: Omit<CartItem, 'quantity'>, quantity: number = 1) {
  const productKey = String(product.id);
  const existingEntry = cartItems.get()[productKey];
  if (existingEntry) {
    cartItems.setKey(productKey, {
      ...existingEntry,
      quantity: existingEntry.quantity + quantity,
    });
  } else {
    cartItems.setKey(productKey, {
      ...product,
      quantity,
    });
  }
}

export function removeCartItem(id: string) {
  const current = cartItems.get();
  // Creamos una copia del objeto sin la llave eliminada
  const { [id]: _, ...rest } = current;
  cartItems.set(rest);
}

export function updateItemQuantity(id: string, quantity: number) {
  const item = cartItems.get()[id];
  if (!item) return;

  if (quantity < 1) {
    // Si la cantidad es 0 o menos, eliminamos el item (opcional)
    // O puedes forzar que sea mínimo 1: cartItems.setKey(id, { ...item, quantity: 1 });
    removeCartItem(id); 
    return;
  }

  cartItems.setKey(id, { ...item, quantity });
}

export function clearCart() {
  cartItems.set({});
}

// Persistencia (LocalStorage)
if (typeof window !== 'undefined') {
  const CART_STORAGE_KEY = 'astro-cart-data';
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (savedCart) {
    try { cartItems.set(JSON.parse(savedCart)); } catch (e) { console.error(e); }
  }
  cartItems.subscribe((val) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(val));
  });
}