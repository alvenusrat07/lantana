import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  wishlist: Product[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export default function WishlistDrawer({
  wishlist,
  isOpen,
  onClose,
  onSelectProduct,
  onMoveToCart,
  onRemoveFromWishlist
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-natural-charcoal/40 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide body */}
      <div className="relative w-full max-w-md h-full bg-[#FAF9F6] shadow-2xl flex flex-col justify-between text-left border-l border-natural-beige animate-slide-left">
        
        {/* Header bar */}
        <div className="p-4 md:p-6 border-b border-natural-beige flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-natural-sage fill-natural-sage" />
            <span className="font-serif text-lg font-bold text-natural-charcoal">Your Wishlist</span>
            <span className="px-2.5 py-0.5 bg-natural-cream text-natural-sage border border-natural-beige/60 font-mono text-xs rounded-full font-bold">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-natural-cream text-natural-taupe hover:text-natural-charcoal cursor-pointer"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Wishlist item lines */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-72 space-y-4 text-center">
              <div className="h-16 w-16 bg-natural-cream rounded-full flex items-center justify-center text-natural-sage border border-natural-beige/40">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-natural-charcoal">Your wishlist is empty</h3>
                <p className="text-xs text-natural-taupe max-w-[240px] mt-1 mx-auto leading-relaxed">
                  Save your favorite Korean cleansers, toners or daily hydration serums here to review them later.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-natural-sage hover:bg-natural-sage-dark text-white rounded-full text-xs font-sans uppercase tracking-wider font-bold shadow-md cursor-pointer transition-all duration-200"
              >
                Go Explore Products
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {wishlist.map((product) => (
                <div key={product.id} className="flex gap-4 p-3.5 bg-white hover:bg-natural-cream/30 rounded-2xl border border-natural-beige/45 transition-colors flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex gap-3 items-center">
                    {/* Tiny visual */}
                    <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-natural-beige bg-[#FAF9F6]">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono tracking-wider font-bold text-natural-sage uppercase block leading-none">
                        {product.brand}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-natural-charcoal line-clamp-1 mt-1 leading-tight">
                        {product.name}
                      </h4>
                      <span className="font-mono text-xs font-bold text-natural-charcoal mt-1.5 block">
                        ৳ {product.price.toLocaleString()} BDT
                      </span>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex gap-2 items-center justify-end border-t sm:border-t-0 border-natural-beige/30 pt-2 sm:pt-0">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-1.5 rounded-full bg-[#FAF9F6] hover:bg-natural-cream text-natural-sage hover:text-natural-sage-dark cursor-pointer border border-natural-beige/40 transition-colors"
                      title="Inspect Product"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onMoveToCart(product)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-natural-sage hover:bg-natural-sage-dark text-white text-[10px] font-bold cursor-pointer transition-all active:scale-95 leading-none"
                      title="Add to Cart Bag"
                    >
                      <ShoppingBag className="w-3" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1.5 rounded-full hover:bg-natural-cream text-natural-taupe hover:text-red-750 cursor-pointer transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info lock */}
        <div className="p-4 bg-white border-t border-natural-beige/50">
          <p className="text-[10px] text-natural-taupe text-center leading-relaxed font-mono uppercase tracking-widest">
            ★ LANTANA BEAUTY BD — PREMIUM SOURCE ★
          </p>
        </div>

      </div>
    </div>
  );
}
