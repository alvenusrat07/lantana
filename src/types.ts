export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  skinType?: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Skincare' | 'Makeup' | 'Haircare' | 'Bodycare';
  origin: 'South Korea' | 'USA' | 'France' | 'Japan' | 'Canada' | 'Global';
  price: number; // in BDT (Bangladeshi Taka)
  rating: number;
  image: string;
  description: string;
  detailedDescription: string;
  ingredients: string[];
  howToUse: string;
  skinTypeSuitability: string[]; // ['Oily', 'Dry', 'Sensitive', 'Combination']
  benefits: string[];
  reviews: Review[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  author: string;
  productLinked: Product;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  skinType?: 'Oily' | 'Dry' | 'Combination' | 'Normal' | 'Sensitive';
  skinConcerns?: string[];
  isLoggedIn: boolean;
}
