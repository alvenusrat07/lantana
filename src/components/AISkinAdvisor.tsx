import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, HelpCircle, Loader, RefreshCw, ShoppingCart, Heart } from 'lucide-react';
import { UserProfile, Product } from '../types';
import { products } from '../data';

interface AISkinAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AISkinAdvisor({
  isOpen,
  onClose,
  userProfile,
  onSelectProduct,
  onAddToCart
}: AISkinAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      role: 'assistant',
      content: `Hello! I am your **Lantana AI Skin Care Advisor** ✨.\n\nI can help you analyze your skin type, explain the famous 10-step Korean skincare routine, and recommend the exact authentic K-beauty products from our inventory to achieve that luminous **Korean Glass Skin** glow!\n\nTell me about your skin type (Oily, Dry, Sensitive, Combination) or ask about any skin concerns (acne, dulness, pores) you are experiencing in Bangladesh's weather.`,
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  // Suggested quick prompts suited for Bangladeshi environment
  const quickPrompts = [
    { label: '☀️ Glow Routine', text: 'Recommend a morning routine for Korean glass skin' },
    { label: '🥵 Oily/Acne help', text: 'Recommend products for oily and acne-prone skin in Dhaka weather' },
    { label: '🐚 Snail Mucin', text: 'How do I use the COSRX Snail Mucin Essence?' },
    { label: '🪵 Sensitive Skin', text: 'Help, my skin barrier is damaged and red' }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build previous matches
      const payloadMessages = messages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      // Post proxy server to fetch Gemini API safely
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: payloadMessages,
          skinProfile: userProfile
        })
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: 'msg_gemini_' + Date.now(),
        role: 'assistant',
        content: data.reply || "I encountered an error analyzing that ingredient. Let me know what other product you'd like guidance with!",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: 'err_' + Date.now(),
        role: 'assistant',
        content: "Sorry, I am temporarily off-duty while restocking ingredients. Please check back shortly, or reach out to our human skin consultants!",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (text: string) => {
    handleSend(text);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'init_reset',
        role: 'assistant',
        content: `Hi there! Let's start a fresh skin consultation.\n\nTell me: what specific skin concerns are you facing? Let's build a customized Korean skincare formulation routine.`,
        timestamp: new Date()
      }
    ]);
  };

  // Safe helper to scan chatbot text replies and see if they mention catalog products, 
  // generating quick visual links so users can click to add to cart or view!
  const renderMessageContent = (content: string) => {
    // Process list headers, bold text blocks
    const lines = content.split('\n');
    return (
      <div className="space-y-2">
        {lines.map((line, idx) => {
          let lineText = line;
          
          // Basic markdown parser
          if (lineText.startsWith('**') && lineText.endsWith('**')) {
            return <p key={idx} className="font-bold text-gray-900 text-xs font-sans">{lineText.replace(/\*\*/g, '')}</p>;
          }
          if (lineText.startsWith('- ') || lineText.startsWith('* ')) {
            const listText = lineText.substring(2);
            return (
              <li key={idx} className="list-disc list-inside text-xs text-gray-700 leading-relaxed font-sans pl-2">
                {parseInlineBold(listText)}
              </li>
            );
          }

          return <p key={idx} className="text-xs text-gray-700 leading-relaxed font-sans">{parseInlineBold(lineText)}</p>;
        })}

        {/* Dynamic bottom catalog actions inside advisor chat if products are mentioned */}
        {detectAndRenderMentionedProducts(content)}
      </div>
    );
  };

  const parseInlineBold = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-gray-950">{part}</strong> : part);
  };

  const detectAndRenderMentionedProducts = (text: string) => {
    const textUpper = text.toUpperCase();
    
    // Check which products in our catalog are mentioned in the response
    const mentioned = products.filter(p => {
      const nameParts = p.name.toUpperCase().split(' ');
      const brand = p.brand.toUpperCase();
      // Check if either brand or major parts of product name matches text
      return textUpper.includes(brand) && nameParts.some(part => part.length > 3 && textUpper.includes(part));
    });

    if (mentioned.length === 0) return null;

    return (
      <div className="pt-3 border-t border-natural-beige/45 space-y-2">
        <span className="text-[9px] font-sans font-bold text-natural-sage block uppercase tracking-wider">
          Suggested Products in Chat:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {mentioned.map(product => (
            <div key={product.id} className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F6]/80 border border-natural-beige/50 text-xs">
              <button 
                onClick={() => onSelectProduct(product)}
                className="flex items-center gap-2 text-left min-w-0 flex-1 hover:underline cursor-pointer"
              >
                <img src={product.image} alt="" className="h-7 w-7 rounded-sm object-cover bg-white" />
                <div className="min-w-0">
                  <span className="font-bold text-natural-charcoal block truncate">{product.brand}</span>
                  <span className="text-natural-taupe text-[10px] block truncate">{product.name}</span>
                </div>
              </button>
              
              <button
                onClick={() => onAddToCart(product)}
                className="ml-2 px-2.5 py-1 bg-natural-sage hover:bg-natural-sage-dark text-white rounded-md font-sans text-[10px] font-bold cursor-pointer transition-colors shrink-0"
              >
                Add 
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) {
    // If closed, show a floating activator ball button on the screen!
    return (
      <button
        id="advisor-float-trigger"
        onClick={() => {}}
        className="hidden" // Handled by App.tsx centrally
      />
    );
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-md h-full sm:h-[600px] bg-[#FAF9F6] sm:rounded-3xl border sm:border-natural-beige shadow-2xl flex flex-col justify-between overflow-hidden animate-scale text-left">
      
      {/* Advisor header title bar */}
      <div className="p-4 bg-natural-sage text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
            <Sparkles className="w-5 h-5 text-natural-cream animate-pulse animate-none" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wide">K-Beauty AI Agent</h3>
            <span className="text-[10px] font-mono text-natural-cream/80 block">Personalized Skin Advisor</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Clear Chat Logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>
      </div>

      {/* User Skin Type Warning Indicator */}
      {userProfile.isLoggedIn && (
        <div className="px-4 py-2 bg-natural-cream text-[10px] font-medium text-natural-sage border-b border-natural-beige/50 flex items-center justify-between uppercase font-mono tracking-wider">
          <span>Targeting Profile: {userProfile.name}</span>
          <span>Skin Type Suit: {userProfile.skinType || 'Combination'}</span>
        </div>
      )}

      {/* Messages layout */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40">
        {messages.map((message) => {
          const isAI = message.role === 'assistant';
          return (
            <div 
              key={message.id} 
              className={`flex gap-2.5 max-w-[85%] ${isAI ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'}`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border uppercase font-bold text-xs ${
                isAI ? 'bg-natural-cream text-natural-sage border-natural-beige' : 'bg-natural-beige text-natural-charcoal border-natural-beige'
              }`}>
                {isAI ? <Bot className="w-4.5 h-4.5 text-natural-sage" /> : <User className="w-4.5 h-4.5 text-natural-charcoal" />}
              </div>

              <div className={`p-3 rounded-2xl ${
                isAI ? 'bg-white border border-natural-beige/40 shadow-xs rounded-tl-none' : 'bg-natural-sage text-white rounded-tr-none'
              }`}>
                {isAI ? (
                  renderMessageContent(message.content)
                ) : (
                  <p className="text-xs leading-relaxed font-sans">{message.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5 items-center text-natural-taupe text-xs font-mono ml-1">
            <Loader className="w-4 h-4 text-natural-sage animate-spin" />
            <span>AI skin analyst is formulating responses...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggest prompts list */}
      {messages.length < 3 && !loading && (
        <div className="px-4 pb-2 pt-1 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPrompt(qp.text)}
              className="px-3 py-1.5 rounded-full bg-white border border-natural-beige hover:bg-natural-cream text-[10px] font-bold text-natural-taupe hover:text-natural-charcoal focus:outline-hidden whitespace-nowrap cursor-pointer transition-colors shrink-0"
            >
              {qp.label}
            </button>
          ))}
        </div>
      )}

      {/* Inputs box */}
      <div className="p-3 border-t border-natural-beige bg-white">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
          className="flex gap-2"
        >
          <input
            required
            type="text"
            id="advisor-chat-input"
            disabled={loading}
            placeholder="Write question (e.g., recommend dry skin oil cleanser...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-natural-beige focus:outline-hidden focus:border-natural-sage bg-natural-cream/30 text-natural-charcoal placeholder-natural-taupe/80 self-center"
          />
          <button
            type="submit"
            id="advisor-chat-send"
            disabled={loading || !input.trim()}
            className="p-2.5 bg-natural-sage text-white rounded-full hover:bg-natural-sage-dark cursor-pointer text-xs disabled:opacity-40 shrink-0 self-center transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
