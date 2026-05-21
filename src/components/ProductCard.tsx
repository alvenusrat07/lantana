import { Heart, ShoppingCart, Star, Eye, Globe } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onSelectProduct: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-natural-beige/60 hover:border-natural-sage shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden text-left h-full">
      {/* Product Image Panel */}
      <div className="relative overflow-hidden aspect-square bg-[#F2F1ED]/40">
        
        {/* Origin Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-natural-charcoal shadow-sm border border-natural-beige">
          {product.origin === 'South Korea' ? (
            <span className="flex items-center gap-1.5 font-sans text-natural-sage">
              <span className="h-2 w-2 rounded-full bg-natural-sage inline-block animate-pulse"></span>
              K-BEAUTY
            </span>
          ) : (
            <span className="flex items-center gap-1 font-sans text-natural-taupe">
              <Globe className="w-3 h-3 text-natural-taupe" />
              GLOBAL
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 backdrop-blur-xs text-natural-taupe hover:text-natural-sage shadow-sm hover:scale-110 active:scale-95 transition-all border border-natural-cream cursor-pointer"
          title="Add to Wishlist"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-natural-sage text-natural-sage' : 'text-natural-taupe hover:text-natural-sage'
            }`} 
          />
        </button>

        {/* Product image with zoom effect */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Quick details overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            onClick={onSelectProduct}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-natural-charcoal rounded-full font-serif text-xs font-semibold shadow-md hover:bg-natural-cream cursor-pointer transition-transform duration-200 translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5 text-natural-sage" />
            View Details
          </button>
        </div>

        {/* New Arrival / Best Seller visual pills */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1">
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 bg-natural-sage text-white font-sans text-[8px] font-extrabold uppercase tracking-widest rounded-md w-max shadow-sm">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 bg-natural-taupe text-white font-sans text-[8px] font-extrabold uppercase tracking-widest rounded-md w-max shadow-sm">
              Best Seller
            </span>
          )}
        </div>
      </div>

      {/* Product Content Block */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div className="space-y-1.5 cursor-pointer" onClick={onSelectProduct}>
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-wider text-natural-sage font-bold uppercase">{product.brand}</span>
            
            {/* Review stars summary representation */}
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-sm font-bold text-natural-charcoal line-clamp-1 group-hover:text-natural-sage transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-natural-taupe line-clamp-2 h-8 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer actions: Price & Cart btn */}
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-natural-cream">
          <div>
            <span className="text-[10px] text-natural-taupe font-sans tracking-wide block uppercase leading-none">Price</span>
            <span className="font-mono text-sm font-bold text-natural-charcoal mt-1 block">
              ৳ {product.price.toLocaleString()} BDT
            </span>
          </div>

          <button
            onClick={onAddToCart}
            className="flex items-center justify-center h-9 w-9 bg-[#F2F1ED] hover:bg-natural-sage text-natural-sage hover:text-white rounded-full transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
