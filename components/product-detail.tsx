'use client';

import Stripe from 'stripe';
import Image from 'next/image';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart-store';

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{product.name}</h1>
          {product.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          )}
        </div>

        <div className="mt-auto mb-4 flex flex-col items-start">
          {price && price.unit_amount && (
            <p className="text-3xl font-bold text-cyan-600 mb-4">
              {(price.unit_amount / 100).toFixed(2)}₴
            </p>
          )}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:border-cyan-600 hover:text-cyan-600 transition rounded-lg w-10 h-10 flex items-center justify-center"
              onClick={() => removeItem(product.id)}
            >
              −
            </Button>
            <span className="text-xl font-medium text-gray-800">{quantity}</span>
            <Button
              className="bg-cyan-600 text-white rounded-lg w-10 h-10 flex items-center justify-center hover:bg-cyan-700 transition"
              onClick={onAddItem}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
