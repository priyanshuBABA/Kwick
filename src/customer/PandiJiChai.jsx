import React, { useState, useEffect } from 'react';

const PandiJiChai = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    item: '',
    quantity: '1',
    message: ''
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'menu', 'order'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a server
    console.log('Order Submitted:', formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setFormData({
      name: '',
      phone: '',
      item: '',
      quantity: '1',
      message: ''
    });
  };

  const menuItems = [
    {
      id: 1,
      name: "Plastic Glass Chai / प्लास्टिक गिलास चाय",
      price: "₹8",
      badge: "Best Value",
      desc: "Kadak masala chai — sahi keemat mein",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
    },
    {
      id: 2,
      name: "Kullad Chai / कुल्लड़ चाय",
      price: "₹12",
      badge: "Most Popular ⭐",
      desc: "Mitti ki khushbu ke saath asli chai ka maza",
      img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400"
    },
    {
      id: 3,
      name: "Matta (Buttermilk) / मट्टा",
      price: "₹12",
      desc: "Thanda meetha matta — garmi ki dawa",
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"
    },
    {
      id: 4,
      name: "Biscuits / बिस्किट",
      price: "₹10 onwards",
      desc: "Chai ke saath perfect companion",
      img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400"
    },
    {
      id: 5,
      name: "Paneer / पनीर",
      price: "₹400/kg",
      badge: "Fresh Daily",
      desc: "Ghar ka bana, taaza paneer",
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400"
    },
    {
      id: 6,
      name: "Desi Ghee / देसी घी",
      price: "₹700/kg",
      desc: "Shuddh desi ghee — seedha gaon se",
      img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"
    },
    {
      id: 7,
      name: "Khoya / Mawa / खोया",
      price: "₹600/kg",
      desc: "Mithai banane ke liye asli khoya",
      img: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400"
    },
    {
      id: 8,
      name: "Paani Bottle (500ml)",
      price: "₹10",
      desc: "Thanda paani — bujhao pyaas",
      img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400"
    },
    {
      id: 9,
      name: "Paani Bottle (1 Litre)",
      price: "₹20",
      desc: "Badi bottle, bada sukoon",
      img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400"
    }
  ];

  return (
    <div className="pandiji-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Playfair+Display:wght@700;900&family=Lato:wght@400;700&display=swap');

        :root {
          --primary: #E8640C;
          --secondary: #C4703A;
          --dark: #2C1503;
          --cream: #FDF3E3;
          --accent: #F5A623;
          --text: #3D2008;
          --white: #ffffff;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Lato', sans-serif;
          background-color: var(--cream);
          color: var(--text);
          overflow-x: hidden;
        }

        .pandiji-container {
          background: var(--cream);
          background-image: radial-gradient(circle at 20% 30%, rgba(44, 21, 3, 0.03) 0%, transparent 10%),
                            radial-gradient(circle at 80% 70%, rgba(44, 21, 3, 0.03) 0%, transparent 12%),
                            radial-gradient(circle at 50% 50%, rgba(44, 21, 3, 0.02) 0%, transparent 15%);
        }

        h1, h2, h3, .hindi-font {
          font-family: 'Tiro Devanagari Hindi', serif;
        }

        .english-display {
          font-family: 'Playfair Display', serif;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(253, 243, 227, 0.9);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
          padding: 0.7rem 5%;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--primary);
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--dark);
          font-weight: 700;
          font-size: 0.9rem;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: var(--primary);
        }

        .nav-links a.active {
          color: var(--primary);
        }

        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary);
        }

        .nav-links a {
          position: relative;
        }

        /* Hero Section */
        .hero {
          height: 100vh;
          width: 100%;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600') center/cover;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: var(--white);
          padding: 0 1rem;
          position: relative;
        }

        .hero h1 {
          font-size: clamp(3rem, 10vw, 6rem);
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: fadeInUp 1s forwards 0.2s;
        }

        .hero h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 2rem);
          margin-bottom: 1rem;
          opacity: 0;
          animation: fadeInUp 1s forwards 0.4s;
        }

        .hero p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeInUp 1s forwards 0.6s;
        }

        .hero-ctas {
          display: flex;
          gap: 1.5rem;
          opacity: 0;
          animation: fadeInUp 1s forwards 0.8s;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: var(--primary);
          color: var(--white);
        }

        .btn-primary:hover {
          background: var(--secondary);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(232, 100, 12, 0.3);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid var(--white);
          color: var(--white);
        }

        .btn-outline:hover {
          background: var(--white);
          color: var(--dark);
          transform: translateY(-3px);
        }

        /* Steam Animation */
        .steam-container {
          position: absolute;
          bottom: 10%;
          right: 15%;
          width: 120px;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          pointer-events: none;
        }

        .steam-line {
          position: absolute;
          width: 3px;
          background: rgba(255,255,255,0.6);
          border-radius: 10px;
          animation: steam 3s infinite;
          bottom: 80px;
        }

        .steam-line:nth-child(1) { left: 40px; height: 30px; animation-delay: 0s; }
        .steam-line:nth-child(2) { left: 60px; height: 50px; animation-delay: 0.5s; }
        .steam-line:nth-child(3) { left: 80px; height: 35px; animation-delay: 1s; }

        @keyframes steam {
          0% { transform: translateY(0) scaleX(1); opacity: 0; }
          20% { opacity: 0.6; }
          50% { transform: translateY(-80px) scaleX(2); opacity: 0.3; }
          100% { transform: translateY(-150px) scaleX(3); opacity: 0; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* About Section */
        .section {
          padding: 100px 5%;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-image img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 20px 20px 0 var(--secondary);
        }

        .about-text h2 {
          font-size: 3rem;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }

        .about-text p {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .feature-badges {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .badge {
          background: var(--white);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border: 1px solid var(--cream);
        }

        /* Menu Section */
        .menu-section {
          background: #fdfaf5;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 3.5rem;
          color: var(--dark);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .menu-card {
          background: var(--white);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
        }

        .menu-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(44, 21, 3, 0.1);
        }

        .card-img {
          height: 250px;
          width: 100%;
          overflow: hidden;
        }

        .card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .menu-card:hover .card-img img {
          transform: scale(1.1);
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--primary);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .card-title {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: var(--dark);
        }

        .card-price {
          font-weight: 900;
          color: var(--primary);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .card-desc {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
        }

        /* Ticker */
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: var(--primary);
          padding: 1rem 0;
        }

        .ticker {
          display: inline-block;
          white-space: nowrap;
          padding-right: 100%;
          animation: ticker 30s linear infinite;
          color: var(--white);
          font-weight: 700;
          font-size: 1.1rem;
        }

        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }

        /* Why Us Section */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .why-card {
          padding: 2.5rem;
          background: var(--white);
          border-radius: 20px;
          transition: 0.3s;
          border: 1px solid #f0e0d0;
        }

        .why-card:hover {
          border-color: var(--primary);
          background: var(--cream);
        }

        .why-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .why-card h3 {
          font-size: 1.3rem;
          color: var(--dark);
        }

        /* Order Section */
        .order-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-info {
          background: var(--dark);
          color: var(--white);
          padding: 3rem;
          border-radius: 20px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .info-icon {
          font-size: 1.5rem;
          color: var(--primary);
        }

        .whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #25D366;
          color: white;
          padding: 1rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          margin-top: 2rem;
          transition: 0.3s;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
          transform: translateY(-3px);
        }

        .order-form {
          background: var(--white);
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
        }

        .submit-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.3s;
        }

        .submit-btn:hover {
          background: var(--dark);
        }

        /* Footer */
        footer {
          background: var(--dark);
          color: var(--white);
          padding: 4rem 5% 2rem;
          text-align: center;
        }

        .footer-logo {
          font-size: 2.5rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
        }

        .footer-links a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .social-icon {
          font-size: 1.5rem;
          color: var(--white);
          text-decoration: none;
          transition: color 0.3s;
        }

        .social-icon:hover {
          color: var(--primary);
        }

        /* Toast */
        .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #2D6A2D;
          color: white;
          padding: 1rem 2rem;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          z-index: 2000;
          animation: slideInRight 0.5s forwards;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 968px) {
          .about-grid, .order-container {
            grid-template-columns: 1fr;
          }
          .nav-links {
            display: none;
          }
          .about-image {
            order: -1;
          }
        }

        @media (max-width: 600px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .card-img {
            height: 150px;
          }
          .card-title {
            font-size: 1rem;
          }
          .card-price {
            font-size: 0.9rem;
          }
          .card-desc {
            display: none;
          }
          .hero h1 {
            font-size: 3.5rem;
          }
          .section {
            padding: 60px 5%;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo hindi-font">पंडी जी चाय</a>
        <div className="nav-links">
          <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#menu" className={activeSection === 'menu' ? 'active' : ''}>Menu</a>
          <a href="#order" className={activeSection === 'order' ? 'active' : ''}>Order</a>
        </div>
        <div className="mobile-menu-btn" style={{ display: 'none' }}>
          {/* Hamburger could go here */}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h1 className="hindi-font">पंडी जी चाय</h1>
        <h2 className="english-display">Pandi Ji Chai — Since Day One</h2>
        <p className="hindi-font">हर घूंट में गर्मजोशी</p>
        <div className="hero-ctas">
          <a href="#order" className="btn btn-primary">📞 Order Now</a>
          <a href="#menu" className="btn btn-outline">🛒 See Menu</a>
        </div>

        {/* Steam Animation */}
        <div className="steam-container">
          <div className="steam-line"></div>
          <div className="steam-line"></div>
          <div className="steam-line"></div>
          <svg viewBox="0 0 100 100" style={{ width: '120px', height: '120px', fill: 'var(--primary)' }}>
            <path d="M20,40 L80,40 C80,40 80,80 50,80 C20,80 20,40 20,40 Z" fill="var(--secondary)" />
            <path d="M80,45 C85,45 90,50 90,55 C90,60 85,65 80,65" fill="none" stroke="var(--secondary)" strokeWidth="5" strokeLinecap="round" />
            <rect x="25" y="80" width="50" height="5" rx="2" fill="var(--dark)" />
          </svg>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <span style={{ margin: '0 2rem' }}>🔥 Aaj ki Khaas Cheez: Masala Chai ₹8 | Kullad Chai ₹12 | Taaza Paneer ₹400/kg | Desi Ghee ₹700/kg | Khoya ₹600/kg | 📞 Order Karo: +91-9179196208</span>
          <span style={{ margin: '0 2rem' }}>🔥 Aaj ki Khaas Cheez: Masala Chai ₹8 | Kullad Chai ₹12 | Taaza Paneer ₹400/kg | Desi Ghee ₹700/kg | Khoya ₹600/kg | 📞 Order Karo: +91-9179196208</span>
          <span style={{ margin: '0 2rem' }}>🔥 Aaj ki Khaas Cheez: Masala Chai ₹8 | Kullad Chai ₹12 | Taaza Paneer ₹400/kg | Desi Ghee ₹700/kg | Khoya ₹600/kg | 📞 Order Karo: +91-9179196208</span>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="section">
        <div className="about-grid">
          <div className="about-text">
            <h2>Hamari Kahani</h2>
            <p className="english-display" style={{ fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '1rem' }}>Desi Flavour, Local Soul.</p>
            <p>
              Pandi Ji Chai ek chhoti si dukan hai jahan har pyaala dil se banta hai. 
              Humari chai mein hai asli doodh, desi masala, aur pyaar. For over 15 years, 
              we've been serving the community with the most authentic kulhad experience.
            </p>
            <div className="feature-badges" style={{ marginTop: '2rem' }}>
              <span className="badge">☕ Fresh Daily</span>
              <span className="badge">🥛 Pure Milk</span>
              <span className="badge">❤️ Made with Love</span>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800" alt="Kulhad Chai" crossOrigin="anonymous" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section menu-section">
        <div className="section-header">
          <h2 className="hindi-font">हमारा मेनू</h2>
          <p className="english-display">Our Menu</p>
        </div>
        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-card">
              {item.badge && <span className="card-tag">{item.badge}</span>}
              <div className="card-img">
                <img src={item.img} alt={item.name} crossOrigin="anonymous" loading="lazy" />
              </div>
              <div className="card-content">
                <h3 className="card-title hindi-font">{item.name}</h3>
                <p className="card-price">{item.price}</p>
                <p className="card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="section-header">
          <h2 className="hindi-font">हमें क्यों चुनें?</h2>
          <p className="english-display">Why Choose Us</p>
        </div>
        <div className="why-grid">
          <div className="why-card">
            <span className="why-icon">🫖</span>
            <h3>Daily Fresh Chai</h3>
          </div>
          <div className="why-card">
            <span className="why-icon">🏺</span>
            <h3>Authentic Kullad</h3>
          </div>
          <div className="why-card">
            <span className="why-icon">🛒</span>
            <h3>Wholesale Available</h3>
          </div>
          <div className="why-card">
            <span className="why-icon">🚀</span>
            <h3>Quick Service</h3>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="section" style={{ background: 'var(--creamDark)' }}>
        <div className="section-header">
          <h2 className="hindi-font">ऑर्डर करें</h2>
          <p className="english-display">Place Your Order</p>
        </div>
        <div className="order-container">
          <div className="contact-info">
            <h3 className="hindi-font" style={{ fontSize: '2rem', marginBottom: '2rem' }}>संपर्क करें</h3>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <p style={{ fontWeight: 'bold' }}>Phone</p>
                <p>+91-9179196208</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <p style={{ fontWeight: 'bold' }}>Location</p>
                <p>[Your City, MP]</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏰</span>
              <div>
                <p style={{ fontWeight: 'bold' }}>Timing</p>
                <p>Subah 6 baje se Raat 10 baje tak</p>
              </div>
            </div>
            <a href="https://wa.me/919179196208?text=Namaste%20Pandi%20Ji!%20Mujhe%20chai%20order%20karni%20hai" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
              <span>💬 Order on WhatsApp</span>
            </a>
          </div>

          <form className="order-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Aapka Naam" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Aapka Mobile Number" required />
            </div>
            <div className="form-group">
              <label>Item</label>
              <select name="item" value={formData.item} onChange={handleInputChange} required>
                <option value="">Choose an item</option>
                {menuItems.map(item => (
                  <option key={item.id} value={item.name}>{item.name.split('/')[0].trim()}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} placeholder="Kuch khas pasand? (e.g. less sugar)"></textarea>
            </div>
            <button type="submit" className="submit-btn">Order Bhejo 🍵</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <h2 className="footer-logo hindi-font">पंडी जी चाय</h2>
        <p className="hindi-font">हर घूंट में प्यार</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#order">Order</a>
        </div>
        <div className="social-icons">
          <a href="https://wa.me/919179196208" className="social-icon">📱</a>
          <a href="#" className="social-icon">📸</a>
          <a href="#" className="social-icon">📘</a>
        </div>
        <p style={{ opacity: 0.6, fontSize: '0.8rem', marginTop: '2rem' }}>
          © 2024 Pandi Ji Chai. Sabka Chai, Sabka Pyaar.
        </p>
      </footer>

      {/* Toast */}
      {showToast && (
        <div className="toast">
          Shukriya! Aapka order mil gaya 🎉
        </div>
      )}
    </div>
  );
};

export default PandiJiChai;
