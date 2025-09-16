// Simple test script to verify backend functionality
const http = require('http');

const tests = [
  {
    name: 'Health Check',
    path: '/api/health',
    method: 'GET'
  },
  {
    name: 'Valid Email Signup',
    path: '/api/waitlist',
    method: 'POST',
    body: JSON.stringify({ email: 'test@example.com' }),
    headers: { 'Content-Type': 'application/json' }
  },
  {
    name: 'Invalid Email Test',
    path: '/api/waitlist',
    method: 'POST',
    body: JSON.stringify({ email: 'invalid-email' }),
    headers: { 'Content-Type': 'application/json' }
  }
];

function runTest(test) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: test.path,
      method: test.method,
      headers: test.headers || {}
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          name: test.name,
          status: res.statusCode,
          response: data,
          passed: res.statusCode < 400
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        name: test.name,
        status: 'ERROR',
        response: err.message,
        passed: false
      });
    });

    if (test.body) {
      req.write(test.body);
    }
    req.end();
  });
}

async function runAllTests() {
  console.log('🧪 Testing Ctrl+C Backend API\n');

  for (const test of tests) {
    const result = await runTest(test);
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.name}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Response: ${result.response}\n`);
  }

  console.log('🎯 Tests complete! Make sure server is running on port 3000');
}

runAllTests();