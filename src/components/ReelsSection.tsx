import { useState, useRef } from 'react';
import { Heart, MessageCircle, Volume2, VolumeX, ShoppingCart, Play, Pause, ExternalLink } from 'lucide-react';
import { Reel, Product } from '../types';
import { reels as initialReels } from '../data';

interface ReelsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ReelsSection({ onSelectProduct, onAddToCart }: ReelsSectionProps) {
  const [reelsList, setReelsList] = useState<Reel[]>(initialReels);
  const [muted, setMuted] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(initialReels[0]?.id || null);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      video.play().catch(err => console.log('Video play interrupted', err));
      setPlayingId(id);
    } else {
      video.pause();
      if (playingId === id) {
        setPlayingId(null);
      }
    }
  };

  const handleLike = (id: string) => {
    setReelsList(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          isLiked: !r.isLiked,
          likes: r.isLiked ? r.likes - 1 : r.likes + 1
        };
      }
      return r;
    }));
  };

  return (
    <div className="py-16 bg-natural-cream/20 border-b border-natural-beige" id="reels-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Header Title */}
        <div className="space-y-3">
          <span className="text-[10px] font-sans bg-[#FAF9F6] text-natural-sage px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest border border-natural-beige">
            🎥 Reels & Stories
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-natural-charcoal tracking-tight">
            Lantana Beauty Shorts
          </h2>
          <p className="text-sm text-natural-taupe max-w-lg mx-auto leading-relaxed">
            Watch authentic skin application loops, tutorials, and results shared by our Bangladeshi community. Click any product featured in the reel to explore it directly!
          </p>
        </div>

        {/* Reels layout grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
          {reelsList.map((reel) => {
            const isPlaying = playingId === reel.id;

            return (
              <div 
                key={reel.id} 
                className="relative aspect-[9/16] max-w-[320px] mx-auto w-full bg-neutral-950 rounded-3xl overflow-hidden shadow-xl border border-natural-beige/35 group flex flex-col justify-between"
              >
                {/* HTML5 Video Box */}
                <video
                  ref={el => { videoRefs.current[reel.id] = el; }}
                  src={reel.videoUrl}
                  loop
                  muted={muted}
                  playsInline
                  autoPlay={reel.id === 'reel_1'} // Autoplay the first one!
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  onClick={() => togglePlay(reel.id)}
                />

                {/* Video controls overlays */}
                <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between z-10">
                  <span className="text-white text-xs font-mono font-semibold truncate max-w-[160px]">
                    @{reel.author}
                  </span>
                  
                  {/* Mute button */}
                  <button
                    onClick={() => setMuted(!muted)}
                    className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/65 transition-colors cursor-pointer"
                    title={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Huge Play/Pause overlay symbol on center hover */}
                <div 
                  onClick={() => togglePlay(reel.id)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="p-4 bg-white/20 backdrop-blur-xs rounded-full text-white">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
                  </div>
                </div>

                {/* Right side interaction sidebar */}
                <div className="absolute right-3.5 bottom-24 flex flex-col gap-4 z-10 text-white items-center">
                  {/* Like Button */}
                  <button 
                    onClick={() => handleLike(reel.id)}
                    className="flex flex-col items-center gap-1 cursor-pointer focus:outline-hidden group"
                  >
                    <div className="p-2.5 rounded-full bg-black/40 text-white group-hover:bg-natural-sage/90 transition-colors">
                      <Heart className={`w-4.5 h-4.5 transition-transform ${reel.isLiked ? 'fill-natural-sage text-natural-sage scale-120' : ''}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold">{reel.likes.toLocaleString()}</span>
                  </button>

                  {/* Comment icon placeholder */}
                  <div className="flex flex-col items-center gap-1 opacity-90">
                    <div className="p-2.5 rounded-full bg-black/40">
                      <MessageCircle className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-bold">{reel.comments}</span>
                  </div>
                </div>

                {/* Bottom Overlay: Title & Linked Product Button */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent space-y-3 z-10 text-left">
                  <p className="text-xs text-white/95 font-sans leading-normal line-clamp-2 pr-10">
                    {reel.title}
                  </p>

                  {/* Linked Product Anchor Card */}
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={reel.productLinked.image}
                        alt={reel.productLinked.name}
                        className="h-9 w-9 rounded-lg object-cover bg-white placeholder-transparent"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 font-sans">
                        <span className="text-[8px] font-mono font-bold text-natural-beige uppercase block leading-none">{reel.productLinked.brand}</span>
                        <span className="text-[11px] font-bold block truncate mt-0.5 max-w-[120px]">
                          {reel.productLinked.name}
                        </span>
                        <span className="font-mono text-[10px] text-natural-cream font-bold block">
                          ৳ {reel.productLinked.price.toLocaleString()} BDT
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      {/* View details quick action */}
                      <button
                        onClick={() => onSelectProduct(reel.productLinked)}
                        className="p-1.5 rounded-md bg-white/20 text-white hover:bg-white/40 cursor-pointer"
                        title="View detailed product card"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      {/* Add to cart quick action */}
                      <button
                        onClick={() => onAddToCart(reel.productLinked)}
                        className="p-1.5 rounded-md bg-natural-sage text-white hover:bg-natural-sage-dark cursor-pointer text-xs"
                        title="Put in cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
