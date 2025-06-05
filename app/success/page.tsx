'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className='flex flex-col items-center justify-center px-6 py-12'>
      <Image
        className='mx-auto mb-8'
        src='/check-mark.png'
        alt='Check mark icon'
        width={200}
        height={200}
      />
      <h1 className='text-3xl font-extrabold text-cyan-700 mb-4'>Payment Successful!</h1>
      <p className='text-gray-600 mb-6'>
        Thank you for your purchase. Your order is being processed.
      </p>
      <Button
        asChild
        className='bg-cyan-600 text-white rounded-lg px-6 py-3 hover:bg-cyan-700 transition w-full sm:w-auto'
      >
        <Link href='/products'>Continue Shopping</Link>
      </Button>
    </div>
  );
}
