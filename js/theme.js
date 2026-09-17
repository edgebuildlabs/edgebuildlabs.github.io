/* Edge Build Labs — theme switch. The only other script on the site is the
   pre-paint snippet in <head>, which reads the same localStorage key. */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  if (!btn) { return; }
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") { return t; }
    return mq && mq.matches ? "dark" : "light";
  }

  function reflect() {
    btn.setAttribute("aria-pressed", current() === "dark" ? "true" : "false");
  }

  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable: theme still applies for this page */ }
    reflect();
  });

  if (mq && mq.addEventListener) { mq.addEventListener("change", reflect); }
  reflect();
})();
