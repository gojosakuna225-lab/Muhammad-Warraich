/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  ShoppingBag, 
  ChevronRight, 
  Award, 
  Flame, 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  Trash2, 
  Clock, 
  Info,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  Navigation,
  CheckCircle2
} from 'lucide-react';

// Types
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  calories: number;
  image: string;
  description: string;
  tags?: string[];
};

type CartItem = Product & {
  quantity: number;
};

type PageType = 'home' | 'menu' | 'order' | 'deals' | 'find' | 'loyalty' | 'about';

// Data
const PRODUCTS: Product[] = [
  // BURGERS
  {
    id: 'b1',
    name: 'Whopper®',
    category: 'Burgers',
    price: 899,
    calories: 660,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Whopper%20burger%20with%20flame-grilled%20beef,%20lettuce,%20tomato,%20onion,%20pickles,%20ketchup,%20mayo%20in%20a%20sesame%20bun,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A ¼ lb. of savory flame-grilled beef topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    tags: ['Best Seller', 'Flame-Grilled']
  },
  {
    id: 'b2',
    name: 'Bacon King',
    category: 'Burgers',
    price: 1299,
    calories: 1150,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20double%20beef%20patty%20Bacon%20King%20burger%20with%20crispy%20bacon%20strips,%20melted%20cheese,%20ketchup,%20mayo,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Two ¼ lb. savory flame-grilled beef patties, topped with a hearty portion of thick-cut smoked bacon, melted American cheese and topped with ketchup and creamy mayonnaise.',
    tags: ['Meat Lovers']
  },
  {
    id: 'b3',
    name: 'Quarter Pound King',
    category: 'Burgers',
    price: 999,
    calories: 580,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Quarter%20Pound%20King%20burger%20with%20a%20thick%20beef%20patty,%20cheese,%20onions,%20pickles,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A ¼ lb. flame-grilled beef patty topped with all the classic fixings.'
  },
  {
    id: 'b4',
    name: 'Double Whopper®',
    category: 'Burgers',
    price: 1199,
    calories: 900,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20tall%20Double%20Whopper%20burger%20with%20two%20beef%20patties,%20lettuce,%20tomato,%20onion,%20pickles,%20ketchup,%20mayo%20in%20a%20sesame%20bun,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Two ¼ lb. savory flame-grilled beef patties topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    tags: ['Heavyweight']
  },
  {
    id: 'b5',
    name: 'Whopper Jr®',
    category: 'Burgers',
    price: 499,
    calories: 310,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20compact%20Whopper%20Jr%20burger%20with%20beef%20patty,%20lettuce,%20tomato,%20onion,%20pickles,%20ketchup,%20mayo%20in%20a%20sesame%20bun,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A smaller version of our classic Whopper, perfect for a lighter craving.'
  },
  {
    id: 'b6',
    name: 'Mushroom Swiss Burger',
    category: 'Burgers',
    price: 1049,
    calories: 620,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Mushroom%20Swiss%20Burger%20with%20beef%20patty,%20sauteed%20mushrooms,%20melted%20swiss%20cheese,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A flame-grilled beef patty topped with savory sautéed mushrooms and melted Swiss cheese.'
  },

  // SANDWICHES
  {
    id: 's1',
    name: 'Crispy Chicken Sandwich',
    category: 'Sandwiches',
    price: 749,
    calories: 670,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20golden%20crispy%20fried%20chicken%20fillet%20sandwich%20in%20a%20brioche%20bun%20with%20lettuce%20and%20mayo,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Our Crispy Chicken Sandwich is made with 100% white meat chicken filet, seasoned and breaded and carefully layered with fresh lettuce, ripe tomato, and creamy mayonnaise.'
  },
  {
    id: 's2',
    name: 'Spicy Chicken Sandwich',
    category: 'Sandwiches',
    price: 799,
    calories: 700,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20red%20spicy%20crispy%20chicken%20fillet%20sandwich%20with%20jalapenos%20and%20spicy%20sauce,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A spicy version of our crispy chicken sandwich, featuring a kick of heat in the breading and a signature spicy sauce.',
    tags: ['Spicy']
  },
  {
    id: 's3',
    name: 'Grilled Chicken Sandwich',
    category: 'Sandwiches',
    price: 849,
    calories: 480,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20grilled%20chicken%20fillet%20sandwich%20with%20fresh%20vegetables%20and%20light%20sauce,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A lighter option featuring a juicy grilled chicken fillet topped with fresh vegetables.'
  },
  {
    id: 's4',
    name: 'Chicken Royale',
    category: 'Sandwiches',
    price: 899,
    calories: 590,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20long%20Chicken%20Royale%20crispy%20chicken%20fillet%20sandwich%20with%20premium%20toppings,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A long, premium crispy chicken fillet sandwich seasoned to perfection.'
  },
  {
    id: 's5',
    name: 'BK Chicken Club',
    category: 'Sandwiches',
    price: 949,
    calories: 750,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20layered%20BK%20Chicken%20Club%20sandwich%20with%20crispy%20chicken,%20bacon,%20cheese,%20lettuce,%20and%20tomato,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'A layered chicken sandwich with thick-cut bacon, melted cheese, lettuce, and ripe tomatoes.'
  },

  // SIDES
  {
    id: 'sd1',
    name: 'French Fries',
    category: 'Sides',
    price: 249,
    calories: 320,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20golden%20crispy%20regular%20French%20fries%20in%20a%20Burger%20King%20red%20box,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Hot, crispy golden fries perfectly salted.'
  },
  {
    id: 'sd2',
    name: 'Onion Rings',
    category: 'Sides',
    price: 299,
    calories: 410,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20golden%20crispy%20battered%20onion%20rings,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Crispy, golden onion rings.'
  },
  {
    id: 'sd3',
    name: 'Cheesy Tots',
    category: 'Sides',
    price: 349,
    calories: 310,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20small%20round%20cheesy%20potato%20tots,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Golden brown tots with warm, melted cheese inside.'
  },
  {
    id: 'sd4',
    name: 'Mozzarella Sticks',
    category: 'Sides',
    price: 449,
    calories: 330,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20golden%20fried%20mozzarella%20sticks%20with%20a%20side%20of%20dipping%20sauce,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Golden fried mozzarella sticks served with a side of zesty marinara sauce.'
  },
  {
    id: 'sd5',
    name: 'Mac n Cheetos',
    category: 'Sides',
    price: 399,
    calories: 380,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20orange%20Mac%20n%20Cheetos%20macaroni%20cheese%20bites,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Creamy mac n cheese inside a crispy, Cheetos-flavored crust.'
  },
  {
    id: 'sd6',
    name: 'Hash Browns',
    category: 'Sides',
    price: 199,
    calories: 250,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20golden%20crispy%20hash%20brown%20patties,%20clean%20white%20background,%20appetizing%20presentation?width=800&height=800&nologo=true',
    description: 'Crispy, golden brown hash brown patties.'
  },

  // DRINKS
  {
    id: 'd1',
    name: 'Coca-Cola®',
    category: 'Drinks',
    price: 199,
    calories: 140,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20classic%20Coca-Cola%20in%20a%20Burger%20King%20cup%20with%20ice%20and%20condensation,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Refreshing Coca-Cola Classic over ice.'
  },
  {
    id: 'd2',
    name: 'Chocolate Shake',
    category: 'Drinks',
    price: 549,
    calories: 580,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20thick%20chocolate%20milkshake%20with%20whipped%20cream%20on%20top,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'A thick and creamy chocolate milkshake topped with whipped cream.'
  },
  {
    id: 'd3',
    name: 'Hershey\'s Pie',
    category: 'Drinks',
    price: 450,
    calories: 310,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20slice%20of%20Hershey\'s%20chocolate%20pie%20on%20a%20white%20plate,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'A slice of crunchy chocolate crust and chocolatey filling topped with real HERSHEY’S® Chocolate Chips.'
  },
  {
    id: 'd4',
    name: 'Vanilla Shake',
    category: 'Drinks',
    price: 549,
    calories: 510,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20thick%20vanilla%20milkshake%20with%20whipped%20cream%20on%20top,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'A smooth and creamy vanilla milkshake topped with whipped cream.'
  },
  {
    id: 'd5',
    name: 'Strawberry Shake',
    category: 'Drinks',
    price: 549,
    calories: 530,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20pink%20strawberry%20milkshake%20with%20whipped%20cream%20on%20top,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'A creamy strawberry milkshake topped with whipped cream.'
  },
  {
    id: 'd6',
    name: 'Oreo Shake',
    category: 'Drinks',
    price: 599,
    calories: 610,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20thick%20Oreo%20cookies%20and%20cream%20milkshake%20with%20dark%20cookie%20crumbles,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Rich vanilla soft serve blended with OREO® cookie pieces.'
  },
  {
    id: 'd7',
    name: 'Minute Maid Lemonade',
    category: 'Drinks',
    price: 249,
    calories: 120,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20yellow%20Minute%20Maid%20lemonade%20in%20a%20cup%20with%20ice,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Refreshing lemonade made with Minute Maid.'
  },
  {
    id: 'd8',
    name: 'Iced Coffee',
    category: 'Drinks',
    price: 399,
    calories: 150,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20cold%20iced%20coffee%20drink%20with%20ice%20and%20cream%20on%20top,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Chilled coffee served over ice with a splash of cream.'
  },

  // COMBOS
  {
    id: 'c1',
    name: 'Whopper® Combo',
    category: 'Combos',
    price: 1399,
    calories: 1150,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Whopper%20burger%20meal%20with%20large%20fries%20and%20a%20large%20drink%20on%20a%20Burger%20King%20tray,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Classic Whopper served with large French fries and a refreshing large drink.'
  },
  {
    id: 'c2',
    name: 'Chicken Royale Combo',
    category: 'Combos',
    price: 1149,
    calories: 950,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Chicken%20Royale%20sandwich%20meal%20with%20fries%20and%20a%20drink%20on%20a%20tray,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Chicken Royale sandwich served with crispy fries and a soft drink.'
  },
  {
    id: 'c3',
    name: 'Spicy Chicken Combo',
    category: 'Combos',
    price: 1199,
    calories: 1050,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20spicy%20chicken%20sandwich%20meal%20with%20fries%20and%20a%20drink,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Hot and spicy chicken sandwich served with golden fries and a refreshing drink.'
  },
  {
    id: 'c4',
    name: 'Double Whopper® Combo',
    category: 'Combos',
    price: 1699,
    calories: 1400,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Double%20Whopper%20burger%20meal%20with%20large%20fries%20and%20a%20large%20drink,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Two flame-grilled beef patties served with large fries and a large drink.'
  },
  {
    id: 'c5',
    name: 'Family Bundle',
    category: 'Combos',
    price: 3499,
    calories: 4500,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Burger%20King%20Family%20Bundle%20with%204%20burgers,%204%20fries,%20and%204%20drinks%20arranged%20together%20on%20a%20table,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'A feast for the whole family: 4 burgers, 4 sets of fries, and 4 thirst-quenching drinks.',
    tags: ['Family Choice']
  },
  {
    id: 'c6',
    name: 'BK Breakfast Combo',
    category: 'Combos',
    price: 799,
    calories: 850,
    image: 'https://image.pollinations.ai/prompt/Professional%20food%20photography%20of%20a%20Burger%20King%20Breakfast%20Combo%20with%20hash%20browns,%20an%20egg%20muffin,%20and%20hot%20coffee%20on%20a%20breakfast%20tray,%20clean%20white%20background?width=800&height=800&nologo=true',
    description: 'Start your day right with golden hash browns, a tasty egg muffin, and hot coffee.'
  }
];

const CATEGORIES = ['All', 'Burgers', 'Sandwiches', 'Sides', 'Drinks', 'Combos'];

// Components
const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <div className="bg-bk-red p-1 rounded-full group-hover:rotate-12 transition-transform">
      <Flame className="text-white w-6 h-6 fill-white" />
    </div>
    <span className="font-display text-2xl text-bk-red italic">BURGER KING</span>
  </div>
);

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState<string>('Select Store');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Cart logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  // Layout components
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-bk-cream/90 backdrop-blur-md border-b border-bk-brown/5 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div onClick={() => setActivePage('home')}>
            <Logo />
          </div>
          <div className="hidden lg:flex items-center gap-6 font-display uppercase text-sm tracking-wide">
            <button onClick={() => setActivePage('menu')} className={`hover:text-bk-red transition-all ${activePage === 'menu' ? 'text-bk-red' : ''}`}>Menu</button>
            <button onClick={() => setActivePage('deals')} className={`hover:text-bk-red transition-all ${activePage === 'deals' ? 'text-bk-red' : ''}`}>Deals</button>
            <button onClick={() => setActivePage('loyalty')} className={`hover:text-bk-red transition-all ${activePage === 'loyalty' ? 'text-bk-red' : ''}`}>Loyalty</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActivePage('find')}
            className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-white rounded-full transition-colors text-xs font-medium border border-bk-brown/10"
          >
            <MapPin className="w-4 h-4 text-bk-red" />
            <span className="truncate max-w-[150px]">{location}</span>
          </button>
          
          <button 
            onClick={() => setActivePage('order')}
            className="flex items-center gap-2 bg-bk-red text-white px-5 py-2.5 rounded-full font-display uppercase text-xs shadow-lg hover:scale-105 active:scale-95 transition-all relative"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order Now</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-bk-yellow text-bk-brown text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-bk-cream">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );

  const MobileMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-bk-dark/60 z-[60] lg:hidden"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-bk-cream z-[70] p-6 lg:hidden shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6 font-display text-2xl uppercase italic">
              <button onClick={() => { setActivePage('menu'); setIsMenuOpen(false); }} className="block w-full text-left">Menu</button>
              <button onClick={() => { setActivePage('deals'); setIsMenuOpen(false); }} className="block w-full text-left">Deals</button>
              <button onClick={() => { setActivePage('loyalty'); setIsMenuOpen(false); }} className="block w-full text-left">Loyalty</button>
              <button onClick={() => { setActivePage('find'); setIsMenuOpen(false); }} className="block w-full text-left">Find a BK</button>
              <button onClick={() => { setActivePage('about'); setIsMenuOpen(false); }} className="block w-full text-left">The Brand</button>
            </div>
            <div className="mt-auto pt-10">
              <div className="p-4 bg-bk-orange/10 rounded-2xl">
                <p className="text-sm font-bold mb-2">Crown Rewards</p>
                <p className="text-xs text-bk-brown/60 mb-4">Earn points on every order and redeem for free food!</p>
                <button onClick={() => { setActivePage('loyalty'); setIsMenuOpen(false); }} className="w-full bg-bk-orange text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider">Join Now</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  const HomeSection = () => (
    <div className="space-y-12 pb-20">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080?brightness=0.6" 
            className="w-full h-full object-cover"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bk-dark text-white/10 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="flex items-center gap-2 text-bk-orange mb-4">
              <Flame className="w-5 h-5 fill-current" />
              <span className="font-display uppercase tracking-widest text-sm">Flame Grilled Since 1954</span>
            </div>
            <h1 className="font-display text-7xl lg:text-9xl uppercase italic leading-[0.9] mb-8">
              FLAME <br /> <span className="text-bk-orange">GRILLED</span> <br /> PERFECTION
            </h1>
            <p className="text-lg text-white/80 mb-10 max-w-lg leading-relaxed">
              Real ingredients, grilled over real flame for that smoky flavor you can't get anywhere else. Freshly made exactly how you like it.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setActivePage('menu')} className="btn-primary flex items-center gap-2">
                Order Now <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setActivePage('menu')} className="btn-secondary">
                View Menu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl uppercase italic mb-2">Fan Favorites</h2>
            <p className="text-bk-brown/60">The items everyone is talking about.</p>
          </div>
          <button onClick={() => setActivePage('menu')} className="text-bk-red font-display uppercase tracking-wider text-sm flex items-center gap-2 hover:gap-3 transition-all">
            See entire menu <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {product.tags && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="bg-bk-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-2xl uppercase">{product.name}</h3>
                  <span className="font-bold text-bk-red text-xl">Rs {product.price}</span>
                </div>
                <p className="text-sm text-bk-brown/50 line-clamp-2">{product.description}</p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-medium bg-bk-cream px-3 py-1 rounded-full">{product.calories} Cal</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-bk-brown text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-bk-red transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-bk-orange rounded-[3rem] p-10 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="max-w-xl text-white relative z-10 text-center lg:text-left">
            <h2 className="font-display text-5xl lg:text-6xl uppercase italic leading-tight mb-6">
              YOUR BK <br /> IN YOUR POCKET
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Download the app for exclusive deals, points, and mobile ordering.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12 cursor-pointer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-12 cursor-pointer" />
            </div>
          </div>
          
          <div className="relative z-10 lg:ml-auto">
            <motion.div 
              initial={{ rotate: -10, y: 50 }}
              whileInView={{ rotate: -5, y: 0 }}
              transition={{ type: "spring", stiffness: 50 }}
              className="bg-bk-dark w-64 h-[450px] rounded-[2.5rem] border-8 border-bk-dark relative overflow-hidden shadow-2xl"
            >
              <div className="p-4 bg-bk-orange">
                <Logo />
              </div>
              <div className="p-4 space-y-4">
                <div className="h-32 bg-white/10 rounded-xl animate-pulse" />
                <div className="h-4 bg-white/10 w-2/3 rounded-full" />
                <div className="h-4 bg-white/10 w-1/2 rounded-full" />
                <div className="pt-4 grid grid-cols-2 gap-2">
                  <div className="h-20 bg-white/10 rounded-xl" />
                  <div className="h-20 bg-white/10 rounded-xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );

  const MenuSection = () => {
    const filteredProducts = PRODUCTS.filter(p => 
      (activeCategory === 'All' || p.category === activeCategory) &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-5xl uppercase italic mb-2">Our Menu</h1>
            <p className="text-bk-brown/60">Flame-grilled favorites since 1954.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bk-brown/30 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search favorites..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-bk-brown/10 rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-bk-red/20 transition-all font-medium text-sm"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sticky top-[73px] z-40 bg-bk-cream/80 backdrop-blur-sm shadow-sm pt-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-display uppercase text-sm transition-all shadow-sm ${
                activeCategory === cat ? 'bg-bk-red text-white' : 'bg-white text-bk-brown hover:bg-bk-brown/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl p-4 shadow-md hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1 flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-xl uppercase leading-tight">{product.name}</h3>
                </div>
                <p className="text-xs text-bk-brown/40">{product.calories} Cal</p>
                <p className="text-xs text-bk-brown/60 line-clamp-2 mt-2 font-medium">{product.description}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-bk-brown/5 flex items-center justify-between">
                <span className="font-bold text-bk-brown">Rs {product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-bk-red text-white p-2 rounded-xl flex items-center gap-2 hover:bg-bk-dark transition-colors font-display text-xs"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </motion.div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-bk-orange/20">
                <Search className="w-8 h-8 text-bk-orange" />
              </div>
              <h3 className="text-xl font-bold mb-1">No items found</h3>
              <p className="text-bk-brown/50">Try searching for something else like "Whopper"</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CartSection = () => (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-10">
        <div onClick={() => setActivePage('menu')} className="cursor-pointer p-2 bg-white rounded-full text-bk-brown hover:bg-bk-red hover:text-white transition-all">
          <Minus className="w-5 h-5 rotate-90" />
        </div>
        <h1 className="font-display text-5xl uppercase italic">Your Order</h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl">
          <div className="bg-bk-cream w-32 h-32 flex items-center justify-center rounded-full mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-bk-brown/20" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Your bag is empty</h3>
          <p className="text-bk-brown/60 mb-8 max-w-xs mx-auto">Looks like you haven't added anything yet. The Whopper is waiting!</p>
          <button onClick={() => setActivePage('menu')} className="btn-primary">Browse Menu</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm flex gap-6 items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl flex-shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl uppercase tracking-wide">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-bk-brown/20 hover:text-bk-red transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-bk-cream rounded-full px-1 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-all">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-lg">Rs {item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl sticky top-24">
              <h3 className="font-display text-2xl uppercase mb-6 pb-4 border-b border-bk-brown/5">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-bk-brown/60 text-sm">
                  <span>Subtotal</span>
                  <span>Rs {cartTotal}</span>
                </div>
                <div className="flex justify-between text-bk-brown/60 text-sm">
                  <span>Delivery Fee</span>
                  <span>Rs 150</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-4 border-t border-bk-brown/5">
                  <span>Total</span>
                  <span className="text-bk-red">Rs {cartTotal + 150}</span>
                </div>
              </div>

              {/* Upsell */}
              <div className="bg-bk-cream p-4 rounded-2xl mb-8">
                <p className="text-xs font-bold uppercase mb-2 text-bk-brown/60">Complete your meal</p>
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/upsell/100/100" className="w-12 h-12 rounded-lg" />
                  <div className="flex-grow">
                    <p className="text-xs font-bold leading-none">HERSHEY'S® Pie</p>
                    <p className="text-[10px] text-bk-brown/60">Rs 290</p>
                  </div>
                  <button className="bg-bk-red text-white p-1.5 rounded-lg">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button className="w-full btn-primary py-4 text-center">Proceed to Checkout</button>
              
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-bk-brown/40 px-2">
                  <CheckCircle2 className="w-3 h-3 text-bk-orange" />
                  Contactless delivery available
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-bk-brown/40 px-2">
                  <CheckCircle2 className="w-3 h-3 text-bk-orange" />
                  Earn {(cartTotal / 10).toFixed(0)} Crown Points
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const DealsSection = () => (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-display text-6xl uppercase italic mb-4">Hot Deals</h1>
        <p className="text-bk-brown/60 text-lg">Great food, even better prices. Catch them before they flame out!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Sizzlin' Sunday", desc: "Buy 1 Whopper Jr. Get 1 FREE!", price: "399", icon: <Clock /> },
          { title: "Family Feast", desc: "4 Whoppers + 2 XL Fries + 1.5L Coke", price: "2899", icon: <Award /> },
          { title: "New User Bonus", desc: "Flat 20% OFF on your first order", price: "SPECIAL", icon: <CheckCircle2 /> }
        ].map((deal, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bk-red text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="mb-8 bg-white/20 w-16 h-16 flex items-center justify-center rounded-2xl">
              {deal.icon}
            </div>
            <h3 className="font-display text-4xl uppercase leading-none mb-4">{deal.title}</h3>
            <p className="text-white/80 mb-10">{deal.desc}</p>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-white/50 mb-1">Starting from</p>
                <p className="font-display text-3xl italic">{deal.price === 'SPECIAL' ? deal.price : `Rs ${deal.price}`}</p>
              </div>
              <button onClick={() => setActivePage('menu')} className="bg-white text-bk-red px-6 py-3 rounded-2xl font-display uppercase text-xs tracking-wider shadow-lg">Get Deal</button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Promo banner */}
      <div className="bg-bk-yellow/20 border-2 border-dashed border-bk-yellow rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl uppercase mb-4">Limited Time Only</h2>
          <p className="text-bk-brown/80">Check back every day for seasonal promotions and limited-time flame-grilled experiments.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="block font-display text-5xl">22</span>
            <span className="text-[10px] uppercase font-bold opacity-50">Hours</span>
          </div>
          <div className="font-display text-5xl opacity-20">:</div>
          <div className="text-center">
            <span className="block font-display text-5xl">45</span>
            <span className="text-[10px] uppercase font-bold opacity-50">Mins</span>
          </div>
          <div className="font-display text-5xl opacity-20">:</div>
          <div className="text-center">
            <span className="block font-display text-5xl">12</span>
            <span className="text-[10px] uppercase font-bold opacity-50">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );

  const FindSection = () => {
    const stores = [
      { name: "DHA Stage 1", address: "Commercial Area, Lahore", hours: "11 AM - 3 AM", status: "Open Now" },
      { name: "Gulberg III", address: "Main Boulevard, Lahore", hours: "11 AM - 1 AM", status: "Closing Soon" },
      { name: "Siddique Trade Center", address: "Main Gulberg, Lahore", hours: "11 AM - 12 PM", status: "Open Now" },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <h1 className="font-display text-5xl uppercase italic mb-10">Find a Burger King</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bk-brown/30 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Enter city or area..." 
                className="w-full bg-white border border-bk-brown/10 rounded-2xl py-4 px-12 focus:outline-none transition-all font-medium"
              />
            </div>
            
            <button 
              onClick={() => {
                navigator.geolocation.getCurrentPosition((pos) => {
                  setLocation("DHA Stage 1");
                });
              }}
              className="w-full bg-white p-4 rounded-2xl border-2 border-bk-red text-bk-red font-display uppercase text-sm flex items-center justify-center gap-2 hover:bg-bk-red hover:text-white transition-all shadow-md group"
            >
              <Navigation className="w-5 h-5 group-hover:animate-pulse" /> Use My Location
            </button>

            <div className="space-y-4">
              {stores.map((store, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-bk-brown/5 hover:border-bk-red transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl uppercase">{store.name}</h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                      store.status === 'Open Now' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {store.status}
                    </span>
                  </div>
                  <p className="text-sm text-bk-brown/50 mb-4">{store.address}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-bk-brown/30 uppercase">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {store.hours}</div>
                    <div className="flex items-center gap-1 text-bk-red group-hover:translate-x-1 transition-transform">Directions <ChevronRight className="w-3 h-3" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 min-h-[500px] bg-bk-cream border-2 border-bk-brown/5 rounded-[3rem] overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 grayscale opacity-50 flex items-center justify-center text-bk-brown/20 uppercase font-display text-7xl select-none">
              MAP VIEW
            </div>
            {/* Real map placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-bk-red/20 rounded-full animate-ping absolute -top-4 -left-4" />
                <MapPin className="w-12 h-12 text-bk-red relative drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoyaltySection = () => (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="bg-bk-dark text-white rounded-[4rem] p-10 lg:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bk-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-3xl relative z-10">
          <div className="bg-bk-orange w-16 h-16 rounded-2xl flex items-center justify-center mb-8 rotate-12 shadow-2xl">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-7xl lg:text-9xl uppercase italic leading-none mb-8">
            ROYAL <br /> <span className="text-bk-orange">REWARDS</span>
          </h1>
          <p className="text-xl text-white/70 mb-12 max-w-lg">
            Join Crown Rewards today. Earn 10 points for every Rs 100 spent. Redeem for your favorite flame-grilled meals!
          </p>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] mb-12">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xs uppercase font-bold text-white/40 mb-1">Your Balance</p>
                <p className="font-display text-5xl">1,250 <span className="text-bk-orange">PTS</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase font-bold text-white/40 mb-1">Current Tier</p>
                <p className="font-display text-3xl uppercase italic text-bk-yellow">King Tier</p>
              </div>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-bk-orange shadow-[0_0_20px_rgba(255,135,50,0.5)]" 
              />
            </div>
            <p className="text-xs text-white/30 mt-4 text-center">250 points until next reward</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { pts: 250, item: "Soft Drink" },
              { pts: 500, item: "Regular Fries" },
              { pts: 800, item: "Cheese Burger" }
            ].map((reward, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group">
                <p className="font-display text-2xl mb-1">{reward.pts} PTS</p>
                <p className="text-white/50 text-sm group-hover:text-white transition-colors">{reward.item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BrandSection = () => (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 space-y-32">
      <div className="max-w-3xl">
        <h1 className="font-display text-8xl uppercase italic leading-none mb-10">THE FLAME <br /> SINCE '54</h1>
        <p className="text-2xl text-bk-brown/80 leading-relaxed mb-12">
          At Burger King, we believe in the power of the flame. It's how we started in Miami back in 1954, and it's how we still do it today in over 100 countries.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-[4/5] bg-bk-brown p-8 rounded-[3rem] text-white flex flex-col justify-end">
             <h3 className="font-display text-4xl mb-2">OUR ROOTS</h3>
             <p className="text-xs opacity-60">Florida, 1954. The very first flame-grilled burger was born.</p>
          </div>
          <div className="aspect-[4/5] bg-bk-orange p-8 rounded-[3rem] text-white flex flex-col justify-end">
             <h3 className="font-display text-4xl mb-2">QUALITY</h3>
             <p className="text-xs opacity-60">Real ingredients. No nonsense. Just great food.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
           <img 
            src="https://picsum.photos/seed/halal/800/800" 
            className="w-full rounded-[3.5rem] shadow-2xl" 
            alt="Halal Certification" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="lg:w-1/2 space-y-8">
          <div className="bg-bk-yellow inline-block p-4 rounded-2xl rotate-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-bk-brown" />
          </div>
          <h2 className="font-display text-6xl uppercase italic leading-tight">CERTIFIED <br /> HALAL</h2>
          <p className="text-xl text-bk-brown/70 leading-relaxed">
            Every single ingredient we use is 100% Halal certified. We take our commitment to our community seriously, ensuring that you can enjoy every bite with complete peace of mind.
          </p>
          <button className="text-bk-red font-display uppercase tracking-widest text-sm flex items-center gap-2 border-b-2 border-bk-red pb-1">
            Learn more about our sourcing
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MobileMenu />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'home' && <HomeSection />}
            {activePage === 'menu' && <MenuSection />}
            {activePage === 'order' && <CartSection />}
            {activePage === 'deals' && <DealsSection />}
            {activePage === 'find' && <FindSection />}
            {activePage === 'loyalty' && <LoyaltySection />}
            {activePage === 'about' && <BrandSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-bk-dark text-white pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <Logo />
              <p className="text-white/50 text-sm leading-relaxed">
                Flame-grilled flavor you can't get anywhere else. Freshly made exactly how you like it.
              </p>
              <div className="flex gap-4">
                <div className="p-2 bg-white/5 rounded-full hover:bg-bk-orange transition-colors cursor-pointer"><Facebook className="w-5 h-5" /></div>
                <div className="p-2 bg-white/5 rounded-full hover:bg-bk-orange transition-colors cursor-pointer"><Twitter className="w-5 h-5" /></div>
                <div className="p-2 bg-white/5 rounded-full hover:bg-bk-orange transition-colors cursor-pointer"><Instagram className="w-5 h-5" /></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-display text-xl mb-6">Menu</h4>
              <ul className="space-y-4 text-white/50 text-sm font-medium">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('menu')}>Burgers</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('menu')}>Chicken</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('menu')}>Sides</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('menu')}>Drinks</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-xl mb-6">Company</h4>
              <ul className="space-y-4 text-white/50 text-sm font-medium">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('about')}>Our Story</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
                <li className="hover:text-white cursor-pointer transition-colors">News Room</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-xl mb-6">Support</h4>
              <ul className="space-y-4 text-white/50 text-sm font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Customer Feedback</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('find')}>Find a Store</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">
              TM & © 2026 Burger King Corporation. All Rights Reserved.
            </p>
            <div className="flex gap-4">
               <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Order Bar (CRO) */}
      <AnimatePresence>
        {activePage !== 'order' && activePage !== 'menu' && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
          >
            <button 
              onClick={() => setActivePage('menu')}
              className="w-full bg-bk-dark text-white p-2 rounded-full flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="bg-bk-red p-3 rounded-full">
                <Flame className="w-5 h-5" />
              </div>
              <div className="flex-grow text-left">
                <p className="font-display text-sm uppercase tracking-wider">Start Your Order</p>
                <p className="text-[10px] text-white/50 uppercase font-bold">Pick up or Delivery</p>
              </div>
              <div className="mr-4 group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
