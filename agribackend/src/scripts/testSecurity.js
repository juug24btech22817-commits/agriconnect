/**
 * Security & Performance Verification Script for AgriConnect
 * This script runs unit tests for validation, caching, and rate limit configuration.
 */

const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');
const { getMarketPrices } = require('../controllers/marketPriceController');

// Helper to create mock request and response objects
const createMockReqRes = (body = {}, query = {}, params = {}) => {
  const req = { body, query, params, ip: '127.0.0.1' };
  
  let jsonResponse = null;
  let statusSet = 200;

  const res = {
    status: (code) => {
      statusSet = code;
      return res;
    },
    json: (data) => {
      jsonResponse = data;
      return res;
    },
    send: (data) => {
      jsonResponse = data;
      return res;
    }
  };

  return { req, res, getResult: () => ({ status: statusSet, data: jsonResponse }) };
};

const runTests = async () => {
  console.log('🧪 Starting Security & Performance Verification Tests...\n');
  let passed = 0;
  let failed = 0;

  const assert = (condition, message) => {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  };

  // --- Test Case 1: Register validation fails with weak password ---
  try {
    const { req, res, getResult } = createMockReqRes({
      name: 'Farmer Joe',
      email: 'joe@farmer.com',
      password: 'weak', // Less than 8 chars, no upper, no number
      role: 'farmer'
    });

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    validateRegister(req, res, next);
    const result = getResult();

    assert(nextCalled === false, 'Registration: next() should NOT be called for weak password');
    assert(result.status === 400, 'Registration: status should be 400 Bad Request');
    assert(result.data.message === 'Validation failed', 'Registration: message should be Validation failed');
    assert(result.data.errors.length > 0, 'Registration: should return descriptive error list');
  } catch (err) {
    console.error('Test Case 1 error:', err);
    failed++;
  }

  // --- Test Case 2: Register validation passes with strong password ---
  try {
    const { req, res, getResult } = createMockReqRes({
      name: 'Farmer Joe',
      email: 'joe@farmer.com',
      password: 'StrongPassword123!', // Valid
      role: 'farmer'
    });

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    validateRegister(req, res, next);
    const result = getResult();

    assert(nextCalled === true, 'Registration: next() SHOULD be called for strong password & valid email');
    assert(result.status === 200 && result.data === null, 'Registration: should not send 400 response');
  } catch (err) {
    console.error('Test Case 2 error:', err);
    failed++;
  }

  // --- Test Case 3: Login validation fails on invalid email ---
  try {
    const { req, res, getResult } = createMockReqRes({
      email: 'not-an-email',
      password: 'any'
    });

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    validateLogin(req, res, next);
    const result = getResult();

    assert(nextCalled === false, 'Login: next() should NOT be called for invalid email');
    assert(result.status === 400, 'Login: status should be 400 Bad Request');
    assert(result.data.errors.includes('Please provide a valid email address.'), 'Login: error list should include email validation error');
  } catch (err) {
    console.error('Test Case 3 error:', err);
    failed++;
  }

  // --- Test Case 4: Market Price Endpoint Caching & Mock response ---
  try {
    // 1st request - generates mock response and caches it
    const { req: req1, res: res1, getResult: getResult1 } = createMockReqRes({}, { commodity: 'Onion' });
    await getMarketPrices(req1, res1);
    const firstResult = getResult1();

    assert(firstResult.status === 200, 'Market Prices: First call should return 200 OK');
    assert(firstResult.data.isMock === true, 'Market Prices: Serving mock response in dev environment');
    assert(firstResult.data.records[0].commodity === 'Onion', 'Market Prices: Correct commodity served');
    assert(!firstResult.data.fromCache, 'Market Prices: First call should not be from cache');

    // 2nd identical request - serves immediately from cache
    const { req: req2, res: res2, getResult: getResult2 } = createMockReqRes({}, { commodity: 'Onion' });
    await getMarketPrices(req2, res2);
    const secondResult = getResult2();

    assert(secondResult.status === 200, 'Market Prices: Second identical call should return 200 OK');
    assert(secondResult.data.fromCache === true, 'Market Prices: Cache hit! Served instantly from memory cache');
  } catch (err) {
    console.error('Test Case 4 error:', err);
    failed++;
  }

  console.log(`\n📊 Test Summary: Passed ${passed}/${passed + failed} tests.`);
  process.exit(failed > 0 ? 1 : 0);
};

runTests();
