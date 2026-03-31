const axios = require('axios');

// @desc    Get live market prices from Agmarknet API
// @route   GET /api/market-prices
// @access  Public
const getMarketPrices = async (req, res) => {
  const { commodity, state, limit = 50 } = req.query;
  const apiKey = process.env.AGMARKNET_API_KEY;

  try {
    let url = `https://api.data.gov.in/resource/9ef2731d-a65a-4a31-adb9-ad830832d57c?api-key=${apiKey || 'dummy'}&format=json&limit=${limit}`;
    
    if (commodity) {
      url += `&filters[commodity]=${encodeURIComponent(commodity)}`;
    }
    if (state) {
      url += `&filters[state]=${encodeURIComponent(state)}`;
    }

    // If no API key, return a mock response or try to fetch from data.gov.in (will fail without key)
    if (!apiKey) {
      // Return a simulated response for development if no API key is provided
      return res.json({
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
      });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch market prices', error: error.message });
  }
};

module.exports = { getMarketPrices };
