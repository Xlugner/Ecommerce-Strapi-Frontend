import { useEffect, useState } from 'react';
import { isCartOpen } from '../react/CartStore';
import { Cart } from './Cart';

export const CartWrapper = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = isCartOpen.subscribe((value) => {
      setOpen(value);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Cart isOpen={open} onClose={() => isCartOpen.set(false)} />
    </>
  );
};