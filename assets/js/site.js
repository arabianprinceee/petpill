// The header's two pop-ups (the menu and the language list): one open at a time,
// and a tap anywhere else or Escape closes them.
(function () {
  var pops = document.querySelectorAll('details.menu, details.lang');
  function closeAll(except) {
    for (var i = 0; i < pops.length; i++) if (pops[i] !== except) pops[i].removeAttribute('open');
  }
  for (var i = 0; i < pops.length; i++) {
    pops[i].addEventListener('toggle', function (e) { if (e.target.open) closeAll(e.target); });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('details.menu, details.lang')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('details.menu[open], details.lang[open]');
    if (!open) return;
    closeAll();
    open.querySelector('summary').focus();
  });
})();
