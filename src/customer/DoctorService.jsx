import { useState, useEffect } from "react";

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

  /* NAV */
  .nav {
    background: var(--teal-dark);
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .nav-logo-icon { width: 38px; height: 38px; background: var(--gold); border-radius: 10px;
    display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .nav-logo-text { color: white; }
  .nav-logo-text strong { font-family: 'Playfair Display', serif; font-size: 1.2rem; display: block; }
  .nav-logo-text span { font-size: 0.7rem; opacity: 0.7; letter-spacing: 1px; text-transform: uppercase; }
  .nav-links { display: flex; gap: 2rem; }
  .nav-link { color: rgba(255,255,255,0.75); font-size: 0.9rem; cursor: pointer; transition: color 0.2s; }
  .nav-link:hover, .nav-link.active { color: var(--gold-light); }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .nav-city { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);
    border-radius: 20px; padding: 4px 14px; font-size: 0.8rem; cursor: pointer; }
  .nav-btn { background: var(--gold); color: var(--teal-dark); border: none; border-radius: 8px;
    padding: 8px 18px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: background 0.2s; }
  .nav-btn:hover { background: var(--gold-light); }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 60%, #0d8080 100%);
    padding: 5rem 2rem 4rem;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -50%; right: -10%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(200,151,42,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero::after {
    content: ''; position: absolute; bottom: -30%; left: -5%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px;
    background: rgba(200,151,42,0.2); border: 1px solid rgba(200,151,42,0.4);
    color: var(--gold-light); border-radius: 20px; padding: 6px 16px;
    font-size: 0.8rem; font-weight: 500; margin-bottom: 1.5rem; letter-spacing: 0.5px; }
  .hero h1 { font-family: 'Playfair Display', serif; color: white;
    font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.2; margin-bottom: 1rem; }
  .hero h1 span { color: var(--gold-light); }
  .hero p { color: rgba(255,255,255,0.75); font-size: 1.05rem; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7; }

  .search-bar {
    background: white; border-radius: var(--radius); padding: 8px;
    display: flex; gap: 8px; max-width: 700px; margin: 0 auto 2rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  }
  .search-input { flex: 1; border: none; outline: none; padding: 10px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: var(--gray-800); background: transparent; }
  .search-select { border: none; outline: none; padding: 10px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: var(--gray-600);
    background: var(--gray-100); border-radius: 10px; cursor: pointer; }
  .search-btn { background: var(--teal); color: white; border: none; border-radius: 10px;
    padding: 10px 24px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
  .search-btn:hover { background: var(--teal-light); }

  .hero-stats { display: flex; gap: 2.5rem; justify-content: center; flex-wrap: wrap; }
  .hero-stat { text-align: center; }
  .hero-stat strong { display: block; color: var(--gold-light); font-size: 1.6rem;
    font-family: 'Playfair Display', serif; font-weight: 700; }
  .hero-stat span { color: rgba(255,255,255,0.6); font-size: 0.8rem; }

  /* SECTION */
  .section { padding: 3.5rem 2rem; max-width: 1200px; margin: 0 auto; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--teal-dark); }
  .section-title span { color: var(--gold); }
  .section-sub { color: var(--gray-400); font-size: 0.9rem; margin-top: 4px; }

  /* SPECIALTIES */
  .specs-grid { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
  .spec-card {
    flex-shrink: 0; background: white; border: 2px solid transparent;
    border-radius: var(--radius); padding: 1.2rem 1.5rem; cursor: pointer;
    transition: all 0.25s; display: flex; flex-direction: column; align-items: center; gap: 8px;
    min-width: 110px; box-shadow: var(--shadow-sm);
  }
  .spec-card:hover, .spec-card.active { border-color: var(--teal); background: linear-gradient(135deg, #e6f5f5, #f0fafa); }
  .spec-icon { font-size: 2rem; }
  .spec-name { font-size: 0.78rem; font-weight: 600; color: var(--gray-600); text-align: center; }
  .spec-count { font-size: 0.7rem; color: var(--teal); background: #e6f5f5; padding: 2px 8px; border-radius: 10px; }

  /* FILTERS */
  .filters { display: flex; gap: 10px; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .filter-btn { background: white; border: 1.5px solid var(--gray-200); border-radius: 20px;
    padding: 7px 18px; font-size: 0.85rem; color: var(--gray-600); cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .filter-btn:hover, .filter-btn.active { background: var(--teal); color: white; border-color: var(--teal); }

  /* DOCTORS GRID */
  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }

  .doctor-card {
    background: white; border-radius: var(--radius); overflow: hidden;
    box-shadow: var(--shadow-sm); transition: all 0.3s; cursor: pointer;
    border: 1.5px solid transparent;
  }
  .doctor-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--teal-light); }

  .doctor-card-header { background: linear-gradient(135deg, var(--teal-dark), var(--teal)); padding: 1.5rem; position: relative; }
  .doctor-avatar { width: 70px; height: 70px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center;
    font-size: 2rem; margin-bottom: 10px; }
  .doctor-name { font-family: 'Playfair Display', serif; color: white; font-size: 1.15rem; font-weight: 700; }
  .doctor-specialty { color: var(--gold-light); font-size: 0.82rem; margin-top: 2px; }
  .doctor-badge { position: absolute; top: 12px; right: 12px; background: var(--green);
    color: white; border-radius: 12px; padding: 3px 10px; font-size: 0.72rem; font-weight: 600; }
  .doctor-badge.busy { background: #e87a2a; }

  .doctor-card-body { padding: 1.2rem; }
  .doctor-meta { display: flex; flex-direction: column; gap: 7px; margin-bottom: 1rem; }
  .doctor-meta-row { display: flex; align-items: center; gap: 8px; font-size: 0.83rem; color: var(--gray-600); }
  .doctor-meta-row span:first-child { font-size: 1rem; }

  .doctor-rating { display: flex; align-items: center; gap: 4px; }
  .stars { color: #f4b731; font-size: 0.85rem; }
  .rating-val { font-weight: 600; font-size: 0.85rem; color: var(--gray-800); }
  .rating-count { color: var(--gray-400); font-size: 0.75rem; }

  .doctor-footer { display: flex; align-items: center; justify-content: space-between;
    padding-top: 1rem; border-top: 1px solid var(--gray-100); }
  .fee-tag { display: flex; flex-direction: column; }
  .fee-label { font-size: 0.7rem; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.5px; }
  .fee-amount { font-size: 1.3rem; font-weight: 700; color: var(--teal-dark);
    font-family: 'Playfair Display', serif; }
  .fee-amount sup { font-size: 0.7rem; font-family: 'DM Sans', sans-serif; font-weight: 500; }

  .book-btn { background: var(--teal); color: white; border: none; border-radius: 10px;
    padding: 9px 18px; font-weight: 600; font-size: 0.85rem; cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .book-btn:hover { background: var(--teal-dark); transform: scale(1.02); }

  /* BOOKING MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    z-index: 200; display: flex; align-items: flex-start; justify-content: center;
    padding: 2rem 1rem; overflow-y: auto;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: white; border-radius: 20px; width: 100%; max-width: 640px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .modal-header {
    background: linear-gradient(135deg, var(--teal-dark), var(--teal));
    padding: 1.5rem 2rem; border-radius: 20px 20px 0 0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-header h2 { font-family: 'Playfair Display', serif; color: white; font-size: 1.3rem; }
  .modal-close { background: rgba(255,255,255,0.15); color: white; border: none;
    border-radius: 50%; width: 36px; height: 36px; cursor: pointer; font-size: 1.1rem;
    display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
  .modal-close:hover { background: rgba(255,255,255,0.3); }

  .modal-body { padding: 2rem; }

  .doctor-info-strip { display: flex; align-items: center; gap: 1rem; padding: 1rem;
    background: var(--gray-50); border-radius: var(--radius-sm); margin-bottom: 1.5rem;
    border: 1px solid var(--gray-100); }
  .doc-ava-sm { width: 52px; height: 52px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal-dark), var(--teal));
    display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
    flex-shrink: 0; }
  .doc-info-sm h3 { font-size: 1rem; font-weight: 600; color: var(--gray-800); }
  .doc-info-sm p { font-size: 0.82rem; color: var(--gray-400); margin-top: 2px; }
  .doc-fee-sm { margin-left: auto; text-align: right; }
  .doc-fee-sm .fee-val { font-size: 1.2rem; font-weight: 700; color: var(--teal-dark);
    font-family: 'Playfair Display', serif; }
  .doc-fee-sm .fee-lbl { font-size: 0.7rem; color: var(--gray-400); }

  .form-section { margin-bottom: 1.5rem; }
  .form-label { font-size: 0.82rem; font-weight: 600; color: var(--gray-600);
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; display: block; }
  .form-input {
    width: 100%; border: 1.5px solid var(--gray-200); border-radius: 10px;
    padding: 11px 14px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    color: var(--gray-800); outline: none; transition: border-color 0.2s;
    background: white;
  }
  .form-input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(10,110,110,0.1); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .dates-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
  .date-btn { border: 1.5px solid var(--gray-200); background: white; border-radius: 10px;
    padding: 8px 4px; text-align: center; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif; }
  .date-btn:hover { border-color: var(--teal); background: #e6f5f5; }
  .date-btn.active { background: var(--teal); border-color: var(--teal); color: white; }
  .date-btn.disabled { opacity: 0.4; cursor: not-allowed; }
  .date-day { font-size: 0.65rem; color: inherit; opacity: 0.7; }
  .date-num { font-size: 0.95rem; font-weight: 600; }

  .slots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .slot-btn { border: 1.5px solid var(--gray-200); background: white; border-radius: 8px;
    padding: 9px 8px; text-align: center; cursor: pointer; font-size: 0.82rem;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif; color: var(--gray-600); }
  .slot-btn:hover:not(.taken) { border-color: var(--teal); color: var(--teal); }
  .slot-btn.active { background: var(--teal); border-color: var(--teal); color: white; font-weight: 600; }
  .slot-btn.taken { background: var(--gray-100); color: var(--gray-400); cursor: not-allowed; text-decoration: line-through; }

  /* PAYMENT SECTION */
  .payment-box { border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm); overflow: hidden; }
  .payment-methods { display: flex; gap: 8px; padding: 1rem; }
  .pay-method { flex: 1; border: 1.5px solid var(--gray-200); border-radius: 8px;
    padding: 10px 8px; text-align: center; cursor: pointer; transition: all 0.2s; }
  .pay-method:hover, .pay-method.active { border-color: var(--teal); background: #e6f5f5; }
  .pay-method-icon { font-size: 1.4rem; display: block; }
  .pay-method-label { font-size: 0.72rem; color: var(--gray-600); margin-top: 4px; font-weight: 500; }
  .pay-detail { padding: 1rem; border-top: 1px solid var(--gray-100); }

  .fee-summary { background: var(--gray-50); border-radius: 10px; padding: 1rem; margin: 1rem 0; }
  .fee-row { display: flex; justify-content: space-between; font-size: 0.88rem; padding: 4px 0; }
  .fee-row.total { font-weight: 700; font-size: 1rem; color: var(--teal-dark);
    border-top: 1px solid var(--gray-200); padding-top: 10px; margin-top: 6px; }

  .confirm-btn { width: 100%; background: linear-gradient(135deg, var(--teal-dark), var(--teal));
    color: white; border: none; border-radius: 12px; padding: 14px;
    font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px; }
  .confirm-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .confirm-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* SUCCESS */
  .success-screen { text-align: center; padding: 3rem 2rem; }
  .success-icon { width: 90px; height: 90px; background: linear-gradient(135deg, var(--green), #3dc47a);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 2.5rem; margin: 0 auto 1.5rem; box-shadow: 0 8px 32px rgba(46,158,106,0.35); }
  .success-screen h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--teal-dark); margin-bottom: 0.5rem; }
  .success-screen p { color: var(--gray-400); font-size: 0.95rem; margin-bottom: 2rem; }
  .booking-ref { background: var(--gray-50); border: 1.5px dashed var(--teal); border-radius: 12px;
    padding: 1rem 1.5rem; display: inline-block; margin-bottom: 2rem; }
  .booking-ref p { font-size: 0.8rem; color: var(--gray-400); margin-bottom: 4px; }
  .booking-ref strong { font-size: 1.3rem; color: var(--teal-dark); font-family: 'Playfair Display', serif;
    letter-spacing: 2px; }
  .success-details { display: flex; flex-direction: column; gap: 10px; text-align: left;
    background: white; border: 1px solid var(--gray-100); border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem; }
  .success-detail-row { display: flex; justify-content: space-between; font-size: 0.88rem; }
  .success-detail-row span:first-child { color: var(--gray-400); }
  .success-detail-row span:last-child { font-weight: 600; color: var(--gray-800); }

  .done-btn { background: var(--teal); color: white; border: none; border-radius: 10px;
    padding: 12px 32px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }

  /* WHY US */
  .why-section { background: linear-gradient(135deg, var(--teal-dark), var(--teal)); padding: 4rem 2rem; }
  .why-inner { max-width: 1100px; margin: 0 auto; }
  .why-inner h2 { font-family: 'Playfair Display', serif; color: white; font-size: 2rem;
    text-align: center; margin-bottom: 0.5rem; }
  .why-inner p { color: rgba(255,255,255,0.65); text-align: center; margin-bottom: 2.5rem; }
  .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
  .why-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius); padding: 1.5rem; transition: all 0.3s; }
  .why-card:hover { background: rgba(255,255,255,0.14); transform: translateY(-4px); }
  .why-icon { font-size: 2.2rem; margin-bottom: 1rem; }
  .why-card h3 { color: var(--gold-light); font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; }
  .why-card p { color: rgba(255,255,255,0.65); font-size: 0.85rem; line-height: 1.6; }

  /* FOOTER */
  .footer { background: var(--gray-800); padding: 3rem 2rem 1.5rem; }
  .footer-inner { max-width: 1100px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
  .footer-brand strong { font-family: 'Playfair Display', serif; color: white; font-size: 1.2rem; display: block; margin-bottom: 0.8rem; }
  .footer-brand p { color: var(--gray-400); font-size: 0.85rem; line-height: 1.7; }
  .footer-col h4 { color: white; font-size: 0.88rem; font-weight: 600; margin-bottom: 1rem;
    text-transform: uppercase; letter-spacing: 0.5px; }
  .footer-col a { display: block; color: var(--gray-400); font-size: 0.85rem; margin-bottom: 0.5rem; cursor: pointer; }
  .footer-col a:hover { color: var(--gold-light); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-bottom p { color: var(--gray-400); font-size: 0.8rem; }
  .footer-emergency { background: rgba(224,82,82,0.15); border: 1px solid rgba(224,82,82,0.3);
    color: #ff8080; border-radius: 8px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600; }

  .empty-state { text-align: center; padding: 4rem 2rem; color: var(--gray-400); }
  .empty-state .icon { font-size: 3rem; margin-bottom: 1rem; }
  .empty-state h3 { font-size: 1.2rem; color: var(--gray-600); margin-bottom: 0.5rem; }

  /* STEP INDICATOR */
  .steps { display: flex; align-items: center; gap: 0; margin-bottom: 1.5rem; }
  .step { display: flex; align-items: center; gap: 8px; flex: 1; }
  .step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-size: 0.75rem; font-weight: 700; border: 2px solid var(--gray-200);
    color: var(--gray-400); flex-shrink: 0; transition: all 0.3s; }
  .step-circle.done { background: var(--teal); border-color: var(--teal); color: white; }
  .step-circle.active { border-color: var(--teal); color: var(--teal); }
  .step-label { font-size: 0.75rem; color: var(--gray-400); }
  .step-label.active { color: var(--teal); font-weight: 600; }
  .step-line { flex: 1; height: 2px; background: var(--gray-200); margin: 0 6px; }
  .step-line.done { background: var(--teal); }

  @media (max-width: 600px) {
    .nav-links { display: none; }
    .form-row { grid-template-columns: 1fr; }
    .dates-grid { grid-template-columns: repeat(4, 1fr); }
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    .hero-stats { gap: 1.5rem; }
    .doctors-grid { grid-template-columns: 1fr; }
  }
`;

const DOCTORS = [
  { id: 1, name: "Dr. Rajesh Kumar Sinha", specialty: "General Physician", city: "Munger", clinic: "Sinha Medical Hall, Station Road", exp: "18 Years", fee: 300, rating: 4.7, reviews: 312, slots: ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","02:00 PM","02:30 PM","03:00 PM","04:00 PM"], emoji: "👨⚕️", available: true, quali: "MBBS, MD", langs: "Hindi, English" },
  { id: 2, name: "Dr. Priya Sharma", specialty: "Gynecologist", city: "Munger", clinic: "Sharma Ladies Clinic, Kasim Chowk", exp: "12 Years", fee: 500, rating: 4.9, reviews: 487, slots: ["10:00 AM","10:30 AM","11:00 AM","11:30 AM","05:00 PM","05:30 PM","06:00 PM"], emoji: "👩⚕️", available: true, quali: "MBBS, MS (Gynae)", langs: "Hindi" },
  { id: 3, name: "Dr. Amit Verma", specialty: "Cardiologist", city: "Jamalpur", clinic: "Verma Heart Clinic, Railway Colony", exp: "22 Years", fee: 700, rating: 4.8, reviews: 203, slots: ["09:00 AM","09:30 AM","11:00 AM","11:30 AM","03:00 PM","03:30 PM"], emoji: "👨⚕️", available: true, quali: "MBBS, MD, DM (Cardiology)", langs: "Hindi, English" },
  { id: 4, name: "Dr. Sunita Prasad", specialty: "Pediatrician", city: "Munger", clinic: "Bal Swasthya Kendra, Lal Darwaza", exp: "15 Years", fee: 400, rating: 4.6, reviews: 561, slots: ["08:30 AM","09:00 AM","09:30 AM","10:00 AM","04:00 PM","04:30 PM","05:00 PM"], emoji: "👩⚕️", available: true, quali: "MBBS, DCH, MD (Pediatrics)", langs: "Hindi, Maithili" },
  { id: 5, name: "Dr. Manish Pandey", specialty: "Orthopedic", city: "Jamalpur", clinic: "Pandey Bone & Joint Clinic, Main Market", exp: "10 Years", fee: 600, rating: 4.5, reviews: 178, slots: ["10:00 AM","10:30 AM","11:00 AM","02:00 PM","02:30 PM","05:30 PM","06:00 PM"], emoji: "👨⚕️", available: false, quali: "MBBS, MS (Ortho)", langs: "Hindi, English" },
  { id: 6, name: "Dr. Kavita Singh", specialty: "Dermatologist", city: "Munger", clinic: "Skin Care Clinic, Bazar Samiti Road", exp: "8 Years", fee: 450, rating: 4.7, reviews: 298, slots: ["11:00 AM","11:30 AM","12:00 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM"], emoji: "👩⚕️", available: true, quali: "MBBS, MD (Dermatology)", langs: "Hindi" },
  { id: 7, name: "Dr. Ranjit Kumar", specialty: "ENT Specialist", city: "Jamalpur", clinic: "Ranjit ENT Center, Jamalpur Road", exp: "16 Years", fee: 350, rating: 4.4, reviews: 142, slots: ["09:30 AM","10:00 AM","10:30 AM","03:00 PM","03:30 PM","04:00 PM"], emoji: "👨⚕️", available: true, quali: "MBBS, MS (ENT)", langs: "Hindi, English, Maithili" },
  { id: 8, name: "Dr. Anjali Mishra", specialty: "General Physician", city: "Jamalpur", clinic: "Mishra Family Clinic, Civil Lines", exp: "9 Years", fee: 250, rating: 4.5, reviews: 389, slots: ["08:00 AM","08:30 AM","09:00 AM","01:00 PM","01:30 PM","02:00 PM","06:00 PM"], emoji: "👩⚕️", available: true, quali: "MBBS", langs: "Hindi, Maithili" },
  { id: 9, name: "Dr. Suresh Gupta", specialty: "Diabetologist", city: "Munger", clinic: "Gupta Diabetes Care, Katia Ghat Road", exp: "20 Years", fee: 550, rating: 4.8, reviews: 234, slots: ["09:00 AM","09:30 AM","10:00 AM","03:00 PM","03:30 PM","04:00 PM"], emoji: "👨⚕️", available: true, quali: "MBBS, MD (Medicine), DM (Endocrinology)", langs: "Hindi, English" },
];

const SPECS = [
  { name: "All", icon: "🏥", count: 9 },
  { name: "General Physician", icon: "🩺", count: 3 },
  { name: "Gynecologist", icon: "🌸", count: 1 },
  { name: "Cardiologist", icon: "❤️", count: 1 },
  { name: "Pediatrician", icon: "👶", count: 1 },
  { name: "Orthopedic", icon: "🦴", count: 1 },
  { name: "Dermatologist", icon: "✨", count: 1 },
  { name: "ENT Specialist", icon: "👂", count: 1 },
  { name: "Diabetologist", icon: "💉", count: 1 },
];

const getDates = () => {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    dates.push({ day: days[d.getDay()], num: d.getDate(), full: d.toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'}), disabled: false });
  }
  return dates;
};

import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import { Home, ShoppingBag, Grid, User } from 'lucide-react';

export default function DoctorService() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];
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
  const dates = getDates();

  const filtered = DOCTORS.filter(d => {
    const cityOk = cityFilter === "All" || d.city === cityFilter;
    const specOk = specFilter === "All" || d.specialty === specFilter;
    const searchOk = !searchQ || d.name.toLowerCase().includes(searchQ.toLowerCase()) || d.specialty.toLowerCase().includes(searchQ.toLowerCase());
    return cityOk && specOk && searchOk;
  });

  const openBooking = (doc) => { setSelectedDoctor(doc); setBookingStep(1); setSelectedDate(null); setSelectedSlot(null); setConfirmed(false); setForm({name:"",phone:"",age:"",problem:""}); setUpiId(""); };
  const closeModal = () => { setSelectedDoctor(null); };

  const handleConfirm = () => {
    if (!form.name || !form.phone || !selectedDate || !selectedSlot) return;
    setProcessing(true);
    setTimeout(() => {
      setBookingRef("MJ" + Math.floor(100000 + Math.random() * 900000));
      setConfirmed(true);
      setProcessing(false);
    }, 1800);
  };

  const takenSlots = ["10:30 AM", "11:30 AM", "02:30 PM"];

  return (
    <>
      <style>{style}</style>
      <MobileFrame>
      <div className="app" style={{paddingBottom: '80px'}}>
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-icon">🏥</div>
            <div className="nav-logo-text">
              <strong>DocBook Bihar</strong>
              <span>Munger & Jamalpur</span>
            </div>
          </div>
          <div className="nav-links">
            <span className="nav-link active">Doctors</span>
            <span className="nav-link">Hospitals</span>
            <span className="nav-link">Lab Tests</span>
            <span className="nav-link">Health Tips</span>
          </div>
          <div className="nav-right">
            <span className="nav-city">📍 Munger</span>
            <button className="nav-btn">Login / Register</button>
          </div>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-inner">
            <div className="hero-badge">⭐ Munger & Jamalpur ka #1 Doctor Booking Platform</div>
            <h1>Apne Sheher Mein <span>Trusted Doctor</span> Ko Book Karen</h1>
            <p>Munger aur Jamalpur ke best doctors se appointment book karen — ghar baithe, sirf ek click mein. Online fee payment ke saath guaranteed slot.</p>
            <div className="search-bar">
              <input className="search-input" placeholder="Doctor ka naam ya specialty dhundhen..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
              <select className="search-select" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
                <option value="All">Sabhi Sheher</option>
                <option value="Munger">Munger</option>
                <option value="Jamalpur">Jamalpur</option>
              </select>
              <button className="search-btn">🔍 Dhundhen</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>50+</strong><span>Registered Doctors</span></div>
              <div className="hero-stat"><strong>8,000+</strong><span>Happy Patients</span></div>
              <div className="hero-stat"><strong>12+</strong><span>Specialties</span></div>
              <div className="hero-stat"><strong>₹250</strong><span>Starting Fee</span></div>
            </div>
          </div>
        </div>

        {/* SPECIALTIES */}
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

        {/* DOCTORS */}
        <div className="section" style={{paddingTop:0}}>
          <div className="section-header">
            <div>
              <div className="section-title">Available <span>Doctors</span></div>
              <div className="section-sub">{filtered.length} doctors mil rahe hain — {cityFilter === "All" ? "Munger & Jamalpur" : cityFilter} mein</div>
            </div>
            <div className="filters">
              {["All","Munger","Jamalpur"].map(c => (
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
                    <div className="doctor-avatar">{doc.emoji}</div>
                    <div className="doctor-name">{doc.name}</div>
                    <div className="doctor-specialty">{doc.specialty} • {doc.quali}</div>
                    <div className={`doctor-badge ${doc.available ? "" : "busy"}`}>{doc.available ? "✓ Available" : "Busy Today"}</div>
                  </div>
                  <div className="doctor-card-body">
                    <div className="doctor-meta">
                      <div className="doctor-meta-row"><span>📍</span><span>{doc.city} — {doc.clinic}</span></div>
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
                      <button className="book-btn" onClick={e => { e.stopPropagation(); openBooking(doc); }}>Appointment Book Karen →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WHY US */}
        <div className="why-section">
          <div className="why-inner">
            <h2>Hum Kyun Best Hain?</h2>
            <p>Munger aur Jamalpur ke logon ke liye specially design kiya gaya platform</p>
            <div className="why-grid">
              {[
                { icon:"🔒", title:"Secure Payment", desc:"UPI, Debit/Credit Card aur Net Banking se safe payment karein." },
                { icon:"⚡", title:"Instant Confirmation", desc:"Booking hote hi SMS aur WhatsApp pe confirmation milega." },
                { icon:"🗓️", title:"Easy Rescheduling", desc:"24 ghante pehle free reschedule ya cancel karein." },
                { icon:"🏆", title:"Verified Doctors", desc:"Saare doctors government registered aur experience-verified hain." },
                { icon:"📍", title:"Local Doctors", desc:"Sirf Munger aur Jamalpur ke doctors — koi bhi bahar ka nahi." },
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

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <strong>🏥 DocBook Bihar</strong>
                <p>Munger aur Jamalpur ke logon ke liye ek bharosemand doctor appointment platform. Ghar baithe apna slot book karen aur online fees bharen.</p>
              </div>
              <div className="footer-col">
                <h4>Quick Links</h4>
                <a>Doctors Dhundhen</a>
                <a>Specialties</a>
                <a>Munger Doctors</a>
                <a>Jamalpur Doctors</a>
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
              <p>© 2024 DocBook Bihar. Munger & Jamalpur, Bihar. Sabhhi adhikar surakshit hain.</p>
              <div className="footer-emergency">🚨 Emergency: 108 (Free)</div>
            </div>
          </div>
        </footer>

        {/* BOOKING MODAL */}
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
                  <p style={{fontSize:"0.82rem",color:"var(--gray-400)",marginBottom:"1.2rem"}}>📱 SMS aur WhatsApp pe confirmation bheja ja raha hai</p>
                  <button className="done-btn" onClick={closeModal}>Theek Hai, Done!</button>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <div>
                      <h2>Appointment Book Karen</h2>
                      <div style={{color:"rgba(255,255,255,0.65)",fontSize:"0.82rem",marginTop:"2px"}}>Step {bookingStep} of 3</div>
                    </div>
                    <button className="modal-close" onClick={closeModal}>✕</button>
                  </div>
                  <div className="modal-body">
                    {/* STEPS */}
                    <div className="steps">
                      {["Date & Time","Details","Payment"].map((s,i) => (
                        <>
                          <div className="step" key={s}>
                            <div className={`step-circle ${bookingStep > i+1 ? "done" : bookingStep === i+1 ? "active" : ""}`}>{bookingStep > i+1 ? "✓" : i+1}</div>
                            <span className={`step-label ${bookingStep === i+1 ? "active" : ""}`}>{s}</span>
                          </div>
                          {i < 2 && <div className={`step-line ${bookingStep > i+1 ? "done" : ""}`} key={`l${i}`}/>}
                        </>
                      ))}
                    </div>

                    {/* DOCTOR STRIP */}
                    <div className="doctor-info-strip">
                      <div className="doc-ava-sm">{selectedDoctor.emoji}</div>
                      <div className="doc-info-sm">
                        <h3>{selectedDoctor.name}</h3>
                        <p>{selectedDoctor.specialty} • {selectedDoctor.city}</p>
                      </div>
                      <div className="doc-fee-sm">
                        <div className="fee-val">₹{selectedDoctor.fee}</div>
                        <div className="fee-lbl">Consultation</div>
                      </div>
                    </div>

                    {/* STEP 1 */}
                    {bookingStep === 1 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">📅 Date Chunen</label>
                          <div className="dates-grid">
                            {dates.map(d => (
                              <div key={d.num} className={`date-btn ${selectedDate === d.full ? "active" : ""} ${d.disabled ? "disabled" : ""}`}
                                onClick={() => !d.disabled && setSelectedDate(d.full)}>
                                <div className="date-day">{d.day}</div>
                                <div className="date-num">{d.num}</div>
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
                                  {s} {takenSlots.includes(s) ? "(Bhar gaya)" : ""}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <button className="confirm-btn" disabled={!selectedDate || !selectedSlot} onClick={() => setBookingStep(2)}>
                          Aage Badhein →
                        </button>
                      </>
                    )}

                    {/* STEP 2 */}
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
                          <button className="confirm-btn" style={{flex:"0 0 auto",width:"auto",background:"var(--gray-200)",color:"var(--gray-600)"}} onClick={() => setBookingStep(1)}>← Wapas</button>
                          <button className="confirm-btn" disabled={!form.name || !form.phone} onClick={() => setBookingStep(3)}>Payment Karen →</button>
                        </div>
                      </>
                    )}

                    {/* STEP 3 */}
                    {bookingStep === 3 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">💳 Payment Tarika Chunen</label>
                          <div className="payment-box">
                            <div className="payment-methods">
                              {[{id:"upi",icon:"📱",label:"UPI"},{id:"card",icon:"💳",label:"Card"},{id:"netbanking",icon:"🏦",label:"Net Banking"},{id:"cash",icon:"💵",label:"Clinic Mein"}].map(m => (
                                <div key={m.id} className={`pay-method ${payMethod === m.id ? "active" : ""}`} onClick={() => setPayMethod(m.id)}>
                                  <span className="pay-method-icon">{m.icon}</span>
                                  <div className="pay-method-label">{m.label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="pay-detail">
                              {payMethod === "upi" && <input className="form-input" placeholder="UPI ID dalein (jaise: name@upi)" value={upiId} onChange={e => setUpiId(e.target.value)} />}
                              {payMethod === "card" && (
                                <>
                                  <input className="form-input" placeholder="Card Number" style={{marginBottom:"8px"}} />
                                  <div className="form-row">
                                    <input className="form-input" placeholder="MM/YY" />
                                    <input className="form-input" placeholder="CVV" />
                                  </div>
                                </>
                              )}
                              {payMethod === "netbanking" && <select className="form-input"><option>Bank chunen</option><option>SBI</option><option>PNB</option><option>BOB</option><option>Canara Bank</option><option>UCO Bank</option></select>}
                              {payMethod === "cash" && <div style={{fontSize:"0.88rem",color:"var(--gray-600)",padding:"8px 0"}}>✅ Appointment confirm hogi, aur fees aap clinic pahunchne par denge.</div>}
                            </div>
                          </div>
                        </div>

                        <div className="fee-summary">
                          <div className="fee-row"><span>Consultation Fee</span><span>₹{selectedDoctor.fee}</span></div>
                          <div className="fee-row"><span>Platform Fee</span><span>₹0</span></div>
                          <div className="fee-row"><span>GST (0%)</span><span>₹0</span></div>
                          <div className="fee-row total"><span>Kul Rakam</span><span>₹{selectedDoctor.fee}</span></div>
                        </div>

                        <div style={{display:"flex",gap:"10px"}}>
                          <button className="confirm-btn" style={{flex:"0 0 auto",width:"auto",background:"var(--gray-200)",color:"var(--gray-600)"}} onClick={() => setBookingStep(2)}>← Wapas</button>
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
      </div>
          <BottomNav items={navItems} highlightColor="#0a6e6e" />
    </MobileFrame>
    </>
  );
}

