/**
 * Site-wide motion helpers that work on plain markup, so components only
 * need a `data-reveal` attribute (or nothing at all, for images).
 *
 *  - Splash loader: fades out the static loader from index.html once the app is ready.
 *  - Images: shimmer placeholder while loading, fade-in on load (styles in index.css).
 *  - Scroll reveal: `[data-reveal]` elements animate in when they enter the viewport,
 *    staggered with their `[data-reveal]` siblings.
 *  - Scroll progress: thin brand-gradient bar at the top of the page.
 */

const MIN_SPLASH_MS = 700;
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 6;

function markImage(img: HTMLImageElement) {
  img.dataset.loaded = '';
}

function initImages() {
  // load/error don't bubble, so listen in the capture phase to catch every image.
  const onSettled = (e: Event) => {
    if (e.target instanceof HTMLImageElement) markImage(e.target);
  };
  document.addEventListener('load', onSettled, true);
  document.addEventListener('error', onSettled, true);
}

function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.documentElement.classList.add('no-reveal');
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute('data-reveal'))
          : [el];
        const step = Math.min(Math.max(siblings.indexOf(el), 0), MAX_STAGGER_STEPS);
        el.style.animationDelay = `${step * STAGGER_MS}ms`;
        el.dataset.revealed = '';
        io.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  const observe = (root: ParentNode) => {
    if (root instanceof HTMLElement && root.matches('[data-reveal]:not([data-revealed])')) {
      io.observe(root);
    }
    root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el));
    // Images that finished before our listeners saw them (e.g. from cache)
    root.querySelectorAll('img').forEach((img) => {
      if (img.complete) markImage(img);
    });
  };

  observe(document);
  // Pages are swapped in by React when the active tab changes — pick up new content.
  new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) observe(node);
      });
    }
  }).observe(document.body, { childList: true, subtree: true });
}

function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
}

function initSplash() {
  const loader = document.getElementById('app-loader');
  if (!loader) return;
  const started = performance.now();

  const hide = () => {
    const wait = Math.max(0, MIN_SPLASH_MS - (performance.now() - started));
    window.setTimeout(() => {
      loader.classList.add('is-hidden');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      // Fallback in case transitionend never fires (e.g. reduced motion)
      window.setTimeout(() => loader.remove(), 1200);
    }, wait);
  };

  if (document.readyState === 'complete') hide();
  else {
    window.addEventListener('load', hide, { once: true });
    // Never keep visitors waiting on slow images
    window.setTimeout(hide, 4000);
  }
}

export function initEffects() {
  initImages();
  initReveal();
  initScrollProgress();
  initSplash();
}
