import React, { useState } from 'react';
import { X, User, Sparkles, LogOut, Check, Heart, ShoppingBag } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (profile: UserProfile) => void;
  onLogout: () => void;
  cartCount: number;
  wishlistCount: number;
}

export default function ProfileModal({
  user,
  isOpen,
  onClose,
  onLogin,
  onLogout,
  cartCount,
  wishlistCount
}: ProfileModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skinType, setSkinType] = useState<'Oily' | 'Dry' | 'Combination' | 'Normal' | 'Sensitive'>('Combination');
  
  // Concerns multi-select
  const [concerns, setConcerns] = useState<string[]>([]);
  const potentialConcerns = ['Acne & Breakouts', 'Dullness & Dark spots', 'Uneven Skin Tone', 'Large Pores', 'Redness/Sensitivity', 'Fine Lines & Aging'];

  const toggleConcern = (concern: string) => {
    setConcerns(prev => 
      prev.includes(concern) 
        ? prev.filter(c => c !== concern) 
        : [...prev, concern]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onLogin({
      name,
      email,
      phone,
      skinType,
      skinConcerns: concerns,
      isLoggedIn: true
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-natural-charcoal/70 backdrop-blur-xs text-left">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#FAF9F6] rounded-3xl shadow-2xl overflow-hidden animate-scale text-left border border-natural-beige">
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-natural-cream text-natural-taupe hover:text-natural-charcoal cursor-pointer absolute top-4 right-4 z-10"
        >
          <X className="w-5.5 h-5.5" />
        </button>

        {user.isLoggedIn ? (
          /* --- LOGGED IN USER STATE DASHBOARD --- */
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-natural-cream flex items-center justify-center text-xl font-bold text-natural-sage uppercase ring-4 ring-natural-cream/50">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-natural-charcoal leading-none">{user.name}</h3>
                <span className="text-xs text-natural-taupe font-mono block mt-1.5">{user.email}</span>
                <span className="text-xs text-natural-taupe font-mono block mt-0.5">{user.phone || 'No phone registered'}</span>
              </div>
            </div>

            {/* Skin Care diagnostics summary stats card */}
            <div className="bg-white rounded-2xl border border-natural-beige/45 p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase text-natural-sage tracking-wider font-sans">Registered Skin Chemistry</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-natural-taupe font-medium">Diagnosed Skin Type:</span>
                  <span className="font-extrabold text-natural-sage uppercase bg-natural-cream border border-natural-beige/50 px-2.5 py-0.5 rounded-md font-mono text-[10px]">
                    {user.skinType} Skin
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <span className="text-natural-taupe font-medium block">Tracked Skin Concerns:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {user.skinConcerns && user.skinConcerns.length > 0 ? (
                      user.skinConcerns.map((c) => (
                        <span key={c} className="px-2 py-0.5 bg-[#FAF9F6] border border-natural-beige/55 rounded-md text-[10px] text-natural-charcoal leading-normal font-sans">
                          {c}
                        </span>
                      ))
                    ) : (
                      <span className="text-natural-taupe italic font-medium">General skin glow grooming</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick shopping activity logs */}
            <div className="grid grid-cols-2 gap-4 text-center font-sans">
              <div className="p-3.5 bg-white border border-natural-beige/40 rounded-2xl">
                <Heart className="w-5 h-5 text-natural-sage fill-natural-sage mx-auto" />
                <span className="text-xs text-natural-taupe block mt-1.5 font-medium">Saved Items</span>
                <span className="font-mono text-xs font-bold text-natural-charcoal mt-1 block">{wishlistCount} Products</span>
              </div>

              <div className="p-3.5 bg-white border border-natural-beige/40 rounded-2xl">
                <ShoppingBag className="w-5 h-5 text-natural-charcoal mx-auto" />
                <span className="text-xs text-natural-taupe block mt-1.5 font-medium">Bag Items</span>
                <span className="font-mono text-xs font-bold text-natural-charcoal mt-1 block">{cartCount} Items</span>
              </div>
            </div>

            <button
              onClick={() => { onLogout(); onClose(); }}
              className="w-full py-3.5 bg-white hover:bg-natural-cream text-natural-charcoal border border-natural-beige font-sans text-xs font-bold rounded-full flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-200 uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4 text-natural-taupe" />
              Sign Out from Lantana
            </button>
          </div>
        ) : (
          /* --- DIRECT REGISTRATION / LOG IN FORM --- */
          <div className="p-6 md:p-8 space-y-5">
            <div>
              <h3 className="font-serif text-xl font-bold text-natural-charcoal">Sign Up / Profile Log In</h3>
              <p className="text-xs text-natural-taupe mt-1 leading-relaxed">
                Unlock custom skincare recommendations. Your input diagnostic profile will be analysed by our Gemini AI skincare engine.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-[10px] font-bold text-natural-taupe uppercase">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alvi Shaba"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-natural-taupe uppercase">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="alvi.shaba@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-natural-taupe uppercase">Phone Number</label>
                  <input
                    required
                    type="tel"
                    maxLength={11}
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70 font-sans"
                  />
                </div>
              </div>

              {/* Skin Type selector */}
              <div>
                <label className="block text-[10px] font-bold text-natural-taupe uppercase">Select Your Skin Type</label>
                <div className="grid grid-cols-3 gap-1.5 mt-1 font-sans">
                  {(['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSkinType(type)}
                      className={`py-2.5 px-1 text-center rounded-lg border text-xs font-sans transition-colors cursor-pointer leading-none ${
                        skinType === type
                          ? 'border-natural-sage bg-natural-cream text-natural-sage font-bold'
                          : 'border-natural-beige hover:bg-natural-cream text-natural-taupe bg-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Concerns multiselect */}
              <div>
                <label className="block text-[10px] font-bold text-natural-taupe uppercase">Skincare Concerns (Select Multi)</label>
                <div className="flex flex-wrap gap-1.5 mt-2 font-sans">
                  {potentialConcerns.map((item) => {
                    const isSelected = concerns.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleConcern(item)}
                        className={`px-3 py-2 rounded-full text-[10px] font-sans border transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected 
                            ? 'bg-natural-cream border-natural-sage text-natural-sage font-bold' 
                            : 'bg-white border-natural-beige text-natural-taupe hover:bg-natural-cream'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-natural-sage shrink-0" />}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                id="profile-register-submit-btn"
                className="w-full py-3.5 bg-natural-sage hover:bg-natural-sage-dark text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-md mt-2 flex items-center justify-center gap-1.5 uppercase font-sans tracking-wider"
              >
                <Sparkles className="w-4 h-4 animate-pulse text-white" />
                Register Diagnostic Profile
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
