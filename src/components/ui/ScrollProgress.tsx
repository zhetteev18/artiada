export function ScrollProgress() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-ink/5"
      aria-hidden
    >
      <div
        className="scroll-progress-bar h-full bg-accent"
      />
      <style>{`
        @supports (animation-timeline: scroll()) {
          .scroll-progress-bar {
            width: 100%;
            transform-origin: left;
            animation: scroll-grow linear;
            animation-timeline: scroll();
          }
          @keyframes scroll-grow {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
        }
        @supports not (animation-timeline: scroll()) {
          .scroll-progress-bar {
            width: var(--scroll-pct, 0%);
            transition: width 100ms ease-out;
          }
        }
      `}</style>
      <ScrollFallback />
    </div>
  )
}

/** JS fallback for browsers without animation-timeline */
function ScrollFallback() {
  if (typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline', 'scroll()')) {
    return null
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(){
            var bar = document.querySelector('.scroll-progress-bar');
            if (!bar) return;
            var ticking = false;
            window.addEventListener('scroll', function() {
              if (!ticking) {
                requestAnimationFrame(function() {
                  var doc = document.documentElement;
                  var max = doc.scrollHeight - doc.clientHeight;
                  bar.style.setProperty('--scroll-pct', (max > 0 ? (doc.scrollTop / max) * 100 : 0) + '%');
                  ticking = false;
                });
                ticking = true;
              }
            }, { passive: true });
          })();
        `,
      }}
    />
  )
}
