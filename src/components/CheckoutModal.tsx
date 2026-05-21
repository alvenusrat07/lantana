import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Ticket, Landmark, CreditCard, Smartphone, Check, ArrowRight, Loader } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  cart: CartItem[];
  deliveryArea: 'inside' | 'outside';
  userEmail: string;
  onClose: () => void;
  onClearCart: () => void;
}

type PaymentMethodType = 'card' | 'bkash' | 'nagad' | 'net_banking';

export default function CheckoutModal({
  cart,
  deliveryArea,
  userEmail,
  onClose,
  onClearCart
}: CheckoutModalProps) {
  const [step, setStep] = useState<'info' | 'payment_bKash_Nagad' | 'payment_card' | 'processing' | 'success'>('info');

  // Customer billing details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('bkash');

  // MFS (bKash/Nagad) simulated authentication state
  const [mfsNumber, setMfsNumber] = useState('');
  const [mfsOtp, setMfsOtp] = useState('');
  const [mfsPin, setMfsPin] = useState('');
  const [mfsStep, setMfsStep] = useState<'phone' | 'otp' | 'pin'>('phone');
  const [otpSentCode, setOtpSentCode] = useState('189547');

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Cost variables
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryCharge = deliveryArea === 'inside' ? 80 : 150;
  const grandTotal = subtotal + deliveryCharge;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'bkash' || paymentMethod === 'nagad') {
      setStep('payment_bKash_Nagad');
      setMfsStep('phone');
      setMfsOtp('');
      setMfsPin('');
    } else {
      setStep('payment_card');
    }
  };

  const handleMfsPhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfsNumber.length < 11) return;
    setMfsStep('otp');
  };

  const handleMfsOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfsOtp.length < 4) return;
    setMfsStep('pin');
  };

  const handleMfsPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfsPin.length < 4) return;
    triggerProcessing();
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerProcessing();
  };

  const triggerProcessing = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onClearCart();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-natural-charcoal/70 backdrop-blur-xs overflow-y-auto text-left">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-3xl shadow-2xl overflow-hidden animate-scale my-8 border border-natural-beige">
        
        {/* Close Button Header */}
        {step !== 'processing' && step !== 'success' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full hover:bg-natural-cream text-natural-taupe hover:text-natural-charcoal cursor-pointer"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        )}

        {/* Outer Grid wrap */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Main Workspace Frame (Col-span 7) */}
          <div className="md:col-span-7 p-6 md:p-8 text-left space-y-6 bg-white">
            
            {/* Steps indicator banner */}
            {step !== 'success' && step !== 'processing' && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans bg-natural-cream text-natural-sage px-2.5 py-1 rounded-md font-bold tracking-widest uppercase border border-natural-beige/40">
                  LAN-SECURE SSL v4
                </span>
                <span className="text-natural-beige">•</span>
                <span className="text-xs text-natural-taupe font-sans font-medium">Safe Sandbox Gateway</span>
              </div>
            )}

            {/* --- STEP 1: INFO --- */}
            {step === 'info' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-natural-charcoal">Checkout Delivery Info</h3>
                  <p className="text-xs text-natural-taupe mt-1">Provide your delivery address in Bangladesh and choose payment method.</p>
                </div>

                <form onSubmit={handleInfoSubmit} className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Receiver's Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alvi Shaba"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAF9F6] text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Contact Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 017XXXXXXXX"
                      maxLength={11}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#FAF9F6] text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Delivery Address (Bangladesh)</label>
                    <textarea
                      required
                      placeholder="e.g. House 45, Road 12, Banani, Dhaka"
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-[#FAF9F6] text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70 font-sans"
                    />
                  </div>

                  {/* Payment Methods Selector Grid */}
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Select Payment Channel</label>
                    <div className="grid grid-cols-2 gap-2 mt-1 font-sans">
                      
                      {/* bKash */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'bkash' 
                          ? 'border-pink-500 bg-pink-50/10 ring-2 ring-pink-400/30' 
                          : 'border-natural-beige hover:bg-natural-cream'
                        }`}
                      >
                        <div className="h-6 w-6 rounded-md bg-[#D12053] text-white font-mono text-[9px] font-extrabold flex items-center justify-center">bk</div>
                        <div className="text-left text-xs leading-none">
                          <span className="font-bold block text-natural-charcoal">bKash</span>
                          <span className="text-[9px] text-natural-taupe mt-0.5 block">Mobile Wallet</span>
                        </div>
                      </button>

                      {/* Nagad */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('nagad')}
                        className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'nagad' 
                          ? 'border-orange-500 bg-orange-50/10 ring-2 ring-orange-400/30' 
                          : 'border-natural-beige hover:bg-natural-cream'
                        }`}
                      >
                        <div className="h-6 w-6 rounded-md bg-[#EF5A24] text-white font-mono text-[9px] font-extrabold flex items-center justify-center">ng</div>
                        <div className="text-left text-xs leading-none">
                          <span className="font-bold block text-natural-charcoal">Nagad</span>
                          <span className="text-[9px] text-natural-taupe mt-0.5 block">Mobile Wallet</span>
                        </div>
                      </button>

                      {/* Credit Cards */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'card' 
                          ? 'border-natural-sage bg-natural-cream ring-2 ring-natural-sage/30' 
                          : 'border-natural-beige hover:bg-natural-cream'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-natural-sage" />
                        <div className="text-left text-xs leading-none font-sans">
                          <span className="font-bold block text-natural-charcoal">Cards</span>
                          <span className="text-[9px] text-natural-taupe mt-0.5 block">Visa/Master/Card</span>
                        </div>
                      </button>

                      {/* Net Banking */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('net_banking')}
                        className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'net_banking' 
                          ? 'border-natural-sage bg-natural-cream ring-2 ring-natural-sage/30' 
                          : 'border-natural-beige hover:bg-natural-cream'
                        }`}
                      >
                        <Landmark className="w-5 h-5 text-natural-sage" />
                        <div className="text-left text-xs leading-none font-sans">
                          <span className="font-bold block text-natural-charcoal">Net Banking</span>
                          <span className="text-[9px] text-natural-taupe mt-0.5 block">Direct bank portal</span>
                        </div>
                      </button>

                    </div>
                  </div>

                  <button
                    type="submit"
                    id="checkout-next-payment-btn"
                    className="w-full py-3.5 bg-natural-sage hover:bg-natural-sage-dark text-white font-sans text-xs uppercase tracking-wider font-bold rounded-full cursor-pointer shadow-md mt-4 transition-all flex items-center justify-center gap-1.5 active:scale-95 duration-200"
                  >
                    Proceed to Payment Protocol
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* --- STEP 2A: bKash / Nagad WIDGET PORTAL SIMULATOR --- */}
            {step === 'payment_bKash_Nagad' && (
              <div className="space-y-4">
                
                {/* Simulated payment gateway interface header */}
                <div className={`p-4 rounded-2xl text-white ${paymentMethod === 'bkash' ? 'bg-[#D12053]' : 'bg-[#EF5A24]'} text-center space-y-1 relative shadow-inner`}>
                  <h4 className="font-serif text-lg font-bold tracking-wider">{paymentMethod === 'bkash' ? 'bKash Checkout' : 'Nagad Checkout'}</h4>
                  <p className="text-[10px] opacity-90 font-mono">Merchant: LANTANA BEAUTY LTD</p>
                  <p className="font-mono text-base font-extrabold pt-1">৳ {grandTotal.toLocaleString()} BDT</p>
                </div>

                {/* Sub-step A: Phone Number verification */}
                {mfsStep === 'phone' && (
                  <form onSubmit={handleMfsPhoneSubmit} className="space-y-4">
                    <p className="text-xs text-natural-taupe font-sans leading-relaxed text-center">
                      Enter your {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} account number to receive a secure SMS validation code.
                    </p>
                    <div>
                      <label className="block text-[9px] font-bold text-natural-taupe uppercase tracking-widest text-center">{paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Mobile Number</label>
                      <input
                        required
                        type="tel"
                        maxLength={11}
                        placeholder="e.g. 017XXXXXXXX"
                        value={mfsNumber}
                        id="mfs-payment-phone"
                        onChange={(e) => setMfsNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center text-lg font-mono tracking-widest rounded-xl p-3.5 border border-natural-beige bg-[#FAF9F6] text-natural-charcoal focus:outline-hidden focus:border-natural-sage mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStep('info')}
                        className="flex-1 py-3 border border-natural-beige hover:bg-natural-cream rounded-xl text-xs font-bold text-natural-taupe cursor-pointer font-sans"
                      >
                        Go Back
                      </button>
                      <button
                        type="submit"
                        id="mfs-phone-submit-btn"
                        className="flex-1 py-3 text-white bg-natural-sage hover:bg-natural-sage-dark rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 font-sans uppercase tracking-wide"
                      >
                        Send Verification Code
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-step B: OTP code entry simulator */}
                {mfsStep === 'otp' && (
                  <form onSubmit={handleMfsOtpSubmit} className="space-y-4">
                    <div className="bg-natural-cream text-natural-sage text-[11px] p-2.5 rounded-lg border border-natural-beige text-center animate-pulse font-mono">
                      Simulated SMS received! Validation Code is <strong className="font-mono text-sm underline">{otpSentCode}</strong>
                    </div>

                    <p className="text-xs text-natural-taupe text-center">
                      We have sent a verification code to your billing number. Enter the code below or click autofill.
                    </p>

                    <div>
                      <label className="block text-[9px] font-bold text-natural-taupe uppercase tracking-widest text-center">Verification Code (OTP)</label>
                      <div className="flex gap-2 justify-center items-center mt-1">
                        <input
                          required
                          type="text"
                          maxLength={6}
                          placeholder="XXXXXX"
                          value={mfsOtp}
                          id="mfs-payment-otp"
                          onChange={(e) => setMfsOtp(e.target.value.replace(/\D/g, ''))}
                          className="w-40 text-center text-lg font-mono tracking-widest rounded-xl p-3 border border-natural-beige bg-[#FAF9F6] text-natural-charcoal focus:outline-hidden focus:border-natural-sage"
                        />
                        <button
                          type="button"
                          onClick={() => setMfsOtp(otpSentCode)}
                          className="px-3.5 py-2.5 bg-natural-cream text-natural-sage text-[10px] font-sans font-bold rounded-xl cursor-pointer hover:bg-natural-cream/80 border border-natural-beige"
                        >
                          Autofill OTP
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setMfsStep('phone')}
                        className="flex-1 py-3 border border-natural-beige rounded-xl text-xs font-bold text-natural-taupe cursor-pointer"
                      >
                        Resend Code
                      </button>
                      <button
                        type="submit"
                        id="mfs-otp-submit-btn"
                        className="flex-1 py-3 text-white bg-natural-sage hover:bg-natural-sage-dark rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Verify OTP Code
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-step C: PIN number lock simulator */}
                {mfsStep === 'pin' && (
                  <form onSubmit={handleMfsPinSubmit} className="space-y-4">
                    <p className="text-xs text-natural-taupe text-center leading-normal">
                      Security Verification successful. Enter your {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} 4-digit or 5-digit wallet PIN number to authorize.
                    </p>
                    <div>
                      <label className="block text-[9px] font-bold text-natural-taupe uppercase tracking-widest text-center animate-pulse">Enter PIN Number</label>
                      <div className="flex justify-center mt-1">
                        <input
                          required
                          type="password"
                          maxLength={5}
                          placeholder="•••••"
                          value={mfsPin}
                          id="mfs-payment-pin"
                          onChange={(e) => setMfsPin(e.target.value.replace(/\D/g, ''))}
                          className="w-36 text-center text-lg font-mono tracking-widest rounded-xl p-3 border border-natural-beige bg-[#FAF9F6] focus:outline-hidden focus:border-natural-sage text-natural-charcoal"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setMfsStep('otp')}
                        className="flex-1 py-3 border border-natural-beige rounded-xl text-xs font-bold text-natural-taupe cursor-pointer"
                      >
                        Go Back
                      </button>
                      <button
                        type="submit"
                        id="mfs-pin-submit-btn"
                        className="flex-1 py-3 text-white bg-natural-sage hover:bg-natural-sage-dark rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md"
                      >
                        Confirm Transaction
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

            {/* --- STEP 2B: CREDIT CARD WIDGET SIMULATOR --- */}
            {step === 'payment_card' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-natural-charcoal">Credit / Debit Card Pay</h3>
                  <p className="text-xs text-natural-taupe mt-1">Merchant uses certified 256-bit safe encryption.</p>
                </div>

                <form onSubmit={handleCardSubmit} className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Card Holder Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alvi Shaba"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAF9F6] text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-natural-taupe uppercase">Card Number</label>
                    <input
                      required
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      maxLength={19}
                      value={cardNumber}
                      id="card-payment-number"
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                      className="w-full bg-[#FAF9F6] font-mono text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-natural-taupe uppercase">Expiry Date</label>
                      <input
                        required
                        type="text"
                        placeholder="MM / YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').replace(/\/$/, '').trim())}
                        className="w-full bg-[#FAF9F6] font-mono text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-natural-taupe uppercase">CVV Code</label>
                      <input
                        required
                        type="password"
                        placeholder="•••"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#FAF9F6] font-mono text-xs rounded-xl p-3 border border-natural-beige focus:outline-hidden focus:border-natural-sage mt-1 text-natural-charcoal placeholder-natural-taupe/70"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep('info')}
                      className="flex-1 py-3 border border-natural-beige rounded-full text-xs font-bold text-natural-taupe cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      id="card-payment-submit-btn"
                      className="flex-1 py-3.5 text-white bg-natural-sage hover:bg-natural-sage-dark rounded-full text-xs font-bold cursor-pointer transition-colors shadow-md font-sans uppercase tracking-wider"
                    >
                      Pay Securely ৳ {grandTotal.toLocaleString()} BDT
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --- PROCESSING SCREEN --- */}
            {step === 'processing' && (
              <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
                <Loader className="w-12 h-12 text-natural-sage animate-spin" />
                <div>
                  <h3 className="font-serif text-base font-bold text-natural-charcoal">Validating Core Transaction</h3>
                  <p className="text-xs text-natural-taupe mt-1 leading-relaxed max-w-[240px] mx-auto">
                    Security gateway is checking formulation databases. Do not reload or close this window.
                  </p>
                </div>
              </div>
            )}

            {/* --- SUCCESS STATE SCREEN --- */}
            {step === 'success' && (
              <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                <CheckCircle2 className="w-14 h-14 text-natural-sage fill-natural-cream animate-scale" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-natural-charcoal">Payment Completed!</h3>
                  <p className="text-xs text-natural-sage font-semibold bg-natural-cream border border-natural-beige/60 px-3 py-1 rounded-full w-max mx-auto mt-1.5">
                    Order Registered Successfully Register
                  </p>
                </div>

                <div className="w-full bg-[#FAF9F6] p-4 rounded-2xl border border-natural-beige space-y-2 text-xs">
                  <div className="flex items-center justify-between font-sans text-natural-taupe">
                    <span>Order Reference ID</span>
                    <span className="font-mono font-bold text-natural-charcoal">#LTN-{(Math.floor(1000 + Math.random() * 9000))}</span>
                  </div>
                  <div className="flex items-center justify-between font-sans text-natural-taupe">
                    <span>Transaction Total</span>
                    <span className="font-mono font-bold text-natural-sage">৳ {grandTotal.toLocaleString()} BDT</span>
                  </div>
                  <div className="flex items-center justify-between font-sans text-natural-taupe">
                    <span>Destination Area</span>
                    <span className="font-bold text-natural-charcoal capitalize">{deliveryArea === 'inside' ? 'Inside Dhaka (24h)' : 'Outside Dhaka (2-3 days)'}</span>
                  </div>
                  <div className="flex items-center justify-between font-sans text-natural-taupe">
                    <span>Confirmation Email</span>
                    <span className="text-natural-charcoal font-mono underline shrink-0 truncate max-w-[150px]">{userEmail || 'registered@gmail.com'}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  id="checkout-success-close-btn"
                  className="w-full py-3.5 bg-natural-charcoal hover:bg-natural-charcoal/90 text-white font-sans text-xs uppercase tracking-wider font-bold rounded-xl cursor-pointer shadow-sm transition-colors text-center"
                >
                  Return to Lantana Shop
                </button>
              </div>
            )}

          </div>

          {/* Right Column Summary Sidebar (Col-span 5) */}
          <div className="md:col-span-5 bg-[#FAF9F6] p-6 md:p-8 border-t md:border-t-0 md:border-l border-natural-beige text-left flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-natural-taupe tracking-wider">Order Summary</h4>
              
              {/* Product Scroll list */}
              <div className="max-h-48 overflow-y-auto space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-2 items-center text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-8 w-8 rounded-md object-cover border border-natural-beige placeholder-transparent bg-white shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-serif text-xs font-bold text-natural-charcoal block truncate leading-tight">{item.product.name}</span>
                      <span className="text-natural-taupe font-mono text-[9px] mt-0.5 block">৳ {item.product.price.toLocaleString()} × {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown Calculation details */}
              <div className="border-t border-natural-beige/50 pt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-natural-taupe">
                  <span>Cart Items</span>
                  <span className="font-mono text-natural-charcoal">৳ {subtotal.toLocaleString()} BDT</span>
                </div>
                <div className="flex items-center justify-between text-natural-taupe">
                  <span>SSL Billing Tax</span>
                  <span className="font-sans text-natural-sage font-bold uppercase text-[10px]">Free</span>
                </div>
                <div className="flex items-center justify-between text-natural-taupe">
                  <span>Shipping Cost</span>
                  <span className="font-mono text-natural-charcoal">৳ {deliveryCharge} BDT</span>
                </div>
              </div>
            </div>

            {/* Grand summation widget */}
            <div className="border-t border-natural-beige pt-4 mt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-natural-charcoal">Grand Total</span>
                <span className="font-serif text-lg font-bold text-natural-sage">
                  ৳ {grandTotal.toLocaleString()} BDT
                </span>
              </div>
              <p className="text-[10px] text-natural-taupe leading-normal mt-2.5">
                🔒 Protected by secure 256-bit SSL certificate mechanism. Transaction processed in association with SSLCommerz Bangladesh.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
