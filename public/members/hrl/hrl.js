(function () {
  var D = window.HRL;
  var NS = "http://www.w3.org/2000/svg";
  function img(id) { return "/members/hrl/img/" + id + ".png"; }   // crests, shields, emblems
  function photo(id) { return "/members/hrl/img/" + id + ".jpg"; } // portraits

  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function svg(markup, cls) {
    var w = h("span", cls);
    w.innerHTML = markup;
    return w;
  }

  var SILHOUETTE = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><circle cx="32" cy="24" r="11" fill="none" stroke="#6e5420" stroke-width="3"/><path d="M10 58 C10 42 54 42 54 58" fill="none" stroke="#6e5420" stroke-width="3"/></svg>';
  var SILHOUETTE_GOLD = SILHOUETTE.replace(/#6e5420/g, "#c9a24a");
  var DASHED_SHIELD = '<svg viewBox="0 0 60 72" width="46" height="56" aria-hidden="true"><path d="M4 4 H56 V38 C56 54 42 64 30 69 C18 64 4 54 4 38 Z" fill="none" stroke="#8a6a22" stroke-width="3" stroke-dasharray="5 4"/></svg>';
  var CROWN = '<svg viewBox="0 0 80 66" width="64" height="52" role="img" aria-label="Holy Reman Crown of the Circular Table"><path d="M8 52 L4 18 L22 33 L40 8 L58 33 L76 18 L72 52 Z" fill="#c9a24a" stroke="#6e4f12" stroke-width="3" stroke-linejoin="round"/><rect x="8" y="52" width="64" height="10" rx="2" fill="#c9a24a" stroke="#6e4f12" stroke-width="3"/><circle cx="4" cy="14" r="5" fill="#c9a24a" stroke="#6e4f12" stroke-width="2.5"/><circle cx="40" cy="5" r="5" fill="#c9a24a" stroke="#6e4f12" stroke-width="2.5"/><circle cx="76" cy="14" r="5" fill="#c9a24a" stroke="#6e4f12" stroke-width="2.5"/><circle cx="40" cy="40" r="12" fill="#efe3c4" stroke="#6e4f12" stroke-width="3"/><circle cx="40" cy="40" r="2.6" fill="#6e4f12"/></svg>';

  // Symbol of the Veiled Path: spiral in a laurel wreath, ringed by three arcs.
  function veiled() {
    var leaves = "", i, a, x, y, r = 30;
    for (i = 0; i < 14; i++) {
      a = (Math.PI * 2 * i) / 14;
      x = 50 + r * Math.cos(a); y = 50 + r * Math.sin(a);
      leaves += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="5.2" ry="2.3" transform="rotate(' + (a * 180 / Math.PI + 90).toFixed(0) + " " + x.toFixed(1) + " " + y.toFixed(1) + ')" fill="#8fb872" stroke="#2e4a2b" stroke-width="0.6"/>';
    }
    var d = "M50 50", t, rr;
    for (t = 0; t <= 4 * Math.PI; t += 0.2) { rr = 2 + t * 2.1; d += " L" + (50 + rr * Math.cos(t)).toFixed(1) + " " + (50 + rr * Math.sin(t)).toFixed(1); }
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Symbol of the Veiled Path"><circle cx="50" cy="50" r="48" fill="#1b2d25" stroke="#c9a24a" stroke-width="3"/><path d="M44 92.6 A43 43 0 0 1 10 34" fill="none" stroke="#7aa85a" stroke-width="4" stroke-linecap="round"/><path d="M16 23.5 A43 43 0 0 1 84 23.5" fill="none" stroke="#7b8fd6" stroke-width="4" stroke-linecap="round"/><path d="M90 34 A43 43 0 0 1 56 92.6" fill="none" stroke="#e4803a" stroke-width="4" stroke-linecap="round"/>' + leaves + '<path d="' + d + '" fill="none" stroke="#f2ecd4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function photoEl(p, alt) {
    var wrap = h("div", "portrait");
    if (p.photo) {
      var im = document.createElement("img");
      im.src = photo(p.photo);
      im.alt = alt;
      im.loading = "lazy";
      im.onerror = function () { wrap.innerHTML = SILHOUETTE; };
      wrap.appendChild(im);
    } else {
      wrap.innerHTML = SILHOUETTE;
    }
    return wrap;
  }

  function crestEl(c) {
    var box = h("div", "crest");
    if (c === "sigil") c = { clip: D.sigil };
    if (c === null) { box.innerHTML = DASHED_SHIELD; return box; }
    if (!c) return null;
    var im = document.createElement("img");
    im.alt = "";
    im.onerror = function () { box.style.display = "none"; };
    if (c.clip) {
      var s = h("div", "sigil");
      im.src = img(c.clip);
      s.appendChild(im);
      box.appendChild(s);
    } else {
      im.src = img(c.img);
      if (c.tall) im.style.maxHeight = "76px";
      box.appendChild(im);
    }
    return box;
  }

  function emblemEl(kind) {
    var box = h("div", "emblem");
    if (kind === "mascirino") {
      var im = document.createElement("img");
      im.src = img(D.mascirino);
      im.alt = "Emblem of Mascirino";
      im.onerror = function () { box.style.display = "none"; };
      box.appendChild(im);
    } else if (kind === "veiled") {
      box.innerHTML = veiled();
    } else if (kind === "crown") {
      box.style.width = "64px"; box.style.height = "52px";
      box.innerHTML = CROWN;
    }
    return box;
  }

  function card(p, big) {
    var el = h("div", "person" + (big ? " big" : "") + (p.struck ? " struck" : "") + (p.vacant ? " vacant" : ""));
    if (p.emblem && !p.vacant) el.appendChild(emblemEl(p.emblem));
    if (!p.vacant && p.crest !== undefined) {
      var c = crestEl(p.crest);
      if (c) el.appendChild(c);
    }
    if (p.vacant) {
      var vc = crestEl(p.crest);
      if (vc) el.appendChild(vc);
      if (p.photo) el.appendChild(photoEl(p, "Portrait for the " + p.name + " seat"));
      else if (p.blank) { var bp = h("div", "portrait"); bp.innerHTML = SILHOUETTE_GOLD; el.appendChild(bp); }
    } else {
      el.appendChild(photoEl(p, "Portrait of " + p.name));
    }
    el.appendChild(h("div", "rank", p.rank));
    el.appendChild(h("div", "name", p.name));
    if (p.role) el.appendChild(h("div", "role", p.role));
    if (p.note) el.appendChild(h("div", "note", p.note));
    return el;
  }

  function tier(title, people, mode) {
    var sec = h("section", "hrl-tier");
    sec.appendChild(h("h2", "", title));
    var grid = h("div", "hrl-grid" + (mode ? " " + mode : ""));
    people.forEach(function (p) { grid.appendChild(card(p, mode === "top")); });
    sec.appendChild(grid);
    return sec;
  }

  var root = document.getElementById("hrl-root");
  root.appendChild(tier("Kaiserine", [D.kaiserine], "top"));
  root.appendChild(h("div", "hrl-connector"));
  root.appendChild(tier("Archduke", [D.archduke], "top"));
  root.appendChild(h("div", "hrl-connector"));
  root.appendChild(tier("Elector Counts", D.electors, "center"));
  root.appendChild(h("div", "hrl-connector"));
  root.appendChild(tier("Barons", D.barons, "center"));
  root.appendChild(h("div", "hrl-connector"));
  root.appendChild(tier("Lords & Ladies", D.lords));
  root.appendChild(h("div", "hrl-connector"));
  root.appendChild(tier("Titled Citizens", D.citizens, "center"));
})();
