const axios = require('axios');

// In-memory cache with a 15-minute Time-To-Live (TTL)
const priceCache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const getCacheKey = (commodity, state, limit) => {
  return `${commodity || 'all'}_${state || 'all'}_${limit}`;
};

// @desc    Get live market prices from Agmarknet API
// @route   GET /api/market-prices
// @access  Public
const getMarketPrices = async (req, res) => {
  const { commodity, state, limit = 50 } = req.query;
  const apiKey = process.env.AGMARKNET_API_KEY;

  const cacheKey = getCacheKey(commodity, state, limit);
  const cached = priceCache.get(cacheKey);

  // If valid cache exists, return it immediately
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return res.json({
      ...cached.data,
      fromCache: true
    });
  }

  try {
    let url = `https://api.data.gov.in/resource/9ef2731d-a65a-4a31-adb9-ad830832d57c?api-key=${apiKey || 'dummy'}&format=json&limit=${limit}`;
    
    if (commodity) {
      url += `&filters[commodity]=${encodeURIComponent(commodity)}`;
    }
    if (state) {
      url += `&filters[state]=${encodeURIComponent(state)}`;
    }

    // If no API key, return a mock response
    if (!apiKey) {
      const mockResponse = {
        records: [
          {
            state: "Karnataka",
            district: "Kolar",
            market: "Kolar",
            commodity: commodity || "Tomato",
            variety: "Local",
            arrival_date: new Date().toLocaleDateString('en-GB'),
            min_price: "2000",
            max_price: "3000",
            modal_price: "2500"
          },
          {
            state: "Maharashtra",
            district: "Nashik",
            market: "Nashik",
            commodity: commodity || "Onion",
            variety: "Red",
            arrival_date: new Date().toLocaleDateString('en-GB'),
            min_price: "1500",
            max_price: "2200",
            modal_price: "1800"
          }
        ],
        total: 2,
        isMock: true
      };

      // Cache the mock response too for consistency in development
      priceCache.set(cacheKey, {
        timestamp: Date.now(),
        data: mockResponse
      });

      return res.json(mockResponse);
    }

    const response = await axios.get(url);

    // Save success response to cache
    priceCache.set(cacheKey, {
      timestamp: Date.now(),
      data: response.data
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch market prices', error: error.message });
  }
};

module.exports = { getMarketPrices };
