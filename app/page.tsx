import Image from 'next/image';
import { stripe } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel } from '@/components/carousel';

export default async function Home() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 5,
  });

  return (
    <div className='bg-gray-50 text-gray-800'>
      <section className='relative overflow-hidden bg-gradient-to-r from-indigo-50 to-white py-12 md:py-20'>
        <div className='absolute -top-16 -left-16 h-64 w-64 rounded-full bg-indigo-200 opacity-30 animate-spin-slow z-0'></div>
        <div className='absolute -bottom-20 -right-10 h-96 w-96 rounded-full bg-pink-100 opacity-20'></div>

        <div className='relative z-10 container mx-auto grid grid-cols-1 items-center gap-8 px-6 sm:px-8 md:grid-cols-2 lg:px-16'>
          <div className='space-y-6'>
            <h2 className='text-4xl font-extrabold tracking-tight text-indigo-900 md:text-5xl lg:text-6xl'>
              Welcome to <span className='text-indigo-600'>Yarn Shop</span>
            </h2>
            <p className='max-w-md text-lg text-gray-600'>
              Discover the finest yarns and accessories for your crafting projects at unbeatable
              prices.
            </p>
            <Button
              asChild
              variant='default'
              className='group relative inline-flex items-center overflow-hidden rounded-full bg-indigo-600 px-8 py-3 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300'
            >
              <Link href='/products' className='flex items-center'>
                <span className='text-base font-medium text-white transition group-hover:translate-x-1'>
                  Browse All Products
                </span>
                <svg
                  className='ml-2 h-5 w-5 text-indigo-200 transition group-hover:translate-x-2'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            </Button>
          </div>

          <div className='relative w-full max-w-lg overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-200'>
            <Image
              alt='Banner Image'
              src={products.data[0]?.images[0]}
              width={600}
              height={600}
              className='h-auto w-full object-cover transition-transform duration-500 hover:scale-105'
            />
            <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent p-4 text-white'></div>
          </div>
        </div>
      </section>

      <section className='container mx-auto py-12 px-6 sm:px-8 lg:px-16'>
        <h3 className='mb-6 text-center text-2xl font-semibold text-indigo-700'>
          Popular Products
        </h3>
        <div>
          <Carousel products={products.data} />
        </div>
      </section>
    </div>
  );
}
