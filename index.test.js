const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./api/index');

test('GET / returns package name and version', async () => {
  const server = app.listen(0);

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type')?.includes('application/json'), true);

    const body = await response.json();
    assert.equal(typeof body.name, 'string');
    assert.equal(typeof body.version, 'string');
    assert.ok(body.name.length > 0);
    assert.ok(body.version.length > 0);
  } finally {
    server.close();
  }
});

test('GET /hello returns expected payload', async () => {
  const server = app.listen(0);

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/hello`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type')?.includes('application/json'), true);

    const body = await response.json();
    assert.deepEqual(body, { message: 'Hello from centro-de-estudiantes-api!' });
  } finally {
    server.close();
  }
});

test('GET /api-docs is available', async () => {
  const server = app.listen(0);

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/api-docs`, {
      redirect: 'manual'
    });

    assert.ok([200, 301, 302].includes(response.status));
  } finally {
    server.close();
  }
});
