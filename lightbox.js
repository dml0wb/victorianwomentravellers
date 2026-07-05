// Lightbox: click any painting to see it at full native resolution.
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure>';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('img');
  var cap = overlay.querySelector('figcaption');

  function close() { overlay.style.display = 'none'; document.body.style.overflow = ''; }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  document.querySelectorAll('figure.painting img').forEach(function (el) {
    el.addEventListener('click', function () {
      img.src = el.src;
      var fc = el.closest('figure').querySelector('figcaption');
      cap.innerHTML = fc ? fc.innerHTML : '';
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
})();
