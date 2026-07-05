// Mobile hamburger menu
(function () {
  var nav = document.querySelector('nav.site');
  var btn = document.querySelector('.nav-toggle');
  if (!nav || !btn) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Scroll-spy: on the homepage the underline follows the section in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var hashLinks = links.filter(function (a) { return a.getAttribute('href').charAt(0) === '#' && a.getAttribute('href').length > 1; });
  if (!hashLinks.length) return;
  var homeLink = links.filter(function (a) { return a.getAttribute('href') === '#'; })[0];
  var sections = hashLinks.map(function (a) {
    return { a: a, el: document.getElementById(a.getAttribute('href').slice(1)) };
  }).filter(function (x) { return x.el; });
  var spied = sections.map(function (s) { return s.a; }).concat(homeLink ? [homeLink] : []);
  function update() {
    var y = window.scrollY + 130;
    var current = null;
    sections.forEach(function (s) { if (s.el.offsetTop <= y) current = s; });
    spied.forEach(function (a) { a.classList.remove('active'); });
    ((current && current.a) || homeLink || sections[0].a).classList.add('active');
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('load', update);
  update();
})();
