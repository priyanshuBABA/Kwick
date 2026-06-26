import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURATION & DATA ---

const COLORS = {
  primary: '#8B1A1A', // Warm Maroon
  accent: '#D4A017',  // Gold
  cream: '#FFF8F0',
  white: '#FFFFFF',
  text: '#1A0800',
  muted: '#666666',
  lightMaroon: '#FEF0F0',
  bgGradient: 'linear-gradient(135deg, #FFF0E0 0%, #FEF0F0 100%)',
  dark: '#1A0800',
  whatsapp: '#25D366',
};

const weightOptions = [
  { label: "0.5 kg",  multiplier: 1.0  },
  { label: "1 kg",    multiplier: 1.8  },
  { label: "1.5 kg",  multiplier: 2.5  },
  { label: "2 kg",    multiplier: 3.2  },
  { label: "2.5 kg",  multiplier: 3.9  },
  { label: "3 kg",    multiplier: 4.5  },
  { label: "4 kg",    multiplier: 5.8  },
  { label: "5 kg",    multiplier: 7.0  },
];

const cakeData = [
  { name: "Classic Chocolate Cake", cat: "Chocolate", price: "₹450", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", desc: "Rich dark chocolate layers with silky ganache frosting.", badge: "Bestseller" },
  { name: "Vanilla Celebration Cake", cat: "Vanilla", price: "₹380", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80", desc: "Fluffy vanilla sponge with smooth buttercream and fresh decorations.", badge: null },
  { name: "Strawberry Delight Cake", cat: "Fruit", price: "₹500", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80", desc: "Fresh strawberry cream cake with soft sponge and whipped cream.", badge: "Fresh" },
  { name: "Rainbow Theme Cake", cat: "Theme", price: "₹750", img: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&q=80", desc: "Vibrant multi-coloured layers with rainbow frosting for kids.", badge: "Popular" },
  { name: "Black Forest Cake", cat: "Chocolate", price: "₹550", img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&q=80", desc: "Classic Black Forest with cherry compote and chocolate shavings.", badge: null },
  { name: "Butterscotch Cake", cat: "Vanilla", price: "₹420", img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&q=80", desc: "Caramel butterscotch flavour with toffee bits and smooth frosting.", badge: "Bestseller" },
  { name: "Pineapple Fresh Cream", cat: "Fruit", price: "₹400", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&q=80", desc: "Tropical pineapple chunks with light whipped cream frosting.", badge: null },
  { name: "Red Velvet Cake", cat: "Special", price: "₹620", img: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&q=80", desc: "Iconic red velvet with cream cheese frosting and velvety crumb.", badge: "Premium" },
  { name: "Unicorn Theme Cake", cat: "Theme", price: "₹950", img: "https://images.unsplash.com/photo-1547047803-fa6bb8f03c56?w=500&q=80", desc: "Magical unicorn with pastel swirls, edible glitter horn and rainbow mane.", badge: "Trendy" },
  { name: "Mango Cream Cake", cat: "Fruit", price: "₹480", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80", desc: "Fresh Alphonso mango pulp cake with mango cream frosting.", badge: "Seasonal" },
  { name: "Truffle Chocolate Cake", cat: "Chocolate", price: "₹680", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80", desc: "Ultra rich chocolate truffle with ganache drip and chocolate curls.", badge: null },
  { name: "Kids Cartoon Cake", cat: "Theme", price: "₹800", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", desc: "Custom cartoon character cake — Doraemon, Peppa Pig, Mickey and more!", badge: "Custom" },
  { name: "Wedding Tier Cake", cat: "Wedding", price: "₹2500", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&q=80", desc: "Elegant multi-tier wedding cake with fondant flowers and premium decor.", badge: "Luxury" },
  { name: "Anniversary Fondant Cake", cat: "Special", price: "₹900", img: "https://images.unsplash.com/photo-1522767131594-6b7e96848fda?w=500&q=80", desc: "Beautiful fondant anniversary cake with custom message and floral design.", badge: "Popular" },
  { name: "Choco Truffle Drip Cake", cat: "Chocolate", price: "₹750", img: "https://images.unsplash.com/photo-1542834369-f10ebf06d3e4?w=500&q=80", desc: "Trendy drip cake with chocolate ganache drizzle and Oreo decorations.", badge: "Trendy" },
  { name: "Kiwi Cream Cake", cat: "Fruit", price: "₹520", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80", desc: "Fresh kiwi slices with vanilla cream layers — light and refreshing.", badge: null },
  { name: "Photo Print Cake", cat: "Special", price: "₹700", img: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=500&q=80", desc: "Edible photo printed on cake with your favourite picture.", badge: "Popular" },
  { name: "Blueberry Cheesecake", cat: "Special", price: "₹650", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80", desc: "Creamy cheesecake base with fresh blueberry compote topping.", badge: "Premium" },
  { name: "Barbie Theme Cake", cat: "Theme", price: "₹1100", img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=500&q=80", desc: "Gorgeous Barbie doll cake with pink ruffles and sparkly decorations.", badge: "Special" },
  { name: "Coffee Mocha Cake", cat: "Special", price: "₹580", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80", desc: "Rich coffee mocha layers with espresso buttercream frosting.", badge: null },
  { name: "Lemon Zest Cake", cat: "Fruit", price: "₹420", img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500&q=80", desc: "Tangy lemon sponge with citrus glaze and white cream — fresh and zesty.", badge: null },
  { name: "Oreo Cake", cat: "Chocolate", price: "₹500", img: "https://images.unsplash.com/photo-1568051243858-533a607809a5?w=500&q=80", desc: "Oreo cookie crumble layers with cream cheese frosting and Oreo decor.", badge: "Kids Fav" },
  { name: "Floral Fondant Cake", cat: "Special", price: "₹1050", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80", desc: "Artistic fondant floral cake with hand-crafted sugar flowers in pastel shades.", badge: "Artistic" },
  { name: "Coconut Cream Cake", cat: "Vanilla", price: "₹450", img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&q=80", desc: "Toasted coconut flakes with silky cream layers — tropical in every bite.", badge: null },
  { name: "Superhero Theme Cake", cat: "Theme", price: "₹1000", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=80", desc: "Superman, Spiderman, Batman — customized superhero cake for your hero.", badge: "Custom" },
  { name: "Baby Shower Cake", cat: "Special", price: "₹900", img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=500&q=80", desc: "Pastel baby shower cake with teddy bear and baby shoe decorations.", badge: "Trending" },
  { name: "Chocolate Mousse Cake", cat: "Chocolate", price: "₹680", img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&q=80", desc: "Light and airy chocolate mousse layers with dark chocolate shards.", badge: null },
  { name: "Rasmalai Cake", cat: "Special", price: "₹750", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", desc: "Fusion cake with rasmalai milk soak, saffron cream and pistachio garnish.", badge: "Desi Special" },
  { name: "Mint Chocolate Cake", cat: "Chocolate", price: "₹550", img: "https://images.unsplash.com/photo-1542834369-f10ebf06d3e4?w=500&q=80", desc: "Refreshing mint-infused chocolate layers with green mint cream frosting.", badge: null },
  { name: "Gulab Jamun Cake", cat: "Special", price: "₹700", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80", desc: "Rose-flavoured sponge soaked in sugar syrup with gulab jamun pieces on top.", badge: "Desi Special" },
  { name: "Pastel Ombre Cake", cat: "Special", price: "₹880", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80", desc: "Beautiful ombre pastel frosting cake with gradient pink to white design.", badge: "Elegant" },
  { name: "Engagement Cake", cat: "Wedding", price: "₹1200", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&q=80", desc: "Romantic engagement themed cake with gold accents and rose decorations.", badge: "Special" },
  { name: "Galaxy Theme Cake", cat: "Theme", price: "₹1100", img: "https://images.unsplash.com/photo-1547047803-fa6bb8f03c56?w=500&q=80", desc: "Stunning galaxy/space themed cake with edible glitter stars.", badge: "Trendy" },
  { name: "Rose Milk Cake", cat: "Vanilla", price: "₹480", img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&q=80", desc: "Delicate rose water infused milk cake with rose petal decorations.", badge: null },
  { name: "Chocolate Fudge Cake", cat: "Chocolate", price: "₹600", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80", desc: "Fudgy brownie layers with chocolate ganache and walnut crumble topping.", badge: null },
  { name: "Pinata Cake", cat: "Theme", price: "₹1300", img: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&q=80", desc: "Fun surprise pinata cake filled with chocolates and candies inside!", badge: "Surprise" },
  { name: "Lotus Biscoff Cake", cat: "Special", price: "₹780", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", desc: "Premium Lotus Biscoff cookie cream layers with caramelized biscuit crumble.", badge: "Premium" },
  { name: "Fruit Basket Cake", cat: "Fruit", price: "₹650", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80", desc: "Fresh seasonal fruits arranged artistically on light cream sponge.", badge: null },
  { name: "Minecraft Theme Cake", cat: "Theme", price: "₹950", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=80", desc: "Blocky Minecraft themed cake with fondant creeper and pixel art design.", badge: "Trendy" },
  { name: "Saffron Kesar Cake", cat: "Special", price: "₹720", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&q=80", desc: "Royal kesar flavoured cake with pistachio garnish and silver varq.", badge: "Royal" },
  { name: "Caramel Drip Cake", cat: "Special", price: "₹820", img: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&q=80", desc: "Smooth caramel drip over vanilla sponge with salted caramel cream.", badge: null },
  { name: "Heart Shape Cake", cat: "Special", price: "₹600", img: "https://images.unsplash.com/photo-1522767131594-6b7e96848fda?w=500&q=80", desc: "Romantic heart-shaped cake — perfect for anniversaries and Valentine's.", badge: "Romantic" },
  { name: "Khoya Milk Cake", cat: "Special", price: "₹550", img: "https://images.unsplash.com/photo-1547047803-fa6bb8f03c56?w=500&q=80", desc: "Traditional desi khoya milk cake with cardamom and dry fruit topping.", badge: "Desi" },
  { name: "Doctor Theme Cake", cat: "Theme", price: "₹1000", img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&q=80", desc: "Professional doctor/nurse theme cake for medical graduations!", badge: "Custom" },
  { name: "Tres Leches Cake", cat: "Special", price: "₹680", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80", desc: "Three-milk soaked ultra moist cake with whipped cream and cinnamon.", badge: null },
  { name: "Choco Lava Cake", cat: "Chocolate", price: "₹350", img: "https://images.unsplash.com/photo-1568051243858-533a607809a5?w=500&q=80", desc: "Warm individual chocolate lava cake with molten center — served fresh!", badge: "Must Try" },
  { name: "Number Shape Cake", cat: "Special", price: "₹1400", img: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=500&q=80", desc: "Custom number-shaped cake with cream puffs, macarons and fresh fruit.", badge: "Unique" },
  { name: "Graduation Cake", cat: "Special", price: "₹950", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&q=80", desc: "Celebrate graduation with a customized academic-themed fondant cake.", badge: "Special" },
  { name: "Princess Castle Cake", cat: "Theme", price: "₹1200", img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=500&q=80", desc: "Beautiful princess castle cake with fondant towers and edible flowers.", badge: "Special" },
  { name: "Football Theme Cake", cat: "Theme", price: "₹900", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", desc: "Sports themed football cake perfect for young football enthusiasts.", badge: null },
  { name: "Tiramisu Inspired Cake", cat: "Special", price: "₹720", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80", desc: "Coffee-soaked layers with mascarpone cream and cocoa powder dusting.", badge: null },
  { name: "Mixed Berry Cake", cat: "Fruit", price: "₹560", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80", desc: "Fresh mixed berries — blueberry, raspberry, strawberry on vanilla cream.", badge: "Fresh" },
  { name: "Hazelnut Crunch Cake", cat: "Chocolate", price: "₹720", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80", desc: "Rich hazelnut praline layers with Nutella cream and crunchy feuilletine.", badge: "Rich" },
  { name: "White Forest Cake", cat: "Vanilla", price: "₹580", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80", desc: "Delicate white chocolate sponge with cherry and white cream frosting.", badge: null }
];

// --- HELPERS ---

const calculatePrice = (basePriceStr, weightIdx) => {
  const base = parseInt(basePriceStr.replace('₹', ''));
  const multiplier = weightOptions[weightIdx].multiplier;
  return Math.round((base * multiplier) / 10) * 10;
};

const sendWhatsAppOrder = (cake, weightIdx) => {
  const selectedWeight = weightOptions[weightIdx];
  const calculatedPrice = calculatePrice(cake.price, weightIdx);
  const msg = `🎂 *New Cake Order — Mishra Ji Cake*\n\n📋 *Order Details:*\n• Cake Name  : ${cake.name}\n• Flavour    : ${cake.cat}\n• Weight     : ${selectedWeight.label}\n• Price      : ₹${calculatedPrice}\n\n📍 *Delivery / Pickup details will be shared shortly.*\n\n_Please confirm availability and delivery time._\n\n*Thank you! 🙏*`;
  const url = `https://wa.me/917870506495?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
};

// --- COMPONENTS ---

const Marquee = () => (
  <div style={{
    background: COLORS.primary,
    color: '#FFD700',
    padding: '12px 0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '1px',
    zIndex: 10
  }}>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
    <div style={{
      display: 'inline-block',
      animation: 'marquee 30s linear infinite',
      paddingLeft: '100%'
    }}>
      {[1, 2].map(i => (
        <span key={i} style={{ display: 'inline-block' }}>
          Birthday Cakes • Wedding Cakes • Anniversary Cakes • Custom Cakes • Eggless Options • Fresh Daily • Order on Call • Madhopur Munger &nbsp;&nbsp;&nbsp;&nbsp;
          Birthday Cakes • Wedding Cakes • Anniversary Cakes • Custom Cakes • Eggless Options • Fresh Daily • Order on Call • Madhopur Munger &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      ))}
    </div>
  </div>
);

const SectionLabel = ({ children, color = COLORS.primary }) => (
  <span style={{
    color: color,
    textTransform: 'uppercase',
    letterSpacing: '3px',
    fontSize: '0.8rem',
    fontWeight: '800',
    display: 'block',
    marginBottom: '10px'
  }}>{children}</span>
);

const CakeCard = ({ cake, onOpenModal }) => {
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0); // 0 = 0.5kg
  const cardPrice = calculatePrice(cake.price, selectedWeightIdx);
  const basePrice = parseInt(cake.price.replace('₹', ''));

  return (
    <div className="cake-card" style={{
      background: COLORS.white,
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column'
    }} 
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 26, 26, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
    }}
    onClick={() => onOpenModal(cake, selectedWeightIdx)}
    >
      {/* Image Container */}
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img src={cake.img} alt={cake.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="card-img" />
        
        {cake.badge && (
          <div style={{
            position: 'absolute', top: '15px', left: '15px',
            background: COLORS.accent, color: COLORS.white,
            padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '800',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>{cake.badge}</div>
        )}
        
        <div style={{
          position: 'absolute', top: '15px', right: '15px',
          background: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '50px',
          display: 'flex', alignItems: 'center', gap: '5px',
          border: '1px solid #22C55E'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }}></div>
          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#166534' }}>EGGLESS</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ fontSize: '0.75rem', color: COLORS.muted, fontWeight: '600', marginBottom: '5px' }}>{cake.cat}</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: COLORS.text, marginBottom: '10px', fontFamily: "'Playfair Display', serif" }}>{cake.name}</h3>
        <p style={{ fontSize: '0.85rem', color: COLORS.muted, marginBottom: '15px', lineHeight: '1.4' }}>{cake.desc}</p>

        {/* Weight Selector */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '700', marginBottom: '8px', color: COLORS.text }}>SELECT WEIGHT:</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[0, 1, 2, 3, 5].map(idx => (
              <button 
                key={idx}
                onClick={(e) => { e.stopPropagation(); setSelectedWeightIdx(idx); }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  border: `1.5px solid ${selectedWeightIdx === idx ? COLORS.primary : '#E5E7EB'}`,
                  background: selectedWeightIdx === idx ? COLORS.primary : 'transparent',
                  color: selectedWeightIdx === idx ? COLORS.white : COLORS.text,
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                {weightOptions[idx].label}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '15px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: COLORS.muted, textDecoration: 'line-through' }}>₹{basePrice}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: '900', color: COLORS.primary }}>₹{cardPrice}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: '600', color: COLORS.muted }}>for {weightOptions[selectedWeightIdx].label}</span>
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); sendWhatsAppOrder(cake, selectedWeightIdx); }}
            style={{
              background: COLORS.whatsapp,
              color: COLORS.white,
              border: 'none',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ cake, initialWeightIdx, onClose }) => {
  const [weightIdx, setWeightIdx] = useState(initialWeightIdx);
  const totalPrice = calculatePrice(cake.price, weightIdx);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(timer);
  }, [weightIdx]);

  if (!cake) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(5px)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }} onClick={onClose}>
      <style>{`
        @keyframes modalPricePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .price-pulse { animation: modalPricePulse 0.3s ease-out; }
      `}</style>
      <div style={{
        background: COLORS.white, width: '100%', maxWidth: '900px',
        borderRadius: '30px', overflow: 'hidden', position: 'relative',
        maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)', border: 'none',
          fontSize: '20px', cursor: 'pointer', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}>✕</button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Left: Image */}
          <div style={{ height: '400px' }}>
            <img src={cake.img} alt={cake.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Right: Details */}
          <div style={{ padding: '40px' }}>
            <div style={{ fontSize: '0.9rem', color: COLORS.accent, fontWeight: '800', marginBottom: '5px' }}>{cake.cat}</div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: COLORS.primary, marginBottom: '15px', fontFamily: "'Playfair Display', serif" }}>{cake.name}</h2>
            <p style={{ color: COLORS.muted, lineHeight: '1.6', marginBottom: '30px' }}>{cake.desc}</p>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ fontWeight: '800', marginBottom: '15px', fontSize: '0.9rem' }}>CHOOSE WEIGHT:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {weightOptions.map((w, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setWeightIdx(idx)}
                    style={{
                      padding: '12px 5px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      border: `2px solid ${weightIdx === idx ? COLORS.primary : '#F3F4F6'}`,
                      background: weightIdx === idx ? COLORS.primary : COLORS.white,
                      color: weightIdx === idx ? COLORS.white : COLORS.text,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      transform: weightIdx === idx ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <div style={{ marginBottom: '4px' }}>{w.label}</div>
                    <div style={{ opacity: 0.8, fontSize: '0.65rem' }}>₹{calculatePrice(cake.price, idx)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div style={{
              background: '#FFF9F2', padding: '20px', borderRadius: '20px',
              borderLeft: `5px solid ${COLORS.primary}`, marginBottom: '30px'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: COLORS.primary, marginBottom: '10px', textTransform: 'uppercase' }}>Your Order Summary</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: COLORS.muted }}>Cake</span>
                  <span style={{ fontWeight: '700' }}>{cake.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: COLORS.muted }}>Weight</span>
                  <span style={{ fontWeight: '700' }}>{weightOptions[weightIdx].label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: COLORS.muted }}>Flavour</span>
                  <span style={{ fontWeight: '700' }}>{cake.cat}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: COLORS.muted, fontWeight: '600' }}>TOTAL AMOUNT:</div>
                <div className={pulse ? 'price-pulse' : ''} style={{ fontSize: '2rem', fontWeight: '900', color: COLORS.accent }}>₹{totalPrice}</div>
              </div>
              <button 
                onClick={() => sendWhatsAppOrder(cake, weightIdx)}
                style={{
                  background: COLORS.whatsapp, color: COLORS.white,
                  border: 'none', padding: '15px 30px', borderRadius: '15px',
                  fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  boxShadow: '0 10px 20px rgba(37, 211, 102, 0.3)'
                }}
              >
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message }) => (
  <div style={{
    position: 'fixed', bottom: '30px', right: '30px',
    background: COLORS.text, color: COLORS.white,
    padding: '15px 25px', borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    zIndex: 10000, fontWeight: '600',
    display: 'flex', alignItems: 'center', gap: '10px',
    animation: 'toastSlideIn 0.3s ease-out'
  }}>
    <style>{`
      @keyframes toastSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `}</style>
    <div style={{ color: '#22C55E' }}>✓</div>
    {message}
  </div>
);

// --- MAIN PAGE ---

export default function MishrajiCakes() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCakeModal, setSelectedCakeModal] = useState(null);
  const [modalWeight, setModalWeight] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', phone: '', cakeType: 'Chocolate', weight: '1 kg', date: '', note: ''
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = (cake, weightIdx) => {
    setSelectedCakeModal(cake);
    setModalWeight(weightIdx || 1); // Default to 1kg in modal
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `🎂 *New Inquiry — Mishra Ji Cake*\n\n📋 *Details:*\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Cake Type: ${formData.cakeType}\n• Weight: ${formData.weight}\n• Date: ${formData.date}\n• Note: ${formData.note}\n\n*Please confirm availability.* 🙏`;
    window.open(`https://wa.me/917870506495?text=${encodeURIComponent(msg)}`, '_blank');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const filteredCakes = cakeData.filter(cake => {
    const matchesSearch = cake.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || cake.cat === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', 'Chocolate', 'Vanilla', 'Fruit', 'Theme', 'Wedding', 'Special'];

  return (
    <div style={{ 
      backgroundColor: COLORS.cream, 
      color: COLORS.text, 
      fontFamily: "'Poppins', sans-serif",
      scrollBehavior: 'smooth'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;600;700;800&display=swap');
        h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* STICKY NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        padding: isScrolled ? '15px 5%' : '25px 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>
          <span style={{ fontSize: '2rem' }}>🎂</span>
          <div>
            <div style={{ fontWeight: '900', fontSize: '1.4rem', color: COLORS.primary, lineHeight: '1' }}>Mishra Ji Cake</div>
            <div style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '2px', color: COLORS.accent, textTransform: 'uppercase' }}>Home Bakery</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-nav">
          <style>{`
            @media (max-width: 768px) { .desktop-nav { display: none !important; } }
            .nav-link { 
              text-decoration: none; color: ${COLORS.text}; font-weight: 600; font-size: 0.95rem; 
              transition: color 0.3s;
            }
            .nav-link:hover { color: ${COLORS.primary}; }
          `}</style>
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#menu" className="nav-link">Our Cakes</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#contact" style={{
            background: COLORS.primary, color: COLORS.white,
            padding: '12px 25px', borderRadius: '50px',
            textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem',
            boxShadow: '0 4px 15px rgba(139, 26, 26, 0.2)',
            transition: 'transform 0.3s'
          }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>Order Now</a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer'
        }} className="mobile-toggle">
          <style>{`@media (max-width: 768px) { .mobile-toggle { display: block !important; } }`}</style>
          <div style={{ width: '25px', height: '3px', background: COLORS.primary, marginBottom: '5px', transition: '0.3s' }}></div>
          <div style={{ width: '25px', height: '3px', background: COLORS.primary, marginBottom: '5px', transition: '0.3s' }}></div>
          <div style={{ width: '25px', height: '3px', background: COLORS.primary, transition: '0.3s' }}></div>
        </button>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: COLORS.white, padding: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', gap: '15px'
          }}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="nav-link">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="nav-link">About</a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="nav-link">Our Cakes</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="nav-link">Gallery</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="nav-link">Contact</a>
          </div>
        )}
      </nav>

      {/* MARQUEE */}
      <div id="home" style={{ paddingTop: '100px' }}>
        <Marquee />
      </div>

      {/* HERO SECTION */}
      <section style={{
        padding: '80px 5% 100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        background: COLORS.bgGradient,
        overflow: 'hidden'
      }}>
        <div style={{ animation: 'fadeInLeft 1s ease-out' }}>
          <style>{`
            @keyframes fadeInLeft {
              from { opacity: 0; transform: translateX(-50px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>
          <div style={{
            display: 'inline-block', background: COLORS.primary, color: COLORS.white,
            padding: '6px 15px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '800',
            marginBottom: '20px'
          }}>घर का बना स्वाद, खास पेशकश!</div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: '900', color: COLORS.primary, lineHeight: '1.1', marginBottom: '20px' }}>
            Mishra Ji <span style={{ color: COLORS.accent }}>Cake</span>
          </h1>
          
          <p style={{ fontSize: '1.5rem', color: COLORS.primary, fontStyle: 'italic', marginBottom: '20px', fontWeight: '600' }}>
            "स्वाद ही संस्कार है"
          </p>
          
          <p style={{ fontSize: '1.1rem', color: COLORS.muted, maxWidth: '500px', lineHeight: '1.8', marginBottom: '40px' }}>
            हमारी होम बेकरी में, हम सिर्फ केक नहीं बनाते, यादें बनाते हैं। हर जन्मदिन, सालगिरह या खुशी के पल को और भी खास बनाने के लिए।
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '50px' }}>
            <a href="#menu" style={{
              background: COLORS.primary, color: COLORS.white, padding: '18px 40px', borderRadius: '15px',
              textDecoration: 'none', fontWeight: '800', fontSize: '1rem',
              boxShadow: '0 10px 25px rgba(139, 26, 26, 0.2)'
            }}>View Cakes</a>
            <a href="#contact" style={{
              border: `2px solid ${COLORS.primary}`, color: COLORS.primary, padding: '18px 40px', borderRadius: '15px',
              textDecoration: 'none', fontWeight: '800', fontSize: '1rem'
            }}>Order Now</a>
          </div>

          <div style={{ display: 'flex', gap: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: COLORS.text }}>500+</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: COLORS.muted }}>Happy Customers</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: COLORS.text }}>50+</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: COLORS.muted }}>Varieties</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: COLORS.text }}>100%</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: COLORS.muted }}>Eggless</div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
          animation: 'fadeInRight 1s ease-out'
        }}>
          <style>{`
            @keyframes fadeInRight {
              from { opacity: 0; transform: translateX(50px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>
          <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80" alt="Hero" style={{
            width: '100%', height: '500px', objectFit: 'cover', borderRadius: '30px', gridRow: 'span 2'
          }} />
          <img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80" alt="Hero" style={{
            width: '100%', height: '240px', objectFit: 'cover', borderRadius: '30px'
          }} />
          <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80" alt="Hero" style={{
            width: '100%', height: '240px', objectFit: 'cover', borderRadius: '30px'
          }} />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{ padding: '120px 5%', background: COLORS.white }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
            <SectionLabel>About Us</SectionLabel>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '30px', lineHeight: '1.2' }}>Handcrafting Sweet Memories Since 2018</h2>
            
            <div style={{ borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: '20px', fontStyle: 'italic', fontSize: '1.2rem', color: COLORS.primary, marginBottom: '30px', fontWeight: '600' }}>
              "सामग्री और ताज़गी का वादा, हमारे हर केक को बनाता है बेमिसाल। आज ही ऑर्डर करें और घर बैठे पाएं मिठास का खजाना।"
            </div>

            <p style={{ color: COLORS.muted, lineHeight: '1.8', marginBottom: '20px' }}>
              Mishra Ji Cake is a premium home bakery located in the heart of Munger. We believe that cakes are more than just dessert – they are the centerpieces of your most cherished celebrations.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: '1.8', marginBottom: '40px' }}>
              हर जन्मदिन, सालगिरह या खुशी के पल को और भी खास बनाने के लिए, हमारे पास है तरह-तरह के स्वादिष्ट केक। हमारे यहाँ केक केवल ऑर्डर पर ही बनते हैं — वो भी फ्रेश, एगलेस और कस्टमाइज्ड।
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              {[
                { title: '100% Eggless', desc: 'Completely vegetarian baking.' },
                { title: 'Fresh Daily', desc: 'Baked only on order.' },
                { title: 'Customized', desc: 'Your design, our creation.' },
                { title: 'Home Baked', desc: 'Made with love and care.' }
              ].map((f, i) => (
                <div key={i} style={{ background: COLORS.cream, padding: '20px', borderRadius: '20px', border: '1px solid rgba(212, 160, 23, 0.2)' }}>
                  <div style={{ fontWeight: '800', color: COLORS.primary, marginBottom: '5px' }}>{f.title}</div>
                  <div style={{ fontSize: '0.8rem', color: COLORS.muted }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80" alt="About" style={{ width: '100%', height: '550px', objectFit: 'cover', borderRadius: '30px', gridRow: 'span 2' }} />
            <img src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&q=80" alt="About" style={{ width: '100%', height: '265px', objectFit: 'cover', borderRadius: '30px' }} />
            <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80" alt="About" style={{ width: '100%', height: '265px', objectFit: 'cover', borderRadius: '30px' }} />
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" style={{ padding: '120px 5%', background: '#FFF8F0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <SectionLabel>Our Menu</SectionLabel>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px' }}>50+ Cake Varieties</h2>
          <p style={{ color: COLORS.muted, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Explore our curated selection of fresh, eggless cakes. From classic chocolate to royal designer cakes, we have something for every palate.
          </p>
        </div>

        {/* Search & Filter */}
        <div style={{ maxWidth: '1000px', margin: '0 auto 60px' }}>
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <input 
              type="text" 
              placeholder="Search for your favorite cake..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '20px 30px 20px 60px', borderRadius: '50px',
                border: 'none', background: COLORS.white, fontSize: '1.1rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)', outline: 'none'
              }}
            />
            <div style={{ position: 'absolute', left: '25px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '12px 25px', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                  background: activeFilter === cat ? COLORS.primary : COLORS.white,
                  color: activeFilter === cat ? COLORS.white : COLORS.text,
                  boxShadow: activeFilter === cat ? '0 5px 15px rgba(139, 26, 26, 0.3)' : '0 5px 15px rgba(0,0,0,0.05)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {filteredCakes.length > 0 ? (
            filteredCakes.map((cake, i) => (
              <CakeCard key={i} cake={cake} onOpenModal={handleOpenModal} />
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
              <span style={{ fontSize: '4rem' }}>🍰</span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '20px' }}>No cakes found matching your search.</h3>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" style={{ padding: '120px 5%', background: COLORS.white }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <SectionLabel>Our Gallery</SectionLabel>
          <h2 style={{ fontSize: '3rem', fontWeight: '900' }}>Sweet Creations</h2>
        </div>
        
        <div style={{
          columns: '4 250px',
          columnGap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <style>{`
            .gallery-img { 
              width: 100%; margin-bottom: 20px; border-radius: 20px; 
              display: block; transition: 0.4s; cursor: pointer;
            }
            .gallery-img:hover { transform: scale(1.04); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
          `}</style>
          {[
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
            "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&q=80",
            "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80",
            "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80",
            "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80",
            "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
            "https://images.unsplash.com/photo-1547047803-fa6bb8f03c56?w=400&q=80",
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80",
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80",
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80"
          ].map((url, i) => (
            <img key={i} src={url} className="gallery-img" alt={`Cake ${i}`} loading="lazy" />
          ))}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section style={{ padding: '100px 5%', background: COLORS.primary, color: COLORS.white }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <SectionLabel color={COLORS.accent}>Simple Steps</SectionLabel>
          <h2 style={{ fontSize: '3rem', fontWeight: '900' }}>How to Order</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { n: '1', t: 'Choose Cake', d: 'Pick from our 50+ delicious varieties of eggless cakes.' },
            { n: '2', t: 'Call/WhatsApp', d: 'Connect with us to finalize weight and customizations.' },
            { n: '3', t: 'We Customize', d: 'We bake it fresh exactly as you dreamed it.' },
            { n: '4', t: 'Receive & Celebrate', d: 'Get home delivery or pick up for your celebration.' }
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '40px 30px', borderRadius: '30px', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: COLORS.accent, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '900' }}>{s.n}</div>
              <h3 style={{ marginBottom: '15px', fontSize: '1.4rem' }}>{s.t}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '120px 5%', background: COLORS.cream }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <SectionLabel>Reviews</SectionLabel>
          <h2 style={{ fontSize: '3rem', fontWeight: '900' }}>What Our Customers Say</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { a: 'Priya Sharma', l: 'Munger', t: '"Bahut hi swadist cake tha! Birthday par sab ne tarif ki..."' },
            { a: 'Rahul Gupta', l: 'Madhopur', t: '"Anniversary ke liye custom cake order kiya tha. Design bilkul..."' },
            { a: 'Sunita Devi', l: 'Munger', t: '"Ghar ka bana swad sachmuch alag hota hai..."' },
            { a: 'Amit Kumar', l: 'Madhopur', t: '"Sweetymishra7066 Instagram par dekha tha, order kiya aur..."' },
            { a: 'Pooja Singh', l: 'Munger', t: '"Meri beti ki first birthday ke liye princess theme cake..."' },
            { a: 'Vikram Yadav', l: 'Munger', t: '"Super fresh quality aur reasonable price. Best home bakery..."' }
          ].map((r, i) => (
            <div key={i} style={{ background: COLORS.white, padding: '40px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <div style={{ color: COLORS.accent, fontSize: '1.2rem', marginBottom: '15px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', color: COLORS.text, lineHeight: '1.6', marginBottom: '25px', fontSize: '1.05rem' }}>{r.t}</p>
              <div style={{ fontWeight: '800', color: COLORS.primary }}>{r.a}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: COLORS.muted }}>{r.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: '120px 5%', background: COLORS.white }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '40px' }}>Order Your Dream Cake Today</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {[
                { icon: '📞', title: 'Call Us', val: '7870506495, 7004176184' },
                { icon: '📸', title: 'Instagram', val: '@sweetymishra7066' },
                { icon: '📍', title: 'Address', val: 'In Front of Sangam Marriage Hall, Madhopur, Munger, Bihar' },
                { icon: '⏰', title: 'Hours', val: 'Order Anytime (Home Bakery)' },
                { icon: '🍰', title: 'Speciality', val: 'Fresh, Eggless & Customized Cakes' }
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', background: COLORS.lightMaroon, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: COLORS.primary, textTransform: 'uppercase' }}>{c.title}</div>
                    <div style={{ fontWeight: '600', color: COLORS.text }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://wa.me/917870506495" style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: COLORS.whatsapp, color: COLORS.white, padding: '20px 40px', borderRadius: '15px',
              textDecoration: 'none', fontWeight: '800', fontSize: '1.1rem', marginTop: '50px',
              boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)'
            }}>Chat on WhatsApp</a>
          </div>

          <div style={{ background: COLORS.cream, padding: '50px', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>Quick Order Form</h3>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={formInputStyle} />
                <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={formInputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <select required value={formData.cakeType} onChange={e => setFormData({...formData, cakeType: e.target.value})} style={formInputStyle}>
                  {categories.slice(1).map(c => <option key={c} value={c}>{c} Cake</option>)}
                </select>
                <select required value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} style={formInputStyle}>
                  {weightOptions.map(w => <option key={w.label} value={w.label}>{w.label}</option>)}
                </select>
              </div>
              <input type="text" placeholder="Cake Name (Optional)" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} style={formInputStyle} />
              <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={formInputStyle} />
              
              <div style={{ background: 'rgba(139, 26, 26, 0.05)', padding: '15px', borderRadius: '15px', borderLeft: `4px solid ${COLORS.primary}`, marginTop: '10px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: COLORS.muted }}>Estimated Starting Price</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: COLORS.primary }}>₹450 - ₹1200</div>
                <div style={{ fontSize: '0.65rem', color: COLORS.muted }}>Final price shared on WhatsApp based on design.</div>
              </div>

              <button type="submit" style={{
                background: COLORS.primary, color: COLORS.white, padding: '20px', borderRadius: '15px',
                border: 'none', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer',
                marginTop: '10px', boxShadow: '0 10px 20px rgba(139, 26, 26, 0.2)'
              }}>Send Order Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.dark, color: COLORS.white, padding: '100px 5% 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
              <span style={{ fontSize: '2rem' }}>🎂</span>
              <div style={{ fontWeight: '900', fontSize: '1.4rem', color: COLORS.white }}>Mishra Ji Cake</div>
            </div>
            <p style={{ opacity: 0.6, lineHeight: '1.8', fontSize: '0.9rem' }}>
              "स्वाद ही संस्कार है" - Bringing the authentic taste of home-baked, 100% eggless cakes to the city of Munger.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '25px', color: COLORS.accent }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['Home', 'About', 'Our Cakes', 'Gallery', 'Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`} style={{ color: COLORS.white, textDecoration: 'none', opacity: 0.7, fontSize: '0.9rem', transition: '0.3s' }}>{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '25px', color: COLORS.accent }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', opacity: 0.7, fontSize: '0.9rem' }}>
              <p>📍 Madhopur, Munger, Bihar</p>
              <p>📞 7870506495, 7004176184</p>
              <p>💬 wa.me/917870506495</p>
              <p>📸 @sweetymishra7066</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '80px', paddingTop: '40px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.4 }}>
          © {new Date().getFullYear()} Mishra Ji Cake Home Bakery. All Rights Reserved. Built with ❤️ for Munger.
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href="https://wa.me/917870506495" style={{
        position: 'fixed', bottom: '30px', right: '30px',
        width: '65px', height: '65px', background: COLORS.whatsapp,
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: COLORS.white, boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
        zIndex: 999, animation: 'pulse 2s infinite'
      }}>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
        `}</style>
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>

      {/* MODAL */}
      {selectedCakeModal && (
        <Modal 
          cake={selectedCakeModal} 
          initialWeightIdx={modalWeight} 
          onClose={() => setSelectedCakeModal(null)} 
        />
      )}

      {/* TOAST */}
      {showToast && <Toast message="Order request sent! We'll contact you shortly." />}
    </div>
  );
}

const formInputStyle = {
  width: '100%', padding: '15px 20px', borderRadius: '15px',
  border: '1.5px solid #E5E7EB', background: COLORS.white,
  fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s'
};
