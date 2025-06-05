'use client';

import Link from 'next/link';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cart-store';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3 md:py-4'>
        <Link
          href='/'
          className='text-2xl font-extrabold text-cyan-600 hover:text-cyan-700 transition'
        >
          Yarn Shop
        </Link>

        <div className='hidden md:flex space-x-6'>
          <Link
            href='/'
            className='text-gray-800 text-base font-normal transition hover:text-cyan-700'
          >
            Home
          </Link>
          <Link
            href='/products'
            className='text-gray-800 text-base font-normal transition hover:text-cyan-700'
          >
            Products
          </Link>
          <Link
            href='/checkout'
            className='text-gray-800 text-base font-normal transition hover:text-cyan-700'
          >
            Checkout
          </Link>
        </div>

        <div className='flex items-center space-x-4'>
          <Link href='/checkout' className='relative'>
            <button
              type='button'
              className='relative flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 hover:bg-cyan-200 transition'
            >
              <ShoppingCartIcon className='h-6 w-6 text-cyan-600' />
              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white'>
                  {cartCount}
                </span>
              )}
            </button>
          </Link>

          <Button
            variant='ghost'
            className='p-2 md:hidden text-gray-700 hover:text-cyan-600 transition'
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <XMarkIcon className='h-6 w-6' /> : <Bars3Icon className='h-6 w-6' />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className='md:hidden bg-white shadow-lg border-t border-gray-200 animate-fade-in-down'>
          <ul className='flex flex-col space-y-1 px-4 py-4'>
            <li>
              <Link
                href='/'
                className='block rounded-lg px-3 py-2 text-gray-800 text-base font-normal transition hover:bg-cyan-50 hover:text-cyan-700'
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/products'
                className='block rounded-lg px-3 py-2 text-gray-800 text-base font-normal transition hover:bg-cyan-50 hover:text-cyan-700'
                onClick={() => setMobileOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href='/checkout'
                className='block rounded-lg px-3 py-2 text-gray-800 text-base font-normal transition hover:bg-cyan-50 hover:text-cyan-700'
                onClick={() => setMobileOpen(false)}
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
