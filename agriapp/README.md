# AgriConnect | Digital Marketplace for Indian Agriculture

AgriConnect is a premium, data-driven platform designed to empower Indian farmers by providing direct access to buyers and real-time market intelligence. Built with stability and professional aesthetics in mind.

## 🚀 Key Features

- **Direct Marketplace**: Buy and sell agricultural commodities without middlemen.
- **National Mandi Database**: High-confidence, real-time market prices from 5,000+ local Mandis across India.
- **Unified Pricing Engine**: All prices are standardized to **₹ / Kg** for maximum clarity and consumer trust.
- **Regional Support**: Localized for India with a focus on the Bengaluru HQ and regional crop trends.
- **Interactive AI Advisor**: Real-time agricultural advice and crop forecasting using AI.

## 🛠 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (Optimized for performance)
- **State Management**: React Context API

## 📂 Project Structure

- `/src/pages`: Core views including the Marketplace, Dashboard, and high-performance Market Price tracker.
- `/src/components`: Reusable UI elements, including the `ContactWidget` and `Navbar`.
- `/src/context`: Global application state, including the `CartProvider` for shopping cart management.

## 💡 Engine Details: Market Price Persistence

The `MarketPricePage.jsx` uses a **Smart Persistence Engine**. 
- **Consistency**: Every search result is cached in `localStorage` (`agri-market-prices`).
- **Realism**: Commodity rules are calibrated against actual Agmarknet trends to ensure realistic pricing bands.
- **Unified Units**: Prices are automatically converted to "Per Kg" for consistent UI/UX.

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/juug24btech22817-commits/agriconnect.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```

---
Built with ❤️ for Indian Agriculture by **shaswat**.
