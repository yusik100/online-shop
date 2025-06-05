'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cart-store';
import { checkoutAction } from './checkout-action';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center px-6 py-12'>
        <Image
          className='mx-auto mb-8'
          src='/empty-cart.png'
          alt='Empty cart icon'
          width={200}
          height={200}
        />
        <h1 className='text-3xl font-extrabold text-indigo-700 mb-4'>Your Cart Is Empty</h1>
        <p className='text-gray-600 mb-6'>
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Button
          asChild
          className='bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition w-full sm:w-auto'
        >
          <Link href={'/products'}>Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 py-12'>
      <div className='container mx-auto px-6 sm:px-8 lg:px-16'>
        <h1 className='text-4xl font-extrabold text-indigo-700 text-center mb-10'>Checkout</h1>

        <Card className='bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 max-w-lg mx-auto mb-10'>
          <CardHeader className='px-6 pt-6'>
            <CardTitle className='text-2xl font-bold text-gray-800'>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className='px-6 pb-6'>
            <ul className='space-y-6'>
              {items.map((item) => (
                <li
                  key={item.id}
                  className='flex flex-col space-y-2 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0'
                >
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-800 font-medium'>{item.name}</span>
                    <span className='text-gray-700 font-semibold'>
                      {((item.price * item.quantity) / 100).toFixed(2)}₴
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='text-gray-700 border-gray-300 hover:bg-indigo-50'
                        onClick={() => removeItem(item.id)}
                      >
                        −
                      </Button>
                      <span className='text-lg font-semibold'>{item.quantity}</span>
                      <Button
                        variant='default'
                        size='sm'
                        className='bg-indigo-600 text-white hover:bg-indigo-700'
                        onClick={() => addItem({ ...item, quantity: 1 })}
                      >
                        +
                      </Button>
                    </div>
                    <span className='text-gray-500 text-sm'>
                      {(item.price / 100).toFixed(2)}₴ each
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className='mt-6 pt-4 border-t border-gray-200 flex items-center justify-between'>
              <span className='text-lg font-medium text-gray-800'>Total:</span>
              <span className='text-xl font-extrabold text-indigo-700'>
                {(total / 100).toFixed(2)}₴
              </span>
            </div>
          </CardContent>
        </Card>

        <form action={checkoutAction} className='max-w-lg mx-auto space-y-4'>
          <input type='hidden' name='items' value={JSON.stringify(items)} />

          <Button
            type='submit'
            className='w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition'
          >
            Proceed to Payment
          </Button>

          <Button
            type='button'
            variant='outline'
            className='w-full border-indigo-600 text-indigo-600 rounded-lg py-3 hover:bg-indigo-50 transition'
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
        </form>
      </div>
    </div>
  );
}
