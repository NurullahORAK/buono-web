import type { Product } from '@/content/types';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  className?: string;
  showShort?: boolean;
};

export default function ProductGrid({ products, className, showShort = true }: Props) {
  return (
    <div
      className={['grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', className ?? ''].join(
        ' '
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} showShort={showShort} />
      ))}
    </div>
  );
}
