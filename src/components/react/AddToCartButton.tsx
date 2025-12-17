import { useState, useEffect } from 'react';
import { addCartItem, isCartOpen } from '../react/CartStore'; 
import type { CartItem } from '../../lib/types';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    // 1. Añadimos al store global de Nanostores
    addCartItem(product);
    
    // 2. Opcional: Abrir el carrito automáticamente al añadir
    isCartOpen.set(false);

    // 3. Feedback visual local
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (!mounted) {
    return (
      <button
        disabled
        className="w-full py-3 px-6 rounded-lg font-bold bg-gray-300 text-gray-500 cursor-not-allowed"
      >
        Cargando...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isAdded}
      className={`
        w-full py-2 px-3 sm:py-3 sm:px-6 rounded-lg font-bold transition-all flex items-center justify-center text-sm sm:text-base gap-1 sm:gap-2
        ${isAdded
          ? 'bg-green-500 text-white'
          : 'bg-gray-800 hover:bg-gray-700 text-white'
        }
      `}
    >
      {isAdded ? (
        <span className="flex items-center justify-center gap-1 sm:gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">¡Añadido!</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-1 sm:gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="hidden sm:inline">Añadir al Carrito</span>
        </span>
      )}
    </button>
  );
};