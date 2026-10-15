/* Use only Instagram's official embed. The original link works without JS. */
(() => {
 'use strict';

 const section = document.getElementById('instagram');
 if (!section) return;

 let requested = false;
 const loadEmbed = () => {
  if (requested) return;
  requested = true;

  const processEmbed = () => {
   if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
   }
  };

  if (window.instgrm && window.instgrm.Embeds) {
   processEmbed();
   return;
  }

  const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
  if (existing) {
   existing.addEventListener('load', processEmbed, { once: true });
   return;
  }

  const script = document.createElement('script');
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  script.addEventListener('load', processEmbed, { once: true });
  // If Instagram is unavailable, keep the native linked blockquote unchanged.
  document.body.appendChild(script);
 };

 if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
   if (!entries.some(entry => entry.isIntersecting)) return;
   observer.disconnect();
   loadEmbed();
  }, { rootMargin: '240px 0px' });
  observer.observe(section);
 } else {
  loadEmbed();
 }
})();
