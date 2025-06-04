'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';
import { useEffect } from 'react';

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <Image
        className='mx-auto block mb-6'
        src='/check-mark.png'
        alt='Check mark icon'
        width='300'
        height='300'
      />
      <h1 className='text-3xl font-bold mb-4'>Payment successful!</h1>
      <p className='mb-4'>Thank you for your purchase. Your order is being processed.</p>
      <Link href={'/products'} className='text-blue-600 hover:underline'>
        Continue Shopping
      </Link>
    </div>
  );
}
