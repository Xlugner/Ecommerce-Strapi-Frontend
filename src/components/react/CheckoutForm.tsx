import { useState, useEffect } from 'react';
import { cartItems, clearCart } from './CartStore';
import { getStoreConfig } from '../../lib/strapi';


const storeConfig = await getStoreConfig();
export const CheckoutForm = () => {
  const [items, setItems] = useState<any[]>([]);
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

  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const WHATSAPP_NUMBER = storeConfig?.whatsappNumber || import.meta.env.PUBLIC_WHATSAPP_NUMBER;
    let message = `*Nuevo Pedido*\n\n`;
    message += `*Fecha:* ${formData.date}\n`;
    message += `*Hora de entrega:* ${formData.time}\n`;
    message += `*Nombre y apellidos:* ${formData.name}\n`;
    message += `*C.I:* ${formData.ci}\n`;
    message += `*Dirección:* ${formData.address}\n`;
    message += `*Municipio:* ${formData.municipality}\n`;
    message += `*Provincia:* ${formData.province}\n`;
    message += `*Puntos de referencia:* ${formData.reference}\n`;
    message += `*Número telefónico:* ${formData.phone}\n`;
    message += `*Tipo de moneda:* ${formData.paymentMethod.toUpperCase()}\n\n`;
    message += `*Productos:*\n`;
    items.forEach(item => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\n*Total: $${totalPrice.toLocaleString()}*\n\n`;
    message += `_Nota: Domicilio gratis solo en la ciudad de Bayamo._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Formulario de Pago</h2>
      <form onSubmit={(e) => { e.preventDefault(); generateWhatsAppMessage(); }} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-neutral-700">Fecha</label>
            <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-neutral-700">Hora de entrega</label>
            <input type="time" name="time" id="time" value={formData.time} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Nombre y apellidos</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="ci" className="block text-sm font-medium text-neutral-700">C.I</label>
          <input type="text" name="ci" id="ci" value={formData.ci} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-neutral-700">Dirección</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="municipality" className="block text-sm font-medium text-neutral-700">Municipio</label>
            <input type="text" name="municipality" id="municipality" value={formData.municipality} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-neutral-700">Provincia</label>
            <input type="text" name="province" id="province" value={formData.province} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
          </div>
        </div>
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-neutral-700">Puntos de referencia</label>
          <textarea name="reference" id="reference" value={formData.reference} onChange={handleInputChange} rows={3} className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"></textarea>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Número telefónico</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
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
        <button onClick={generateWhatsAppMessage} type="submit" className="w-full bg-neutral-900 hover:bg-neutral-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Confirmar y Enviar Pedido
        </button>
      </form>
    </div>
  );
};
