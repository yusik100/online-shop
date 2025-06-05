import Link from 'next/link';
import Stripe from 'stripe';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className='block h-full'>
      <Card className='group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border border-gray-200 rounded-2xl overflow-hidden'>
        {product.images && product.images[0] && (
          <div className='relative h-80 w-full'>
            <Image
              src={product.images[0]}
              alt={product.name}
              layout='fill'
              objectFit='cover'
              className='group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg'
            />
          </div>
        )}

        <CardHeader className='px-4 pt-2'>
          <CardTitle className='text-xl font-medium'>{product.name}</CardTitle>
        </CardHeader>

        <CardContent className='px-6 pb-6 flex flex-col flex-grow'>
          <div className='flex-grow' />

          {price && price.unit_amount && (
            <p className='text-xl font-extrabold text-gray-900 mb-6'>
              {(price.unit_amount / 100).toFixed(2)}₴
            </p>
          )}
          <Button className='bg-cyan-600 text-white rounded-lg py-2 hover:bg-cyan-700 transition'>
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
