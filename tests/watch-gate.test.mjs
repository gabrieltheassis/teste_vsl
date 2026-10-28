import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WatchGate } from '../watch-gate.js';

test('libera somente ao alcançar metade por reprodução contínua', () => {
  const gate = new WatchGate();
  for (let i = 0; i <= 199; i++) gate.sample(i / 4, i * 250, true);
  assert.ok(gate.percent(100) < 100);
  gate.sample(50, 50000, true);
  assert.equal(gate.percent(100), 100);
});
test('saltos, pausa e reprises não liberam progresso indevido', () => {
  const gate = new WatchGate();
  gate.sample(0, 0, true);
  gate.sample(.25, 250, true);
  gate.sample(50, 500, true);
  assert.equal(gate.frontier, .25);
  gate.reset();
  gate.sample(60, 1000, false);
  assert.equal(gate.frontier, .25);
  gate.sample(0, 2000, true);
  gate.sample(.25, 2250, true);
  assert.equal(gate.frontier, .25);
  assert.equal(gate.percent(NaN), 0);
});
