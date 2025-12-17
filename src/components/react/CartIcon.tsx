import { useState, useEffect } from 'react';
import { cartItems } from './CartStore';

interface CartIconProps {
  onOpenCart: () => void;
}

/**
 * COMPONENTE: CartIcon (Header - Desktop)
 * 
 * Icono de carrito para el header en desktop
 * Con badge que muestra la cantidad de items
 */
export const CartIcon = ({ onOpenCart }: CartIconProps) => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const unsubscribe = cartItems.subscribe((items) => {
      setTotalItems(Object.keys(items).length);
    });
    return unsubscribe;
  }, []);

  return (
    <button
      onClick={onOpenCart}
      className="relative text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-primary-600"
      aria-label="Abrir carrito"
    >
      {/* Icono SVG del carrito */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      
      {/* Badge con la cantidad (solo si hay items) */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};