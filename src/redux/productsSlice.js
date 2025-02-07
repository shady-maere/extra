import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [
      {
        id: 1,
        name: "Elegant Evening Dress",
        price: "R 1,299",
        description: "Beautiful evening dress perfect for special occasions",
        category: "Fashion",
        featured: true,
        image: "/images/women clothes/5ddfadd5ba6475608a5a4670-large.webp"
      },
      {
        id: 2,
        name: "Summer Collection Dress",
        price: "R 999",
        description: "Light and comfortable summer dress",
        category: "Fashion",
        featured: true,
        image: "/images/women clothes/5e1d2a9414614805c3f90efa-large.webp"
      },
      {
        id: 3,
        name: "Casual Spring Dress",
        price: "R 899",
        description: "Perfect for spring and casual outings",
        category: "Fashion",
        featured: true,
        image: "/images/women clothes/5ec24681c54026401d9ebed2-normal.webp"
      },
      {
        id: 4,
        name: "Designer Party Wear",
        price: "R 1,499",
        description: "Stylish party wear for special events",
        category: "Fashion",
        featured: true,
        image: "/images/women clothes/5f52faa37a7e49003becc8f4-large.webp"
      },
      {
        id: 5,
        name: "Trendy Fashion Dress",
        price: "R 1,199",
        description: "Latest fashion trend for modern women",
        category: "Fashion",
        featured: true,
        image: "/images/women clothes/637c90c7f0f90a781695264a-large.webp"
      },
      {
        id: 6,
        name: "5KVA Solar Inverter",
        price: "R 4,999",
        description: "High-efficiency 5KVA solar inverter with MPPT charging",
        category: "Solar",
        featured: true,
        image: "/images/solar/5KVA-4000W-Inverter.png"
      },
      {
        id: 7,
        name: "5KW MPPT Solar Inverter",
        price: "R 5,999",
        description: "Professional grade 5KW solar inverter with MPPT technology",
        category: "Solar",
        featured: true,
        image: "/images/solar/5KW-Solar-Inverter-MPPT-450V-5KW-1000x1000.jpg"
      },
      {
        id: 8,
        name: "450W Solar Panel Kit",
        price: "R 2,499",
        description: "Complete 450W solar panel kit for home installation",
        category: "Solar",
        featured: true,
        image: "/images/solar/450W-Monocrystalline-Solar-Panels-for-Home-Use-Complete-Solarpower-System-Storage-Batteries-off-Grid-PV-Solar-Kit-Panels-Solar-Energy-Systems.avif"
      },
      {
        id: 9,
        name: "Premium Solar Panel",
        price: "R 1,999",
        description: "High-efficiency monocrystalline solar panel",
        category: "Solar",
        featured: true,
        image: "/images/solar/H24bb941a20c24624a8a11913ecb1e380f.jpg_960x960.webp"
      },
      {
        id: 10,
        name: "Solar Panel Basic",
        price: "R 1,499",
        description: "Entry-level solar panel for basic needs",
        category: "Solar",
        featured: false,
        image: "/images/solar/image.jpg"
      },
      {
        id: 11,
        name: "Pylontech Battery 3.6kWh",
        price: "R 8,999",
        description: "High-quality Pylontech lithium battery for solar storage",
        category: "Solar",
        featured: true,
        image: "/images/solar/lithium-battery-pylontech-us3000c-36kwh.jpg"
      },
      {
        id: 12,
        name: "Solar Battery Pack",
        price: "R 6,999",
        description: "Reliable solar battery storage solution",
        category: "Solar",
        featured: true,
        image: "/images/solar/Lithium-Ion-Batteries-Electric-Br-Solar-as-Carton-Power-Solar-Battery.avif"
      },
      {
        id: 13,
        name: "Professional Solar Panel",
        price: "R 2,999",
        description: "Professional grade solar panel for maximum efficiency",
        category: "Solar",
        featured: true,
        image: "/images/solar/main-image-635149b0591ba.jpg"
      },
      {
        id: 14,
        name: "High-Performance Solar Panel",
        price: "R 2,499",
        description: "High-performance solar panel for demanding applications",
        category: "Solar",
        featured: true,
        image: "/images/solar/solar-panel-3.jpg"
      },
      {
        id: 15,
        name: "JBL Flip Essential Bluetooth Speaker",
        price: "R 1,499",
        description: "Powerful JBL Pro Sound with deep bass, 10 hours of playtime, IPX7 waterproof design",
        category: "Speakers",
        featured: true,
        image: "/images/bluetooth speakers/5cd59cb3e060820c6e0995ae-large.jpg"
      },
      {
        id: 16,
        name: "Ultimate Ears BOOM 3 Portable Speaker",
        price: "R 2,499",
        description: "360° sound with deep bass, 15 hours of battery life, Magic Button for easy control",
        category: "Speakers",
        featured: true,
        image: "/images/bluetooth speakers/5cd59cb3e060820c6e0995ae-large.jpg"
      },
      {
        id: 17,
        name: "Sony Extra Bass Portable Speaker",
        price: "R 1,999",
        description: "Extra Bass™ for deep, punchy sound, 16 hours battery life, Water-resistant design",
        category: "Speakers",
        featured: true,
        image: "/images/bluetooth speakers/5ef31e2dac3e7d27e727ef26-large.jpg"
      },
      {
        id: 18,
        name: "Harman Kardon Onyx Studio Speaker",
        price: "R 3,499",
        description: "Premium sound quality, Elegant design, Built-in microphone for calls",
        category: "Speakers",
        featured: true,
        image: "/images/bluetooth speakers/5fe43686d9e0e2f0b4b428d0-large.jpg"
      },
      {
        id: 19,
        name: "iPhone 15 Pro Max",
        price: "R 24,999",
        description: "Latest iPhone with A17 Pro chip, 48MP camera system, and titanium design",
        category: "Phones",
        featured: true,
        image: "/images/phones/65abe962833d1992cf3338ae-large.webp"
      },
      {
        id: 20,
        name: "Samsung Galaxy S24 Ultra",
        price: "R 22,999",
        description: "Premium Android flagship with S Pen, AI features, and 200MP camera",
        category: "Phones",
        featured: true,
        image: "/images/phones/659e3b11a09797c2dab20d7f-large.webp"
      },
      {
        id: 21,
        name: "Google Pixel 8 Pro",
        price: "R 19,999",
        description: "Pure Android experience with advanced AI and exceptional camera capabilities",
        category: "Phones",
        featured: true,
        image: "/images/phones/648a0cd936b1809ff4cb7b09-large.webp"
      },
      {
        id: 22,
        name: "OnePlus 12",
        price: "R 17,999",
        description: "Flagship killer with Snapdragon 8 Gen 3 and 100W charging",
        category: "Phones",
        featured: true,
        image: "/images/phones/63ebea3fe3d32542315c1f64-large.webp"
      },
      {
        id: 23,
        name: "Xiaomi 14 Pro",
        price: "R 16,999",
        description: "Premium build with Leica optics and powerful performance",
        category: "Phones",
        featured: true,
        image: "/images/phones/63ebed664a5dc9be60aa1cd2-large.webp"
      },
      {
        id: 24,
        name: "5KVA 4000W Inverter",
        price: "R 4,999",
        description: "High-efficiency 5KVA 4000W solar inverter for reliable power conversion",
        category: "Solar",
        featured: false,
        image: "/images/solar/5KVA-4000W-Inverter.png"
      },
      {
        id: 25,
        name: "5KW Solar Inverter MPPT 450V",
        price: "R 5,999",
        description: "5KW Solar Inverter with MPPT 450V for optimal solar energy conversion",
        category: "Solar",
        featured: false,
        image: "/images/solar/5KW-Solar-Inverter-MPPT-450V-5KW-1000x1000.jpg"
      },
      {
        id: 26,
        name: "450W Monocrystalline Solar Panels",
        price: "R 1,499",
        description: "High-performance 450W Monocrystalline Solar Panels for efficient energy capture",
        category: "Solar",
        featured: false,
        image: "/images/solar/450W-Monocrystalline-Solar-Panels-for-Home-Use-Complete-Solarpower-System-Storage-Batteries-off-Grid-PV-Solar-Kit-Panels-Solar-Energy-Systems.avif"
      },
      {
        id: 27,
        name: "Solar Panel",
        price: "R 1,299",
        description: "Reliable solar panel for sustainable energy solutions",
        category: "Solar",
        featured: false,
        image: "/images/solar/H24bb941a20c24624a8a11913ecb1e380f.jpg_960x960.webp"
      },
      {
        id: 28,
        name: "Generic Solar Panel",
        price: "R 999",
        description: "Affordable generic solar panel for basic solar setups",
        category: "Solar",
        featured: false,
        image: "/images/solar/image.jpg"
      },
      {
        id: 29,
        name: "Lithium Battery Pylontech US3000C 3.6kWh",
        price: "R 8,999",
        description: "High-capacity Lithium Battery Pylontech US3000C 3.6kWh for energy storage",
        category: "Solar",
        featured: false,
        image: "/images/solar/lithium-battery-pylontech-us3000c-36kwh.jpg"
      },
      {
        id: 30,
        name: "Lithium-Ion Batteries Electric Br Solar",
        price: "R 7,999",
        description: "Efficient Lithium-Ion Batteries Electric Br Solar for solar power storage",
        category: "Solar",
        featured: false,
        image: "/images/solar/Lithium-Ion-Batteries-Electric-Br-Solar-as-Carton-Power-Solar-Battery.avif"
      },
      {
        id: 31,
        name: "Solar Panel Main Image",
        price: "R 1,199",
        description: "Main image solar panel for product display",
        category: "Solar",
        featured: false,
        image: "/images/solar/main-image-635149b0591ba.jpg"
      },
      {
        id: 32,
        name: "Solar Panel 3",
        price: "R 1,399",
        description: "Standard solar panel 3 for general use",
        category: "Solar",
        featured: false,
        image: "/images/solar/solar-panel-3.jpg"
      },
      {
        id: 33,
        name: "Unbranded Solar Panel",
        price: "R 899",
        description: "Unbranded solar panel for DIY projects",
        category: "Solar",
        featured: false,
        image: "/images/solar/未标题-1-1024x597.jpg"
      },
      {
        id: 34,
        name: "5KVA-4000W Inverter",
        price: "R 4,999",
        description: "High-efficiency 5KVA 4000W solar inverter for reliable power conversion",
        category: "Solar",
        featured: false,
        image: "/images/solar/5KVA-4000W-Inverter.png"
      },
      {
        id: 35,
        name: "Apple AirPods Pro (2nd Generation)",
        price: "R 4,999",
        description: "Active Noise Cancellation, Transparency mode, Spatial Audio with dynamic head tracking",
        category: "Earpods",
        featured: true,
        image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
      },
      {
        id: 36,
        name: "Samsung Galaxy Buds2 Pro",
        price: "R 3,999",
        description: "24bit Hi-Fi sound, Active Noise Cancellation, IPX7 water resistance",
        category: "Earpods",
        featured: true,
        image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
      },
      {
        id: 37,
        name: "Google Pixel Buds Pro",
        price: "R 3,499",
        description: "Active Noise Cancellation, up to 31 hours battery life, multipoint connectivity",
        category: "Earpods",
        featured: true,
        image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
      },
      {
        id: 38,
        name: "Sony WF-1000XM4",
        price: "R 4,499",
        description: "Industry-leading noise cancellation, exceptional sound quality, 8 hours battery life",
        category: "Earpods",
        featured: true,
        image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
      },
      {
        id: 39,
        name: "Jabra Elite 7 Pro",
        price: "R 2,999",
        description: "MultiSensor Voice technology, adjustable ANC, 30 hours total battery life",
        category: "Earpods",
        featured: true,
        image: "/images/earpods cover/63bcdee4e31e544099609df2-large.jpg"
      }
    ],
    loading: false,
    error: null
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  },
});

export const { setProducts, setCategories, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;
