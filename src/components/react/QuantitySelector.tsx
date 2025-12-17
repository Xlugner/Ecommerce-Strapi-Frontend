import { useState } from 'react';
import { addCartItem, isCartOpen } from './CartStore';
import type { CartItem } from '../../lib/types';

interface QuantitySelectorProps {
  product: Omit<CartItem, 'quantity'>;
}

export const QuantitySelector = ({ product }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // Agregar el producto con la cantidad seleccionada
    addCartItem(product, quantity);
    
    // Abrir el carrito
    isCartOpen.set(false);
    
    // Feedback visual
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1); // Resetear cantidad
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Selector de cantidad */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Cantidad:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Disminuir cantidad"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M20 12H4"></path>
            </svg>
          </button>
          <span className="px-6 py-2 font-semibold min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className={`
            flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold transition-all flex items-center justify-center text-sm sm:text-base gap-1 sm:gap-2
            ${isAdded
              ? 'bg-green-500 text-white'
              : 'bg-neutral-900 hover:bg-neutral-700 text-white'
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
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Añadir al Carrito</span>
            </span>
          )}
        </button>

        <a
          href={`https://wa.me/${import.meta.env.PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Me interesa: ${product.name} (cantidad: ${quantity})`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
