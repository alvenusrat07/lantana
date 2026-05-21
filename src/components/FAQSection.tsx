import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { faqs } from '../data';
import { FAQ } from '../types';

export default function FAQSection() {
  const [activeId, setActiveId] = useState<string | null>('f1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Authenticity', 'Shipping & Delivery', 'Payments', 'Korean Skincare Advice', 'Returns & Exchange'];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="py-20 bg-white border-b border-natural-beige text-left" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title portion */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-sans bg-natural-cream text-natural-sage px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest border border-natural-beige">
            ❓ Support Center
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-natural-charcoal tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-natural-taupe max-w-sm mx-auto leading-relaxed">
            Have questions about K-beauty authenticity, secure payment checkouts, or delivery across Bangladesh? We've gathered all answers below.
          </p>
        </div>

        {/* Category togglers */}
        <div className="flex flex-wrap gap-2 justify-center pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveId(null);
              }}
              className={`text-xs px-4 py-2 rounded-full whitespace-nowrap cursor-pointer transition-all duration-155 uppercase tracking-wider font-sans ${
                selectedCategory === cat 
                  ? 'bg-natural-sage text-white font-bold shadow-xs' 
                  : 'bg-[#FAF9F6] text-natural-taupe border border-natural-beige hover:bg-natural-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions block */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-natural-taupe bg-[#FAF9F6] rounded-xl border border-natural-beige/35 border-dashed">
              No answers listed in this category yet. Contact customer support at support@lantana.beauty
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = activeId === faq.id;

              return (
                <div 
                  key={faq.id} 
                  className="bg-[#FAF9F6]/40 hover:bg-natural-cream/35 rounded-2xl border border-natural-beige/60 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-sm font-bold text-natural-charcoal focus:outline-hidden cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4.5 h-4.5 text-natural-sage shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-natural-sage shrink-0" /> : <ChevronDown className="w-4 h-4 text-natural-taupe shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-natural-charcoal/90 leading-relaxed border-t border-natural-beige/40 bg-white/50">
                      <div className="space-y-1.5 font-sans">
                        <p>{faq.answer}</p>
                        <div className="flex justify-end pt-2">
                          <span className="text-[9px] font-sans uppercase bg-natural-cream text-natural-sage px-2.5 py-1 rounded-md font-bold border border-natural-beige/40">
                            Category: {faq.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Floating Customer Helpdesk Notice */}
        <div className="p-6 bg-natural-cream/30 rounded-2xl border border-natural-beige text-center space-y-3.5 max-w-lg mx-auto">
          <div className="flex justify-center text-natural-sage">
            <MessageSquare className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-xs font-bold text-natural-charcoal uppercase tracking-wider">Still have some questions?</h4>
            <p className="text-[11px] text-natural-taupe max-w-xs mx-auto leading-relaxed">
              Drop a message on our official **Lantana Facebook Page** or **Instagram Account**. Our skincare response associates are active 24/7!
            </p>
          </div>
          <div className="flex gap-4 justify-center pt-2 text-xs font-bold">
            <a 
              href="https://facebook.com/lantanabeauty.bd" 
              target="_blank" 
              rel="noreferrer"
              className="text-natural-sage hover:underline hover:text-natural-sage-dark font-serif italic cursor-pointer"
            >
              Facebook Marketing Page
            </a>
            <span className="text-natural-beige">|</span>
            <a 
              href="https://instagram.com/lantanabeauty.bd" 
              target="_blank" 
              rel="noreferrer"
              className="text-natural-sage hover:underline hover:text-natural-sage-dark font-serif italic cursor-pointer"
            >
              Instagram Page
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
