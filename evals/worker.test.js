import test from 'node:test';
import assert from 'node:assert/strict';

const API_URL = process.env.API;

if (!API_URL) {
  throw new Error('API environment variable is required. Example: API=https://your-worker.workers.dev npm test');
}

test('THE SYSTEM SHALL return all entries in creation order', async () => {
  const res = await fetch(`${API_URL}/entries`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data));
});

test('WHEN a valid entry is submitted, THE SYSTEM SHALL store it and confirm', async () => {
  const payload = {
    pipelineName: 'Test Pipeline',
    executionParams: 'batch_size=32',
    fileSignature: 'a'.repeat(64),
    notes: 'Unit test submission'
  };
  const res = await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  assert.equal(res.status, 201);
});

test('IF the entry text is missing, THEN THE SYSTEM SHALL reject it and say why', async () => {
  const res = await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  assert.equal(res.status, 400);
});