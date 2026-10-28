// Conta somente novos trechos vistos em reprodução normal, sem somar reprises.
export class WatchGate {
  frontier = 0;
  previous = null;
  reset(time, now) { this.previous = Number.isFinite(time) ? { time, now } : null; }
  sample(time, now, playing) {
    const previous = this.previous;
    this.previous = playing ? { time, now } : null;
    if (!playing || !previous) return;
    const elapsed = (now - previous.now) / 1000;
    const delta = time - previous.time;
    if (elapsed > 0 && delta >= 0 && delta <= elapsed + .15 && previous.time <= this.frontier + .3) {
      this.frontier = Math.max(this.frontier, time);
    }
  }
  percent(duration) {
    return Number.isFinite(duration) && duration > 0 ? Math.min(100, this.frontier / (duration * .5) * 100) : 0;
  }
}
