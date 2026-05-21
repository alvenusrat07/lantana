import { Product, Reel, FAQ } from './types';

export const products: Product[] = [
  {
    id: 'k1',
    name: 'Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Skincare',
    origin: 'South Korea',
    price: 1850,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600',
    description: 'A light-weight essence which absorbs into skin fast to give skin a natural glow from inside. Formulated with 96.3% Snail Secretion Filtrate for skin barrier recovery and intense hydration.',
    detailedDescription: 'This essence shields the skin from moisture loss while improving skin elasticity. Snail mucin helps repair and soothe red, sensitive skin post-breakouts by replenishing moisture. Highly recommended for dullness, rough texture, and aging skin.',
    ingredients: [
      'Snail Secretion Filtrate (96.3%)',
      'Sodium Hyaluronate',
      'Allantoin',
      'Panthenol',
      'Butylene Glycol',
      'Phenoxyethanol'
    ],
    howToUse: 'After cleansing and toning, apply a small amount on your entire face. Gently pat using fingertips to aid absorption, then proceed with your moisturizers.',
    skinTypeSuitability: ['Oily', 'Dry', 'Sensitive', 'Combination'],
    benefits: ['Fades dark spots', 'Hydrates deeply', 'Improves skin elasticity', 'Soothes redness'],
    isBestSeller: true,
    reviews: [
      {
        id: 'r1',
        userName: 'Ayesha Rahman',
        rating: 5,
        comment: 'This is an absolute holy grail for dry skin! It reduced my acne marks in two weeks. 100% authentic product, thanks Lantana!',
        date: '2026-05-10',
        skinType: 'Dry',
        verified: true
      },
      {
        id: 'r2',
        userName: 'Nafis Chowdhury',
        rating: 4,
        comment: 'Very hydrating but can feel slightly sticky at first if you apply too much. Highly recommend applying on damp skin.',
        date: '2026-05-02',
        skinType: 'Combination',
        verified: true
      }
    ]
  },
  {
    id: 'k2',
    name: 'Relief Sun : Rice + Probiotics SPF50+',
    brand: 'Beauty of Joseon',
    category: 'Skincare',
    origin: 'South Korea',
    price: 1450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600',
    description: 'A lightweight and creamy organic sunscreen that is comfortable on the skin. Even if you apply a large amount several times, it is not sticky and gives a moist finish like that of a light moisturizing cream.',
    detailedDescription: 'Formulated with 30% Rice Extract and grain-fermented extracts, it is rich in vitamins B, C, E, amino acids, and minerals which deep-hydrates and calms irritated skin. Certified SPF 50 from separate labs in South Korea and Spain.',
    ingredients: [
      'Water',
      'Oryza Sativa (Rice) Extract (30%)',
      'Saccharomyces/Rice Ferment Filtrate',
      'Lactobacillus Ferment',
      'Glycerin',
      'Niacinamide'
    ],
    howToUse: 'At the last step of skin care routine, evenly spread a generous amount over areas vulnerable to sun exposure.',
    skinTypeSuitability: ['Dry', 'Sensitive', 'Combination'],
    benefits: ['Protects from UV rays', 'No white cast', 'Brightens hyperpigmentation', 'Deeply moisturizing'],
    isNewArrival: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'r3',
        userName: 'Samia Akter',
        rating: 5,
        comment: 'Finally a sunscreen that does not leave a white cast and does not burn my eyes! Bangladeshi humid weather is tough, but this absorbs beautifully!',
        date: '2026-05-19',
        skinType: 'Sensitive',
        verified: true
      }
    ]
  },
  {
    id: 'k3',
    name: 'Heartleaf 77% Soothing Toner',
    brand: 'Anua',
    category: 'Skincare',
    origin: 'South Korea',
    price: 2100,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600',
    description: 'Korea\'s #1 ranking soothing toner. Extremely calming, reduces irritation, hydrates and provides trouble care for acne-prone skin.',
    detailedDescription: 'Infused with 77% Heartleaf Extract harvested in Korea, this sub-acidic toner balances the pH level of the skin, reduces redness, and acts as an anti-inflammatory barrier to keep breakouts in control.',
    ingredients: [
      'Houttuynia Cordata Extract (77%)',
      'Water',
      '1,2-Hexanediol',
      'Glycerin',
      'Betaine',
      'Centella Asiatica Extract',
      'Portulaca Oleracea Extract'
    ],
    howToUse: 'After cleansing, apply a generous amount onto the face with a cotton pad or pat directly with your hands. Use day and night.',
    skinTypeSuitability: ['Oily', 'Sensitive', 'Combination'],
    benefits: ['Calms acne and redness', 'Balances skin hydration', 'Soothes inflammation', 'Preps skin for serums'],
    isBestSeller: false,
    reviews: [
      {
        id: 'r4',
        userName: 'Tasnia Hasan',
        rating: 5,
        comment: 'Reduced my fungal acne completely! Essential toner for hot summers in Dhaka.',
        date: '2026-05-15',
        skinType: 'Oily',
        verified: true
      }
    ]
  },
  {
    id: 'k4',
    name: 'Lip Sleeping Mask - Berry',
    brand: 'Laneige',
    category: 'Skincare',
    origin: 'South Korea',
    price: 1250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600',
    description: 'An overnight lip mask that provides intense hydration and antioxidants while you sleep. Features Laneige\'s proprietary moisture-wrap technology.',
    detailedDescription: 'Enriched with vitamin C and antioxidants, its Berry Mix Complex features a sweet and fragrant blend of raspberry, strawberry, cranberry, and blueberry extracts to indulge the senses and dissolve dead skin cells.',
    ingredients: [
      'Diisostearyl Malate',
      'Hydrogenated Polyisobutene',
      'Shea Butter',
      'Berry Extract Complex (Strawberry, Raspberry, Blueberry)',
      'Ascorby Glucoside',
      'Sodium Hyaluronate'
    ],
    howToUse: 'Using the spatula, apply a generous amount to the lips in the evening. Gently wipe lips clean with a tissue the next morning.',
    skinTypeSuitability: ['Oily', 'Dry', 'Sensitive', 'Combination'],
    benefits: ['Exfoliates dead lip skin', 'Deeply moisturizes', 'Overnight nourishment', 'Fades lip pigmentation'],
    isBestSeller: true,
    reviews: [
      {
        id: 'r5',
        userName: 'Fariha Ahmed',
        rating: 5,
        comment: 'My dark and dry lips are healed. Worth every single taka!',
        date: '2026-04-28',
        skinType: 'Dry',
        verified: true
      }
    ]
  },
  {
    id: 'g1',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Skincare',
    origin: 'Canada',
    price: 1050,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600',
    description: 'A high-strength vitamin and mineral blemish formula with 10% pure Niacinamide and 1% Zinc PCA.',
    detailedDescription: 'Niacinamide (Vitamin B3) is indicated to reduce the appearance of skin blemishes and congestion. A high 10% concentration of this vitamin is supported in the formula by Zinc PCA to balance visible aspects of sebum activity.',
    ingredients: [
      'Water',
      'Niacinamide (10%)',
      'Zinc PCA (1%)',
      'Pentylene Glycol',
      'Xanthan Gum',
      'Phenoxyethanol'
    ],
    howToUse: 'Apply a few drops of the serum to your entire face in the morning and evening before heavier creams.',
    skinTypeSuitability: ['Oily', 'Combination'],
    benefits: ['Reduces excess sebum', 'Tightens enlarged pores', 'Fades blemishes', 'Smoothens uneven skin texture'],
    isBestSeller: false,
    reviews: [
      {
        id: 'r6',
        userName: 'Zubair Islam',
        rating: 4,
        comment: 'Works great on my oily skin! Pore size is visibly reduced. Make sure to patch test before using, 10% niacinamide is strong.',
        date: '2026-05-12',
        skinType: 'Oily',
        verified: false
      }
    ]
  },
  {
    id: 'k5',
    name: 'Madagascar Centella Ampoule',
    brand: 'SKIN1004',
    category: 'Skincare',
    origin: 'South Korea',
    price: 1950,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600',
    description: 'An all-rounder ampoule that helps replenish skin hydration, restore its barrier, and calm inflammation with 100% pure Centella Asiatica.',
    detailedDescription: 'Made of 100% extract of Centella Asiatica grown in Madagascar. Safe for sensitive skin, hypoallergenic, and provides immediate cooling and healing effects for irritated, acne-prone skin.',
    ingredients: [
      'Centella Asiatica Extract (100%)'
    ],
    howToUse: 'After toning, drop a moderate amount on the skin using the dropper. Gently massage over the entire face and pat to absorb.',
    skinTypeSuitability: ['Oily', 'Dry', 'Sensitive', 'Combination'],
    benefits: ['Heals skin barrier', 'Extremely soothing', 'Reduces redness', 'Safe for acne-prone skin'],
    isNewArrival: true,
    reviews: [
      {
        id: 'r7',
        userName: 'Radiah Khan',
        rating: 5,
        comment: 'The texture is like water! It absorbs so quickly and does not clog pores. Ideal for sensitive skin showing irritation.',
        date: '2026-05-17',
        skinType: 'Sensitive',
        verified: true
      }
    ]
  },
  {
    id: 'k6',
    name: 'Rice Toner',
    brand: "I'm From",
    category: 'Skincare',
    origin: 'South Korea',
    price: 2200,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600',
    description: 'Formulated with 77.78% Rice Extract, this toner provides intensive hydration and brightens dull complexion for that coveted Korean glass skin.',
    detailedDescription: 'This toner is composed of 77.78% Goami rice extract from Yeoju, South Korea. It forms a protective barrier over skin to prevent water loss, eliminates dead skin cells, and provides instant rejuvenation to dry, tired skin.',
    ingredients: [
      'Rice Extract (77.78%)',
      'Methylpropanediol',
      'Triethylhexanoin',
      'Hydrogenated Poly(C6-14 Olefin)',
      'Niacinamide',
      'Adenosine'
    ],
    howToUse: 'Shake the bottle thoroughly before use to mix the water and emulsion layers. Pat gently onto clean skin or use as a DIY toner pad mask.',
    skinTypeSuitability: ['Dry', 'Sensitive', 'Combination'],
    benefits: ['Creates glass-skin glow', 'Intense hydration', 'Brightens dullness', 'Saves dry flakiness'],
    isNewArrival: true,
    reviews: [
      {
        id: 'r8',
        userName: 'Sultana Jahan',
        rating: 5,
        comment: 'This gives immediate glow after application! Unbelievably soft finish. I love K-beauty so much.',
        date: '2022-12-25',
        skinType: 'Dry',
        verified: true
      }
    ]
  },
  {
    id: 'g2',
    name: 'Hydrating Facial Cleanser',
    brand: 'CeraVe',
    category: 'Skincare',
    origin: 'USA',
    price: 1550,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600',
    description: 'A gentle, non-foaming facial wash designed to cleanse and refresh the skin without over-stripping or leaving it tight.',
    detailedDescription: 'Formulated with three essential ceramides (1, 3, 6-II) and hyaluronic acid to help restore the skin\'s natural protective barrier. Utilizes MultiVesicular Emulsion (MVE) technology to release moisture steadily over 24 hours.',
    ingredients: [
      'Water',
      'Ceramide NP',
      'Ceramide AP',
      'Ceramide EOP',
      'Hyaluronic Acid',
      'Glycerin',
      'Cholesterol'
    ],
    howToUse: 'Wet skin with lukewarm water. Massage cleanser into skin in a gentle, circular motion. Rinse.',
    skinTypeSuitability: ['Dry', 'Sensitive', 'Combination'],
    benefits: ['Maintains skin barrier', 'Non-drying', 'Locks in moisture', 'Gentle for everyday use'],
    isBestSeller: true,
    reviews: [
      {
        id: 'r9',
        userName: 'Nabila Hasan',
        rating: 4,
        comment: 'Perfect morning cleanser! It does not strip my oily-combination skin but leaves it soft and prepared for skin care.',
        date: '2026-05-18',
        skinType: 'Combination',
        verified: true
      }
    ]
  }
];

export const reels: Reel[] = [
  {
    id: 'reel_1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-facial-cream-41551-large.mp4',
    title: 'Achieve Glass Skin under 2 Minutes with COSRX Essence ✨',
    author: 'K-Beauty Secrets BD',
    productLinked: products[0], // Snail Mucin
    likes: 1240,
    comments: 189
  },
  {
    id: 'reel_2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-skin-care-routine-of-a-beautiful-woman-41550-large.mp4',
    title: 'Testing the No-White Cast organic Sunscreen from BOJ ☀️',
    author: 'Lantana Beauty Hub',
    productLinked: products[1], // BOJ Sunscreen
    likes: 3412,
    comments: 412
  },
  {
    id: 'reel_3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-cleansing-her-face-with-water-41549-large.mp4',
    title: 'Dhaka Pollution can damage your skin barrier - Here is the fix!',
    author: 'Skincare Guru Alvi',
    productLinked: products[5], // skin1004 Centella
    likes: 981,
    comments: 72
  }
];

export const faqs: FAQ[] = [
  {
    id: 'f1',
    question: 'Are Lantana products 100% authentic?',
    answer: 'Absolutely! At Lantana, we take authenticity as our top priority. We source our products directly from South Korean brands, authorized distributors, and duty-free chains. Every item has an authenticity seal and barcode which can be scanned using barcode scanning apps to verify its origin.',
    category: 'Authenticity'
  },
  {
    id: 'f2',
    question: 'How do you structure deliveries in Bangladesh?',
    answer: 'We deliver all over Bangladesh! Delivery within Dhaka city takes 24-48 hours (charge: 80 BDT). Deliveries outside Dhaka are handled via secure courier services and take 2-4 days (charge: 150 BDT). Cash-on-delivery is available countrywide.',
    category: 'Shipping & Delivery'
  },
  {
    id: 'f3',
    question: 'What payment methods do you accept?',
    answer: 'We support all major secure checkout payment methods! You can pay digitally via Mobile Financial Services (MFS) including bKash, Nagad, and Rocket or via credit/debit cards (Visa, MasterCard, Amex) and Net Banking. Checkout is fully secured using 256-bit SSL encryption.',
    category: 'Payments'
  },
  {
    id: 'f4',
    question: 'What is the standard Korean 10-step routine? Do I need to buy all 10 products?',
    answer: 'The traditional 10-step routine consists of double cleansing (oil + water cleanser), exfoliating, toning, treatment (essence/ampoules), masks, eye cream, moisturizer, and morning sun protection. You DO NOT need to follow all 10. We recommend beginning with a simple 4-step routine: Cleanse ➔ Tone ➔ Moisturize ➔ Sunscreen, then add treatment essences like COSRX Snail Mucin as needed. Our AI Skin Advisor can help custom-tailor your routine!',
    category: 'Korean Skincare Advice'
  },
  {
    id: 'f5',
    question: 'How can I return an item that triggers bad skin reaction?',
    answer: 'If you experience any severe redness, itching, or allergic breakout from a skincare product within 7 days of purchase, please reach out to our Customer Service along with clear pictures of the reaction. We have a skin allergy return policy and will process a full refund or product exchange.',
    category: 'Returns & Exchange'
  }
];

export const homepageReviews = [
  {
    id: 'hr1',
    name: 'Dr. Farhana Yasmin',
    role: 'Dermatologist, Dhaka Medical',
    comment: 'Lantana is my absolute favorite store to recommend to skin patients. Their selection of Korean centella and heartleaf skin calming serums are authentic and highly effective for Bangladeshi climate-provoked skin barrier damages.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=200'
  },
  {
    id: 'hr2',
    name: 'Mehreen Kamal',
    role: 'Beauty Influencer',
    comment: 'Dhaka is super dusty, making double cleansing crucial with BOJ oil and water-based cleansers. Lantanas customer care guided me to choose the perfect routine. Delivery took just 1 day!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
  },
  {
    id: 'hr3',
    name: 'Sajid Ahmed',
    role: 'Dry/Sensitive Skin Group Member',
    comment: 'Finally a shop inside Bangladesh that doesn’t double the price of Korean sunscreens. Very reasonable pricing and checkout via bKash is completely flawless and fast!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200'
  }
];
