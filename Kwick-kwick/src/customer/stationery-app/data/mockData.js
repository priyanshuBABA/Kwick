export const categories = [
  { id: 1, name: 'Writing & Correction', icon: 'Pen', color: 'bg-soft-mint' },
  { id: 2, name: 'Paper & Notebooks', icon: 'Book', color: 'bg-soft-blue' },
  { id: 3, name: 'Adhesives & Cutting', icon: 'Scissors', color: 'bg-pastel-green' },
  { id: 4, name: 'Files & Organization', icon: 'Folder', color: 'bg-soft-cream' },
  { id: 5, name: 'Measuring & Geometry', icon: 'Ruler', color: 'bg-pastel-blue' },
  { id: 6, name: 'Desk & Art Supplies', icon: 'Palette', color: 'bg-soft-mint' },
];

export const products = [
  // I. Writing & Correction
  {
    id: 1,
    name: 'Classic Ballpoint Pen',
    brand: 'Link Ocean',
    price: 10,
    originalPrice: 15,
    image: 'https://images.unsplash.com/photo-1585336261022-69c6630fbc14?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    category: 'Writing & Correction',
    popularity: 90,
    isNew: false,
    use: 'Quick everyday notes and forms.'
  },
  {
    id: 2,
    name: 'Premium Gel Pen',
    brand: 'Uniball',
    price: 20,
    originalPrice: 25,
    image: 'https://images.unsplash.com/photo-1518128910761-3a569f48db6a?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    category: 'Writing & Correction',
    popularity: 95,
    isNew: true,
    use: 'Smooth, dark writing for exams/signing.'
  },
  {
    id: 11,
    name: 'Luxury Fountain Pen',
    brand: 'Parker',
    price: 150,
    originalPrice: 200,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    category: 'Writing & Correction',
    popularity: 85,
    isNew: true,
    use: 'Improving handwriting or formal use.'
  },

  // II. Paper & Notebooks
  {
    id: 13,
    name: 'A5 Single Line Notebook',
    brand: 'Classmate',
    price: 70,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    category: 'Paper & Notebooks',
    popularity: 98,
    isNew: false,
    use: 'Regular school or college notes.'
  },
  {
    id: 14,
    name: 'Heavy Duty Spiral Register',
    brand: 'Bison',
    price: 180,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    category: 'Paper & Notebooks',
    popularity: 92,
    isNew: true,
    use: 'Heavy-duty notes for students/offices.'
  },
  {
    id: 18,
    name: 'Luxury Daily Planner',
    brand: 'Moleskine',
    price: 500,
    originalPrice: 650,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    category: 'Paper & Notebooks',
    popularity: 88,
    isNew: true,
    use: 'Daily scheduling and journaling.'
  },

  // III. Adhesives & Cutting
  {
    id: 23,
    name: 'Glue Stick 15g',
    brand: 'Fevistick',
    price: 40,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    rating: 4.4,
    category: 'Adhesives & Cutting',
    popularity: 75,
    isNew: false,
    use: 'Mess-free paper sticking.'
  },
  {
    id: 27,
    name: 'Precision Scissors',
    brand: 'Faber-Castell',
    price: 100,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    category: 'Adhesives & Cutting',
    popularity: 80,
    isNew: false,
    use: 'Cutting paper, cloth, or tape.'
  },

  // IV. Files & Organization
  {
    id: 31,
    name: 'Interview Button Folder',
    brand: 'Omega',
    price: 30,
    originalPrice: 40,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    category: 'Files & Organization',
    popularity: 82,
    isNew: false,
    use: 'Carrying documents for interviews.'
  },
  {
    id: 34,
    name: 'Steel Paper Clips',
    brand: 'Generic',
    price: 20,
    originalPrice: 25,
    image: 'https://images.unsplash.com/photo-1518128910761-3a569f48db6a?q=80&w=600&auto=format&fit=crop',
    rating: 4.2,
    category: 'Files & Organization',
    popularity: 70,
    isNew: false,
    use: 'Temporary bunching of papers.'
  },

  // V. Measuring & Geometry
  {
    id: 42,
    name: 'Advanced Geometry Box',
    brand: 'Camel',
    price: 250,
    originalPrice: 290,
    image: 'https://images.unsplash.com/photo-1506728551558-db45214040da?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    category: 'Measuring & Geometry',
    popularity: 94,
    isNew: true,
    use: 'Full set for math (Compass, etc.).'
  },
  {
    id: 40,
    name: 'Plastic Measuring Scale (15cm)',
    brand: 'Nataraj',
    price: 10,
    originalPrice: 12,
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600&auto=format&fit=crop',
    rating: 4.3,
    category: 'Measuring & Geometry',
    popularity: 85,
    isNew: false,
    use: 'Measuring and drawing lines.'
  },

  // VI. Desk & Art Supplies
  {
    id: 44,
    name: 'Scientific Calculator',
    brand: 'Casio',
    price: 600,
    originalPrice: 750,
    image: 'https://images.unsplash.com/photo-1543644265-276f5195c6ed?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    category: 'Desk & Art Supplies',
    popularity: 96,
    isNew: true,
    use: 'Basic or scientific calculations.'
  },
  {
    id: 48,
    name: 'Watercolor Tube Set (12 colors)',
    brand: 'Doms',
    price: 200,
    originalPrice: 250,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    category: 'Desk & Art Supplies',
    popularity: 89,
    isNew: false,
    use: 'Professional or hobbyist painting.'
  },
  {
    id: 8,
    name: 'Quick Correction Pen',
    brand: 'Kores',
    price: 50,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop',
    rating: 4.4,
    category: 'Writing & Correction',
    popularity: 78,
    isNew: false,
    use: 'Covering up ink errors instantly.'
  },
  {
    id: 15,
    name: 'A4 Printer Paper Ream (500 Sheets)',
    brand: 'JK Copier',
    price: 450,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    category: 'Paper & Notebooks',
    popularity: 91,
    isNew: false,
    use: 'Printing documents.'
  }
];
