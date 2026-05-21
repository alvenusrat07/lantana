import { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Sun, Sparkles, Menu, X, Landmark, Compass } from 'lucide-react';
import { CartItem, Product, UserProfile } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlist: Product[];
  user: UserProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdvisor: () => void;
  onOpenProfile: () => void;
  onScrollToFAQ: () => void;
  onScrollToReels: () => void;
}

export default function Navbar({
  cart,
  wishlist,
  user,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenAdvisor,
  onOpenProfile,
  onScrollToFAQ,
  onScrollToReels
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const categories = ['All', 'Skincare', 'Makeup', 'New Arrivals', 'Bestsellers'];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-natural-beige shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="flex flex-col items-start cursor-pointer text-left focus:outline-hidden"
              id="navbar-logo-btn"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-widest text-natural-sage italic">LANTANA</span>
                <span className="h-1.5 w-1.5 rounded-full bg-natural-sage animate-pulse"></span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-natural-taupe leading-none">K-BEAUTY & MORE</span>
            </button>
          </div>

          {/* Large Screen: Interactive Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                id="search-input-desktop"
                type="text"
                placeholder="Search Korean sunscreen, snail mucin, toner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F2F1ED] hover:bg-natural-beige/40 focus:bg-white text-natural-charcoal placeholder-natural-taupe/80 text-sm rounded-full pl-10 pr-4 py-2.5 border-none focus:ring-1 ring-natural-sage focus:outline-hidden transition-all duration-200 outline-none"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-natural-taupe pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-xs text-natural-taupe hover:text-natural-charcoal font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Icons & Account Control */}
          <div className="hidden md:flex items-center gap-5">
            {/* AI Advisor Tag Banner */}
            <button
              id="navbar-ai-advisor-btn"
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-natural-sage text-white font-serif uppercase tracking-widest text-[11px] font-bold hover:bg-natural-sage-dark hover:shadow-lg hover:shadow-natural-sage/20 transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              AI Skin Advisor
            </button>

            {/* Quick Scrolls */}
            <button 
              onClick={onScrollToReels}
              className="text-natural-charcoal hover:text-natural-sage text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              Reels
            </button>
            <button 
              onClick={onScrollToFAQ}
              className="text-natural-charcoal hover:text-natural-sage text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer animate-none"
            >
              FAQs
            </button>

            {/* Wishlist */}
            <button
              id="navbar-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-natural-charcoal hover:text-natural-sage transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className={`w-5.5 h-5.5 ${wishlistCount > 0 ? 'fill-natural-sage text-natural-sage' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-natural-sage text-[9px] font-bold text-white ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              id="navbar-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-natural-charcoal hover:text-natural-sage transition-colors cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5 text-natural-charcoal hover:text-natural-sage transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#5A5A40] text-[9px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile / Account state */}
            <button
              id="navbar-profile-btn"
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-natural-beige hover:border-natural-sage bg-[#FAF9F6] hover:bg-natural-cream transition-all cursor-pointer text-left"
            >
              <div className="h-6.5 w-6.5 rounded-full bg-natural-beige flex items-center justify-center text-xs font-bold text-natural-sage uppercase">
                {user.isLoggedIn ? user.name.charAt(0) : <User className="w-3.5 h-3.5 text-natural-sage" />}
              </div>
              <div className="flex flex-col text-[10px] font-medium text-natural-charcoal leading-none">
                <span>{user.isLoggedIn ? 'A/C: ' + user.name.split(' ')[0] : 'Log In'}</span>
                {user.isLoggedIn && user.skinType && (
                  <span className="text-[9px] text-natural-sage mt-0.5">{user.skinType} Skin</span>
                )}
              </div>
            </button>
          </div>

          {/* Mobile hamburger & Action */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenAdvisor}
              className="p-1.5 rounded-full bg-natural-cream text-natural-sage hover:bg-natural-beige"
              title="AI Advisor"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenCart}
              className="relative p-2 text-natural-charcoal"
            >
              <ShoppingBag className="w-6 h-6 animate-none" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-natural-sage text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-natural-charcoal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-t border-natural-beige shadow-lg px-4 pt-2 pb-6 space-y-4">
          {/* Mobile Search */}
          <div className="relative w-full mt-1">
            <input
              id="search-input-mobile"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F2F1ED] text-natural-charcoal placeholder-natural-taupe text-sm rounded-full pl-9 pr-4 py-2 border border-natural-beige focus:outline-hidden"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-natural-taupe" />
          </div>

          {/* Quick Categories list in mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-natural-sage text-white font-medium' 
                    : 'bg-[#F2F1ED] text-natural-taupe hover:bg-natural-beige border border-natural-beige/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-natural-beige bg-natural-cream/30 text-xs font-semibold text-natural-charcoal hover:bg-natural-cream"
            >
              <User className="w-4 h-4 text-natural-sage" />
              {user.isLoggedIn ? 'My Account' : 'Log In Profile'}
            </button>
            <button
              onClick={() => { onOpenWishlist(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-natural-beige bg-natural-cream/30 text-xs font-semibold text-natural-charcoal uppercase tracking-wider font-serif"
            >
              <Heart className="w-4 h-4 text-natural-sage" />
              Wishlist ({wishlistCount})
            </button>
          </div>

          <div className="space-y-2 pt-2 border-t border-natural-beige">
            <button
              onClick={() => { onOpenAdvisor(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-natural-sage text-white text-xs font-semibold shadow-md font-serif uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Talk to AI Skin Care Expert
            </button>

            <button
              onClick={() => { onScrollToReels(); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-xs font-bold text-natural-charcoal hover:bg-natural-cream rounded-md"
            >
              🎥 Short Video Reels Section
            </button>

            <button
              onClick={() => { onScrollToFAQ(); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-xs font-bold text-natural-charcoal hover:bg-natural-cream rounded-md"
            >
              ❓ Frequently Asked Questions (FAQ)
            </button>
          </div>
        </div>
      )}

      {/* Sub-header Categories navigation for Desktop */}
      <div className="hidden md:block border-t border-natural-beige bg-natural-base py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-1.5 rounded-full mr-2 hover:bg-natural-beige transition-colors uppercase font-sans tracking-wide cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-natural-sage text-white hover:bg-natural-sage font-bold' 
                    : 'text-natural-taupe hover:text-natural-sage font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider font-mono font-bold text-natural-sage">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              100% SECURE CHECKOUT (bKash, Nagad, Cards)
            </span>
            <span className="text-natural-taupe/50">•</span>
            <span>OFFICIAL KOREAN SKINCARE SOURCE</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
