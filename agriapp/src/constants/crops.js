export const initialCropsData = [
    { 
        id: 101, name: 'Farmer’s Choice Box (Small)', category: 'Subscription', price: '₹499', unit: 'box', 
        farmer: 'AgriConnect Curated', location: 'Multiple Farms', rating: '4.9', 
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1000',
        mandiPrice: '₹350', retailPrice: '₹650',
        nutrition: {
            calories: 'Varies',
            vitamins: ['Vitamin A', 'Vitamin C', 'K'],
            minerals: ['Iron', 'Potassium'],
            healthBenefit: 'Complete Daily Nutrition'
        },
        qualityMetrics: {
            purity: '100% Organic',
            freshnessScore: '9.8/10',
            organicCert: 'AgriConnect Gold'
        },
        harvestDetails: {
            date: '24h ago',
            soilType: 'Mixed Organic',
            waterSource: 'Rainwater Harvested'
        },
        farmerDetails: {
            phone: '+91 00000 00000',
            bio: 'A curated mix of 5kg seasonal vegetables, harvested fresh from local organic farms.',
            verified: true,
            experience: 'Curated by Experts',
            farmName: 'AgriConnect Hub'
        }
    },
    { 
        id: 1, name: 'Alphonso Mangoes', category: 'Fruits', price: '₹800', unit: 'kg', 
        farmer: 'Ramesh Rao', location: 'Ratnagiri, Maharashtra', rating: '5.0', 
        image: '/images/crops/alphonso_mangoes_1773328054659.png',
        mandiPrice: '₹550', retailPrice: '₹1200',
        nutrition: {
            calories: '60 kcal/100g',
            vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin E'],
            minerals: ['Magnesium', 'Potassium'],
            healthBenefit: 'Immune System Support'
        },
        qualityMetrics: {
            purity: '99.5%',
            freshnessScore: '9.9/10',
            organicCert: 'NPOP India'
        },
        harvestDetails: {
            date: 'April 9, 2026',
            soilType: 'Laterite',
            waterSource: 'Borewell'
        },
        farmerDetails: {
            phone: '+91 98765 43210',
            bio: 'Traditional mango cultivator for 3 generations. Uses organic organic ripening methods.',
            verified: true,
            experience: '25 years',
            farmName: 'Ratnagiri Estates'
        }
    },
    { 
        id: 2, name: 'Basmati Rice (Organic)', category: 'Grains', price: '₹120', unit: 'kg', 
        farmer: 'Gurdeep Singh', location: 'Amritsar, Punjab', rating: '4.9', 
        image: '/images/crops/basmati_rice_organic_1773328180216.png',
        mandiPrice: '₹85', retailPrice: '₹180',
        nutrition: {
            calories: '350 kcal/100g',
            vitamins: ['Thiamin', 'Niacin'],
            minerals: ['Manganese', 'Selenium'],
            healthBenefit: 'Energy Booster'
        },
        qualityMetrics: {
            purity: '100% Pure',
            freshnessScore: '9.5/10',
            organicCert: 'PGS-India Organic'
        },
        harvestDetails: {
            date: 'October 2025',
            soilType: 'Alluvial',
            waterSource: 'Canal Irrigation'
        },
        farmerDetails: {
            phone: '+91 87654 32109',
            bio: 'Specialist in organic Basmati cultivation. Focused on soil health and sustainability.',
            verified: true,
            experience: '15 years',
            farmName: 'Punjab Harvest'
        }
    },
    { 
        id: 3, name: 'Fresh Tomatoes', category: 'Vegetables', price: '₹40', unit: 'kg', 
        farmer: 'Venkatesh K.', location: 'Kolar, Karnataka', rating: '4.8', 
        image: '/images/crops/fresh_tomatoes_1773328278118.png',
        mandiPrice: '₹22', retailPrice: '₹65',
        nutrition: {
            calories: '18 kcal/100g',
            vitamins: ['Lycopenc', 'Vitamin C'],
            minerals: ['Potassium', 'Folate'],
            healthBenefit: 'Heart Health'
        },
        qualityMetrics: {
            purity: '99.0%',
            freshnessScore: '9.7/10',
            organicCert: 'Farm Fresh Certified'
        },
        harvestDetails: {
            date: 'April 10, 2026',
            soilType: 'Red Soil',
            waterSource: 'Drip Irrigation'
        },
        farmerDetails: {
            phone: '+91 76543 21098',
            bio: 'Passionate vegetable grower using drip irrigation for water conservation.',
            verified: true,
            experience: '8 years',
            farmName: 'Golden Fields'
        }
    },
    { 
        id: 4, name: 'Organic Carrots', category: 'Vegetables', price: '₹50', unit: 'kg', 
        farmer: 'Anjali Devi', location: 'Ooty, Tamil Nadu', rating: '4.7', 
        image: '/images/crops/organic_carrots_bunch_fresh_premium_1773328341539.png',
        mandiPrice: '₹30', retailPrice: '₹85',
        nutrition: {
            calories: '41 kcal/100g',
            vitamins: ['Beta-Carotene', 'Vitamin K1'],
            minerals: ['Potassium', 'Biotin'],
            healthBenefit: 'Eye Health Support'
        },
        qualityMetrics: {
            purity: '100% Chemical Free',
            freshnessScore: '9.6/10',
            organicCert: 'USDA Organic (Equivalent)'
        },
        harvestDetails: {
            date: 'April 8, 2026',
            soilType: 'Peaty Hill Soil',
            waterSource: 'Spring Water'
        },
        farmerDetails: {
            phone: '+91 65432 10987',
            bio: 'Cultivating high-altitude root vegetables without synthetic pesticides.',
            verified: true,
            experience: '12 years',
            farmName: 'Nilgiri Farms'
        }
    },
    { 
        id: 5, name: 'Nagpur Oranges', category: 'Fruits', price: '₹60', unit: 'kg', 
        farmer: 'Sanjay Deshmukh', location: 'Nagpur, Maharashtra', rating: '4.8', 
        image: '/images/crops/nagpur_oranges.png',
        mandiPrice: '₹42', retailPrice: '₹95',
        nutrition: {
            calories: '47 kcal/100g',
            vitamins: ['Vitamin C', 'Folate'],
            minerals: ['Calcium', 'Potassium'],
            healthBenefit: 'Immunity & Hydration'
        },
        qualityMetrics: {
            purity: '98.5%',
            freshnessScore: '9.4/10',
            organicCert: 'GlobalG.A.P'
        },
        harvestDetails: {
            date: 'April 7, 2026',
            soilType: 'Black Soil',
            waterSource: 'River Water'
        },
        farmerDetails: {
            phone: '+91 54321 09876',
            bio: 'Specializing in GI-tagged Nagpur Santra. 100% natural and juicy.',
            verified: true,
            experience: '20 years',
            farmName: 'Orange Valley'
        }
    },
    { 
        id: 6, name: 'Nanjangud Banana', category: 'Fruits', price: '₹45', unit: 'dozen', 
        farmer: 'Shivanna M.', location: 'Mysuru, Karnataka', rating: '4.9', 
        image: '/images/crops/nanjangud_banana.png',
        mandiPrice: '₹28', retailPrice: '₹70',
        nutrition: {
            calories: '89 kcal/100g',
            vitamins: ['Vitamin B6', 'Vitamin C'],
            minerals: ['Potassium', 'Magnesium'],
            healthBenefit: 'Quick Energy'
        },
        qualityMetrics: {
            purity: '100% Heirloom',
            freshnessScore: '9.8/10',
            organicCert: 'GI Tag Protected'
        },
        harvestDetails: {
            date: 'April 9, 2026',
            soilType: 'Red Loam',
            waterSource: 'Kaveri River Canal'
        },
        farmerDetails: {
            phone: '+91 43210 98765',
            bio: 'Preserving the unique flavor of the protected Nanjangud Rasabale banana.',
            verified: true,
            experience: '30 years',
            farmName: 'Heritage Groves'
        }
    },
    { 
        id: 7, name: 'Organic Potatoes', category: 'Vegetables', price: '₹30', unit: 'kg', 
        farmer: 'Lokesh Gowda', location: 'Hassan, Karnataka', rating: '4.6', 
        image: '/images/crops/fresh_potatoes_organic.png',
        mandiPrice: '₹18', retailPrice: '₹50',
        nutrition: {
            calories: '77 kcal/100g',
            vitamins: ['Vitamin C', 'Vitamin B6'],
            minerals: ['Potassium', 'Fiber'],
            healthBenefit: 'Brain Health'
        },
        qualityMetrics: {
            purity: '95% Organic',
            freshnessScore: '9.2/10',
            organicCert: 'Local Farm Certified'
        },
        harvestDetails: {
            date: 'April 6, 2026',
            soilType: 'Alluvial',
            waterSource: 'Groundwater'
        },
        farmerDetails: {
            phone: '+91 32109 87654',
            bio: 'Bulk producer of high-starch organic potatoes. Preferred for high-end restaurants.',
            verified: true,
            experience: '10 years',
            farmName: 'Hassan Greens'
        }
    },
    { 
        id: 8, name: 'Red Onions', category: 'Vegetables', price: '₹35', unit: 'kg', 
        farmer: 'Prakash Patil', location: 'Nasik, Maharashtra', rating: '4.7', 
        image: '/images/crops/red_onions.png',
        mandiPrice: '₹20', retailPrice: '₹60',
        nutrition: {
            calories: '40 kcal/100g',
            vitamins: ['Vitamin C', 'Vitamin B6'],
            minerals: ['Manganese', 'Folate'],
            healthBenefit: 'Anti-Inflammatory'
        },
        qualityMetrics: {
            purity: '98.0%',
            freshnessScore: '9.5/10',
            organicCert: 'Market Standard'
        },
        harvestDetails: {
            date: 'April 5, 2026',
            soilType: 'Black Cotton Soil',
            waterSource: 'Well Water'
        },
        farmerDetails: {
            phone: '+91 21098 76543',
            bio: 'Leading supplier of export-quality Nasik onions. Long shelf-life guaranteed.',
            verified: true,
            experience: '22 years',
            farmName: 'Patil Agri'
        }
    },
    { 
        id: 9, name: 'Finger Millet (Ragi)', category: 'Grains', price: '₹55', unit: 'kg', 
        farmer: 'Mala Hegde', location: 'Mandya, Karnataka', rating: '4.9', 
        image: '/images/crops/finger_millet_ragi.png',
        mandiPrice: '₹38', retailPrice: '₹90',
        nutrition: {
            calories: '328 kcal/100g',
            vitamins: ['Thiamine', 'Riboflavin'],
            minerals: ['Calcium', 'Iron'],
            healthBenefit: 'Bone Health Support'
        },
        qualityMetrics: {
            purity: '100% Traditional',
            freshnessScore: '9.7/10',
            organicCert: 'Karanataka Organic'
        },
        harvestDetails: {
            date: 'March 2026',
            soilType: 'Red Soil',
            waterSource: 'Rain-fed'
        },
        farmerDetails: {
            phone: '+91 10987 65432',
            bio: 'Empowering local women cooperatives to produce stone-ground organic ragi.',
            verified: true,
            experience: '18 years',
            farmName: 'Shakti Cooperatives'
        }
    },
    { 
        id: 10, name: 'Red Beetroot', category: 'Vegetables', price: '₹40', unit: 'kg', 
        farmer: 'Ravi Kumar', location: 'Ooty, Tamil Nadu', rating: '4.8', 
        image: '/images/crops/red_beetroot_fresh_premium_1773328361352.png',
        mandiPrice: '₹25', retailPrice: '₹75',
        nutrition: {
            calories: '43 kcal/100g',
            vitamins: ['Folate', 'Vitamin C'],
            minerals: ['Manganese', 'Potassium'],
            healthBenefit: 'Blood Pressure Control'
        },
        qualityMetrics: {
            purity: '99.2%',
            freshnessScore: '9.8/10',
            organicCert: 'Hillside Certified'
        },
        harvestDetails: {
            date: 'April 9, 2026',
            soilType: 'Loamy Hill Soil',
            waterSource: 'Spring'
        },
        farmerDetails: {
            phone: '+91 99887 76655',
            bio: 'Premium root vegetables grown in the rich volcanic soil of the Nilgiris.',
            verified: true,
            experience: '14 years',
            farmName: 'Hillside Harvest'
        }
    },
    { 
        id: 11, name: 'Round Brinjal', category: 'Vegetables', price: '₹30', unit: 'kg', 
        farmer: 'Irfan Khan', location: 'Belagavi, Karnataka', rating: '4.5', 
        image: '/images/crops/round_brinjal_eggplant_premium_shot_1773328572152.png',
        mandiPrice: '₹15', retailPrice: '₹55',
        nutrition: {
            calories: '25 kcal/100g',
            vitamins: ['Vitamin C', 'Vitamin K'],
            minerals: ['Folate', 'Potassium'],
            healthBenefit: 'Digestive Health'
        },
        qualityMetrics: {
            purity: '94.0%',
            freshnessScore: '9.0/10',
            organicCert: 'Farmer Direct'
        },
        harvestDetails: {
            date: 'April 10, 2026',
            soilType: 'Alluvial',
            waterSource: 'Canal'
        },
        farmerDetails: {
            phone: '+91 88776 65544',
            bio: 'Specializing in traditional Gulla-style brinjals with zero pesticide residue.',
            verified: true,
            experience: '9 years',
            farmName: 'Khan Organic'
        }
    },
    { 
        id: 12, name: 'Red Chilli (Dry)', category: 'Grains', price: '₹180', unit: 'kg', 
        farmer: 'Subba Rao', location: 'Guntur, Andhra Pradesh', rating: '4.9', 
        image: '/images/crops/red_chilli.png',
        mandiPrice: '₹130', retailPrice: '₹280',
        nutrition: {
            calories: '40 kcal/10g',
            vitamins: ['Vitamin A', 'Vitamin C'],
            minerals: ['Capsaicin', 'Copper'],
            healthBenefit: 'Metabolism Booster'
        },
        qualityMetrics: {
            purity: '100% Sun Dried',
            freshnessScore: '9.9/10',
            organicCert: 'Export Grade A'
        },
        harvestDetails: {
            date: 'February 2026',
            soilType: 'Black Soil',
            waterSource: 'Delta Canal'
        },
        farmerDetails: {
            phone: '+91 77665 54433',
            bio: 'Manufacturer of the world-famous Guntur Sannam chillies. Direct from farm.',
            verified: true,
            experience: '28 years',
            farmName: 'Guntur Spice'
        }
    },
    { 
        id: 13, name: 'Crisp Cucumber', category: 'Vegetables', price: '₹25', unit: 'kg', 
        farmer: 'Deepak More', location: 'Pune, Maharashtra', rating: '4.6', 
        image: '/images/crops/crisp_cucumber.png',
        mandiPrice: '₹12', retailPrice: '₹45',
        nutrition: {
            calories: '15 kcal/100g',
            vitamins: ['Vitamin K', 'Vitamin C'],
            minerals: ['Magnesium', 'Potassium'],
            healthBenefit: 'Premium Hydration'
        },
        qualityMetrics: {
            purity: '99.9% Hydroponic',
            freshnessScore: '10/10',
            organicCert: 'AgriTech Certified'
        },
        harvestDetails: {
            date: 'April 11, 2026',
            soilType: 'Hydroponic Medium',
            waterSource: 'Recycled Filtered Water'
        },
        farmerDetails: {
            phone: '+91 66554 43322',
            bio: 'Greenhouse-grown hydroponic cucumbers. Extra crunchy and seedless.',
            verified: true,
            experience: '6 years',
            farmName: 'Pune Hydro'
        }
    },
    { 
        id: 14, name: 'Samba Masuri Rice', category: 'Grains', price: '₹75', unit: 'kg', 
        farmer: 'Venkat Reddy', location: 'Nellore, Andhra Pradesh', rating: '4.8', 
        image: '/images/crops/samba_masuri_rice.png',
        mandiPrice: '₹55', retailPrice: '₹110',
        nutrition: {
            calories: '348 kcal/100g',
            vitamins: ['Vitamin B1', 'B3'],
            minerals: ['Carbohydrates', 'Zinc'],
            healthBenefit: 'Slow-Release Energy'
        },
        qualityMetrics: {
            purity: '98.5%',
            freshnessScore: '9.6/10',
            organicCert: 'Nellore Standard'
        },
        harvestDetails: {
            date: 'January 2026',
            soilType: 'Riverine Alluvial',
            waterSource: 'Krishna River'
        },
        farmerDetails: {
            phone: '+91 55443 32211',
            bio: 'Cultivating the finest fine-grain Samba Masuri in the Krishna delta.',
            verified: true,
            experience: '35 years',
            farmName: 'Nellore Pride'
        }
    },
    { 
        id: 15, name: 'Fresh Ridge Gourd', category: 'Vegetables', price: '₹35', unit: 'kg', 
        farmer: 'Basavaraj S.', location: 'Hubli, Karnataka', rating: '4.7', 
        image: '/images/crops/fresh_ridge_gourd.png',
        mandiPrice: '₹20', retailPrice: '₹65',
        nutrition: {
            calories: '15 kcal/100g',
            vitamins: ['Vitamin C', 'Vitamin A'],
            minerals: ['Dietary Fiber', 'Iron'],
            healthBenefit: 'Detoxifying'
        },
        qualityMetrics: {
            purity: '96.0%',
            freshnessScore: '9.3/10',
            organicCert: 'Local Fresh'
        },
        harvestDetails: {
            date: 'April 10, 2026',
            soilType: 'Black Soil',
            waterSource: 'Borewell'
        },
        farmerDetails: {
            phone: '+91 44332 21100',
            bio: 'Naturally grown ridge gourd. Tender and rich in fiber.',
            verified: true,
            experience: '11 years',
            farmName: 'Hubli Harvest'
        }
    },
    { 
        id: 16, name: 'Pure Cow Ghee', category: 'Dairy', price: '₹750', unit: 'kg', 
        farmer: 'Desi Dairy Farm', location: 'Aarey Colony, Mumbai', rating: '4.9', 
        image: '/images/crops/pure_cow_ghee.png',
        mandiPrice: '₹550', retailPrice: '₹950',
        nutrition: {
            calories: '900 kcal/100g',
            vitamins: ['Vitamin A', 'Vitamin D', 'E', 'K'],
            minerals: ['Butyric Acid', 'Omega 3'],
            healthBenefit: 'Gut & Brain Health'
        },
        qualityMetrics: {
            purity: '100% A2 Ghee',
            freshnessScore: '9.9/10',
            organicCert: 'A2 Certified'
        },
        harvestDetails: {
            date: 'Batch Mar 2026',
            soilType: 'N/A (Pasture-fed)',
            waterSource: 'Purified Water for Cows'
        },
        farmerDetails: {
            phone: '+91 33221 10099',
            bio: 'Traditional wood-churned A2 ghee made from grass-fed Gir cows.',
            verified: true,
            experience: '12 years',
            farmName: 'Desi Amrit'
        }
    },
    { 
        id: 17, name: 'Chikkamagaluru Arabica', category: 'Grains', price: '₹550', unit: 'kg', 
        farmer: 'Baba Budangiri Estates', location: 'Chikkamagaluru, Karnataka', rating: '4.9', 
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop', 
        mandiPrice: '₹380', retailPrice: '₹750',
        nutrition: {
            calories: 'Low',
            vitamins: ['Antioxidants'],
            minerals: ['Caffeine', 'Diterpenes'],
            healthBenefit: 'Mental Alacrity'
        },
        qualityMetrics: {
            purity: 'Single Origin',
            freshnessScore: '9.8/10',
            organicCert: 'Rainforest Alliance'
        },
        harvestDetails: {
            date: 'Feb 2026',
            soilType: 'Volcanic Red',
            waterSource: 'Spring'
        },
        farmerDetails: {
            phone: '+91 22110 09988',
            bio: 'Single-origin Arabica beans shade-grown at 3500ft.',
            verified: true,
            experience: '40 years',
            farmName: 'Baba Budangiri'
        }
    },
    { 
        id: 18, name: 'Fresh Green Apple', category: 'Fruits', price: '₹150', unit: 'kg', 
        farmer: 'Shimla Orchards', location: 'Shimla, Himachal Pradesh', rating: '4.8', 
        image: '/images/crops/fresh_green_apple.png', 
        mandiPrice: '₹100', retailPrice: '₹200',
        nutrition: {
            calories: '52 kcal/100g',
            vitamins: ['Vitamin C', 'K'],
            minerals: ['Fiber', 'Potassium'],
            healthBenefit: 'Low Glycemic Index'
        },
        qualityMetrics: {
            purity: '99.0%',
            freshnessScore: '9.6/10',
            organicCert: 'HP Agri Certified'
        },
        harvestDetails: {
            date: 'April 7, 2026',
            soilType: 'Mountain Soil',
            waterSource: 'Snow Melt'
        },
        farmerDetails: {
            phone: '+91 11223 34455',
            bio: 'Crisp and sweet green apples straight from the hills of Shimla.',
            verified: true,
            experience: '15 years',
            farmName: 'Himalayan Harvests'
        }
    },
    { 
        id: 19, name: 'Organic Garlic', category: 'Vegetables', price: '₹180', unit: 'kg', 
        farmer: 'Sunil Kulkarni', location: 'Nashik, Maharashtra', rating: '4.9', 
        image: '/images/crops/garlic_in_bowl.png',
        mandiPrice: '₹120', retailPrice: '₹250',
        nutrition: {
            calories: '149 kcal/100g',
            vitamins: ['Vitamin C', 'B6'],
            minerals: ['Allicin', 'Selenium', 'Manganese'],
            healthBenefit: 'Immunity & Cardiovascular'
        },
        qualityMetrics: {
            purity: '100% Organic',
            freshnessScore: '9.9/10',
            organicCert: 'NABL Tested'
        },
        harvestDetails: {
            date: 'March 2026',
            soilType: 'Red Soil',
            waterSource: 'Drip'
        },
        farmerDetails: {
            phone: '+91 91234 56789',
            bio: 'Premium organic garlic grown using traditional methods. High potency and rich flavor.',
            verified: true,
            experience: '15 years',
            farmName: 'Kulkarni Organic'
        }
    },
    { 
        id: 20, name: 'Fresh Sugarcane', category: 'Vegetables', price: '₹40', unit: 'bundle', 
        farmer: 'Vikas Deshmukh', location: 'Kolhapur, Maharashtra', rating: '4.8', 
        image: '/images/crops/fresh_sugarcane.png',
        mandiPrice: '₹25', retailPrice: '₹60',
        nutrition: {
            calories: '269 kcal/kg',
            vitamins: ['Riboflavin', 'Niacin', 'B6'],
            minerals: ['Calcium', 'Magnesium', 'Iron'],
            healthBenefit: 'Natural Electrolytes'
        },
        qualityMetrics: {
            purity: 'Untreated',
            freshnessScore: '9.5/10',
            organicCert: 'Farmer Verified'
        },
        harvestDetails: {
            date: 'April 10, 2026',
            soilType: 'Heavy Clay-Loam',
            waterSource: 'Dam Canal'
        },
        farmerDetails: {
            phone: '+91 90000 11111',
            bio: 'Expert in high-yield sugarcane cultivation. Focused on traditional and sustainable farming.',
            verified: true,
            experience: '18 years',
            farmName: 'Sugar Valley'
        }
    }
];
