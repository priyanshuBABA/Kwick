import React, { useState, useMemo } from "react";

// --- DATA ---
const STATIONERY_ITEMS = [
  { id:"s1",  name:"Ball Pen",            price:10,  maxPrice:30,   emoji:"🖊️", category:"Writing",   tag:"bestseller", img:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=200&fit=crop&auto=format" },
  { id:"s2",  name:"Gel Pen",             price:15,  maxPrice:50,   emoji:"✒️", category:"Writing",   tag:"popular",    img:"https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=300&h=200&fit=crop&auto=format" },
  { id:"s3",  name:"Fountain Pen",        price:80,  maxPrice:500,  emoji:"🖋️", category:"Writing",               img:"https://images.unsplash.com/photo-1455720079774-5c8a7bcc4f3e?w=300&h=200&fit=crop&auto=format" },
  { id:"s4",  name:"Pencil",              price:5,   maxPrice:15,   emoji:"✏️", category:"Writing",   tag:"bestseller", img:"https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=200&fit=crop&auto=format" },
  { id:"s5",  name:"Mechanical Pencil",   price:40,  maxPrice:120,  emoji:"🖊️", category:"Writing",               img:"https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=300&h=200&fit=crop&auto=format" },
  { id:"s6",  name:"Eraser",              price:5,   maxPrice:20,   emoji:"🧹", category:"Writing",               img:"https://images.unsplash.com/photo-1632176850407-7b9b8e20bca4?w=300&h=200&fit=crop&auto=format" },
  { id:"s7",  name:"Sharpener",           price:5,   maxPrice:25,   emoji:"✂️", category:"Writing",               img:"https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&h=200&fit=crop&auto=format" },
  { id:"s8",  name:"Scale/Ruler",         price:10,  maxPrice:50,   emoji:"📏", category:"Drawing",               img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop&auto=format" },
  { id:"s9",  name:"Geometry Box",        price:80,  maxPrice:250,  emoji:"📐", category:"Drawing",   tag:"popular",    img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop&auto=format" },
  { id:"s10", name:"Marker",              price:25,  maxPrice:80,   emoji:"🖍️", category:"Writing",               img:"https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&h=200&fit=crop&auto=format" },
  { id:"s11", name:"Permanent Marker",    price:30,  maxPrice:100,  emoji:"🖊️", category:"Writing",               img:"https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?w=300&h=200&fit=crop&auto=format" },
  { id:"s12", name:"Highlighter",         price:30,  maxPrice:100,  emoji:"🟡", category:"Writing",   tag:"popular",    img:"https://images.unsplash.com/photo-1618517048949-0b4f2e40db12?w=300&h=200&fit=crop&auto=format" },
  { id:"s13", name:"Whiteboard Marker",   price:25,  maxPrice:70,   emoji:"🖊️", category:"Writing",               img:"https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=300&h=200&fit=crop&auto=format" },
  { id:"s14", name:"Notebook",            price:30,  maxPrice:150,  emoji:"📓", category:"Notebooks", tag:"bestseller", img:"https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=300&h=200&fit=crop&auto=format" },
  { id:"s15", name:"Spiral Notebook",     price:80,  maxPrice:250,  emoji:"📒", category:"Notebooks",             img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop&auto=format" },
  { id:"s16", name:"Long Notebook",       price:40,  maxPrice:120,  emoji:"📔", category:"Notebooks",             img:"https://images.unsplash.com/photo-1517842645767-c639042777db?w=300&h=200&fit=crop&auto=format" },
  { id:"s17", name:"Practical Copy",      price:50,  maxPrice:180,  emoji:"📗", category:"Notebooks",             img:"https://images.unsplash.com/photo-1585952360786-9e5053d0b82d?w=300&h=200&fit=crop&auto=format" },
  { id:"s18", name:"Drawing Book",        price:50,  maxPrice:250,  emoji:"📘", category:"Drawing",               img:"https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&h=200&fit=crop&auto=format" },
  { id:"s19", name:"Sketch Book",         price:80,  maxPrice:300,  emoji:"📙", category:"Drawing",               img:"https://images.unsplash.com/photo-1561997118-82e5b4e9bdc7?w=300&h=200&fit=crop&auto=format" },
  { id:"s20", name:"Sticky Notes",        price:40,  maxPrice:120,  emoji:"🗒️", category:"Office",    tag:"popular",    img:"https://images.unsplash.com/photo-1553452118-621e1f860f43?w=300&h=200&fit=crop&auto=format" },
  { id:"s21", name:"Diary",               price:150, maxPrice:600,  emoji:"📔", category:"Notebooks",             img:"https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=300&h=200&fit=crop&auto=format" },
  { id:"s22", name:"Planner",             price:250, maxPrice:1000, emoji:"📅", category:"Office",                img:"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=200&fit=crop&auto=format" },
  { id:"s23", name:"File Folder",         price:25,  maxPrice:120,  emoji:"📁", category:"Office",                img:"https://images.unsplash.com/photo-1568219557405-376e33853fd0?w=300&h=200&fit=crop&auto=format" },
  { id:"s24", name:"Display File",        price:60,  maxPrice:250,  emoji:"📂", category:"Office",                img:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&auto=format" },
  { id:"s25", name:"Envelope Pack",       price:30,  maxPrice:100,  emoji:"✉️", category:"Office",                img:"https://images.unsplash.com/photo-1579275542618-a1dcef05c3f0?w=300&h=200&fit=crop&auto=format" },
  { id:"s26", name:"Chart Paper",         price:10,  maxPrice:30,   emoji:"📜", category:"Drawing",               img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format" },
  { id:"s27", name:"A4 Paper Pack",       price:220, maxPrice:450,  emoji:"📄", category:"Office",    tag:"popular",    img:"https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=200&fit=crop&auto=format" },
  { id:"s28", name:"Color Paper Pack",    price:80,  maxPrice:250,  emoji:"📋", category:"Art",                   img:"https://images.unsplash.com/photo-1618517048949-0b4f2e40db12?w=300&h=200&fit=crop&auto=format" },
  { id:"s29", name:"Stapler",             price:60,  maxPrice:250,  emoji:"📌", category:"Office",                img:"https://images.unsplash.com/photo-1568219557405-376e33853fd0?w=300&h=200&fit=crop&auto=format" },
  { id:"s30", name:"Staple Pins",         price:20,  maxPrice:60,   emoji:"📎", category:"Office",                img:"https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=300&h=200&fit=crop&auto=format" },
  { id:"s31", name:"Paper Clips",         price:20,  maxPrice:80,   emoji:"🖇️", category:"Office",                img:"https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=300&h=200&fit=crop&auto=format" },
  { id:"s32", name:"Binder Clips",        price:30,  maxPrice:120,  emoji:"📎", category:"Office",                img:"https://images.unsplash.com/photo-1568219557405-376e33853fd0?w=300&h=200&fit=crop&auto=format" },
  { id:"s33", name:"Glue Stick",          price:20,  maxPrice:90,   emoji:"🧴", category:"Art",                   img:"https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=200&fit=crop&auto=format" },
  { id:"s34", name:"Fevicol Glue",        price:10,  maxPrice:150,  emoji:"🧪", category:"Art",                   img:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&h=200&fit=crop&auto=format" },
  { id:"s35", name:"Scissors",            price:40,  maxPrice:150,  emoji:"✂️", category:"Office",                img:"https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=300&h=200&fit=crop&auto=format" },
  { id:"s36", name:"Cutter",              price:30,  maxPrice:120,  emoji:"🔪", category:"Office",                img:"https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=300&h=200&fit=crop&auto=format" },
  { id:"s37", name:"Tape Roll",           price:20,  maxPrice:80,   emoji:"🎞️", category:"Office",                img:"https://images.unsplash.com/photo-1564419320461-6870880221ad?w=300&h=200&fit=crop&auto=format" },
  { id:"s38", name:"Tape Dispenser",      price:50,  maxPrice:200,  emoji:"🎀", category:"Office",                img:"https://images.unsplash.com/photo-1589987607627-616cca33b5fc?w=300&h=200&fit=crop&auto=format" },
  { id:"s39", name:"Calculator",          price:250, maxPrice:1200, emoji:"🧮", category:"Office",    tag:"popular",    img:"https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=300&h=200&fit=crop&auto=format" },
  { id:"s40", name:"Desk Organizer",      price:150, maxPrice:800,  emoji:"🗂️", category:"Office",                img:"https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?w=300&h=200&fit=crop&auto=format" },
  { id:"s41", name:"Pencil Pouch",        price:80,  maxPrice:350,  emoji:"👜", category:"Storage",               img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop&auto=format" },
  { id:"s42", name:"Pencil Box",          price:100, maxPrice:500,  emoji:"📦", category:"Storage",   tag:"popular",    img:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=200&fit=crop&auto=format" },
  { id:"s43", name:"Color Pencil Set",    price:80,  maxPrice:500,  emoji:"🎨", category:"Art",       tag:"popular",    img:"https://images.unsplash.com/photo-1513185041617-8ab03f83d6f9?w=300&h=200&fit=crop&auto=format" },
  { id:"s44", name:"Crayons",             price:50,  maxPrice:300,  emoji:"🖍️", category:"Art",                   img:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=200&fit=crop&auto=format" },
  { id:"s45", name:"Water Color Set",     price:100, maxPrice:600,  emoji:"🎨", category:"Art",                   img:"https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=200&fit=crop&auto=format" },
  { id:"s46", name:"Paint Brush Set",     price:50,  maxPrice:250,  emoji:"🖌️", category:"Art",                   img:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop&auto=format" },
  { id:"s47", name:"Sketch Pen Set",      price:60,  maxPrice:350,  emoji:"🖊️", category:"Art",       tag:"bestseller", img:"https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&h=200&fit=crop&auto=format" },
  { id:"s48", name:"Glitter Pen Set",     price:80,  maxPrice:300,  emoji:"✨", category:"Art",                   img:"https://images.unsplash.com/photo-1585665000564-8e5d57f9d34b?w=300&h=200&fit=crop&auto=format" },
  { id:"s49", name:"Craft Paper",         price:50,  maxPrice:200,  emoji:"🗞️", category:"Art",                   img:"https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=300&h=200&fit=crop&auto=format" },
  { id:"s50", name:"Sticker Pack",        price:30,  maxPrice:150,  emoji:"⭐", category:"Art",       tag:"popular",    img:"https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=300&h=200&fit=crop&auto=format" },
  { id:"s51", name:"Label Stickers",      price:40,  maxPrice:120,  emoji:"🏷️", category:"Office",                img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format" },
  { id:"s52", name:"Exam Pad",            price:70,  maxPrice:250,  emoji:"📋", category:"Notebooks",             img:"https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=300&h=200&fit=crop&auto=format" },
  { id:"s53", name:"Clipboard",           price:80,  maxPrice:300,  emoji:"📋", category:"Office",                img:"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop&auto=format" },
  { id:"s54", name:"Punch Machine",       price:120, maxPrice:400,  emoji:"🔨", category:"Office",                img:"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop&auto=format" },
  { id:"s55", name:"Ink Bottle",          price:50,  maxPrice:250,  emoji:"🧪", category:"Writing",               img:"https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=300&h=200&fit=crop&auto=format" },
  { id:"s56", name:"Rubber Bands Pack",   price:20,  maxPrice:60,   emoji:"🔴", category:"Office",                img:"https://images.unsplash.com/photo-1563207153-f403bf289163?w=300&h=200&fit=crop&auto=format" },
  { id:"s57", name:"Correction Pen",      price:30,  maxPrice:120,  emoji:"🖊️", category:"Writing",               img:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=200&fit=crop&auto=format" },
  { id:"s58", name:"Correction Tape",     price:40,  maxPrice:150,  emoji:"📼", category:"Writing",               img:"https://images.unsplash.com/photo-1589987607627-616cca33b5fc?w=300&h=200&fit=crop&auto=format" },
  { id:"s59", name:"ID Card Holder",      price:50,  maxPrice:200,  emoji:"🪪", category:"Office",                img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop&auto=format" },
  { id:"s60", name:"Visiting Card Holder",price:100, maxPrice:500,  emoji:"💼", category:"Office",                img:"https://images.unsplash.com/photo-1553652297-5c88a0e0dbf4?w=300&h=200&fit=crop&auto=format" },
];

const GIFT_ITEMS = [
  { id:"g1",  name:"Teddy Bear",           price:250,  maxPrice:1800,  emoji:"🧸", category:"Soft Toys",   tag:"bestseller", img:"https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=300&h=200&fit=crop&auto=format" },
  { id:"g2",  name:"Soft Toys",            price:200,  maxPrice:2000,  emoji:"🐻", category:"Soft Toys",                     img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format" },
  { id:"g3",  name:"Coffee Mug",           price:150,  maxPrice:500,   emoji:"☕", category:"Mugs",         tag:"popular",    img:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=200&fit=crop&auto=format" },
  { id:"g4",  name:"Printed Mug",          price:200,  maxPrice:600,   emoji:"🍵", category:"Mugs",         tag:"popular",    img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop&auto=format" },
  { id:"g5",  name:"Magic Mug",            price:250,  maxPrice:700,   emoji:"✨", category:"Mugs",                           img:"https://images.unsplash.com/photo-1571100100988-9d2a86e96dc0?w=300&h=200&fit=crop&auto=format" },
  { id:"g6",  name:"Photo Frame",          price:150,  maxPrice:1200,  emoji:"🖼️", category:"Decor",        tag:"bestseller", img:"https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=300&h=200&fit=crop&auto=format" },
  { id:"g7",  name:"LED Photo Frame",      price:500,  maxPrice:2500,  emoji:"💡", category:"Decor",                          img:"https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=300&h=200&fit=crop&auto=format" },
  { id:"g8",  name:"Greeting Card",        price:30,   maxPrice:200,   emoji:"💌", category:"Cards",                          img:"https://images.unsplash.com/photo-1513201099705-a9746072f043?w=300&h=200&fit=crop&auto=format" },
  { id:"g9",  name:"Gift Hamper",          price:500,  maxPrice:3000,  emoji:"🎁", category:"Hampers",      tag:"popular",    img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop&auto=format" },
  { id:"g10", name:"Chocolate Gift Box",   price:300,  maxPrice:2000,  emoji:"🍫", category:"Hampers",                        img:"https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=300&h=200&fit=crop&auto=format" },
  { id:"g11", name:"Perfume Gift Set",     price:500,  maxPrice:2500,  emoji:"🌸", category:"Premium",                        img:"https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=200&fit=crop&auto=format" },
  { id:"g12", name:"Wallet Gift Set",      price:400,  maxPrice:2500,  emoji:"👜", category:"Premium",                        img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=200&fit=crop&auto=format" },
  { id:"g13", name:"Keychain Gift",        price:80,   maxPrice:350,   emoji:"🗝️", category:"Accessories",                    img:"https://images.unsplash.com/photo-1514984879728-be3b0abf5e8b?w=300&h=200&fit=crop&auto=format" },
  { id:"g14", name:"Customized Keychain",  price:150,  maxPrice:500,   emoji:"🔑", category:"Accessories",  tag:"popular",    img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=200&fit=crop&auto=format" },
  { id:"g15", name:"Couple Gifts",         price:500,  maxPrice:3500,  emoji:"💑", category:"Special",      tag:"bestseller", img:"https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=200&fit=crop&auto=format" },
  { id:"g16", name:"Birthday Gift Box",    price:500,  maxPrice:4000,  emoji:"🎂", category:"Special",      tag:"popular",    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format" },
  { id:"g17", name:"Anniversary Gift",     price:700,  maxPrice:5000,  emoji:"💍", category:"Special",                        img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop&auto=format" },
  { id:"g18", name:"Friendship Band",      price:50,   maxPrice:300,   emoji:"🤝", category:"Accessories",                    img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=200&fit=crop&auto=format" },
  { id:"g19", name:"Rakhi Gift Set",       price:150,  maxPrice:1500,  emoji:"🎀", category:"Festival",                       img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop&auto=format" },
  { id:"g20", name:"Decorative Showpiece", price:250,  maxPrice:1500,  emoji:"🏺", category:"Decor",                          img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop&auto=format" },
  { id:"g21", name:"Buddha Statue",        price:300,  maxPrice:2500,  emoji:"🧘", category:"Decor",                          img:"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=300&h=200&fit=crop&auto=format" },
  { id:"g22", name:"Idol Gift Set",        price:400,  maxPrice:3000,  emoji:"🪔", category:"Festival",                       img:"https://images.unsplash.com/photo-1604608672516-5b8a2e4b3a0d?w=300&h=200&fit=crop&auto=format" },
  { id:"g23", name:"Diya Set",             price:200,  maxPrice:1500,  emoji:"🪔", category:"Festival",     tag:"popular",    img:"https://images.unsplash.com/photo-1604608672516-5b8a2e4b3a0d?w=300&h=200&fit=crop&auto=format" },
  { id:"g24", name:"Aroma Candle Set",     price:250,  maxPrice:1200,  emoji:"🕯️", category:"Decor",                          img:"https://images.unsplash.com/photo-1601058272524-2bea25eada7c?w=300&h=200&fit=crop&auto=format" },
  { id:"g25", name:"Scented Candles",      price:150,  maxPrice:800,   emoji:"🕯️", category:"Decor",                          img:"https://images.unsplash.com/photo-1603006905003-be475563bc59?w=300&h=200&fit=crop&auto=format" },
  { id:"g26", name:"Decorative Clock",     price:500,  maxPrice:2500,  emoji:"🕰️", category:"Decor",                          img:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=300&h=200&fit=crop&auto=format" },
  { id:"g27", name:"Wall Hanging",         price:150,  maxPrice:1200,  emoji:"🖼️", category:"Decor",                          img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format" },
  { id:"g28", name:"Dream Catcher",        price:200,  maxPrice:900,   emoji:"🌙", category:"Decor",                          img:"https://images.unsplash.com/photo-1518478155568-b0c5a35a2879?w=300&h=200&fit=crop&auto=format" },
  { id:"g29", name:"Artificial Flower Vase",price:300, maxPrice:1800,  emoji:"🌺", category:"Decor",                          img:"https://images.unsplash.com/photo-1487530811015-780d0e2feded?w=300&h=200&fit=crop&auto=format" },
  { id:"g30", name:"Snow Globe",           price:250,  maxPrice:1200,  emoji:"❄️", category:"Decor",                          img:"https://images.unsplash.com/photo-1513201099705-a9746072f043?w=300&h=200&fit=crop&auto=format" },
  { id:"g31", name:"Musical Box",          price:300,  maxPrice:1500,  emoji:"🎵", category:"Special",                        img:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop&auto=format" },
  { id:"g32", name:"Mini Table Lamp",      price:350,  maxPrice:1500,  emoji:"💡", category:"Decor",                          img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop&auto=format" },
  { id:"g33", name:"LED Night Lamp",       price:400,  maxPrice:2000,  emoji:"🌟", category:"Decor",        tag:"popular",    img:"https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=200&fit=crop&auto=format" },
  { id:"g34", name:"Customized Cushion",   price:300,  maxPrice:1000,  emoji:"🛋️", category:"Home",                           img:"https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=300&h=200&fit=crop&auto=format" },
  { id:"g35", name:"Printed Pillow",       price:250,  maxPrice:900,   emoji:"💤", category:"Home",                           img:"https://images.unsplash.com/photo-1540638349517-3abd5afc5847?w=300&h=200&fit=crop&auto=format" },
  { id:"g36", name:"Jewellery Box",        price:400,  maxPrice:2500,  emoji:"💎", category:"Premium",                        img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=200&fit=crop&auto=format" },
  { id:"g37", name:"Makeup Kit Gift",      price:500,  maxPrice:4000,  emoji:"💄", category:"Premium",                        img:"https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=200&fit=crop&auto=format" },
  { id:"g38", name:"Watch Gift Box",       price:700,  maxPrice:5000,  emoji:"⌚", category:"Premium",      tag:"popular",    img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&auto=format" },
  { id:"g39", name:"Sunglasses Gift Set",  price:500,  maxPrice:3000,  emoji:"🕶️", category:"Premium",                        img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop&auto=format" },
  { id:"g40", name:"Handbag Gift",         price:700,  maxPrice:5000,  emoji:"👛", category:"Premium",                        img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=200&fit=crop&auto=format" },
  { id:"g41", name:"Water Bottle Gift",    price:250,  maxPrice:1200,  emoji:"🍶", category:"Home",                           img:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop&auto=format" },
  { id:"g42", name:"Lunch Box Gift Set",   price:350,  maxPrice:1500,  emoji:"🍱", category:"Home",                           img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop&auto=format" },
  { id:"g43", name:"Stationery Gift Pack", price:150,  maxPrice:1000,  emoji:"📦", category:"Hampers",                        img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop&auto=format" },
  { id:"g44", name:"Kids Gift Pack",       price:200,  maxPrice:1500,  emoji:"🎠", category:"Kids",                           img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format" },
  { id:"g45", name:"Toy Car Gift",         price:250,  maxPrice:2000,  emoji:"🚗", category:"Kids",                           img:"https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&h=200&fit=crop&auto=format" },
  { id:"g46", name:"Remote Control Toy",   price:500,  maxPrice:5000,  emoji:"🕹️", category:"Kids",         tag:"popular",    img:"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=200&fit=crop&auto=format" },
  { id:"g47", name:"Bluetooth Speaker",    price:800,  maxPrice:4000,  emoji:"🔊", category:"Electronics",                    img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop&auto=format" },
  { id:"g48", name:"Mobile Stand Gift",    price:150,  maxPrice:700,   emoji:"📱", category:"Electronics",                    img:"https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=200&fit=crop&auto=format" },
  { id:"g49", name:"Personalized Gifts",   price:300,  maxPrice:3000,  emoji:"💝", category:"Special",      tag:"bestseller", img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop&auto=format" },
  { id:"g50", name:"Festival Gift Box",    price:500,  maxPrice:5000,  emoji:"🎊", category:"Festival",                       img:"https://images.unsplash.com/photo-1512909006721-3d6018887383?w=300&h=200&fit=crop&auto=format" },
  { id:"g51", name:"Dry Fruit Gift Pack",  price:600,  maxPrice:3500,  emoji:"🥜", category:"Hampers",      tag:"popular",    img:"https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop&auto=format" },
  { id:"g52", name:"Home Decor Set",       price:800,  maxPrice:6000,  emoji:"🏠", category:"Home",                           img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop&auto=format" },
  { id:"g53", name:"Resin Art Gifts",      price:400,  maxPrice:3000,  emoji:"🌈", category:"Decor",                          img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&h=200&fit=crop&auto=format" },
  { id:"g54", name:"Glass Showpiece",      price:300,  maxPrice:2500,  emoji:"🔮", category:"Decor",                          img:"https://images.unsplash.com/photo-1571104508999-893933ded431?w=300&h=200&fit=crop&auto=format" },
  { id:"g55", name:"Pen Gift Set",         price:250,  maxPrice:2000,  emoji:"🖊️", category:"Premium",                        img:"https://images.unsplash.com/photo-1455720079774-5c8a7bcc4f3e?w=300&h=200&fit=crop&auto=format" },
  { id:"g56", name:"Couple Photo Frame",   price:400,  maxPrice:1800,  emoji:"💑", category:"Special",                        img:"https://images.unsplash.com/photo-1583241800698-e8ab01830a22?w=300&h=200&fit=crop&auto=format" },
  { id:"g57", name:"Heart Shape Gifts",    price:250,  maxPrice:1500,  emoji:"❤️", category:"Special",                        img:"https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=200&fit=crop&auto=format" },
  { id:"g58", name:"Cartoon Character Gifts",price:150,maxPrice:1200,  emoji:"🎭", category:"Kids",                           img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop&auto=format" },
  { id:"g59", name:"Handmade Gifts",       price:200,  maxPrice:2500,  emoji:"🤲", category:"Special",      tag:"popular",    img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop&auto=format" },
  { id:"g60", name:"Luxury Gift Basket",   price:1500, maxPrice:10000, emoji:"🧺", category:"Premium",      tag:"premium",    img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop&auto=format" },
];

const ALL_ITEMS = [...STATIONERY_ITEMS, ...GIFT_ITEMS];

const CARD_GRADIENTS = [
  "linear-gradient(135deg,#fff9e6,#fff3cc)",
  "linear-gradient(135deg,#e8f5e9,#c8e6c9)",
  "linear-gradient(135deg,#e3f2fd,#bbdefb)",
  "linear-gradient(135deg,#fce4ec,#f8bbd0)",
  "linear-gradient(135deg,#ede7f6,#d1c4e9)",
  "linear-gradient(135deg,#fff3e0,#ffe0b2)",
  "linear-gradient(135deg,#e0f7fa,#b2ebf2)",
  "linear-gradient(135deg,#f9fbe7,#f0f4c3)",
];

const StationeryGiftCenter = () => {
  const [activeTab, setActiveTab] = useState("stationery"); // stationery or gift
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]); // array of { id, qty }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, success
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", paymentMethod: "upi" });
  const [orderId] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  const currentItems = activeTab === "stationery" ? STATIONERY_ITEMS : GIFT_ITEMS;

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(currentItems.map(item => item.category))];
    return cats;
  }, [currentItems]);

  const filteredItems = useMemo(() => {
    return currentItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [currentItems, searchQuery, selectedCategory]);

  const cartItems = useMemo(() => {
    return cart.map(cartItem => {
      const product = ALL_ITEMS.find(item => item.id === cartItem.id);
      return { ...product, qty: cartItem.qty };
    });
  }, [cart]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleAddToCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing.qty === 1) {
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item);
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      setCart([]);
    }, 2000);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetFilters();
  };

  // --- STYLES ---
  const styles = {
    container: {
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      color: "#1a1a1a",
      paddingBottom: totalItems > 0 ? "100px" : "20px",
      position: "relative",
    },
    header: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FFAB00 100%)",
      padding: "15px 20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    headerTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "900",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    searchBar: {
      width: "100%",
      padding: "12px 20px",
      borderRadius: "25px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
    },
    tabs: {
      display: "flex",
      backgroundColor: "#fff",
      padding: "0 20px",
      borderBottom: "1px solid #eee",
    },
    tab: (active) => ({
      flex: 1,
      textAlign: "center",
      padding: "15px 0",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      borderBottom: active ? "3px solid #FFD700" : "3px solid transparent",
      color: active ? "#1a1a1a" : "#666",
      transition: "all 0.3s",
    }),
    hero: {
      padding: "25px 20px",
      background: activeTab === "stationery" 
        ? "linear-gradient(135deg, #FFD700, #FFF176)" 
        : "linear-gradient(135deg, #FF80AB, #FCE4EC)",
      margin: "15px 15px 20px",
      borderRadius: "20px",
      color: activeTab === "stationery" ? "#1a1a1a" : "#fff",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    },
    filterContainer: {
      display: "flex",
      overflowX: "auto",
      gap: "10px",
      padding: "0 20px 15px",
      scrollbarWidth: "none",
    },
    filterChip: (active) => ({
      padding: "8px 20px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      whiteSpace: "nowrap",
      cursor: "pointer",
      backgroundColor: active ? "#FFD700" : "#fff",
      color: active ? "#1a1a1a" : "#666",
      border: "1px solid",
      borderColor: active ? "#FFD700" : "#eee",
      transition: "all 0.2s",
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: "15px",
      padding: "0 15px",
    },
    card: (index) => ({
      backgroundColor: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      background: CARD_GRADIENTS[index % 8],
    }),
    cardImage: {
      width: "100%",
      height: "120px",
      objectFit: "cover",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
    },
    cardBody: {
      padding: "12px",
      backgroundColor: "#fff",
    },
    badge: (type) => ({
      position: "absolute",
      top: "10px",
      left: "10px",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "9px",
      fontWeight: "800",
      color: "#fff",
      textTransform: "uppercase",
      backgroundColor: type === "bestseller" ? "#ef4444" : type === "popular" ? "#16a34a" : "#7c3aed",
    }),
    cardName: {
      fontSize: "14px",
      fontWeight: "700",
      marginBottom: "4px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    cardPrice: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#666",
      marginBottom: "12px",
    },
    addButton: {
      width: "100%",
      padding: "8px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#FFD700",
      color: "#1a1a1a",
      fontWeight: "700",
      fontSize: "12px",
      cursor: "pointer",
      transition: "transform 0.1s",
    },
    qtyControls: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#1a1a1a",
      borderRadius: "8px",
      padding: "4px",
    },
    qtyBtn: {
      backgroundColor: "transparent",
      border: "none",
      color: "#FFD700",
      fontSize: "18px",
      fontWeight: "700",
      width: "30px",
      height: "30px",
      cursor: "pointer",
    },
    qtyNum: {
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
    },
    fab: {
      position: "fixed",
      bottom: "100px",
      right: "20px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#1a1a1a",
      color: "#FFD700",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
      cursor: "pointer",
      zIndex: 90,
      transition: "transform 0.2s",
    },
    fabBadge: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      backgroundColor: "#ef4444",
      color: "#fff",
      fontSize: "10px",
      fontWeight: "700",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px solid #fff",
    },
    bottomBar: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      padding: "15px 20px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 -4px 15px rgba(0,0,0,0.08)",
      zIndex: 100,
    },
    checkoutBtn: {
      background: "linear-gradient(135deg, #FFD700, #FFAB00)",
      border: "none",
      padding: "12px 25px",
      borderRadius: "12px",
      fontWeight: "800",
      color: "#1a1a1a",
      fontSize: "14px",
      cursor: "pointer",
    },
    drawer: {
      position: "fixed",
      top: 0,
      right: isCartOpen ? 0 : "-100%",
      width: "min(400px, 100%)",
      height: "100%",
      backgroundColor: "#fff",
      zIndex: 200,
      transition: "right 0.3s ease",
      boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
    },
    drawerOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 199,
      display: isCartOpen ? "block" : "none",
    },
    drawerHeader: {
      padding: "20px",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#FFD700",
    },
    drawerContent: {
      flex: 1,
      overflowY: "auto",
      padding: "20px",
    },
    cartItem: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      alignItems: "center",
    },
    cartItemImg: {
      width: "50px",
      height: "50px",
      borderRadius: "8px",
      objectFit: "cover",
      backgroundColor: "#f9f9f9",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 300,
      padding: "20px",
    },
    modalBody: {
      backgroundColor: "#fff",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "500px",
      maxHeight: "90vh",
      overflowY: "auto",
      position: "relative",
    },
    formGroup: {
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      borderRadius: "10px",
      border: "1px solid #eee",
      fontSize: "14px",
      marginTop: "5px",
      outline: "none",
    },
    paymentCard: (selected) => ({
      padding: "15px",
      borderRadius: "12px",
      border: "2px solid",
      borderColor: selected ? "#FFD700" : "#eee",
      backgroundColor: selected ? "#fff9e6" : "#fff",
      marginBottom: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      transition: "all 0.2s",
    }),
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <div style={styles.logo}>
            <span>⚡</span> Kwick Stationery
          </div>
          <div style={{ fontSize: "20px" }}>👤</div>
        </div>
        <input 
          type="text" 
          placeholder="Search pens, diaries, gifts..." 
          style={styles.searchBar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      {/* TABS */}
      <div style={styles.tabs}>
        <div 
          style={styles.tab(activeTab === "stationery")} 
          onClick={() => handleTabChange("stationery")}
        >
          📚 Stationery
        </div>
        <div 
          style={styles.tab(activeTab === "gift")} 
          onClick={() => handleTabChange("gift")}
        >
          🎁 Gift Center
        </div>
      </div>

      {/* HERO BANNER */}
      <div style={styles.hero}>
        <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "5px" }}>
          {activeTab === "stationery" ? "Back to School! 🎒" : "Special Surprise! 💝"}
        </h2>
        <p style={{ fontSize: "12px", fontWeight: "600", opacity: 0.8 }}>
          {activeTab === "stationery" ? "Get up to 40% off on all notebooks" : "Premium gifts delivered in 30 mins"}
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div style={styles.filterContainer}>
        {categories.map(cat => (
          <div 
            key={cat} 
            style={styles.filterChip(selectedCategory === cat)}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div style={styles.grid}>
        {filteredItems.map((item, index) => {
          const cartItem = cart.find(c => c.id === item.id);
          return (
            <div key={item.id} style={styles.card(index)}>
              <div style={{ position: "relative" }}>
                {item.tag && <div style={styles.badge(item.tag)}>{item.tag}</div>}
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={styles.cardImage} 
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div style={{ ...styles.cardImage, display: "none", backgroundColor: "#f9f9f9", justifyContent: "center", alignItems: "center", fontSize: "40px" }}>
                  {item.emoji}
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.cardName}>{item.name}</div>
                <div style={styles.cardPrice}>₹{item.price} - ₹{item.maxPrice}</div>
                {cartItem ? (
                  <div style={styles.qtyControls}>
                    <button style={styles.qtyBtn} onClick={() => handleRemoveFromCart(item.id)}>−</button>
                    <span style={styles.qtyNum}>{cartItem.qty}</span>
                    <button style={styles.qtyBtn} onClick={() => handleAddToCart(item.id)}>+</button>
                  </div>
                ) : (
                  <button 
                    style={styles.addButton} 
                    onClick={() => handleAddToCart(item.id)}
                    onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
                    onMouseUp={(e) => e.target.style.transform = "scale(1)"}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CART FAB */}
      <div style={styles.fab} onClick={() => setIsCartOpen(true)}>
        🛒
        {totalItems > 0 && <div style={styles.fabBadge}>{totalItems}</div>}
      </div>

      {/* BOTTOM CART BAR */}
      {totalItems > 0 && (
        <div style={styles.bottomBar}>
          <div>
            <div style={{ fontSize: "12px", color: "#666", fontWeight: "700" }}>{totalItems} ITEMS</div>
            <div style={{ fontSize: "18px", fontWeight: "900" }}>₹{totalAmount}</div>
          </div>
          <button style={styles.checkoutBtn} onClick={() => setIsPaymentModalOpen(true)}>
            PROCEED TO CHECKOUT ➔
          </button>
        </div>
      )}

      {/* CART DRAWER */}
      <div style={styles.drawerOverlay} onClick={() => setIsCartOpen(false)} />
      <div style={styles.drawer}>
        <div style={styles.drawerHeader}>
          <div style={{ fontWeight: "900", fontSize: "18px" }}>Your Basket ({totalItems})</div>
          <button 
            style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>
        <div style={styles.drawerContent}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "100px", color: "#999" }}>
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>🛒</div>
              <div style={{ fontWeight: "700" }}>Your cart is empty</div>
              <p style={{ fontSize: "12px" }}>Add items to start shopping</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.cartItemImg}>
                  <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} onError={(e) => e.target.style.display="none"} />
                  <span style={{ position: "absolute" }}>{item.emoji}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", fontSize: "14px" }}>{item.name}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>₹{item.price}</div>
                </div>
                <div style={{ ...styles.qtyControls, width: "90px" }}>
                  <button style={styles.qtyBtn} onClick={() => handleRemoveFromCart(item.id)}>−</button>
                  <span style={styles.qtyNum}>{item.qty}</span>
                  <button style={styles.qtyBtn} onClick={() => handleAddToCart(item.id)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        {totalItems > 0 && (
          <div style={{ padding: "20px", borderTop: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontWeight: "700" }}>
              <span>Total Bill</span>
              <span>₹{totalAmount}</span>
            </div>
            <button 
              style={{ ...styles.checkoutBtn, width: "100%", padding: "15px" }}
              onClick={() => {
                setIsCartOpen(false);
                setIsPaymentModalOpen(true);
              }}
            >
              PROCEED TO PAY ₹{totalAmount}
            </button>
          </div>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {isPaymentModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalBody}>
            {paymentStatus === "idle" && (
              <>
                <div style={{ padding: "20px", background: "#1a1a1a", color: "#FFD700", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", opacity: 0.8, marginBottom: "5px" }}>ORDER SUMMARY</div>
                  <div style={{ fontSize: "28px", fontWeight: "900" }}>₹{totalAmount}</div>
                </div>
                <form onSubmit={handlePlaceOrder} style={{ padding: "25px" }}>
                  <h3 style={{ marginBottom: "15px", fontWeight: "800" }}>Delivery Details</h3>
                  <div style={styles.formGroup}>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#666" }}>FULL NAME</label>
                    <input type="text" required style={styles.input} placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#666" }}>PHONE NUMBER</label>
                    <input type="tel" required style={styles.input} placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#666" }}>ADDRESS</label>
                    <textarea required style={{ ...styles.input, height: "80px", resize: "none" }} placeholder="House No, Street, Landmark, City" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>

                  <h3 style={{ margin: "20px 0 15px", fontWeight: "800" }}>Payment Method</h3>
                  <div style={styles.paymentCard(formData.paymentMethod === "upi")} onClick={() => setFormData({...formData, paymentMethod: "upi"})}>
                    <span style={{ fontSize: "20px" }}>📱</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "700", fontSize: "14px" }}>UPI (PhonePe/GPay/Paytm)</div>
                    </div>
                    <input type="radio" checked={formData.paymentMethod === "upi"} readOnly />
                  </div>
                  {formData.paymentMethod === "upi" && (
                    <input type="text" placeholder="Enter UPI ID (e.g. john@okaxis)" style={{ ...styles.input, marginBottom: "15px", backgroundColor: "#f9f9f9" }} />
                  )}

                  <div style={styles.paymentCard(formData.paymentMethod === "card")} onClick={() => setFormData({...formData, paymentMethod: "card"})}>
                    <span style={{ fontSize: "20px" }}>💳</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "700", fontSize: "14px" }}>Credit / Debit Card</div>
                    </div>
                    <input type="radio" checked={formData.paymentMethod === "card"} readOnly />
                  </div>
                  {formData.paymentMethod === "card" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
                      <input type="text" placeholder="Card Number" style={{ ...styles.input, gridColumn: "span 2" }} />
                      <input type="text" placeholder="MM/YY" style={styles.input} />
                      <input type="text" placeholder="CVV" style={styles.input} />
                    </div>
                  )}

                  <div style={styles.paymentCard(formData.paymentMethod === "cod")} onClick={() => setFormData({...formData, paymentMethod: "cod"})}>
                    <span style={{ fontSize: "20px" }}>💵</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "700", fontSize: "14px" }}>Cash on Delivery</div>
                    </div>
                    <input type="radio" checked={formData.paymentMethod === "cod"} readOnly />
                  </div>

                  <button type="submit" style={{ ...styles.checkoutBtn, width: "100%", padding: "18px", marginTop: "20px", fontSize: "16px" }}>
                    PLACE ORDER · ₹{totalAmount}
                  </button>
                </form>
                <button 
                  style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer", width: "30px", height: "30px", borderRadius: "50%" }}
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  ✕
                </button>
              </>
            )}

            {paymentStatus === "processing" && (
              <div style={{ padding: "60px 40px", textAlign: "center" }}>
                <div style={{ 
                  width: "50px", 
                  height: "50px", 
                  border: "5px solid #f3f3f3", 
                  borderTop: "5px solid #FFD700", 
                  borderRadius: "50%", 
                  margin: "0 auto 25px",
                  animation: "spin 1s linear infinite"
                }} />
                <style>{`
                  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
                <h2 style={{ fontWeight: "900" }}>Processing Payment...</h2>
                <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>Please do not close the app or press back</p>
              </div>
            )}

            {paymentStatus === "success" && (
              <div style={{ padding: "60px 40px", textAlign: "center" }}>
                <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎉</div>
                <h2 style={{ fontWeight: "900", fontSize: "24px" }}>Order Placed!</h2>
                <p style={{ color: "#666", fontSize: "14px", margin: "15px 0 30px" }}>
                  Thank you <b>{formData.name}</b>! Your stationery & gifts are on the way to <b>{formData.address}</b>.
                </p>
                <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "12px", textAlign: "left", marginBottom: "30px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#999", marginBottom: "5px" }}>ORDER ID: #KWK-{orderId}</div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#999" }}>ESTIMATED DELIVERY: 30-45 mins</div>
                </div>
                <button 
                  style={{ ...styles.checkoutBtn, width: "100%", padding: "15px" }}
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                    setPaymentStatus("idle");
                  }}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StationeryGiftCenter;
