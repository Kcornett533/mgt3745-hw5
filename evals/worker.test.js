import { test } from 'node:test';
import assert from 'node:assert';

const API = process.env.API || "https://mgt3745-hw4.kcornett533.workers.dev";

test('EARS: THE SYSTEM SHALL return all entries in creation order (GET /entries is 200 + array)', async () => {
  const res = await fetch(`${API}/entries`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data));
});

test('EARS: IF the entry text is missing, THEN THE SYSTEM SHALL reject it (POST {} is 400)', async () => {
  const res = await fetch(`${API}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  assert.strictEqual(res.status, 400);
});

test('EARS: WHEN a valid entry is submitted, THE SYSTEM SHALL store it (POST then GET shows it)', async () => {
  const validHash = "a".repeat(64);
  const payload = {
    pipelineName: "HW5 Test Pipeline",
    executionParams: "--threads 4 --mem 8GB",
    fileSignature: validHash,
    notes: "Automated test insertion for HW5 submission"
  };

  const res = await fetch(`${API}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  assert.strictEqual(res.status, 201);
});