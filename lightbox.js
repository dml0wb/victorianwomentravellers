// Lightbox: click any painting (or focus it and press Enter/Space) to see it
// at full native resolution. Close with the x button, a click anywhere, or Escape.
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">&#10005;</button><figure><img alt=""><figcaption></figcaption></figure>';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('img');
  var cap = overlay.querySelector('figcaption');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var opener = null;

  function close() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    if (opener) { opener.focus(); opener = null; }
  }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  function open(el) {
    opener = el;
    img.src = el.dataset.full || el.src;
    var fc = el.closest('figure').querySelector('figcaption');
    cap.innerHTML = fc ? fc.innerHTML : '';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  document.querySelectorAll('figure.painting img').forEach(function (el) {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('click', function () { open(el); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); }
    });
  });
})();
