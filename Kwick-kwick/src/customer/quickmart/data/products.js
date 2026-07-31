const images = {
  "veg-fruits": [
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
    "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&q=80",
    "https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=400&q=80",
    "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&q=80",
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80",
    "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&q=80",
    "https://images.unsplash.com/photo-1594282418426-4f7d2b47e5ad?w=400&q=80",
    "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&q=80",
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80",
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80"
  ],
  "dairy": [
    "https://images.unsplash.com/photo-1563636619-e910f01ff18c?w=400&q=80",
    "https://images.unsplash.com/photo-1550583724-1255d1426639?w=400&q=80",
    "https://images.unsplash.com/photo-1559591937-e617d98855bb?w=400&q=80",
    "https://images.unsplash.com/photo-1528750955923-30c722050297?w=400&q=80"
  ],
  "snacks": [
    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80",
    "https://images.unsplash.com/photo-1599490659223-930b44aa469b?w=400&q=80",
    "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80",
    "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=400&q=80"
  ]
};

const subcategoriesList = [
  "veg-fruits", "atta-rice-dal", "oil-ghee-masala", "dairy-bread-eggs", "bakery-biscuits", "dry-fruits-cereals", "chicken-meat-fish", "kitchenware",
  "chips-namkeen", "sweets-chocolates", "drinks-juices", "tea-coffee", "instant-food", "sauces-spreads", "paan-corner", "ice-creams",
  "bath-body", "hair", "skin-face", "beauty-cosmetics", "feminine-hygiene", "baby-care", "health-pharma", "sexual-wellness",
  "home-lifestyle", "cleaners-repellents", "electronics", "stationery-games"
];

const generateProducts = () => {
  const allProducts = {};
  
  subcategoriesList.forEach(subId => {
    const products = [];
    for (let i = 1; i <= 52; i++) {
      let name = `${subId.replace(/-/g, ' ')} item ${i}`;
      let price = Math.floor(Math.random() * 500) + 20;
      let unit = i % 3 === 0 ? "1 KG" : (i % 3 === 1 ? "500g" : "1 piece");
      
      // Select appropriate image based on subcategory
      let imgKey = "snacks";
      if (subId.includes("veg") || subId.includes("fruit")) imgKey = "veg-fruits";
      else if (subId.includes("dairy") || subId.includes("milk")) imgKey = "dairy";
      
      let imgUrl = images[imgKey][i % images[imgKey].length];
      
      // Specific names for first few to make it look real
      if (subId === "veg-fruits") {
        const names = ["Potato (Aloo)", "Onion (Pyaaz)", "Tomato", "Brinjal (Baingan)", "Spinach (Palak)", "Cauliflower", "Cabbage", "Carrot", "Green Peas", "Capsicum"];
        if (i <= names.length) name = names[i-1];
      }

      products.push({
        id: `${subId}-${i}`,
        name,
        price,
        unit,
        image: imgUrl
      });
    }
    allProducts[subId] = products;
  });
  
  return allProducts;
};

export const productsBySubcategory = generateProducts();
