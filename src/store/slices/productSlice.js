import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    // Solar Products
    {
      id: 1,
      name: "5KVA Solar Inverter",
      price: "R 4,999",
      description: "High-efficiency 5KVA solar inverter with MPPT charging",
      category: "Solar",
      featured: true,
      image: "/images/solar/5KVA-4000W-Inverter.png"
    },
    {
      id: 2,
      name: "Professional Solar Panel",
      price: "R 2,999",
      description: "Professional grade solar panel for maximum efficiency",
      category: "Solar",
      featured: true,
      image: "/images/solar/main-image-635149b0591ba.jpg"
    },
    {
      id: 3,
      name: "Solar Battery Pack",
      price: "R 8,999",
      description: "High-capacity solar battery storage",
      category: "Solar",
      featured: true,
      image: "/images/solar/Lithium-Ion-Batteries-Electric-Br-Solar-as-Carton-Power-Solar-Battery.avif"
    },
    {
      id: 4,
      name: "Solar Power Station",
      price: "R 6,999",
      originalPrice: "R 7,999",
      description: "Portable solar power station for outdoor activities",
      category: "Solar",
      featured: true,
      image: "/images/solar/5KVA-4000W-Inverter.png"
    },
    {
      id: 5,
      name: "Solar Panel Kit",
      price: "R 3,499",
      originalPrice: "R 3,999",
      description: "Complete solar panel kit with mounting accessories",
      category: "Solar",
      featured: true,
      image: "/images/solar/solar-panel-3.jpg"
    },
    // Phones
    {
      id: 6,
      name: "iPhone 15 Pro Max",
      price: "R 24,999",
      originalPrice: "R 26,999",
      description: "Latest iPhone with A17 Pro chip",
      category: "Phones",
      featured: true,
      image: "/images/phones/65abe962833d1992cf3338ae-large.webp"
    },
    {
      id: 7,
      name: "Samsung Galaxy S24 Ultra",
      price: "R 22,999",
      originalPrice: "R 24,999",
      description: "Premium Android flagship with S Pen",
      category: "Phones",
      featured: true,
      image: "/images/phones/659e3b11a09797c2dab20d7f-large.webp"
    },
    {
      id: 8,
      name: "Google Pixel 8 Pro",
      price: "R 19,999",
      originalPrice: "R 21,999",
      description: "Ultimate Android experience",
      category: "Phones",
      featured: true,
      image: "/images/phones/648a0cd936b1809ff4cb7b09-large.webp"
    },
    {
      id: 9,
      name: "OnePlus 12",
      price: "R 17,999",
      description: "Flagship killer with top performance",
      category: "Phones",
      featured: true,
      image: "/images/phones/63ebea3fe3d32542315c1f64-large.webp"
    },
    {
      id: 10,
      name: "Xiaomi 14 Pro",
      price: "R 16,999",
      description: "Premium build with Leica optics",
      category: "Phones",
      featured: true,
      image: "/images/phones/63ebed664a5dc9be60aa1cd2-large.webp"
    },
    // Speakers
    {
      id: 11,
      name: "JBL Flip Essential",
      price: "R 1,499",
      description: "Powerful JBL Pro Sound with deep bass",
      category: "Speakers",
      featured: true,
      image: "/images/bluetooth speakers/5cd59cb3e060820c6e0995ae-large.jpg"
    },
    {
      id: 12,
      name: "Sony WH-1000XM4",
      price: "R 5,999",
      originalPrice: "R 6,999",
      description: "Premium noise-cancelling headphones",
      category: "Speakers",
      featured: true,
      image: "/images/bluetooth speakers/5cd59cb3e060820c6e0995ae-large.jpg"
    },
    {
      id: 13,
      name: "Bose SoundLink Revolve+",
      price: "R 4,499",
      description: "360-degree sound coverage",
      category: "Speakers",
      featured: true,
      image: "/images/bluetooth speakers/5ef31e2dac3e7d27e727ef26-large.jpg"
    },
    {
      id: 14,
      name: "Ultimate Ears BOOM 3",
      price: "R 2,999",
      description: "Waterproof portable speaker",
      category: "Speakers",
      featured: true,
      image: "/images/bluetooth speakers/5fe43686d9e0e2f0b4b428d0-large.jpg"
    },
    {
      id: 15,
      name: "Harman Kardon Onyx",
      price: "R 3,999",
      description: "Premium sound quality",
      category: "Speakers",
      featured: true,
      image: "/images/bluetooth speakers/5cd59cb3e060820c6e0995ae-large.jpg"
    },
    // Fashion
    {
      id: 16,
      name: "Elegant Evening Dress",
      price: "R 1,299",
      description: "Beautiful evening dress perfect for special occasions",
      category: "Fashion",
      featured: true,
      image: "/images/women clothes/5ddfadd5ba6475608a5a4670-large.webp"
    },
    {
      id: 17,
      name: "Summer Collection Dress",
      price: "R 999",
      description: "Light and comfortable summer dress",
      category: "Fashion",
      featured: true,
      image: "/images/women clothes/5e1d2a9414614805c3f90efa-large.webp"
    },
    {
      id: 18,
      name: "Casual Summer Shirt",
      price: "R 599",
      description: "Comfortable cotton summer shirt",
      category: "Fashion",
      featured: true,
      image: "/images/women clothes/5ec24681c54026401d9ebed2-normal.webp"
    },
    {
      id: 19,
      name: "Party Wear Collection",
      price: "R 1,799",
      originalPrice: "R 2,299",
      description: "Stunning party wear dress",
      category: "Fashion",
      featured: true,
      image: "/images/women clothes/5f52faa37a7e49003becc8f4-large.webp"
    },
    {
      id: 20,
      name: "Valentine's Special Dress",
      price: "R 1,499",
      originalPrice: "R 1,999",
      description: "Special edition Valentine's dress",
      category: "Fashion",
      featured: true,
      image: "/images/women clothes/5ddfadd5ba6475608a5a4670-large.webp"
    },
    // Earpods
    {
      id: 21,
      name: "Apple AirPods Pro",
      price: "R 4,999",
      description: "Active Noise Cancellation, Transparency mode",
      category: "Earpods",
      featured: true,
      image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
    },
    {
      id: 22,
      name: "Samsung Galaxy Buds2 Pro",
      price: "R 3,999",
      description: "24bit Hi-Fi sound, Active Noise Cancellation",
      category: "Earpods",
      featured: true,
      image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
    },
    {
      id: 23,
      name: "Bose QuietComfort Earbuds",
      price: "R 4,499",
      description: "Premium noise-cancelling earbuds",
      category: "Earpods",
      featured: true,
      image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
    },
    {
      id: 24,
      name: "Sony WF-1000XM4",
      price: "R 4,299",
      description: "Industry-leading noise cancellation",
      category: "Earpods",
      featured: true,
      image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
    },
    {
      id: 25,
      name: "Google Pixel Buds Pro",
      price: "R 3,799",
      description: "Premium Google earbuds with ANC",
      category: "Earpods",
      featured: true,
      image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
    }
  ],
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer; 