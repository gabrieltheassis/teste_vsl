import { WatchGate } from './watch-gate.js';

const config = window.VSL_CONFIG || {};
const video = document.querySelector('#video');
const cover = document.querySelector('#cover');
const pause = document.querySelector('#pause');
const next = document.querySelector('#continue');
const status = document.querySelector('#status');
const hint = document.querySelector('#hint');
const progress = document.querySelector('#progress');
const bar = document.querySelector('[role="progressbar"]');
const gate = new WatchGate();
let unlocked = false;
video.src = config.videoSrc || 'media/video.mp4';
if (config.poster) video.poster = config.poster;

function render() {
  const percent = gate.percent(video.duration);
  progress.style.width = `${percent}%`;
  bar.setAttribute('aria-valuenow', String(Math.floor(percent)));
  if (percent >= 100) {
    unlocked = true;
    next.disabled = false;
    status.textContent = 'Pronto! Você já pode continuar';
    hint.textContent = 'Continue quando quiser';
  }
}
video.addEventListener('timeupdate', () => {
  if (video.seeking) return;
  gate.sample(video.currentTime, performance.now(), !video.paused && !document.hidden);
  render();
});
video.addEventListener('seeking', () => {
  if (video.currentTime > gate.frontier + 0.15) video.currentTime = gate.frontier;
  gate.reset();
});
video.addEventListener('ratechange', () => { if (video.playbackRate !== 1) video.playbackRate = 1; });
video.addEventListener('play', () => { gate.reset(); cover.hidden = true; pause.hidden = false; });
video.addEventListener('pause', () => { gate.reset(); cover.hidden = false; pause.hidden = true; });
video.addEventListener('ended', () => { render(); cover.hidden = false; pause.hidden = true; });
video.addEventListener('error', () => {
  status.textContent = 'Vídeo indisponível. Tente novamente em instantes.';
  hint.textContent = 'Não foi possível carregar o vídeo';
});
document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); gate.reset(); });
cover.addEventListener('click', async () => {
  try { video.muted = false; await video.play(); }
  catch { status.textContent = 'Não foi possível reproduzir. Verifique o vídeo e tente novamente.'; }
});
pause.addEventListener('click', () => video.pause());
next.addEventListener('click', () => {
  if (!unlocked) return;
  try {
    const url = new URL(config.nextUrl);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid destination');
    window.location.assign(url.href);
  } catch { status.textContent = 'O endereço da próxima etapa ainda não foi configurado.'; }
});
