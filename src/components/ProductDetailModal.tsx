import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, CheckCircle, Award, Compass, MessageSquare, Plus } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailModalProps {
  product: Product;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onAddReview: (productId: string, review: Review) => void;
}

export default function ProductDetailModal({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onAddReview
}: ProductDetailModalProps) {
  // New review state
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [skinType, setSkinType] = useState('Combination');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: 'r_new_' + Date.now(),
      userName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      skinType,
      verified: true
    };

    onAddReview(product.id, newReview);
    setUserName('');
    setComment('');
    setRating(5);
    setSuccessMessage('Thank you! Your verified review has been published.');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-natural-charcoal/70 backdrop-blur-xs overflow-y-auto text-left">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-3xl shadow-2xl overflow-hidden my-8 animate-scale border border-natural-beige">
        
        {/* Close Button Header */}
        <div className="absolute top-4 right-4 z-10 font-sans">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white text-natural-taupe hover:text-natural-charcoal shadow-sm border border-natural-beige/60 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visuals & Fast action */}
          <div className="p-6 md:p-8 bg-[#FAF9F6] border-r border-natural-beige flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Image Preview Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-natural-beige shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro origin tag inside details image */}
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-natural-charcoal border border-natural-beige shadow-xs">
                  Imported from <span className="text-natural-sage font-serif italic">{product.origin}</span>
                </div>
              </div>

              {/* Badges metadata */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-natural-sage block uppercase leading-none">
                  {product.brand} Beauty Brand
                </span>
                <h1 className="font-serif text-xl md:text-2xl font-bold text-natural-charcoal mt-2 leading-tight">
                  {product.name}
                </h1>
                
                {/* Aggregate Star statistics */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-natural-beige'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-natural-charcoal font-semibold">{product.rating} / 5.0</span>
                  <span className="text-xs text-natural-taupe font-sans font-medium">({product.reviews.length} reviews)</span>
                </div>
              </div>

              {/* Benefits layout list */}
              <div className="p-4 bg-white rounded-2xl border border-natural-beige/45">
                <h4 className="text-xs font-bold uppercase text-natural-taupe font-sans tracking-wider">Product Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {product.benefits.map((benefit, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 text-xs text-natural-charcoal font-medium leading-normal">
                      <CheckCircle className="w-3.5 h-3.5 text-natural-sage shrink-0" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Pricing Checkout section */}
            <div className="mt-8 pt-6 border-t border-natural-beige space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-sans font-medium text-natural-taupe">Retail Price</span>
                <span className="font-mono text-2xl font-bold text-natural-charcoal">
                  ৳ {product.price.toLocaleString()} BDT
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-natural-sage hover:bg-natural-sage-dark text-white font-sans text-xs uppercase tracking-wider font-bold rounded-full cursor-pointer shadow-md transition-all active:scale-95 duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  onClick={onToggleWishlist}
                  className={`p-3 rounded-full border transition-all cursor-pointer ${
                    isWishlisted 
                    ? 'border-natural-beige bg-natural-cream text-natural-sage' 
                    : 'border-natural-beige hover:border-natural-sage hover:bg-natural-cream text-natural-taupe'
                  }`}
                  title="Bookmark to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-natural-sage text-natural-sage' : ''}`} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Detailed info & Dynamic reviews posting */}
          <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto bg-white">
            
            {/* Descriptive Content */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-natural-charcoal border-b border-natural-beige pb-1 font-sans tracking-wide">Product Formulation</h3>
              <p className="text-sm text-natural-charcoal leading-relaxed mt-2" id="prod-formulation-desc">
                {product.detailedDescription}
              </p>
            </div>

            {/* Core Usage Details */}
            <div className="space-y-4 bg-[#FAF9F6] p-4 rounded-2xl border border-natural-beige">
              {/* How to use */}
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-natural-charcoal uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-natural-sage" /> Method of Use
                </span>
                <p className="text-xs text-natural-taupe mt-1.5 leading-relaxed">{product.howToUse}</p>
              </div>

              {/* Skin Type Compatibility */}
              <div className="pt-3 border-t border-natural-beige flex items-center justify-between">
                <span className="text-xs font-bold text-natural-charcoal uppercase tracking-wider">Best Suited Skin Type</span>
                <div className="flex gap-1.5 flex-wrap">
                  {product.skinTypeSuitability.map((st) => (
                    <span key={st} className="px-2.5 py-1 rounded-full bg-natural-cream text-natural-sage border border-natural-beige/60 font-sans font-bold text-[10px]">
                      {st} Skin
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ingredients table / block */}
            <div>
              <h3 className="text-xs font-bold uppercase text-natural-charcoal border-b border-natural-beige pb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-natural-sage" /> Key Ingredients
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {product.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-natural-beige rounded-xl text-xs font-medium text-natural-charcoal shadow-xs font-sans">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Active Reviews section */}
            <div className="space-y-4 pt-4 border-t border-natural-beige">
              <h3 className="text-sm font-bold uppercase text-natural-charcoal flex items-center gap-1.5 font-serif">
                <MessageSquare className="w-4.5 h-4.5 text-natural-sage" /> Customer Reviews
              </h3>

              <div className="space-y-3.5">
                {product.reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-[#FAF9F6] rounded-2xl border border-natural-beige/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-natural-charcoal font-serif">{r.userName}</span>
                        {r.skinType && (
                          <span className="px-2 py-0.5 rounded-sm bg-natural-cream text-natural-sage text-[9px] font-mono font-bold">
                            {r.skinType} Skin
                          </span>
                        )}
                        {r.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-natural-sage bg-natural-cream border border-natural-beige/40 px-1 py-0.5 rounded-xs">
                            <CheckCircle className="w-2.5 h-2.5 fill-natural-sage text-white shrink-0" /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-natural-taupe font-mono">{r.date}</span>
                    </div>

                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-amber-500 text-amber-500' : 'text-natural-beige'}`} />
                      ))}
                    </div>

                    <p className="text-xs text-natural-charcoal leading-relaxed font-sans italic">
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Leave a review box */}
              <form onSubmit={submitReview} className="p-4 md:p-5 bg-[#FAF9F6] rounded-2xl border border-natural-beige space-y-3.5 mt-6 shadow-xs font-sans">
                <h4 className="text-xs font-bold uppercase text-natural-sage flex items-center gap-1 font-serif">
                  <Plus className="w-3.5 h-3.5" /> Leave your verified review
                </h4>

                {successMessage && (
                  <p className="text-xs font-bold text-natural-sage bg-natural-cream border border-natural-beige rounded-xl p-3 animate-pulse font-sans">
                    {successMessage}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Your Name</label>
                    <input
                      required
                      type="text"
                      id="review-form-name"
                      placeholder="e.g. Alvi Shaba"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-white text-xs text-natural-charcoal rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 font-sans"
                    />
                  </div>

                  {/* Skin characteristics */}
                  <div>
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Your Skin Type</label>
                    <select
                      value={skinType}
                      id="review-form-skintype"
                      onChange={(e) => setSkinType(e.target.value)}
                      className="w-full bg-white text-xs text-natural-charcoal rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 font-sans cursor-pointer"
                    >
                      <option value="Dry">Dry Skin</option>
                      <option value="Oily">Oily Skin</option>
                      <option value="Sensitive">Sensitive Skin</option>
                      <option value="Combination">Combination Skin</option>
                      <option value="Normal">Normal Skin</option>
                    </select>
                  </div>
                </div>

                {/* Rating selection stars */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-natural-taupe uppercase">Product Rating</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="p-1 text-natural-beige hover:text-amber-500 hover:scale-110 active:scale-95 transition-transform duration-100"
                      >
                        <Star className={`w-4.5 h-4.5 ${starVal <= rating ? 'fill-amber-500 text-amber-500' : 'text-natural-beige'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-[10px] font-bold text-natural-taupe uppercase">Your Experience</label>
                  <textarea
                    required
                    rows={2}
                    id="review-form-comment"
                    placeholder="Tell other shoppers in Bangladesh about your experience, hydration level, fragrance..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white text-xs text-natural-charcoal rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 font-sans"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  id="review-form-submit-btn"
                  className="w-full py-3.5 bg-natural-sage hover:bg-natural-sage-dark text-white font-sans text-xs uppercase tracking-wider font-bold rounded-full cursor-pointer shadow-md transition-colors leading-none"
                >
                  Post Review
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
