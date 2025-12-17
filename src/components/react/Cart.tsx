import { useEffect, useState } from 'react';
import { 
  cartItems, 
  removeCartItem, 
  updateItemQuantity, 
  clearCart 
} from '../react/CartStore';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * COMPONENTE: Cart
 * * Modal lateral del carrito con diseño más limpio
 * Conectado a Nanostores en lugar de Context
 */
export const Cart = ({ isOpen, onClose }: CartProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [view, setView] = useState('cart'); // 'cart' o 'checkout'
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    ci: '',
    address: '',
    municipality: '',
    province: '',
    reference: '',
    phone: '',
    paymentMethod: 'usd',
  });

  useEffect(() => {
    const unsubscribe = cartItems.subscribe((cartData) => {
      setItems(Object.values(cartData));
    });
    return unsubscribe;
  }, []);

  // 3. Calculamos el total dinámicamente
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER;
    const MESSAGE_PREFIX = import.meta.env.PUBLIC_WHATSAPP_MESSAGE_PREFIX || 
      'Hola! Me gustaría hacer un pedido:';

    let message = `${MESSAGE_PREFIX}\n\n`;
    
    items.forEach(item => {
      message += `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n*Total: ${totalPrice.toLocaleString()}*`;

    const encodedMessage = encodeURIComponent(message);
    // Nota: Asegúrate de tener configurado PUBLIC_WHATSAPP_NUMBER en tu .env
    // Si no, esto abrirá un enlace roto.
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const CheckoutForm = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <h3 className="text-xl font-bold">Completa tus datos</h3>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-neutral-700">Fecha</label>
        <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-neutral-700">Hora de entrega</label>
        <input type="time" name="time" id="time" value={formData.time} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Nombre y apellidos</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="ci" className="block text-sm font-medium text-neutral-700">C.I</label>
        <input type="text" name="ci" id="ci" value={formData.ci} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-neutral-700">Dirección</label>
        <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="municipality" className="block text-sm font-medium text-neutral-700">Municipio</label>
        <input type="text" name="municipality" id="municipality" value={formData.municipality} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="province" className="block text-sm font-medium text-neutral-700">Provincia</label>
        <input type="text" name="province" id="province" value={formData.province} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="reference" className="block text-sm font-medium text-neutral-700">Puntos de referencia</label>
        <input type="text" name="reference" id="reference" value={formData.reference} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Número telefónico</label>
        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
      </div>
      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-neutral-700">Tipo de moneda para el proceso de pago</label>
        <select name="paymentMethod" id="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
          <option value="usd">USD</option>
          <option value="zelle">Zelle</option>
          <option value="cup">CUP</option>
          <option value="mixto">Mixto</option>
        </select>
      </div>
      <p className="text-sm text-neutral-500">Nota: Domicilio gratis solo en la cuidad de Bayamo.</p>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
        role="presentation"
      />

      {/* Panel lateral */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        
        {/* Header azul */}
        <div className="bg-neutral-900 text-white p-3 sm:p-4 flex justify-between items-center sticky top-0">
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-neutral-700 rounded-lg transition-colors"
            aria-label="Volver"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-lg sm:text-xl font-bold">Carrito</h2>
          <button
            onClick={clearCart}
            className="text-xs sm:text-sm hover:underline"
          >
            Vaciar
          </button>
        </div>

        {/* Items del carrito */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-neutral-300 mb-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-neutral-500 text-base sm:text-lg font-medium">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 pb-3 sm:pb-4 border-b">
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-neutral-100 rounded-lg flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs sm:text-sm text-neutral-800 line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-neutral-700 font-bold text-base sm:text-lg mb-2">
                      $ {item.price.toLocaleString()}
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-900 hover:bg-neutral-700 text-white rounded-lg flex items-center justify-center transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="font-bold text-neutral-800 min-w-[2rem] text-center text-sm">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-900 hover:bg-neutral-700 text-white rounded-lg flex items-center justify-center transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeCartItem(item.id)}
                    className="p-1 sm:p-2 text-error hover:bg-error/10 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Eliminar"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y WhatsApp */}
        {items.length > 0 && (
          <div className="border-t bg-white p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-semibold text-neutral-800">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-neutral-900">
                $ {totalPrice.toLocaleString()}
              </span>
            </div>

            <a
              href="/checkout"
              className="w-full bg-neutral-900 hover:bg-neutral-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 sm:gap-3 transition-colors shadow-lg text-sm sm:text-base"
            >
              <span>Proceder al Pago</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        )}
      </div>
    </>
  );
};