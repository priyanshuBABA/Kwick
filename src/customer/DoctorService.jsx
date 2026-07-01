import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import { Home, ShoppingBag, Grid, User } from 'lucide-react';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal: #0a6e6e;
    --teal-light: #0e9090;
    --teal-dark: #054545;
    --gold: #c8972a;
    --gold-light: #e8b84b;
    --cream: #fdf8f0;
    --white: #ffffff;
    --gray-50: #f8fafb;
    --gray-100: #eef2f5;
    --gray-200: #dde4ea;
    --gray-400: #8fa0ad;
    --gray-600: #4a6070;
    --gray-800: #1a2e3a;
    --red: #e05252;
    --green: #2e9e6a;
    --shadow-sm: 0 2px 8px rgba(10,110,110,0.08);
    --shadow-md: 0 6px 24px rgba(10,110,110,0.12);
    --shadow-lg: 0 16px 48px rgba(10,110,110,0.18);
    --radius: 16px;
    --radius-sm: 10px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--gray-800); }
  .app { min-height: 100vh; }

  .nav { background: var(--teal-dark); padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 68px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(0,0,0,0.3); }
  .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .nav-logo-icon { width: 38px; height: 38px; background: var(--gold); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .nav-logo-text { color: white; }
  .nav-logo-text strong { font-family: 'Playfair Display', serif; font-size: 1.2rem; display: block; }
  .nav-logo-text span { font-size: 0.7rem; opacity: 0.7; letter-spacing: 1px; text-transform: uppercase; }
  .nav-links { display: flex; gap: 2rem; }
  .nav-link { color: rgba(255,255,255,0.75); font-size: 0.9rem; cursor: pointer; transition: color 0.2s; position: relative; }
  .nav-link:hover, .nav-link.active { color: var(--gold-light); }
  .nav-link.active::after { content: ''; position: absolute; bottom: -22px; left: 0; right: 0; height: 3px; background: var(--gold); border-radius: 2px; }
  .nav-link.new-tag { display: flex; align-items: center; gap: 5px; }
  .nav-new-badge { background: var(--gold); color: var(--teal-dark); font-size: 0.6rem; font-weight: 700; padding: 1px 6px; border-radius: 8px; letter-spacing: 0.5px; }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .nav-city { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 4px 14px; font-size: 0.8rem; cursor: pointer; }
  .nav-btn { background: var(--gold); color: var(--teal-dark); border: none; border-radius: 8px; padding: 8px 18px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: background 0.2s; }
  .nav-btn:hover { background: var(--gold-light); }

  .hero { background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 60%, #0d8080 100%); padding: 5rem 2rem 4rem; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -50%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(200,151,42,0.15) 0%, transparent 70%); border-radius: 50%; }
  .hero::after { content: ''; position: absolute; bottom: -30%; left: -5%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); border-radius: 50%; }
  .hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(200,151,42,0.2); border: 1px solid rgba(200,151,42,0.4); color: var(--gold-light); border-radius: 20px; padding: 6px 16px; font-size: 0.8rem; font-weight: 500; margin-bottom: 1.5rem; letter-spacing: 0.5px; }
  .hero h1 { font-family: 'Playfair Display', serif; color: white; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.2; margin-bottom: 1rem; }
  .hero h1 span { color: var(--gold-light); }
  .hero p { color: rgba(255,255,255,0.75); font-size: 1.05rem; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7; }

  .search-bar { background: white; border-radius: var(--radius); padding: 8px; display: flex; gap: 8px; max-width: 700px; margin: 0 auto 2rem; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
  .search-input { flex: 1; border: none; outline: none; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: var(--gray-800); background: transparent; }
  .search-select { border: none; outline: none; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: var(--gray-600); background: var(--gray-100); border-radius: 10px; cursor: pointer; }
  .search-btn { background: var(--teal); color: white; border: none; border-radius: 10px; padding: 10px 24px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
  .search-btn:hover { background: var(--teal-light); }

  .hero-stats { display: flex; gap: 2.5rem; justify-content: center; flex-wrap: wrap; }
  .hero-stat { text-align: center; }
  .hero-stat strong { display: block; color: var(--gold-light); font-size: 1.6rem; font-family: 'Playfair Display', serif; font-weight: 700; }
  .hero-stat span { color: rgba(255,255,255,0.6); font-size: 0.8rem; }

  .checkup-hero { background: linear-gradient(120deg, var(--teal-dark), #0b5f5f 50%, var(--teal)); padding: 4rem 2rem; position: relative; overflow: hidden; }
  .checkup-hero::before { content: ''; position: absolute; top: -40%; left: 60%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(200,151,42,0.18), transparent 70%); border-radius: 50%; }
  .checkup-hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr; gap: 2rem; align-items: center; position: relative; z-index: 1; }
  .checkup-hero h1 { font-family: 'Playfair Display', serif; color: white; font-size: 2.3rem; line-height: 1.25; margin-bottom: 0.8rem; }
  .checkup-hero h1 span { color: var(--gold-light); }
  .checkup-hero p { color: rgba(255,255,255,0.75); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem; max-width: 480px; }
  .checkup-cta { background: var(--gold); color: var(--teal-dark); border: none; border-radius: 12px; padding: 13px 28px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; }
  .checkup-cta:hover { background: var(--gold-light); transform: translateY(-2px); }
  .checkup-hero-visual { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius); padding: 1.5rem; backdrop-filter: blur(4px); }
  .checkup-hero-visual ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .checkup-hero-visual li { color: white; font-size: 0.88rem; display: flex; align-items: center; gap: 10px; }
  .checkup-hero-visual li b { color: var(--gold-light); font-size: 1.1rem; }

  .section { padding: 3.5rem 2rem; max-width: 1200px; margin: 0 auto; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--teal-dark); }
  .section-title span { color: var(--gold); }
  .section-sub { color: var(--gray-400); font-size: 0.9rem; margin-top: 4px; }

  .specs-grid { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
  .spec-card { flex-shrink: 0; background: white; border: 2px solid transparent; border-radius: var(--radius); padding: 1.2rem 1.5rem; cursor: pointer; transition: all 0.25s; display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; box-shadow: var(--shadow-sm); }
  .spec-card:hover, .spec-card.active { border-color: var(--teal); background: linear-gradient(135deg, #e6f5f5, #f0fafa); }
  .spec-icon { font-size: 2rem; }
  .spec-name { font-size: 0.78rem; font-weight: 600; color: var(--gray-600); text-align: center; }
  .spec-count { font-size: 0.7rem; color: var(--teal); background: #e6f5f5; padding: 2px 8px; border-radius: 10px; }

  .filters { display: flex; gap: 10px; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .filter-btn { background: white; border: 1.5px solid var(--gray-200); border-radius: 20px; padding: 7px 18px; font-size: 0.85rem; color: var(--gray-600); cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .filter-btn:hover, .filter-btn.active { background: var(--teal); color: white; border-color: var(--teal); }

  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  .doctor-card { background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); transition: all 0.3s; cursor: pointer; border: 1.5px solid transparent; }
  .doctor-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--teal-light); }
  .doctor-card-header { background: linear-gradient(135deg, var(--teal-dark), var(--teal)); padding: 1.5rem; position: relative; }
  .doctor-avatar { width: 70px; height: 70px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 10px; }
  .doctor-name { font-family: 'Playfair Display', serif; color: white; font-size: 1.1rem; font-weight: 700; }
  .doctor-specialty { color: var(--gold-light); font-size: 0.8rem; margin-top: 2px; }
  .doctor-badge { position: absolute; top: 12px; right: 12px; background: var(--green); color: white; border-radius: 12px; padding: 3px 10px; font-size: 0.7rem; font-weight: 600; }
  .doctor-badge.busy { background: #e87a2a; }
  .city-pill { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.2); color: white; border-radius: 10px; padding: 2px 9px; font-size: 0.68rem; font-weight: 600; backdrop-filter: blur(2px); }

  .doctor-card-body { padding: 1.2rem; }
  .doctor-meta { display: flex; flex-direction: column; gap: 7px; margin-bottom: 1rem; }
  .doctor-meta-row { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--gray-600); }
  .doctor-meta-row span:first-child { font-size: 1rem; }
  .doctor-rating { display: flex; align-items: center; gap: 4px; }
  .stars { color: #f4b731; font-size: 0.85rem; }
  .rating-val { font-weight: 600; font-size: 0.85rem; color: var(--gray-800); }
  .rating-count { color: var(--gray-400); font-size: 0.75rem; }

  .doctor-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--gray-100); }
  .fee-tag { display: flex; flex-direction: column; }
  .fee-label { font-size: 0.7rem; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.5px; }
  .fee-amount { font-size: 1.3rem; font-weight: 700; color: var(--teal-dark); font-family: 'Playfair Display', serif; }
  .fee-amount sup { font-size: 0.7rem; font-family: 'DM Sans', sans-serif; font-weight: 500; }
  .book-btn { background: var(--teal); color: white; border: none; border-radius: 10px; padding: 9px 16px; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .book-btn:hover { background: var(--teal-dark); transform: scale(1.02); }

  .pkg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  .pkg-card { background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); border: 1.5px solid transparent; transition: all 0.3s; display: flex; flex-direction: column; }
  .pkg-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--gold); }
  .pkg-card.popular { border-color: var(--gold); }
  .pkg-ribbon { background: var(--gold); color: var(--teal-dark); font-size: 0.7rem; font-weight: 700; text-align: center; padding: 5px; letter-spacing: 0.5px; }
  .pkg-body { padding: 1.4rem; flex: 1; display: flex; flex-direction: column; }
  .pkg-icon { font-size: 1.8rem; margin-bottom: 8px; }
  .pkg-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--teal-dark); margin-bottom: 6px; }
  .pkg-tagline { display: inline-block; background: #e6f5f5; color: var(--teal); border-radius: 8px; padding: 2px 9px; font-size: 0.7rem; font-weight: 600; margin-bottom: 8px; }
  .pkg-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 1rem; }
  .pkg-old-price { color: var(--gray-400); text-decoration: line-through; font-size: 0.9rem; }
  .pkg-new-price { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--teal-dark); }
  .pkg-discount { background: #fef0e0; color: #c8972a; font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 6px; }
  .pkg-btn { width: 100%; background: var(--teal); color: white; border: none; border-radius: 10px; padding: 10px; font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; }
  .pkg-btn:hover { background: var(--teal-dark); }
  .pkg-actions { display: flex; gap: 8px; }
  .pkg-view-btn { flex: 1; background: white; color: var(--teal); border: 1.5px solid var(--teal); border-radius: 10px; padding: 10px; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; }
  .pkg-view-btn:hover { background: #e6f5f5; }
  .pkg-tests-list { list-style: none; margin: 0 0 1rem; padding: 0.8rem; background: var(--gray-50); border-radius: 10px; border: 1px solid var(--gray-100); display: flex; flex-direction: column; gap: 8px; animation: fadeIn 0.2s ease; }
  .pkg-tests-list li { font-size: 0.8rem; color: var(--gray-600); line-height: 1.4; display: flex; gap: 8px; }
  .pkg-tests-list li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; }

  .builder-banner { background: linear-gradient(120deg, var(--gold-light), var(--gold)); border-radius: var(--radius); padding: 1.6rem 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .builder-banner-text h3 { font-family: 'Playfair Display', serif; color: var(--teal-dark); font-size: 1.3rem; margin-bottom: 6px; }
  .builder-banner-text p { color: var(--teal-dark); opacity: 0.8; font-size: 0.86rem; max-width: 420px; }
  .builder-banner-btn { background: var(--teal-dark); color: white; border: none; border-radius: 10px; padding: 12px 26px; font-weight: 700; font-size: 0.92rem; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
  .builder-banner-btn:hover { background: var(--teal); transform: translateY(-2px); }

  .test-category { margin-bottom: 1.4rem; }
  .test-category-title { font-size: 0.8rem; font-weight: 700; color: var(--teal-dark); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1.5px solid var(--gray-100); }
  .test-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border: 1.5px solid var(--gray-200); border-radius: 10px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s; }
  .test-row:hover { border-color: var(--teal-light); }
  .test-row.checked { border-color: var(--teal); background: #e6f5f5; }
  .test-row-left { display: flex; align-items: center; gap: 10px; }
  .test-checkbox { width: 20px; height: 20px; border-radius: 5px; border: 2px solid var(--gray-400); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; color: white; font-size: 0.7rem; }
  .test-checkbox.on { background: var(--teal); border-color: var(--teal); }
  .test-row-name { font-size: 0.86rem; color: var(--gray-800); }
  .test-row-price { font-size: 0.88rem; font-weight: 700; color: var(--teal-dark); }

  .cart-sticky { position: sticky; bottom: 0; background: white; border-top: 1.5px solid var(--gray-200); padding: 1rem 0 0; margin-top: 1rem; }
  .cart-summary-row { display: flex; align-items: center; justify-content: space-between; }
  .cart-count { font-size: 0.85rem; color: var(--gray-600); }
  .cart-count strong { color: var(--teal-dark); }
  .cart-total { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--teal-dark); }

  .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
  .how-card { text-align: center; padding: 1.5rem; position: relative; }
  .how-num { width: 42px; height: 42px; border-radius: 50%; background: var(--teal-dark); color: var(--gold-light); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; margin: 0 auto 12px; font-size: 1.1rem; }
  .how-card h3 { font-size: 0.95rem; font-weight: 600; color: var(--gray-800); margin-bottom: 6px; }
  .how-card p { font-size: 0.82rem; color: var(--gray-400); line-height: 1.5; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: flex-start; justify-content: center; padding: 2rem 1rem; overflow-y: auto; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal { background: white; border-radius: 20px; width: 100%; max-width: 640px; box-shadow: 0 24px 80px rgba(0,0,0,0.3); animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-header { background: linear-gradient(135deg, var(--teal-dark), var(--teal)); padding: 1.5rem 2rem; border-radius: 20px 20px 0 0; display: flex; align-items: center; justify-content: space-between; }
  .modal-header h2 { font-family: 'Playfair Display', serif; color: white; font-size: 1.25rem; }
  .modal-close { background: rgba(255,255,255,0.15); color: white; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
  .modal-close:hover { background: rgba(255,255,255,0.3); }
  .modal-body { padding: 2rem; }

  .doctor-info-strip { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--gray-50); border-radius: var(--radius-sm); margin-bottom: 1.5rem; border: 1px solid var(--gray-100); }
  .doc-ava-sm { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--teal-dark), var(--teal)); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
  .doc-info-sm h3 { font-size: 1rem; font-weight: 600; color: var(--gray-800); }
  .doc-info-sm p { font-size: 0.82rem; color: var(--gray-400); margin-top: 2px; }
  .doc-fee-sm { margin-left: auto; text-align: right; }
  .doc-fee-sm .fee-val { font-size: 1.2rem; font-weight: 700; color: var(--teal-dark); font-family: 'Playfair Display', serif; }
  .doc-fee-sm .fee-lbl { font-size: 0.7rem; color: var(--gray-400); }

  .form-section { margin-bottom: 1.5rem; }
  .form-label { font-size: 0.82rem; font-weight: 600; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; display: block; }
  .form-input { width: 100%; border: 1.5px solid var(--gray-200); border-radius: 10px; padding: 11px 14px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: var(--gray-800); outline: none; transition: border-color 0.2s; background: white; }
  .form-input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(10,110,110,0.1); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-row-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }

  .dates-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
  .date-btn { border: 1.5px solid var(--gray-200); background: white; border-radius: 10px; padding: 8px 4px; text-align: center; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .date-btn:hover { border-color: var(--teal); background: #e6f5f5; }
  .date-btn.active { background: var(--teal); border-color: var(--teal); color: white; }
  .date-day { font-size: 0.65rem; color: inherit; opacity: 0.7; }
  .date-num { font-size: 0.95rem; font-weight: 600; }

  .slots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .slot-btn { border: 1.5px solid var(--gray-200); background: white; border-radius: 8px; padding: 9px 8px; text-align: center; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; font-family: 'DM Sans', sans-serif; color: var(--gray-600); }
  .slot-btn:hover:not(.taken) { border-color: var(--teal); color: var(--teal); }
  .slot-btn.active { background: var(--teal); border-color: var(--teal); color: white; font-weight: 600; }
  .slot-btn.taken { background: var(--gray-100); color: var(--gray-400); cursor: not-allowed; text-decoration: line-through; }

  .payment-box { border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm); overflow: hidden; }
  .payment-methods { display: flex; gap: 8px; padding: 1rem; }
  .pay-method { flex: 1; border: 1.5px solid var(--gray-200); border-radius: 8px; padding: 10px 8px; text-align: center; cursor: pointer; transition: all 0.2s; }
  .pay-method:hover, .pay-method.active { border-color: var(--teal); background: #e6f5f5; }
  .pay-method-icon { font-size: 1.4rem; display: block; }
  .pay-method-label { font-size: 0.7rem; color: var(--gray-600); margin-top: 4px; font-weight: 500; }
  .pay-detail { padding: 1rem; border-top: 1px solid var(--gray-100); }

  .fee-summary { background: var(--gray-50); border-radius: 10px; padding: 1rem; margin: 1rem 0; }
  .fee-row { display: flex; justify-content: space-between; font-size: 0.86rem; padding: 4px 0; }
  .fee-row.total { font-weight: 700; font-size: 1rem; color: var(--teal-dark); border-top: 1px solid var(--gray-200); padding-top: 10px; margin-top: 6px; }

  .confirm-btn { width: 100%; background: linear-gradient(135deg, var(--teal-dark), var(--teal)); color: white; border: none; border-radius: 12px; padding: 14px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px; }
  .confirm-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .confirm-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .ghost-btn { flex: 0 0 auto; width: auto; background: var(--gray-200); color: var(--gray-600); }

  .toggle-row { display: flex; align-items: center; justify-content: space-between; border: 1.5px solid var(--gray-200); border-radius: 10px; padding: 12px 14px; cursor: pointer; transition: all 0.2s; }
  .toggle-row.active { border-color: var(--gold); background: #fef9ef; }
  .toggle-row-text strong { display: block; font-size: 0.88rem; color: var(--gray-800); }
  .toggle-row-text span { font-size: 0.76rem; color: var(--gray-400); }
  .toggle-switch { width: 42px; height: 24px; border-radius: 12px; background: var(--gray-200); position: relative; transition: background 0.2s; flex-shrink: 0; }
  .toggle-switch.on { background: var(--gold); }
  .toggle-knob { width: 18px; height: 18px; border-radius: 50%; background: white; position: absolute; top: 3px; left: 3px; transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
  .toggle-switch.on .toggle-knob { left: 21px; }

  .success-screen { text-align: center; padding: 3rem 2rem; }
  .success-icon { width: 90px; height: 90px; background: linear-gradient(135deg, var(--green), #3dc47a); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem; box-shadow: 0 8px 32px rgba(46,158,106,0.35); }
  .success-screen h2 { font-family: 'Playfair Display', serif; font-size: 1.7rem; color: var(--teal-dark); margin-bottom: 0.5rem; }
  .success-screen p { color: var(--gray-400); font-size: 0.92rem; margin-bottom: 2rem; }
  .booking-ref { background: var(--gray-50); border: 1.5px dashed var(--teal); border-radius: 12px; padding: 1rem 1.5rem; display: inline-block; margin-bottom: 2rem; }
  .booking-ref p { font-size: 0.8rem; color: var(--gray-400); margin-bottom: 4px; }
  .booking-ref strong { font-size: 1.3rem; color: var(--teal-dark); font-family: 'Playfair Display', serif; letter-spacing: 2px; }
  .success-details { display: flex; flex-direction: column; gap: 10px; text-align: left; background: white; border: 1px solid var(--gray-100); border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem; }
  .success-detail-row { display: flex; justify-content: space-between; font-size: 0.86rem; }
  .success-detail-row span:first-child { color: var(--gray-400); }
  .success-detail-row span:last-child { font-weight: 600; color: var(--gray-800); text-align: right; }
  .done-btn { background: var(--teal); color: white; border: none; border-radius: 10px; padding: 12px 32px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }

  .tracker { display: flex; justify-content: space-between; margin-bottom: 1.5rem; position: relative; }
  .tracker::before { content: ''; position: absolute; top: 14px; left: 5%; right: 5%; height: 2px; background: var(--gray-200); z-index: 0; }
  .tracker-step { display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative; z-index: 1; flex: 1; }
  .tracker-dot { width: 28px; height: 28px; border-radius: 50%; background: var(--gray-200); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: white; }
  .tracker-dot.active { background: var(--gold); }
  .tracker-label { font-size: 0.68rem; color: var(--gray-400); text-align: center; }
  .tracker-label.active { color: var(--gray-800); font-weight: 600; }

  .why-section { background: linear-gradient(135deg, var(--teal-dark), var(--teal)); padding: 4rem 2rem; }
  .why-inner { max-width: 1100px; margin: 0 auto; }
  .why-inner h2 { font-family: 'Playfair Display', serif; color: white; font-size: 2rem; text-align: center; margin-bottom: 0.5rem; }
  .why-inner p { color: rgba(255,255,255,0.65); text-align: center; margin-bottom: 2.5rem; }
  .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
  .why-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius); padding: 1.5rem; transition: all 0.3s; }
  .why-card:hover { background: rgba(255,255,255,0.14); transform: translateY(-4px); }
  .why-icon { font-size: 2.2rem; margin-bottom: 1rem; }
  .why-card h3 { color: var(--gold-light); font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; }
  .why-card p { color: rgba(255,255,255,0.65); font-size: 0.85rem; line-height: 1.6; }

  .footer { background: var(--gray-800); padding: 3rem 2rem 1.5rem; }
  .footer-inner { max-width: 1100px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
  .footer-brand strong { font-family: 'Playfair Display', serif; color: white; font-size: 1.2rem; display: block; margin-bottom: 0.8rem; }
  .footer-brand p { color: var(--gray-400); font-size: 0.85rem; line-height: 1.7; }
  .footer-col h4 { color: white; font-size: 0.88rem; font-weight: 600; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px; }
  .footer-col a { display: block; color: var(--gray-400); font-size: 0.85rem; margin-bottom: 0.5rem; cursor: pointer; }
  .footer-col a:hover { color: var(--gold-light); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-bottom p { color: var(--gray-400); font-size: 0.8rem; }
  .footer-emergency { background: rgba(224,82,82,0.15); border: 1px solid rgba(224,82,82,0.3); color: #ff8080; border-radius: 8px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600; }

  .empty-state { text-align: center; padding: 4rem 2rem; color: var(--gray-400); }
  .empty-state .icon { font-size: 3rem; margin-bottom: 1rem; }
  .empty-state h3 { font-size: 1.2rem; color: var(--gray-600); margin-bottom: 0.5rem; }

  .steps { display: flex; align-items: center; gap: 0; margin-bottom: 1.5rem; }
  .step { display: flex; align-items: center; gap: 8px; flex: 1; }
  .step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; border: 2px solid var(--gray-200); color: var(--gray-400); flex-shrink: 0; transition: all 0.3s; }
  .step-circle.done { background: var(--teal); border-color: var(--teal); color: white; }
  .step-circle.active { border-color: var(--teal); color: var(--teal); }
  .step-label { font-size: 0.74rem; color: var(--gray-400); }
  .step-label.active { color: var(--teal); font-weight: 600; }
  .step-line { flex: 1; height: 2px; background: var(--gray-200); margin: 0 6px; }
  .step-line.done { background: var(--teal); }

  @media (max-width: 700px) {
    .nav-links { display: none; }
    .form-row, .form-row-3 { grid-template-columns: 1fr; }
    .dates-grid { grid-template-columns: repeat(4, 1fr); }
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    .hero-stats { gap: 1.5rem; }
    .doctors-grid, .pkg-grid { grid-template-columns: 1fr; }
    .checkup-hero-inner { grid-template-columns: 1fr; }
  }
`;

const DOCTORS = [
  { id: 1, name: "Dr. Rajesh Kumar Sinha", specialty: "General Physician", city: "Munger", clinic: "Sinha Medical Hall, Station Road", exp: "18 Years", fee: 300, rating: 4.7, reviews: 312, quali:"MBBS, MD", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["09:00 AM","09:30 AM","10:00 AM","10:30 AM","02:00 PM","02:30 PM","03:00 PM","04:00 PM"] },
  { id: 2, name: "Dr. Deepankar Chaudhary", specialty: "General Physician", city: "Munger", clinic: "Sadar Hospital Road, Bekapur", exp: "10 Years", fee: 400, rating: 4.6, reviews: 142, quali:"MBBS, MD (General Medicine)", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["08:30 AM","09:00 AM","10:00 AM","03:00 PM","03:30 PM","05:00 PM"] },
  { id: 3, name: "Dr. Priya Sharma", specialty: "Gynecologist", city: "Munger", clinic: "Sharma Ladies Clinic, Kasim Chowk", exp: "12 Years", fee: 500, rating: 4.9, reviews: 487, quali:"MBBS, MS (Gynae)", langs:"Hindi", emoji:"👩‍⚕️", available:true, slots:["10:00 AM","10:30 AM","11:00 AM","11:30 AM","05:00 PM","05:30 PM","06:00 PM"] },
  { id: 4, name: "Dr. Renu Singh", specialty: "Gynecologist", city: "Munger", clinic: "Belan Bazar, Near Town High School", exp: "22 Years", fee: 400, rating: 4.8, reviews: 310, quali:"MBBS, DGO", langs:"Hindi, English", emoji:"👩‍⚕️", available:true, slots:["09:00 AM","09:30 AM","11:00 AM","04:00 PM","04:30 PM"] },
  { id: 5, name: "Dr. Sunita Prasad", specialty: "Pediatrician", city: "Munger", clinic: "Bal Swasthya Kendra, Lal Darwaza", exp: "15 Years", fee: 400, rating: 4.6, reviews: 561, quali:"MBBS, DCH, MD (Pediatrics)", langs:"Hindi, Maithili", emoji:"👩‍⚕️", available:true, slots:["08:30 AM","09:00 AM","09:30 AM","10:00 AM","04:00 PM","04:30 PM","05:00 PM"] },
  { id: 6, name: "Dr. S. K. Suman", specialty: "Orthopedic", city: "Munger", clinic: "Suman Fracture Clinic, Bekapur", exp: "14 Years", fee: 400, rating: 4.7, reviews: 189, quali:"MBBS, MS (Ortho)", langs:"Hindi, English", emoji:"👨‍⚕️", available:false, slots:["10:00 AM","10:30 AM","02:00 PM","02:30 PM","05:30 PM"] },
  { id: 7, name: "Dr. S. K. Choudhary", specialty: "General Physician", city: "Jamalpur", clinic: "Sadar Bazar Road, Near Sangeeta Store", exp: "20 Years", fee: 400, rating: 4.5, reviews: 182, quali:"MBBS, MD (Internal Medicine)", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["09:00 AM","09:30 AM","10:00 AM","03:00 PM","03:30 PM"] },
  { id: 8, name: "Dr. Niranjan Kumar", specialty: "General Physician", city: "Jamalpur", clinic: "Walipur Road, Sadar Bazar", exp: "14 Years", fee: 300, rating: 4.4, reviews: 95, quali:"MBBS", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["08:00 AM","08:30 AM","01:00 PM","01:30 PM","06:00 PM"] },
  { id: 9, name: "Dr. R. K. Singh", specialty: "Orthopedic", city: "Jamalpur", clinic: "Ekta Clinic, Station Road", exp: "16 Years", fee: 400, rating: 4.7, reviews: 210, quali:"MBBS, MS (Ortho)", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["10:00 AM","10:30 AM","11:00 AM","02:00 PM","05:30 PM"] },
  { id: 10, name: "Dr. Amit Kumar", specialty: "Dentist", city: "Jamalpur", clinic: "Advanced Dental Care, Jubilee Well Chowk", exp: "8 Years", fee: 300, rating: 4.9, reviews: 115, quali:"BDS, MDS (Orthodontics)", langs:"Hindi, English", emoji:"🦷", available:true, slots:["09:30 AM","10:00 AM","11:00 AM","04:00 PM","04:30 PM"] },
  { id: 11, name: "Dr. Rupesh Agrawal", specialty: "Cardiologist", city: "Bhagalpur", clinic: "Navjeevan Hospital, Tilkamanjhi", exp: "9 Years", fee: 700, rating: 4.8, reviews: 198, quali:"MBBS, MD, DM (Cardiology)", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["09:00 AM","09:30 AM","11:00 AM","03:00 PM","03:30 PM"] },
  { id: 12, name: "Dr. Sanjeev Kumar", specialty: "Dermatologist", city: "Bhagalpur", clinic: "Skin Care Clinic, Ghantaghar Chowk", exp: "11 Years", fee: 500, rating: 4.7, reviews: 245, quali:"MBBS, MD (Dermatology)", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["11:00 AM","11:30 AM","05:00 PM","05:30 PM","06:00 PM"] },
  { id: 13, name: "Dr. S. N. Kumar", specialty: "ENT Specialist", city: "Bhagalpur", clinic: "ENT Clinic, Khalifabagh Chowk", exp: "18 Years", fee: 400, rating: 4.6, reviews: 167, quali:"MBBS, MS (ENT)", langs:"Hindi, English", emoji:"👨‍⚕️", available:true, slots:["09:30 AM","10:00 AM","10:30 AM","03:00 PM","04:00 PM"] },
  { id: 14, name: "Dr. Brajesh Kumar", specialty: "Pediatrician", city: "Bhagalpur", clinic: "Sulochna Polyclinic & Nursing Home, City Center", exp: "14 Years", fee: 600, rating: 4.9, reviews: 145, quali:"MBBS, MD (Pediatrics)", langs:"Hindi, English, Maithili", emoji:"👨‍⚕️", available:true, slots:["08:30 AM","09:00 AM","09:30 AM","04:00 PM","04:30 PM"] },
  { id: 15, name: "Dr. Kanhaiya Lal Gupta", specialty: "Orthopedic", city: "Bhagalpur", clinic: "Sri Nageshwar Ortho & Trauma Centre", exp: "27 Years", fee: 500, rating: 4.8, reviews: 380, quali:"MBBS, MS (Ortho)", langs:"Hindi, English", emoji:"👨‍⚕️", available:false, slots:["10:00 AM","10:30 AM","02:00 PM","02:30 PM","05:00 PM"] },
  { id: 16, name: "Dr. Harish Aziz", specialty: "General Physician", city: "Bhagalpur", clinic: "Aziz Nursing Home, Bhikanpur", exp: "16 Years", fee: 500, rating: 4.5, reviews: 89, quali:"MBBS, MD", langs:"Hindi, English, Urdu", emoji:"👨‍⚕️", available:true, slots:["09:00 AM","09:30 AM","01:00 PM","01:30 PM","06:00 PM"] },
];

const SPEC_ICONS = {
  "General Physician":"🩺","Gynecologist":"🌸","Pediatrician":"👶","Orthopedic":"🦴",
  "Dentist":"🦷","Cardiologist":"❤️","Dermatologist":"✨","ENT Specialist":"👂"
};

const HEALTH_CATEGORIES = [
  { id: "general", name: "General Health", icon: "🩺" },
  { id: "diet", name: "Diet & Nutrition", icon: "🥗" },
  { id: "fitness", name: "Fitness & Exercise", icon: "🏃" },
  { id: "heart", name: "Heart Health", icon: "❤️" },
  { id: "diabetes", name: "Diabetes", icon: "🩸" },
  { id: "mental", name: "Mental Health", icon: "🧠" },
  { id: "skin", name: "Skin Care", icon: "✨" },
  { id: "disease", name: "Disease Prevention", icon: "🛡️" },
  { id: "seasonal", name: "Seasonal Health", icon: "🌦️" },
  { id: "emergency", name: "Emergency Tips", icon: "🚨" },
];

let _tid = 0;
const ht = (category, title, excerpt, opts = {}) => ({
  id: `ht${++_tid}`,
  category,
  title,
  excerpt,
  icon: opts.icon || "💡",
  readTime: opts.readTime || `${3 + (_tid % 5)} min read`,
  reviewed: opts.reviewed !== false,
  popular: !!opts.popular,
  latest: !!opts.latest,
});

const HEALTH_TIPS_DATA = [
  ht("general", "Daily Health Tips for a Better You", "Small, consistent habits—hydration, movement, sleep—compound into long-term wellness.", { icon: "🌅", popular: true }),
  ht("general", "Building a Healthy Lifestyle", "A practical framework covering diet, exercise, sleep and stress for everyday life.", { icon: "🌿" }),
  ht("general", "Morning Routine for Energy & Focus", "Start the day right with hydration, light movement and a nutrient-dense breakfast.", { icon: "☀️", latest: true }),
  ht("general", "How Much Water Should You Drink Daily?", "Understanding your body's hydration needs through the day.", { icon: "💧", popular: true }),
  ht("general", "Sleep Tips for Restful Nights", "Practical tips to fall asleep faster and wake up refreshed.", { icon: "😴" }),
  ht("general", "Managing Everyday Stress", "Simple, doctor-approved techniques to manage daily stress.", { icon: "🧘" }),
  ht("general", "Boost Your Immunity Naturally", "Diet, sleep and lifestyle factors that strengthen immune defence.", { icon: "🛡️", popular: true }),
  ht("diet", "What Is a Balanced Diet?", "Understanding macronutrients, micronutrients and portion balance.", { icon: "🍽️", popular: true }),
  ht("diet", "Healthy Eating Made Simple", "Practical swaps for a healthier daily diet without giving up taste.", { icon: "🥦" }),
  ht("diet", "Vitamin D: The Sunshine Vitamin", "Why most Indians are deficient and how to fix it.", { icon: "☀️", popular: true }),
  ht("diet", "Top Protein Rich Foods", "Plant and animal protein sources to include in your daily meals.", { icon: "🍗" }),
  ht("diet", "Healthy Snacking Guide", "Smart snack swaps to avoid energy crashes.", { icon: "🥜" }),
  ht("fitness", "Walking: The Most Underrated Exercise", "Benefits of a daily walk and how many steps you really need.", { icon: "🚶", popular: true }),
  ht("fitness", "Yoga for Everyday Wellness", "Beginner-friendly yoga poses for flexibility and calm.", { icon: "🧘", popular: true }),
  ht("fitness", "Running for Beginners", "A safe, structured way to start running.", { icon: "🏃" }),
  ht("fitness", "Effective Home Workouts", "No-equipment workouts you can do anywhere.", { icon: "🏠" }),
  ht("heart", "Keeping Your Heart Healthy", "Daily habits that protect cardiovascular health.", { icon: "❤️", popular: true }),
  ht("heart", "Understanding Blood Pressure", "What your BP numbers mean and how to manage them.", { icon: "🩺" }),
  ht("heart", "Heart Attack Warning Signs", "Symptoms that need immediate medical attention.", { icon: "🚨", popular: true }),
  ht("heart", "Heart-Healthy Foods", "Diet choices that support a strong cardiovascular system.", { icon: "🥑" }),
  ht("diabetes", "Preventing Type 2 Diabetes", "Lifestyle changes that significantly cut diabetes risk.", { icon: "🩸", popular: true }),
  ht("diabetes", "Blood Sugar Control Tips", "Daily habits to keep blood sugar in a healthy range.", { icon: "📊" }),
  ht("diabetes", "Diabetes-Friendly Diet Plan", "What to eat and avoid for better glucose control.", { icon: "🍽️" }),
  ht("mental", "Understanding Everyday Stress", "How stress affects the body and mind.", { icon: "🧠", popular: true }),
  ht("mental", "Coping with Anxiety", "Practical, doctor-backed ways to manage anxious thoughts.", { icon: "😟" }),
  ht("mental", "Getting Better Sleep for Mental Health", "The link between sleep quality and emotional wellbeing.", { icon: "😴" }),
  ht("mental", "Meditation Basics", "A simple guided approach to starting meditation.", { icon: "🪷" }),
  ht("skin", "Daily Habits for Healthy Skin", "Simple routines for glowing, healthy skin.", { icon: "✨", popular: true }),
  ht("skin", "Managing Acne", "Causes of acne and effective management strategies.", { icon: "🔵" }),
  ht("skin", "Sun Protection Essentials", "Why daily SPF matters, even indoors.", { icon: "🧴" }),
  ht("disease", "Preventing Common Infections", "Hygiene and vaccination basics that prevent illness.", { icon: "🛡️", popular: true }),
  ht("disease", "Dengue Prevention Guide", "How to protect your family during dengue season.", { icon: "🦟" }),
  ht("seasonal", "Beating the Summer Heat Stroke Risk", "Recognising and preventing heat stroke.", { icon: "🌡️", popular: true }),
  ht("seasonal", "Staying Hydrated in Summer", "Preventing dehydration during peak summer.", { icon: "💧" }),
  ht("seasonal", "Winter Cold Prevention", "Staying healthy as temperatures drop.", { icon: "❄️" }),
  ht("emergency", "Heart Attack: Act Fast", "Recognising symptoms and acting in the first minutes.", { icon: "🚨", popular: true }),
  ht("emergency", "Stroke: Recognise the Signs (FAST)", "The FAST method to identify a stroke quickly.", { icon: "🧠", popular: true }),
  ht("emergency", "CPR Basics Everyone Should Know", "Simple steps that can save a life.", { icon: "❤️‍🩹", popular: true }),
];

const buildSpecs = () => {
  const counts = {};
  DOCTORS.forEach(d => counts[d.specialty] = (counts[d.specialty]||0)+1);
  const list = [{ name:"All", icon:"🏥", count:DOCTORS.length }];
  Object.keys(counts).forEach(name => list.push({ name, icon: SPEC_ICONS[name] || "🏥", count: counts[name] }));
  return list;
};
const SPECS = buildSpecs();

const PACKAGES = [
  { id:1, name:"Basic Health Package", icon:"🟢", tagline:"Routine Checkup", count:24, oldPrice:999, price:499, popular:false,
    included:["Complete Blood Count (CBC) — infection, anemia, hemoglobin","Blood Sugar (Fasting) — diabetes screening","Kidney Function Test (KFT) — Serum Creatinine, Uric Acid","Lipid Profile (Basic) — cholesterol levels"] },
  { id:2, name:"Comprehensive Advanced Health Package", icon:"🟡", tagline:"Most Popular", count:50, oldPrice:1999, price:999, popular:true,
    included:["Saare Basic Package tests","Liver Function Test (LFT) — Bilirubin, SGOT, SGPT","Thyroid Profile (T3, T4, TSH)","Urine Routine & Microscopy"] },
  { id:3, name:"Premium Full Body Care", icon:"🔴", tagline:"Senior Citizen & Vitamin Special", count:70, oldPrice:2999, price:1499, popular:false,
    included:["Saare Advanced Package tests","Vitamin D3 & Vitamin B12 — bone & nerve health","HbA1c — 3 mahine ka average sugar control","Iron Profile — khoon banne ki kshamta"] },
];

const INDIVIDUAL_TESTS = [
  { id:"t1", category:"Diabetes & Metabolism", name:"Blood Glucose (Fasting / PP)", price:60 },
  { id:"t2", category:"Diabetes & Metabolism", name:"HbA1c (Glycated Haemoglobin)", price:280 },
  { id:"t3", category:"Monsoon & Seasonal Fevers", name:"Widal Test (Typhoid)", price:180 },
  { id:"t4", category:"Monsoon & Seasonal Fevers", name:"Dengue NS1 / IgM / IgG", price:550 },
  { id:"t5", category:"Monsoon & Seasonal Fevers", name:"Malaria Smear (MP)", price:120 },
  { id:"t6", category:"Monsoon & Seasonal Fevers", name:"Fever Profile Combo (CBC+Widal+Malaria+Urine)", price:599 },
  { id:"t7", category:"Vital Organs & Bone Health", name:"Lipid Profile (Complete Heart Risk)", price:350 },
  { id:"t8", category:"Vital Organs & Bone Health", name:"Liver Function Test (LFT)", price:350 },
  { id:"t9", category:"Vital Organs & Bone Health", name:"Kidney Function Test (KFT/KRE)", price:350 },
  { id:"t10", category:"Vital Organs & Bone Health", name:"Thyroid Profile (T3, T4, TSH)", price:300 },
  { id:"t11", category:"Vital Organs & Bone Health", name:"Vitamin D3 (25-Hydroxy)", price:550 },
  { id:"t12", category:"Vital Organs & Bone Health", name:"Vitamin B12", price:450 },
];

const getDates = () => {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    dates.push({ day: days[d.getDay()], num: d.getDate(), full: d.toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'}) });
  }
  return dates;
};

const TIME_SLOTS = ["6:00-7:00 AM","7:00-8:00 AM","8:00-9:00 AM","9:00-10:00 AM"];
const takenSlots = ["10:30 AM", "11:30 AM", "02:30 PM"];

const NavLink = ({ label, target, isNew, page, onNavigate }) => (
  <span className={`nav-link ${page === target ? "active" : ""} ${isNew ? "new-tag" : ""}`} onClick={() => onNavigate(target)}>
    {label}{isNew && <span className="nav-new-badge">NEW</span>}
  </span>
);

export default function DoctorService() {
  const navigate = useNavigate();
  const [page, setPage] = useState("home");
  const [cityFilter, setCityFilter] = useState("All");
  const [specFilter, setSpecFilter] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [payMethod, setPayMethod] = useState("upi");
  const [form, setForm] = useState({ name:"", phone:"", age:"", problem:"" });
  const [upiId, setUpiId] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [ckStep, setCkStep] = useState(1);
  const [ckForm, setCkForm] = useState({ name:"", age:"", gender:"Male", address:"", city:"Munger" });
  const [ckDate, setCkDate] = useState(null);
  const [ckSlot, setCkSlot] = useState(null);
  const [hardCopy, setHardCopy] = useState(false);
  const [ckPayMethod, setCkPayMethod] = useState("upi");
  const [ckConfirmed, setCkConfirmed] = useState(false);
  const [ckRef, setCkRef] = useState("");
  const [ckProcessing, setCkProcessing] = useState(false);
  const [expandedPkg, setExpandedPkg] = useState(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [customSelected, setCustomSelected] = useState([]);
  const [healthTipsQuery, setHealthTipsQuery] = useState("");
  const [healthTipsActiveCat, setHealthTipsActiveCat] = useState("all");
  const [healthTipsFilter, setHealthTipsFilter] = useState("all");
  const [healthTipsPopularTab, setHealthTipsPopularTab] = useState("latest");
  const [healthTipsActiveArticle, setHealthTipsActiveArticle] = useState(null);
  const [healthTipsLiked, setHealthTipsLiked] = useState({});
  const [healthTipsSaved, setHealthTipsSaved] = useState({});

  const dates = getDates();
  const filtered = DOCTORS.filter(d => {
    const cityOk = cityFilter === "All" || d.city === cityFilter;
    const specOk = specFilter === "All" || d.specialty === specFilter;
    const searchOk = !searchQ || d.name.toLowerCase().includes(searchQ.toLowerCase()) || d.specialty.toLowerCase().includes(searchQ.toLowerCase());
    return cityOk && specOk && searchOk;
  });

  const healthTipsCatName = (id) => HEALTH_CATEGORIES.find((c) => c.id === id)?.name || id;
  const filteredHealthTips = HEALTH_TIPS_DATA.filter(x => {
    let ok = true;
    if (healthTipsActiveCat !== "all") ok = ok && x.category === healthTipsActiveCat;
    if (healthTipsFilter === "popular") ok = ok && x.popular;
    if (healthTipsFilter === "latest") ok = ok && x.latest;
    if (healthTipsQuery.trim()) {
      const q = healthTipsQuery.trim().toLowerCase();
      ok = ok && (x.title.toLowerCase().includes(q) || x.excerpt.toLowerCase().includes(q) || x.category.toLowerCase().includes(q));
    }
    return ok;
  });

  const toggleHealthTipsLike = (id) => setHealthTipsLiked((p) => ({ ...p, [id]: !p[id] }));
  const toggleHealthTipsSave = (id) => setHealthTipsSaved((p) => ({ ...p, [id]: !p[id] }));

  const openBooking = (doc) => { setSelectedDoctor(doc); setBookingStep(1); setSelectedDate(null); setSelectedSlot(null); setConfirmed(false); setForm({name:"",phone:"",age:"",problem:""}); setUpiId(""); };
  const closeModal = () => setSelectedDoctor(null);
  const handleConfirm = () => {
    if (!form.name || !form.phone || !selectedDate || !selectedSlot) return;
    setProcessing(true);
    setTimeout(() => {
      setBookingRef("MJ" + Math.floor(100000 + Math.random() * 900000));
      setConfirmed(true);
      setProcessing(false);
    }, 1500);
  };

  const openCheckupBooking = (pkg) => { setSelectedPkg(pkg); setCkStep(1); setCkDate(null); setCkSlot(null); setHardCopy(false); setCkConfirmed(false); setCkForm({ name:"", age:"", gender:"Male", address:"", city:"Munger" }); };
  const closeCkModal = () => setSelectedPkg(null);
  const toggleCustomTest = (test) => {
    setCustomSelected(prev => prev.find(t => t.id === test.id) ? prev.filter(t => t.id !== test.id) : [...prev, test]);
  };
  const customTotal = customSelected.reduce((sum,t) => sum + t.price, 0);
  const proceedWithCustom = () => {
    if (customSelected.length === 0) return;
    setBuilderOpen(false);
    openCheckupBooking({ name:"Custom Test Selection", price: customTotal, icon:"📝", included: customSelected.map(t => `${t.name} (₹${t.price})`) });
  };

  const ckTotal = (selectedPkg && selectedPkg.price ? selectedPkg.price : 0) + (hardCopy ? 35 : 0);
  const handleCkConfirm = () => {
    if (!ckForm.name || !ckForm.age || !ckForm.address || !ckDate || !ckSlot) return;
    setCkProcessing(true);
    setTimeout(() => {
      setCkRef("LAB" + Math.floor(100000 + Math.random() * 900000));
      setCkConfirmed(true);
      setCkProcessing(false);
    }, 1500);
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  return (
    <MobileFrame>
      <div className="min-h-screen bg-[#F8FAFC] pb-32">
        <style>{style}</style>
        <div className="app">
        <nav className="nav">
          <div className="nav-logo" onClick={() => setPage("home")}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigate('/customer/home'); }}
              className="mr-2 rounded-full bg-white/10 p-2 text-white"
              aria-label="Go back"
            >
              ←
            </button>
            <div className="nav-logo-icon">🏥</div>
            <div className="nav-logo-text"><strong>DocBook Bihar</strong><span>Munger · Jamalpur · Bhagalpur</span></div>
          </div>
          <div className="nav-links">
            <NavLink label="Doctors" target="home" page={page} onNavigate={setPage} />
            <NavLink label="Lab Tests & Checkups" target="checkup" isNew page={page} onNavigate={setPage} />
            <NavLink label="Health Tips" target="health-tips" page={page} onNavigate={setPage} />
          </div>
          <div className="nav-right">
            <select className="nav-city" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
              <option value="All">📍 Sabhi Sheher</option>
              <option value="Munger">📍 Munger</option>
              <option value="Jamalpur">📍 Jamalpur</option>
              <option value="Bhagalpur">📍 Bhagalpur</option>
            </select>
            <button className="nav-btn">Login / Register</button>
          </div>
        </nav>

        {page === "home" && (
          <>
            <div className="hero">
              <div className="hero-inner">
                <div className="hero-badge">⭐ Munger · Jamalpur · Bhagalpur ka #1 Healthcare Platform</div>
                <h1>Apne Sheher Mein <span>Trusted Doctor</span> Ko Book Karen</h1>
                <p>Munger, Jamalpur aur Bhagalpur ke best doctors se appointment book karen — ghar baithe, sirf ek click mein. Online fee payment ke saath guaranteed slot.</p>
                <div className="search-bar">
                  <input className="search-input" placeholder="Doctor ka naam ya specialty dhundhen..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                  <select className="search-select" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
                    <option value="All">Sabhi Sheher</option>
                    <option value="Munger">Munger</option>
                    <option value="Jamalpur">Jamalpur</option>
                    <option value="Bhagalpur">Bhagalpur</option>
                  </select>
                  <button className="search-btn">🔍 Dhundhen</button>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat"><strong>{DOCTORS.length}+</strong><span>Registered Doctors</span></div>
                  <div className="hero-stat"><strong>8,000+</strong><span>Happy Patients</span></div>
                  <div className="hero-stat"><strong>3</strong><span>Sheher Mein Available</span></div>
                  <div className="hero-stat"><strong>₹300</strong><span>Starting Fee</span></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <div><div className="section-title">Specialty <span>Chunen</span></div><div className="section-sub">Apni zaroorat ke anusaar specialist dhundhen</div></div>
              </div>
              <div className="specs-grid">
                {SPECS.map(s => (
                  <div key={s.name} className={`spec-card ${specFilter === s.name ? "active" : ""}`} onClick={() => setSpecFilter(s.name)}>
                    <div className="spec-icon">{s.icon}</div>
                    <div className="spec-name">{s.name}</div>
                    <div className="spec-count">{s.count} Doctors</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section" style={{paddingTop:0}}>
              <div className="section-header">
                <div>
                  <div className="section-title">Available <span>Doctors</span></div>
                  <div className="section-sub">{filtered.length} doctors mil rahe hain — {cityFilter === "All" ? "Munger, Jamalpur & Bhagalpur" : cityFilter} mein</div>
                </div>
                <div className="filters">
                  {["All","Munger","Jamalpur","Bhagalpur"].map(c => (
                    <button key={c} className={`filter-btn ${cityFilter === c ? "active" : ""}`} onClick={() => setCityFilter(c)}>{c === "All" ? "Sabhi" : c}</button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="empty-state"><div className="icon">🔍</div><h3>Koi doctor nahi mila</h3><p>Filter badlen ya search query change karen</p></div>
              ) : (
                <div className="doctors-grid">
                  {filtered.map(doc => (
                    <div className="doctor-card" key={doc.id} onClick={() => openBooking(doc)}>
                      <div className="doctor-card-header">
                        <span className="city-pill">📍 {doc.city}</span>
                        <div className="doctor-avatar">{doc.emoji}</div>
                        <div className="doctor-name">{doc.name}</div>
                        <div className="doctor-specialty">{doc.specialty} • {doc.quali}</div>
                        <div className={`doctor-badge ${doc.available ? "" : "busy"}`}>{doc.available ? "✓ Available" : "Busy Today"}</div>
                      </div>
                      <div className="doctor-card-body">
                        <div className="doctor-meta">
                          <div className="doctor-meta-row"><span>📍</span><span>{doc.clinic}</span></div>
                          <div className="doctor-meta-row"><span>🎓</span><span>{doc.exp} Experience</span></div>
                          <div className="doctor-meta-row"><span>🌐</span><span>{doc.langs}</span></div>
                          <div className="doctor-rating">
                            <span className="stars">{"★".repeat(Math.floor(doc.rating))}{"☆".repeat(5-Math.floor(doc.rating))}</span>
                            <span className="rating-val">{doc.rating}</span>
                            <span className="rating-count">({doc.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="doctor-footer">
                          <div className="fee-tag">
                            <span className="fee-label">Consultation Fee</span>
                            <span className="fee-amount"><sup>₹</sup>{doc.fee}</span>
                          </div>
                          <button className="book-btn" onClick={e => { e.stopPropagation(); openBooking(doc); }}>Book Karen →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {page === "checkup" && (
          <>
            <div className="checkup-hero">
              <div className="checkup-hero-inner">
                <div>
                  <h1>Ghar Baithe <span>Lab Test</span> Aur Routine Checkup Karwayen!</h1>
                  <p>Verified lab technician aayega aapke ghar, safe aur sanitised sample collection ke saath. Reports seedhe aapke phone par WhatsApp aur app dashboard par milengi.</p>
                  <button className="checkup-cta" onClick={() => document.getElementById("pkg-section")?.scrollIntoView({behavior:"smooth"})}>📦 Book Home Test Now</button>
                </div>
                <div className="checkup-hero-visual">
                  <ul>
                    <li><b>✓</b> Verified & trained phlebotomist</li>
                    <li><b>✓</b> Live status: collected → processing → ready</li>
                    <li><b>✓</b> Free virtual PDF report on WhatsApp</li>
                    <li><b>✓</b> Optional printed copy delivered home (+₹35)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <div><div className="section-title">Kaise <span>Kaam Karta Hai</span></div><div className="section-sub">4 simple steps mein apna test book karen</div></div>
              </div>
              <div className="how-grid">
                {[
                  { n:1, t:"Package Chunen", d:"Apni zaroorat ke anusaar health package ya individual test select karen" },
                  { n:2, t:"Slot Book Karen", d:"Khali pet test ke liye subah ka time slot chunen (6 AM - 10 AM)" },
                  { n:3, t:"Sample Collection", d:"Verified technician aapke ghar aakar sample collect karega" },
                  { n:4, t:"Report Milegi", d:"24-48 ghante mein PDF report WhatsApp aur dashboard par" },
                ].map(s => (
                  <div className="how-card" key={s.n}>
                    <div className="how-num">{s.n}</div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section" id="pkg-section" style={{paddingTop:0}}>
              <div className="section-header">
                <div><div className="section-title">Health Checkup <span>Packages</span></div><div className="section-sub">Discounted prices, doorstep collection</div></div>
              </div>
              <div className="pkg-grid">
                {PACKAGES.map(p => (
                  <div className={`pkg-card ${p.popular ? "popular" : ""}`} key={p.id}>
                    {p.popular && <div className="pkg-ribbon">⭐ MOST POPULAR</div>}
                    <div className="pkg-body">
                      <div className="pkg-icon">{p.icon}</div>
                      <div className="pkg-name">{p.name}</div>
                      <span className="pkg-tagline">{p.tagline} • {p.count}+ Tests</span>
                      {expandedPkg === p.id && (
                        <ul className="pkg-tests-list">{p.included.map((t,i) => <li key={i}>{t}</li>)}</ul>
                      )}
                      <div className="pkg-price-row">
                        <span className="pkg-old-price">₹{p.oldPrice}</span>
                        <span className="pkg-new-price">₹{p.price}</span>
                        <span className="pkg-discount">{Math.round((1-p.price/p.oldPrice)*100)}% OFF</span>
                      </div>
                      <div className="pkg-actions">
                        <button className="pkg-view-btn" onClick={() => setExpandedPkg(expandedPkg === p.id ? null : p.id)}>
                          {expandedPkg === p.id ? "Chupayen ▲" : "Tests Dekhein ▼"}
                        </button>
                        <button className="pkg-btn" style={{flex:1}} onClick={() => openCheckupBooking({ name:p.name, price:p.price, icon:p.icon, included:p.included })}>Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="builder-banner">
                <div className="builder-banner-text">
                  <h3>🧪 Apna Test Khud Chunen</h3>
                  <p>Doctor ne specific test likha hai? Individual tests select karen aur sirf unhi ka payment karen — fee automatic calculate ho jayegi.</p>
                </div>
                <button className="builder-banner-btn" onClick={() => setBuilderOpen(true)}>+ Tests Select Karen</button>
              </div>
            </div>
          </>
        )}

        {page === "checkup" && (
          <>
            <div className="checkup-hero">
              <div className="checkup-hero-inner">
                <div>
                  <h1>Ghar Baithe <span>Lab Test</span> Aur Routine Checkup Karwayen!</h1>
                  <p>Verified lab technician aayega aapke ghar, safe aur sanitised sample collection ke saath. Reports seedhe aapke phone par WhatsApp aur app dashboard par milengi.</p>
                  <button className="checkup-cta" onClick={() => document.getElementById("pkg-section")?.scrollIntoView({behavior:"smooth"})}>📦 Book Home Test Now</button>
                </div>
                <div className="checkup-hero-visual">
                  <ul>
                    <li><b>✓</b> Verified & trained phlebotomist</li>
                    <li><b>✓</b> Live status: collected → processing → ready</li>
                    <li><b>✓</b> Free virtual PDF report on WhatsApp</li>
                    <li><b>✓</b> Optional printed copy delivered home (+₹35)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <div><div className="section-title">Kaise <span>Kaam Karta Hai</span></div><div className="section-sub">4 simple steps mein apna test book karen</div></div>
              </div>
              <div className="how-grid">
                {[
                  { n:1, t:"Package Chunen", d:"Apni zaroorat ke anusaar health package ya individual test select karen" },
                  { n:2, t:"Slot Book Karen", d:"Khali pet test ke liye subah ka time slot chunen (6 AM - 10 AM)" },
                  { n:3, t:"Sample Collection", d:"Verified technician aapke ghar aakar sample collect karega" },
                  { n:4, t:"Report Milegi", d:"24-48 ghante mein PDF report WhatsApp aur dashboard par" },
                ].map(s => (
                  <div className="how-card" key={s.n}>
                    <div className="how-num">{s.n}</div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section" id="pkg-section" style={{paddingTop:0}}>
              <div className="section-header">
                <div><div className="section-title">Health Checkup <span>Packages</span></div><div className="section-sub">Discounted prices, doorstep collection</div></div>
              </div>
              <div className="pkg-grid">
                {PACKAGES.map(p => (
                  <div className={`pkg-card ${p.popular ? "popular" : ""}`} key={p.id}>
                    {p.popular && <div className="pkg-ribbon">⭐ MOST POPULAR</div>}
                    <div className="pkg-body">
                      <div className="pkg-icon">{p.icon}</div>
                      <div className="pkg-name">{p.name}</div>
                      <span className="pkg-tagline">{p.tagline} • {p.count}+ Tests</span>
                      {expandedPkg === p.id && (
                        <ul className="pkg-tests-list">{p.included.map((t,i) => <li key={i}>{t}</li>)}</ul>
                      )}
                      <div className="pkg-price-row">
                        <span className="pkg-old-price">₹{p.oldPrice}</span>
                        <span className="pkg-new-price">₹{p.price}</span>
                        <span className="pkg-discount">{Math.round((1-p.price/p.oldPrice)*100)}% OFF</span>
                      </div>
                      <div className="pkg-actions">
                        <button className="pkg-view-btn" onClick={() => setExpandedPkg(expandedPkg === p.id ? null : p.id)}>
                          {expandedPkg === p.id ? "Chupayen ▲" : "Tests Dekhein ▼"}
                        </button>
                        <button className="pkg-btn" style={{flex:1}} onClick={() => openCheckupBooking({ name:p.name, price:p.price, icon:p.icon, included:p.included })}>Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="builder-banner">
                <div className="builder-banner-text">
                  <h3>🧪 Apna Test Khud Chunen</h3>
                  <p>Doctor ne specific test likha hai? Individual tests select karen aur sirf unhi ka payment karen — fee automatic calculate ho jayegi.</p>
                </div>
                <button className="builder-banner-btn" onClick={() => setBuilderOpen(true)}>+ Tests Select Karen</button>
              </div>
            </div>
          </>
        )}

        {page === "health-tips" && (
          <>
            <div style={{background:"linear-gradient(150deg,#0f5c3c 0%,#1b8a5a 65%,#27ae60 100%)",padding:"clamp(2.4rem,7vw,4.5rem) clamp(1rem,5vw,2rem) clamp(2rem,5vw,3rem)",textAlign:"center",position:"relative",overflow:"hidden"}}>
              <div style={{content:"",position:"absolute",top:"-30%",right:"-6%",width:"46vw",maxWidth:"480px",height:"46vw",maxHeight:"480px",background:"radial-gradient(circle,rgba(255,255,255,0.10) 0%,transparent 70%)",borderRadius:"50%"}}/>
              <div style={{maxWidth:"760px",margin:"0 auto",position:"relative",zIndex:1}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"rgba(255,255,255,0.14)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",borderRadius:"20px",padding:"6px 16px",fontSize:".76rem",fontWeight:600,marginBottom:"1.1rem",letterSpacing:".3px"}}>✅ Doctor-Reviewed Health Content</div>
                <h1 style={{fontFamily:"Playfair Display,serif",color:"#fff",fontSize:"clamp(1.7rem,4.6vw,2.85rem)",lineHeight:1.18,marginBottom:".8rem",fontWeight:600}}>Trusted Health Tips for <span style={{color:"#e0a52e"}}>You & Your Family</span></h1>
                <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(.85rem,1.8vw,1rem)",maxWidth:"540px",margin:"0 auto 1.8rem",lineHeight:1.7}}>Explore expert-backed advice across diet, fitness, disease prevention and more — curated by DocBook Bihar's medical team.</p>
                <div style={{background:"#fff",borderRadius:"18px",padding:"6px",display:"flex",gap:"6px",maxWidth:"640px",margin:"0 auto",boxShadow:"0 14px 40px rgba(0,0,0,0.18)",flexWrap:"wrap"}}>
                  <input style={{flex:1,minWidth:"140px",border:"none",outline:"none",padding:"11px 14px",fontFamily:"Manrope,sans-serif",fontSize:".92rem",background:"transparent",color:"#0f2419"}} placeholder="Search health tips..." value={healthTipsQuery} onChange={e => setHealthTipsQuery(e.target.value)} />
                  <button style={{background:"#0f5c3c",color:"#fff",border:"none",borderRadius:"12px",padding:"11px 22px",fontWeight:700,fontSize:".88rem",cursor:"pointer",fontFamily:"Manrope,sans-serif"}}>🔍 Search</button>
                </div>
              </div>
            </div>

            <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",justifyContent:"center",padding:"1.4rem clamp(1rem,4vw,2rem) .4rem",maxWidth:"1100px",margin:"0 auto"}}>
              {["all","popular","latest"].map(f => (
                <div key={f} style={{background:healthTipsFilter===f?"#0f5c3c":"#fff",border:healthTipsFilter===f?"1px solid #0f5c3c":"1px solid #dde8e1",color:healthTipsFilter===f?"#fff":"#3d5a4c",borderRadius:"20px",padding:"7px 16px",fontSize:".8rem",fontWeight:600,cursor:"pointer",transition:".15s"}} onClick={() => setHealthTipsFilter(f)}>
                  {f === "all" ? "All Tips" : f === "popular" ? "⭐ Popular" : "🆕 Latest"}
                </div>
              ))}
            </div>

            <div style={{display:"flex",gap:".55rem",overflowX:"auto",padding:"1rem clamp(1rem,4vw,2rem) 1.4rem",maxWidth:"1280px",margin:"0 auto"}}>
              <div style={{flex:"0 0 auto",background:healthTipsActiveCat==="all"?"#e9f7ef":"#fff",border:healthTipsActiveCat==="all"?"1.5px solid #1b8a5a":"1.5px solid #dde8e1",borderRadius:"14px",padding:"10px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:".84rem",fontWeight:700,color:healthTipsActiveCat==="all"?"#0f5c3c":"#3d5a4c",transition:".15s"}} onClick={() => setHealthTipsActiveCat("all")}>
                <span style={{fontSize:"1.05rem"}}>🌐</span> All Topics
              </div>
              {HEALTH_CATEGORIES.map(c => (
                <div key={c.id} style={{flex:"0 0 auto",background:healthTipsActiveCat===c.id?"#e9f7ef":"#fff",border:healthTipsActiveCat===c.id?"1.5px solid #1b8a5a":"1.5px solid #dde8e1",borderRadius:"14px",padding:"10px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:".84rem",fontWeight:700,color:healthTipsActiveCat===c.id?"#0f5c3c":"#3d5a4c",transition:".15s"}} onClick={() => setHealthTipsActiveCat(c.id)}>
                  <span style={{fontSize:"1.05rem"}}>{c.icon}</span> {c.name}
                </div>
              ))}
            </div>

            <div style={{maxWidth:"1280px",margin:"0 auto",padding:".6rem clamp(1rem,4vw,2rem) 2.6rem"}}>
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:"1.1rem",gap:"1rem",flexWrap:"wrap"}}>
                <h2 style={{fontFamily:"Fraunces,serif",fontSize:"clamp(1.25rem,2.6vw,1.6rem)",fontWeight:600}}>{healthTipsActiveCat === "all" ? "All Health Tips" : `${HEALTH_CATEGORIES.find(c=>c.id===healthTipsActiveCat)?.icon} ${healthTipsCatName(healthTipsActiveCat)}`}</h2>
                <span style={{color:"#5b7468",fontSize:".84rem"}}>{filteredHealthTips.length} articles</span>
              </div>
              {filteredHealthTips.length === 0 ? (
                <div style={{textAlign:"center",padding:"3rem 1rem",color:"#5b7468"}}>😕 No tips found. Try a different search or category.</div>
              ) : (
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:"1.1rem"}}>
                  {filteredHealthTips.map(tip => (
                    <div key={tip.id} style={{background:"#fff",border:"1px solid #dde8e1",borderRadius:"18px",overflow:"hidden",display:"flex",flexDirection:"column",transition:"transform .18s,box-shadow .18s",cursor:"pointer",transform:"translateY(0)",boxShadow:"0 2px 10px rgba(15,92,60,0.06)"}} onMouseEnter={e => {e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(15,92,60,0.10)";}} onMouseLeave={e => {e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 10px rgba(15,92,60,0.06)";}} onClick={() => setHealthTipsActiveArticle(tip)}>
                      <div style={{padding:"1.1rem 1.1rem .8rem",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:".6rem"}}>
                        <div style={{width:"42px",height:"42px",borderRadius:"12px",background:"#e9f7ef",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem",flex:"0 0 auto"}}>{tip.icon}</div>
                        <div style={{display:"flex",gap:"6px"}}>
                          <div style={{background:"#f7f9f8",border:"1px solid #dde8e1",borderRadius:"8px",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:".82rem",color:"#5b7468",transition:".15s"}} onClick={(e) => { e.stopPropagation(); toggleHealthTipsLike(tip.id); }} title="Like">
                            {healthTipsLiked[tip.id] ? "❤️" : "🤍"}
                          </div>
                          <div style={{background:"#f7f9f8",border:"1px solid #dde8e1",borderRadius:"8px",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:".82rem",color:"#5b7468",transition:".15s"}} onClick={(e) => { e.stopPropagation(); toggleHealthTipsSave(tip.id); }} title="Save">
                            {healthTipsSaved[tip.id] ? "🔖" : "📑"}
                          </div>
                        </div>
                      </div>
                      <div style={{padding:"0 1.1rem",flex:1}}>
                        <div style={{fontSize:".68rem",fontWeight:700,color:"#0f5c3c",textTransform:"uppercase",letterSpacing:".4px"}}>{healthTipsCatName(tip.category)}</div>
                        <h3 style={{fontSize:"1.01rem",fontWeight:700,margin:".35rem 0 .4rem",lineHeight:1.35}}>{tip.title}</h3>
                        <p style={{fontSize:".84rem",color:"#3d5a4c",lineHeight:1.55,marginBottom:".7rem"}}>{tip.excerpt}</p>
                      </div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:".85rem 1.1rem",borderTop:"1px solid #eef3f0",marginTop:"auto"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",fontSize:".72rem",color:"#5b7468"}}>
                          <span>⏱ {tip.readTime}</span>
                          {tip.reviewed && <span style={{background:"#e9f7ef",color:"#0f5c3c",fontSize:".66rem",fontWeight:700,padding:"3px 8px",borderRadius:"7px",display:"inline-flex",alignItems:"center",gap:"3px"}}>✅ Reviewed</span>}
                        </div>
                        <span style={{color:"#0f5c3c",fontWeight:700,fontSize:".8rem"}}>Read More →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="why-section">
          <div className="why-inner">
            <h2>Hum Kyun Best Hain?</h2>
            <p>Munger, Jamalpur aur Bhagalpur ke logon ke liye specially design kiya gaya platform</p>
            <div className="why-grid">
              {[
                { icon:"🔒", title:"Secure Payment", desc:"UPI, Debit/Credit Card aur Net Banking se safe payment karein." },
                { icon:"⚡", title:"Instant Confirmation", desc:"Booking hote hi SMS aur WhatsApp pe confirmation milega." },
                { icon:"🧪", title:"Lab Test At Home", desc:"Verified technician aapke ghar aakar sample collect karega." },
                { icon:"🏆", title:"Verified Doctors", desc:"Saare doctors government registered aur experience-verified hain." },
                { icon:"📍", title:"Local Coverage", desc:"Munger, Jamalpur aur Bhagalpur teeno sheheron mein available." },
                { icon:"💬", title:"Hindi Support", desc:"Poori website Hindi mein — koi bhi confusion nahi." },
              ].map(w => (
                <div className="why-card" key={w.title}>
                  <div className="why-icon">{w.icon}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <strong>🏥 DocBook Bihar</strong>
                <p>Munger, Jamalpur aur Bhagalpur ke logon ke liye ek bharosemand healthcare aggregator platform. Doctor appointment se lekar lab test home collection tak — sab kuch ek jagah.</p>
              </div>
              <div className="footer-col">
                <h4>Quick Links</h4>
                <a onClick={() => setPage("home")}>Doctors Dhundhen</a>
                <a onClick={() => setPage("checkup")}>Lab Tests & Checkups</a>
                <a>Hospitals</a>
                <a>Health Tips</a>
              </div>
              <div className="footer-col">
                <h4>Help & Support</h4>
                <a>Booking Cancel Karen</a>
                <a>Refund Policy</a>
                <a>Hum Se Sampark Karen</a>
                <a>Privacy Policy</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 DocBook Bihar. Munger · Jamalpur · Bhagalpur. Sabhi adhikar surakshit hain.</p>
              <div className="footer-emergency">🚨 Emergency: 108 (Free)</div>
            </div>
          </div>
        </footer>

        {selectedDoctor && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              {confirmed ? (
                <div className="success-screen">
                  <div className="success-icon">✓</div>
                  <h2>Appointment Book Ho Gaya!</h2>
                  <p>Aapka appointment successfully confirm ho gaya hai.</p>
                  <div className="booking-ref"><p>Booking Reference</p><strong>{bookingRef}</strong></div>
                  <div className="success-details">
                    <div className="success-detail-row"><span>Doctor</span><span>{selectedDoctor.name}</span></div>
                    <div className="success-detail-row"><span>Clinic</span><span>{selectedDoctor.clinic}</span></div>
                    <div className="success-detail-row"><span>Date</span><span>{selectedDate}</span></div>
                    <div className="success-detail-row"><span>Time</span><span>{selectedSlot}</span></div>
                    <div className="success-detail-row"><span>Patient</span><span>{form.name}</span></div>
                    <div className="success-detail-row"><span>Fee Paid</span><span style={{color:"var(--green)"}}>₹{selectedDoctor.fee} ✓</span></div>
                  </div>
                  <p style={{fontSize:"0.8rem",color:"var(--gray-400)",marginBottom:"1.2rem"}}>📱 SMS aur WhatsApp pe confirmation bheja ja raha hai</p>
                  <button className="done-btn" onClick={closeModal}>Theek Hai, Done!</button>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <div><h2>Appointment Book Karen</h2><div style={{color:"rgba(255,255,255,0.65)",fontSize:"0.8rem",marginTop:"2px"}}>Step {bookingStep} of 3</div></div>
                    <button className="modal-close" onClick={closeModal}>✕</button>
                  </div>
                  <div className="modal-body">
                    <div className="steps">
                      {["Date & Time","Details","Payment"].map((s,i) => (
                        <span key={s} style={{display:"flex",alignItems:"center",flex:1}}>
                          <span className="step">
                            <span className={`step-circle ${bookingStep > i+1 ? "done" : bookingStep === i+1 ? "active" : ""}`}>{bookingStep > i+1 ? "✓" : i+1}</span>
                            <span className={`step-label ${bookingStep === i+1 ? "active" : ""}`}>{s}</span>
                          </span>
                          {i < 2 && <span className={`step-line ${bookingStep > i+1 ? "done" : ""}`}/>}
                        </span>
                      ))}
                    </div>

                    <div className="doctor-info-strip">
                      <div className="doc-ava-sm">{selectedDoctor.emoji}</div>
                      <div className="doc-info-sm"><h3>{selectedDoctor.name}</h3><p>{selectedDoctor.specialty} • {selectedDoctor.city}</p></div>
                      <div className="doc-fee-sm"><div className="fee-val">₹{selectedDoctor.fee}</div><div className="fee-lbl">Consultation</div></div>
                    </div>

                    {bookingStep === 1 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">📅 Date Chunen</label>
                          <div className="dates-grid">
                            {dates.map(d => (
                              <div key={d.num} className={`date-btn ${selectedDate === d.full ? "active" : ""}`} onClick={() => setSelectedDate(d.full)}>
                                <div className="date-day">{d.day}</div><div className="date-num">{d.num}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {selectedDate && (
                          <div className="form-section">
                            <label className="form-label">⏰ Time Slot Chunen</label>
                            <div className="slots-grid">
                              {selectedDoctor.slots.map(s => (
                                <div key={s} className={`slot-btn ${takenSlots.includes(s) ? "taken" : selectedSlot === s ? "active" : ""}`}
                                  onClick={() => !takenSlots.includes(s) && setSelectedSlot(s)}>
                                  {s}{takenSlots.includes(s) ? " (Bhar gaya)" : ""}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <button className="confirm-btn" disabled={!selectedDate || !selectedSlot} onClick={() => setBookingStep(2)}>Aage Badhein →</button>
                      </>
                    )}

                    {bookingStep === 2 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">👤 Patient Ki Jaankari</label>
                          <div className="form-row">
                            <input className="form-input" placeholder="Poora Naam *" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                            <input className="form-input" placeholder="Mobile Number *" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} type="tel" />
                          </div>
                          <input className="form-input" style={{marginTop:"10px"}} placeholder="Aayu (Umar)" value={form.age} onChange={e => setForm({...form, age:e.target.value})} type="number" />
                          <textarea className="form-input" style={{marginTop:"10px", resize:"vertical", minHeight:"80px"}} placeholder="Samasya ka sankshipt vivaran (optional)" value={form.problem} onChange={e => setForm({...form, problem:e.target.value})} />
                        </div>
                        <div style={{display:"flex",gap:"10px"}}>
                          <button className="confirm-btn ghost-btn" onClick={() => setBookingStep(1)}>← Wapas</button>
                          <button className="confirm-btn" disabled={!form.name || !form.phone} onClick={() => setBookingStep(3)}>Payment Karen →</button>
                        </div>
                      </>
                    )}

                    {bookingStep === 3 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">💳 Payment Tarika Chunen</label>
                          <div className="payment-box">
                            <div className="payment-methods">
                              {[{id:"upi",icon:"📱",label:"UPI"},{id:"card",icon:"💳",label:"Card"},{id:"netbanking",icon:"🏦",label:"Net Banking"},{id:"cash",icon:"💵",label:"Clinic Mein"}].map(m => (
                                <div key={m.id} className={`pay-method ${payMethod === m.id ? "active" : ""}`} onClick={() => setPayMethod(m.id)}>
                                  <span className="pay-method-icon">{m.icon}</span><div className="pay-method-label">{m.label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="pay-detail">
                              {payMethod === "upi" && <input className="form-input" placeholder="UPI ID dalein (jaise: name@upi)" value={upiId} onChange={e => setUpiId(e.target.value)} />}
                              {payMethod === "card" && (
                                <>
                                  <input className="form-input" placeholder="Card Number" style={{marginBottom:"8px"}} />
                                  <div className="form-row"><input className="form-input" placeholder="MM/YY" /><input className="form-input" placeholder="CVV" /></div>
                                </>
                              )}
                              {payMethod === "netbanking" && <select className="form-input"><option>Bank chunen</option><option>SBI</option><option>PNB</option><option>BOB</option><option>Canara Bank</option><option>UCO Bank</option></select>}
                              {payMethod === "cash" && <div style={{fontSize:"0.86rem",color:"var(--gray-600)",padding:"8px 0"}}>✅ Appointment confirm hogi, aur fees aap clinic pahunchne par denge.</div>}
                            </div>
                          </div>
                        </div>
                        <div className="fee-summary">
                          <div className="fee-row"><span>Consultation Fee</span><span>₹{selectedDoctor.fee}</span></div>
                          <div className="fee-row"><span>Platform Fee</span><span>₹0</span></div>
                          <div className="fee-row total"><span>Kul Rakam</span><span>₹{selectedDoctor.fee}</span></div>
                        </div>
                        <div style={{display:"flex",gap:"10px"}}>
                          <button className="confirm-btn ghost-btn" onClick={() => setBookingStep(2)}>← Wapas</button>
                          <button className="confirm-btn" onClick={handleConfirm} disabled={processing || (payMethod === "upi" && !upiId)}>
                            {processing ? "⏳ Processing..." : `₹${selectedDoctor.fee} Pay Karke Confirm Karen ✓`}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {selectedPkg && (
          <div className="modal-overlay" onClick={closeCkModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              {ckConfirmed ? (
                <div className="success-screen">
                  <div className="success-icon">✓</div>
                  <h2>Test Book Ho Gaya!</h2>
                  <p>Verified technician ki details SMS/WhatsApp par bheji ja rahi hain.</p>
                  <div className="booking-ref"><p>Booking Reference</p><strong>{ckRef}</strong></div>

                  <div className="tracker">
                    {["Booked","Sample Collected","Processing","Report Ready"].map((t,i) => (
                      <div className="tracker-step" key={t}>
                        <div className={`tracker-dot ${i===0 ? "active" : ""}`}>{i===0 ? "✓" : i+1}</div>
                        <div className={`tracker-label ${i===0 ? "active" : ""}`}>{t}</div>
                      </div>
                    ))}
                  </div>

                  <div className="success-details">
                    <div className="success-detail-row"><span>Package</span><span>{selectedPkg.name}</span></div>
                    <div className="success-detail-row"><span>Patient</span><span>{ckForm.name}, {ckForm.age} yrs</span></div>
                    <div className="success-detail-row"><span>Address</span><span>{ckForm.address}, {ckForm.city}</span></div>
                    <div className="success-detail-row"><span>Date & Slot</span><span>{ckDate}, {ckSlot}</span></div>
                    <div className="success-detail-row"><span>Report Mode</span><span>{hardCopy ? "Virtual + Printed Copy" : "Virtual Only"}</span></div>
                    <div className="success-detail-row"><span>Amount Paid</span><span style={{color:"var(--green)"}}>₹{ckTotal} ✓</span></div>
                  </div>
                  <button className="done-btn" onClick={closeCkModal}>Theek Hai, Done!</button>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <div><h2>Lab Test Book Karen</h2><div style={{color:"rgba(255,255,255,0.65)",fontSize:"0.8rem",marginTop:"2px"}}>Step {ckStep} of 3</div></div>
                    <button className="modal-close" onClick={closeCkModal}>✕</button>
                  </div>
                  <div className="modal-body">
                    <div className="steps">
                      {["Patient & Slot","Address","Payment"].map((s,i) => (
                        <span key={s} style={{display:"flex",alignItems:"center",flex:1}}>
                          <span className="step">
                            <span className={`step-circle ${ckStep > i+1 ? "done" : ckStep === i+1 ? "active" : ""}`}>{ckStep > i+1 ? "✓" : i+1}</span>
                            <span className={`step-label ${ckStep === i+1 ? "active" : ""}`}>{s}</span>
                          </span>
                          {i < 2 && <span className={`step-line ${ckStep > i+1 ? "done" : ""}`}/>}
                        </span>
                      ))}
                    </div>

                    <div className="doctor-info-strip" style={{flexWrap:"wrap"}}>
                      <div className="doc-ava-sm">{selectedPkg.icon}</div>
                      <div className="doc-info-sm"><h3>{selectedPkg.name}</h3><p>{selectedPkg.included ? selectedPkg.included.length : 0} Tests • Home Collection</p></div>
                      <div className="doc-fee-sm"><div className="fee-val">₹{selectedPkg.price}</div><div className="fee-lbl">Total Fee</div></div>
                      {selectedPkg.included && (
                        <ul className="pkg-tests-list" style={{width:"100%",marginTop:"10px"}}>
                          {selectedPkg.included.map((t,i) => <li key={i}>{t}</li>)}
                        </ul>
                      )}
                    </div>

                    {ckStep === 1 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">👤 Patient Ki Jaankari</label>
                          <div className="form-row-3">
                            <input className="form-input" placeholder="Poora Naam *" value={ckForm.name} onChange={e => setCkForm({...ckForm, name:e.target.value})} />
                            <input className="form-input" placeholder="Umar *" type="number" value={ckForm.age} onChange={e => setCkForm({...ckForm, age:e.target.value})} />
                            <select className="form-input" value={ckForm.gender} onChange={e => setCkForm({...ckForm, gender:e.target.value})}>
                              <option>Male</option><option>Female</option><option>Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-section">
                          <label className="form-label">📅 Date Chunen (Khali Pet Test)</label>
                          <div className="dates-grid">
                            {dates.map(d => (
                              <div key={d.num} className={`date-btn ${ckDate === d.full ? "active" : ""}`} onClick={() => setCkDate(d.full)}>
                                <div className="date-day">{d.day}</div><div className="date-num">{d.num}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="form-section">
                          <label className="form-label">⏰ Subah Ka Time Slot</label>
                          <div className="slots-grid">
                            {TIME_SLOTS.map(s => (
                              <div key={s} className={`slot-btn ${ckSlot === s ? "active" : ""}`} onClick={() => setCkSlot(s)}>{s}</div>
                            ))}
                          </div>
                        </div>
                        <button className="confirm-btn" disabled={!ckForm.name || !ckForm.age || !ckDate || !ckSlot} onClick={() => setCkStep(2)}>Aage Badhein →</button>
                      </>
                    )}

                    {ckStep === 2 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">🏠 Sample Collection Address</label>
                          <select className="form-input" style={{marginBottom:"10px"}} value={ckForm.city} onChange={e => setCkForm({...ckForm, city:e.target.value})}>
                            <option>Munger</option><option>Jamalpur</option><option>Bhagalpur</option>
                          </select>
                          <textarea className="form-input" style={{resize:"vertical", minHeight:"80px"}} placeholder="Poora address likhen (ghar number, mohalla, landmark) *" value={ckForm.address} onChange={e => setCkForm({...ckForm, address:e.target.value})} />
                        </div>
                        <div className="form-section">
                          <label className="form-label">📄 Report Delivery</label>
                          <div className={`toggle-row ${hardCopy ? "active" : ""}`} onClick={() => setHardCopy(!hardCopy)}>
                            <div className="toggle-row-text">
                              <strong>Printed hard copy ghar par chahiye?</strong>
                              <span>{hardCopy ? "₹35 delivery charge add hoga, 24-48 ghante mein milegi" : "Virtual PDF free hai — WhatsApp aur dashboard par"}</span>
                            </div>
                            <div className={`toggle-switch ${hardCopy ? "on" : ""}`}><div className="toggle-knob"/></div>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:"10px"}}>
                          <button className="confirm-btn ghost-btn" onClick={() => setCkStep(1)}>← Wapas</button>
                          <button className="confirm-btn" disabled={!ckForm.address} onClick={() => setCkStep(3)}>Payment Karen →</button>
                        </div>
                      </>
                    )}

                    {ckStep === 3 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">💳 Payment Tarika Chunen</label>
                          <div className="payment-box">
                            <div className="payment-methods">
                              {[{id:"upi",icon:"📱",label:"UPI"},{id:"card",icon:"💳",label:"Card"},{id:"cash",icon:"💵",label:"Cash On Collection"}].map(m => (
                                <div key={m.id} className={`pay-method ${ckPayMethod === m.id ? "active" : ""}`} onClick={() => setCkPayMethod(m.id)}>
                                  <span className="pay-method-icon">{m.icon}</span><div className="pay-method-label">{m.label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="pay-detail">
                              {ckPayMethod === "upi" && <input className="form-input" placeholder="UPI ID dalein (jaise: name@upi)" />}
                              {ckPayMethod === "card" && <input className="form-input" placeholder="Card Number" />}
                              {ckPayMethod === "cash" && <div style={{fontSize:"0.86rem",color:"var(--gray-600)",padding:"8px 0"}}>✅ Booking confirm hogi, payment technician ko sample dete waqt denge.</div>}
                            </div>
                          </div>
                        </div>
                        <div className="fee-summary">
                          <div className="fee-row"><span>Package Fee</span><span>₹{selectedPkg.price || 0}</span></div>
                          <div className="fee-row"><span>Home Collection</span><span style={{color:"var(--green)"}}>Free</span></div>
                          <div className="fee-row"><span>Hard Copy Delivery</span><span>{hardCopy ? "₹35" : "₹0"}</span></div>
                          <div className="fee-row total"><span>Kul Rakam</span><span>₹{ckTotal}</span></div>
                        </div>
                        <div style={{display:"flex",gap:"10px"}}>
                          <button className="confirm-btn ghost-btn" onClick={() => setCkStep(2)}>← Wapas</button>
                          <button className="confirm-btn" onClick={handleCkConfirm} disabled={ckProcessing}>
                            {ckProcessing ? "⏳ Processing..." : `₹${ckTotal} Pay Karke Confirm Karen ✓`}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {healthTipsActiveArticle && (
          <div className="modal-overlay" onClick={() => setHealthTipsActiveArticle(null)}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth:"700px"}}>
              <div className="modal-header">
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <h2 style={{fontSize:"1.3rem",marginBottom:".5rem"}}>{healthTipsActiveArticle.icon} {healthTipsActiveArticle.title}</h2>
                    <div style={{fontSize:".75rem",color:"rgba(255,255,255,0.7)",display:"flex",gap:"12px",flexWrap:"wrap"}}>
                      <span>⏱ {healthTipsActiveArticle.readTime}</span>
                      <span>📅 2026</span>
                      {healthTipsActiveArticle.reviewed && <span>✅ Doctor Reviewed</span>}
                    </div>
                  </div>
                </div>
                <button className="modal-close" onClick={() => setHealthTipsActiveArticle(null)}>✕</button>
              </div>
              <div className="modal-body" style={{paddingTop:"2rem"}}>
                <div style={{background:"#e9f7ef",border:"1px dashed #27ae60",borderRadius:"12px",padding:".9rem 1rem",fontSize:".84rem",color:"#0f5c3c",marginBottom:"1.2rem"}}>📝 {healthTipsActiveArticle.excerpt}</div>
                <div style={{fontSize:".88rem",color:"#3d5a4c",lineHeight:1.7,marginBottom:"1.5rem"}}>
                  <p>{healthTipsActiveArticle.excerpt}</p>
                  <p style={{marginTop:"1rem"}}>This comprehensive guide covers everything you need to know about maintaining optimal health through evidence-backed lifestyle choices, nutrition, and preventive care. Our medical team has reviewed and curated this content to help you and your family make informed health decisions.</p>
                </div>
                <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                  <button style={{background:"#fff",border:"1px solid #dde8e1",color:"#0f5c3c",borderRadius:"10px",padding:"8px 16px",fontWeight:600,fontSize:".85rem",cursor:"pointer"}} onClick={() => toggleHealthTipsLike(healthTipsActiveArticle.id)}>
                    {healthTipsLiked[healthTipsActiveArticle.id] ? "❤️ Liked" : "🤍 Like"}
                  </button>
                  <button style={{background:"#fff",border:"1px solid #dde8e1",color:"#0f5c3c",borderRadius:"10px",padding:"8px 16px",fontWeight:600,fontSize:".85rem",cursor:"pointer"}} onClick={() => toggleHealthTipsSave(healthTipsActiveArticle.id)}>
                    {healthTipsSaved[healthTipsActiveArticle.id] ? "🔖 Saved" : "📑 Save"}
                  </button>
                  <button style={{background:"#fff",border:"1px solid #dde8e1",color:"#0f5c3c",borderRadius:"10px",padding:"8px 16px",fontWeight:600,fontSize:".85rem",cursor:"pointer"}}>
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {builderOpen && (
          <div className="modal-overlay" onClick={() => setBuilderOpen(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div><h2>🧪 Apne Test Chunen</h2><div style={{color:"rgba(255,255,255,0.65)",fontSize:"0.8rem",marginTop:"2px"}}>Jo zaroorat ho wahi select karen</div></div>
                <button className="modal-close" onClick={() => setBuilderOpen(false)}>✕</button>
              </div>
              <div className="modal-body">
                {[...new Set(INDIVIDUAL_TESTS.map(t => t.category))].map(cat => (
                  <div className="test-category" key={cat}>
                    <div className="test-category-title">{cat}</div>
                    {INDIVIDUAL_TESTS.filter(t => t.category === cat).map(t => {
                      const checked = !!customSelected.find(c => c.id === t.id);
                      return (
                        <div className={`test-row ${checked ? "checked" : ""}`} key={t.id} onClick={() => toggleCustomTest(t)}>
                          <div className="test-row-left">
                            <div className={`test-checkbox ${checked ? "on" : ""}`}>{checked ? "✓" : ""}</div>
                            <span className="test-row-name">{t.name}</span>
                          </div>
                          <span className="test-row-price">₹{t.price}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}

                <div className="cart-sticky">
                  <div className="cart-summary-row">
                    <span className="cart-count"><strong>{customSelected.length}</strong> tests select kiye</span>
                    <span className="cart-total">₹{customTotal}</span>
                  </div>
                  <button className="confirm-btn" style={{marginTop:"12px"}} disabled={customSelected.length === 0} onClick={proceedWithCustom}>
                    Continue → Slot Book Karen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <BottomNav items={navItems} highlightColor="#0A6E6E" />
  </MobileFrame>
  );
}