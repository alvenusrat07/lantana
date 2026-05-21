import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';

interface HeroBannerProps {
  onOpenAdvisor: () => void;
  onExploreProducts: () => void;
}

export default function HeroBanner({ onOpenAdvisor, onExploreProducts }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F2F1ED]/60 via-[#F2F1ED]/30 to-[#FAF9F6] py-12 md:py-20 border-b border-natural-beige">
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-natural-sage/5 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-natural-beige/30 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text copy content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-natural-beige text-natural-sage font-sans text-[10px] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Korean Glass Skin Secrets
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-natural-charcoal tracking-tight leading-[1.08]">
              Your Gateway to <br/>
              <span className="italic text-natural-sage">
                Luminous Korean Skin
              </span>
            </h1>

            <p className="font-sans text-base md:text-lg text-natural-taupe max-w-xl leading-relaxed">
              Lantana exclusively imports premium, 100% authentic South Korean skincare and global beauty innovations tailored to defend your skin from Dhaka's harsh humidity and dust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary Call to Action */}
              <button
                id="hero-explore-btn"
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-natural-sage text-white font-serif uppercase tracking-widest text-[11px] font-bold hover:bg-natural-sage-dark transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-natural-sage/20 cursor-pointer"
              >
                Shop New Arrivals
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Call to Action (AI skin care advisor) */}
              <button
                id="hero-advisor-btn"
                onClick={onOpenAdvisor}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-natural-beige text-natural-sage font-serif uppercase tracking-widest text-[11px] font-bold hover:bg-[#FAF9F6] hover:border-natural-sage transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4.5 h-4.5 text-natural-sage animate-pulse" />
                Analyze Skin with AI
              </button>
            </div>

            {/* Core Badges of trust */}
            <div className="grid grid-cols-3 gap-4 pt-6 w-full max-w-md border-t border-natural-beige">
              <div className="flex flex-col items-start">
                <span className="font-sans text-xl font-bold text-natural-sage">100%</span>
                <span className="text-[11px] font-medium text-natural-taupe uppercase tracking-wider">Authentic Source</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-sans text-xl font-bold text-natural-sage">1-Day</span>
                <span className="text-[11px] font-medium text-natural-taupe uppercase tracking-wider">Dhaka Delivery</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-sans text-xl font-bold text-natural-sage">bKash</span>
                <span className="text-[11px] font-medium text-natural-taupe uppercase tracking-wider">Secure Wallets</span>
              </div>
            </div>
          </div>

          {/* Banner visual showcasing New Arrivals / Skin glass aesthetics */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden bg-natural-cream shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=700" 
                alt="Premium Skincare Products"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
              
              {/* Product floating banner tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-natural-beige shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-natural-sage font-bold block uppercase tracking-wider">Weekly Best Pick</span>
                  <span className="font-serif text-sm font-bold text-natural-charcoal block mt-0.5">Beauty of Joseon Sun Relief</span>
                  <span className="font-mono text-xs font-semibold text-natural-sage mt-1 block">1,450 BDT</span>
                </div>
                <span className="px-3 py-1 bg-natural-sage text-white font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">
                  New Arrival
                </span>
               </div>
            </div>

            {/* Glowing highlight bubble */}
            <div className="absolute -top-4 -right-4 h-14 w-14 rounded-full bg-natural-sage flex items-center justify-center text-white text-xs font-serif font-bold leading-none select-none shadow-lg animate-bounce uppercase tracking-wide">
              New
            </div>
          </div>

        </div>

        {/* Brand Promise Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-natural-beige text-left">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white border border-natural-beige rounded-xl text-natural-sage">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-natural-charcoal">Guaranteed Authenticity</h4>
              <p className="text-xs text-natural-taupe mt-0.5">Direct dual-barcode check sourced from Seoul HQ.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white border border-natural-beige rounded-xl text-natural-sage">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-natural-charcoal">Dhaka & Country Delivery</h4>
              <p className="text-xs text-natural-taupe mt-0.5">1-day Dhaka delivery, reliable cash payments.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white border border-natural-beige rounded-xl text-natural-sage">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-natural-charcoal">7-Day Return Scheme</h4>
              <p className="text-xs text-natural-taupe mt-0.5">Skin sensitivity exchange policy with rapid response.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white border border-natural-beige rounded-xl text-natural-sage font-bold">
              <Zap className="w-5 h-5 text-natural-sage" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-natural-charcoal">Secure digital pay</h4>
              <p className="text-xs text-natural-taupe mt-0.5">One-click secure bKash, Nagad payment gateway.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
