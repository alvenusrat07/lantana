import { X, Trash2, Plus, Minus, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (deliveryArea: 'inside' | 'outside') => void;
}

export default function CartDrawer({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const isDhaka = true; // State inside Dhaka by default
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryInside = 80;
  const deliveryOutside = 150;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-natural-charcoal/40 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Drawer slide panel */}
      <div className="relative w-full max-w-md h-full bg-[#FAF9F6] shadow-2xl flex flex-col justify-between text-left border-l border-natural-beige animate-slide-left">
        
        {/* Header toolbar */}
        <div className="p-4 md:p-6 border-b border-natural-beige flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-natural-sage" />
            <span className="font-serif text-lg font-bold text-natural-charcoal">Your Shopping Bag</span>
            <span className="px-2.5 py-0.5 bg-natural-cream text-natural-sage border border-natural-beige/60 font-mono text-xs rounded-full font-bold">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-natural-cream text-natural-taupe hover:text-natural-charcoal cursor-pointer"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Contents area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-72 space-y-4 text-center">
              <div className="h-16 w-16 bg-natural-cream rounded-full flex items-center justify-center text-natural-sage border border-natural-beige/40">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-natural-charcoal">Your shopping bag is empty</h3>
                <p className="text-xs text-natural-taupe max-w-[240px] mx-auto leading-relaxed">
                  Go back to explore Lantana's premium and authentic Korean beauty collection to find products that restore your natural glow.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-natural-sage hover:bg-natural-sage-dark text-white rounded-full text-xs font-sans uppercase tracking-wider font-bold shadow-md cursor-pointer transition-all duration-200"
              >
                Keep Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3.5 bg-white hover:bg-natural-cream/30 rounded-2xl border border-natural-beige/45 transition-colors">
                  {/* Miniature Image */}
                  <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-natural-beige bg-[#FAF9F6]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Pricing and Action controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-natural-sage uppercase tracking-widest leading-none block">
                        {item.product.brand}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-natural-charcoal line-clamp-1 mt-1 leading-tight">
                        {item.product.name}
                      </h4>
                      <span className="font-mono text-xs font-bold text-natural-charcoal mt-1.5 block">
                        ৳ {item.product.price.toLocaleString()} BDT
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 bg-white border border-natural-beige rounded-full p-0.5 shadow-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-natural-cream text-natural-taupe cursor-pointer disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-natural-charcoal px-2 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-natural-cream text-natural-taupe cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-natural-taupe hover:text-red-650 cursor-pointer transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4 text-natural-taupe hover:text-red-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer calculation values (only when items exist) */}
        {cart.length > 0 && (
          <div className="p-4 md:p-6 border-t border-natural-beige space-y-4 bg-white">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-natural-taupe">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-natural-charcoal">৳ {subtotal.toLocaleString()} BDT</span>
              </div>

              {/* Delivery Zone selection & explanation */}
              <div className="flex items-center justify-between text-xs text-natural-taupe">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-natural-sage" /> Shipping Zone Delivery
                </span>
                <span className="font-mono font-medium text-natural-charcoal">
                  Dhaka Inside: ৳ {deliveryInside} | Outside: ৳ {deliveryOutside}
                </span>
              </div>
            </div>

            <div className="border-t border-natural-beige/40 pt-3 flex items-baseline justify-between">
              <span className="text-sm font-bold text-natural-charcoal font-sans">Inside Dhaka Total</span>
              <span className="font-serif text-xl font-bold text-natural-sage">
                ৳ {(subtotal + deliveryInside).toLocaleString()} BDT
              </span>
            </div>

            <p className="text-[10px] text-natural-taupe font-sans leading-relaxed">
              * Delivery takes 24 hours inside Dhaka and 2-3 days outside. Checkout utilizes local secure bKash/Nagad and major cards protocols.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Dhaka Inside Secure Checkout */}
              <button
                id="cart-checkout-inside-btn"
                onClick={() => onCheckout('inside')}
                className="flex items-center justify-center gap-1.5 py-3.5 rounded-full bg-natural-sage hover:bg-natural-sage-dark text-white text-xs font-bold leading-none cursor-pointer shadow-md transition-all active:scale-95 uppercase tracking-wider font-sans"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Dhaka Inside
              </button>

              {/* Dhaka Outside Countrywide Checkout */}
              <button
                id="cart-checkout-outside-btn"
                onClick={() => onCheckout('outside')}
                className="flex items-center justify-center gap-1.5 py-3.5 rounded-full bg-natural-charcoal hover:bg-natural-charcoal/90 text-white text-xs font-bold leading-none cursor-pointer shadow-md transition-all active:scale-95 uppercase tracking-wider font-sans"
              >
                <Truck className="w-3.5 h-3.5" />
                Outside Dhaka
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
