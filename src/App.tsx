import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Quote, ShoppingBag, Heart, ShieldAlert, MessageCircle, HelpCircle, ArrowRight, Instagram, Facebook, Globe, Check, Smartphone, CheckCircle, Gift } from 'lucide-react';

import { Product, CartItem, UserProfile, Review } from './types';
import { products as initialProducts, homepageReviews } from './data';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReelsSection from './components/ReelsSection';
import FAQSection from './components/FAQSection';
import AISkinAdvisor from './components/AISkinAdvisor';
import ProfileModal from './components/ProfileModal';

export default function App() {
  // Global Store States
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lantana_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lantana_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lantana_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lantana_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      isLoggedIn: false
    };
  });

  // UI state controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutArea, setCheckoutArea] = useState<'inside' | 'outside'>('inside');

  const [announcementClosed, setAnnouncementClosed] = useState(false);

  // Sync state modifications with localStorage
  useEffect(() => {
    localStorage.setItem('lantana_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lantana_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lantana_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lantana_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Visual feedback, open cart instantly
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  // Custom Verified User Reviews insertion
  const handleAddReview = (productId: string, newReview: Review) => {
    setProducts(prevProducts => {
      const updated = prevProducts.map(p => {
        if (p.id === productId) {
          // Re-calculate rating
          const nextReviews = [newReview, ...p.reviews];
          const average = parseFloat(
            (nextReviews.reduce((sum, r) => sum + r.rating, 0) / nextReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: nextReviews,
            rating: average
          };
        }
        return p;
      });
      
      // Update selected product state as well so the details panel immediately renders the review block!
      const currentSelected = updated.find(p => p.id === productId);
      if (currentSelected) {
        setSelectedProduct(currentSelected);
      }
      return updated;
    });
  };

  // Auth operations
  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleLogout = () => {
    setUserProfile({
      name: '',
      email: '',
      phone: '',
      isLoggedIn: false
    });
  };

  // Checkout Triggers
  const handleProceedCheckout = (area: 'inside' | 'outside') => {
    setCheckoutArea(area);
    setCartOpen(false);
    
    // Force complete login profile if not logged in to associate order with email securely!
    if (!userProfile.isLoggedIn) {
      setProfileOpen(true);
    } else {
      setCheckoutOpen(true);
    }
  };

  // Scroll Helpers
  const scrollToFAQ = () => {
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReels = () => {
    document.getElementById('reels-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Advanced Filtering
  const filteredProducts = products.filter(product => {
    // 1. Category check
    if (selectedCategory === 'New Arrivals') {
      if (!product.isNewArrival) return false;
    } else if (selectedCategory === 'Bestsellers') {
      if (!product.isBestSeller) return false;
    } else if (selectedCategory !== 'All') {
      if (product.category !== selectedCategory) return false;
    }

    // 2. Search parameters check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchOrig = product.origin.toLowerCase().includes(q);
      const matchIngredients = product.ingredients.some(i => i.toLowerCase().includes(q));
      
      return matchName || matchBrand || matchDesc || matchOrig || matchIngredients;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col justify-between selection:bg-rose-100 select-none">
      
      {/* 1. ANNOUNCEMENT HEADER SLATE */}
      {!announcementClosed && (
        <div className="bg-rose-500 text-white py-2 px-4 text-center text-xs font-mono font-bold flex items-center justify-between transition-opacity max-w-full">
          <div className="flex-1 flex justify-center items-center gap-1.5 flex-wrap">
            <Gift className="w-4 h-4 animate-bounce shrink-0" />
            <span>🌟 EID & SPRING BEAUTY BOOM: Free bKash/Nagad transactions + ৳100 flat off inside Dhaka above ৳1,500! 🌟</span>
          </div>
          <button 
            onClick={() => setAnnouncementClosed(true)}
            className="text-white/80 hover:text-white font-sans cursor-pointer h-5 w-5 leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. NAVIGATION BAR SYSTEM */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        user={userProfile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAdvisor={() => setAdvisorOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        onScrollToFAQ={scrollToFAQ}
        onScrollToReels={scrollToReels}
      />

      {/* 3. HERO MARKETING BANNER BOARD */}
      {selectedCategory === 'All' && !searchQuery && (
        <HeroBanner 
          onOpenAdvisor={() => setAdvisorOpen(true)}
          onExploreProducts={scrollToProducts}
        />
      )}

      {/* Main Container structure */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10" id="catalog-grid">
        
        {/* Dynamic header detailing filter criteria */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-rose-50 pb-4 mb-8 text-left gap-4">
          <div>
            <h2 className="font-sans text-xl md:text-2xl font-black text-gray-950 tracking-tight">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Collection`}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Showing {filteredProducts.length} premium skincare cosmetics.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-450 text-gray-500">
            <span>Filter Criteria:</span>
            <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md uppercase">
              {selectedCategory}
            </span>
            {searchQuery && (
              <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                Search: {searchQuery}
              </span>
            )}
          </div>
        </div>

        {/* --- PRODUCTS GRID PANEL --- */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="h-16 w-16 bg-gray-50 border rounded-full flex items-center justify-center text-gray-400 mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-sans text-base font-bold text-gray-800">No products match your search</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                We couldn't find matches for "{searchQuery}". Try searching simple terms like "sunscreen", "toner", or click the category tabs above.
              </p>
            </div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full text-xs shadow-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                  onToggleWishlist={() => handleToggleWishlist(product)}
                  onAddToCart={() => handleAddToCart(product)}
                  onSelectProduct={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* --- REELS & VIDEO STORIES SECTION --- */}
        <ReelsSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* --- CLINICAL DERM TESTIMONIALS SLIDER --- */}
        <div className="py-16 bg-rose-50/5 border-b border-rose-50/50 text-left">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-rose-550 text-rose-600 font-bold tracking-widest uppercase">
                ★ Approved by Experts ★
              </span>
              <h2 className="font-sans text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Recommended by Dermatologists
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {homepageReviews.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 font-sans italic leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-gray-50 mt-6">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover shrink-0 border bg-rose-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans text-xs font-bold text-gray-900 leading-none">{item.name}</h4>
                      <span className="text-[10px] text-gray-400 font-mono mt-1 block">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- COMPREHENSIVE FAQS & HELPDESK --- */}
        <FAQSection />

      </main>

      {/* 4. MODERN TRUST FOOTER */}
      <footer className="bg-slate-900 text-gray-400 font-sans pt-16 pb-8 text-left border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo details */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-2xl font-black tracking-widest text-white">LANTANA</span>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                We are a Dhaka-based premium authentic source for pure Korean cosmetics and skincare formulation essentials, offering direct shipping, cash-on-delivery countrywide, and digital pay integrations.
              </p>

              {/* Payment badges */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono font-bold tracking-wide text-gray-500 block uppercase">We Securely Accept</span>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-sans font-bold bg-pink-700/30 text-pink-400 border border-pink-700 px-2.5 py-0.5 rounded-md">bKash</span>
                  <span className="text-[10px] font-sans font-bold bg-orange-650/30 bg-orange-700/30 text-orange-400 border border-orange-700 px-2.5 py-0.5 rounded-md">Nagad</span>
                  <span className="text-[10px] font-sans font-bold bg-slate-800 text-gray-300 border border-slate-700 px-2.5 py-0.5 rounded-md">Visa/Master</span>
                </div>
              </div>
            </div>

            {/* Shop Navigation links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product Collections</h4>
              <div className="flex flex-col gap-2.5 text-xs text-gray-400">
                <button onClick={() => { setSelectedCategory('Skincare'); scrollToProducts(); }} className="text-left hover:text-rose-400 cursor-pointer">Skincare & Ampoules</button>
                <button onClick={() => { setSelectedCategory('Makeup'); scrollToProducts(); }} className="text-left hover:text-rose-400 cursor-pointer">Korean Makeup Glow</button>
                <button onClick={() => { setSelectedCategory('New Arrivals'); scrollToProducts(); }} className="text-left hover:text-rose-400 cursor-pointer font-bold text-rose-400">★ New Arrivals</button>
                <button onClick={() => { setSelectedCategory('Bestsellers'); scrollToProducts(); }} className="text-left hover:text-rose-400 cursor-pointer">Weekly Best Sellers</button>
              </div>
            </div>

            {/* Company policy navigation links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Lantana Policies</h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToFAQ(); }} className="hover:text-rose-400">Guaranteed Authenticity</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToFAQ(); }} className="hover:text-rose-400">7-Day Allergies Match Return</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToFAQ(); }} className="hover:text-rose-400">Bangladesh Courier Delivery Map</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToFAQ(); }} className="hover:text-rose-400">Merchant Payment SSL Details</a>
              </div>
            </div>

            {/* Social handles & Dhaka contacts */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Social Marketing Hubs</h4>
              <p className="text-xs text-gray-400 leading-normal">
                Follow our Bangladeshi beauty page and groups for daily skincare updates, routines, and coupon keys!
              </p>
              
              <div className="flex flex-col gap-3 font-semibold text-xs">
                <a 
                  href="https://facebook.com/lantanabeauty.bd" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white text-rose-500 cursor-pointer transition-colors"
                >
                  <Facebook className="w-4.5 h-4.5 shrink-0" />
                  Lantana Beauty FB Page
                </a>
                <a 
                  href="https://instagram.com/lantanabeauty.bd" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white text-emerald-500 cursor-pointer transition-colors"
                >
                  <Instagram className="w-4.5 h-4.5 shrink-0" />
                  Lantana On Instagram
                </a>
              </div>
            </div>

          </div>

          {/* Slogan details and copyrights bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="font-mono text-gray-500 text-center sm:text-left">
              © 2026 LANTANA BEAUTY BANGLADESH. ALL RIGHTS RESERVED.
            </span>
            <span className="text-emerald-500/80 font-mono flex items-center gap-1.5 uppercase font-bold text-[10px]">
              <Sparkles className="w-3.5 h-3.5" /> Checked & Certified 100% Authentic Korean Import Agency
            </span>
          </div>

        </div>
      </footer>

      {/* --- DRAWERS & MODALS BACKDROP PORTALS --- */}
      <AnimatePresence>
        {/* Detail view Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
            onClose={() => setSelectedProduct(null)}
            onToggleWishlist={() => handleToggleWishlist(selectedProduct)}
            onAddToCart={() => handleAddToCart(selectedProduct)}
            onAddReview={handleAddReview}
          />
        )}

        {/* Shopping bag sliding Drawer */}
        <CartDrawer
          cart={cart}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleProceedCheckout}
        />

        {/* Wishlist sliding Drawer */}
        <WishlistDrawer
          wishlist={wishlist}
          isOpen={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          onSelectProduct={(p) => { setSelectedProduct(p); setWishlistOpen(false); }}
          onMoveToCart={handleMoveToCart}
          onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(w => w.id !== id))}
        />

        {/* Secure checkout process modal */}
        {checkoutOpen && (
          <CheckoutModal
            cart={cart}
            deliveryArea={checkoutArea}
            userEmail={userProfile.email}
            onClose={() => setCheckoutOpen(false)}
            onClearCart={handleClearCart}
          />
        )}

        {/* User profile details diagnostics modal */}
        {profileOpen && (
          <ProfileModal
            user={userProfile}
            isOpen={profileOpen}
            onClose={() => {
              setProfileOpen(false);
              // If cart is loaded and user finished registration, open checkout directly!
              if (userProfile.name && cart.length > 0) {
                setCheckoutOpen(true);
              }
            }}
            onLogin={handleLogin}
            onLogout={handleLogout}
            cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
            wishlistCount={wishlist.length}
          />
        )}
      </AnimatePresence>

      {/* --- INTERACTIVE AI SKINCARE CHAT ADVISOR WIDGET PANEL --- */}
      <AISkinAdvisor
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        userProfile={userProfile}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* FLOATING CHAT BALL ACTIVATOR (Persistent on screen) */}
      {!advisorOpen && (
        <button
          onClick={() => setAdvisorOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full text-white font-sans text-xs font-bold leading-none select-none shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all text-center"
          title="Consult AI K-Skin Expert!"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse shrink-0" />
          <span className="leading-tight text-left">
            K-Skin Expert<br/>
            <span className="text-[10px] text-emerald-100 font-normal">Active Advisor</span>
          </span>
        </button>
      )}

    </div>
  );
}
