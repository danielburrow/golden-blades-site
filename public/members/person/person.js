(function () {
  var U = window.HRL_UI, h = U.h;
  var q = new URLSearchParams(location.search);
  var id = q.get("id") || "";
  var from = q.get("from") === "house" ? "house" : "hrl";
  var root = document.getElementById("person-root");
  var nav = document.getElementById("person-nav");

  function btn(href, text, primary) {
    var a = h("a", "btn" + (primary ? "" : " ghost"), text);
    a.href = href;
    return a;
  }
  var gb = btn("/members/house/hierarchy/", "\u2190 Golden Blades hierarchy", from === "house");
  var hrl = btn("/members/hrl/hierarchy/", "\u2190 HRL hierarchy", from === "hrl");
  if (from === "house") { nav.appendChild(gb); nav.appendChild(document.createTextNode(" ")); nav.appendChild(hrl); }
  else { nav.appendChild(hrl); nav.appendChild(document.createTextNode(" ")); nav.appendChild(gb); }

  var person = null;
  U.everyone().forEach(function (p) { if (U.slug(p.slug || p.name) === id) person = p; });
  if (!person) {
    root.appendChild(h("h1", "", "Not found"));
    root.appendChild(h("p", "", "There's no profile with that name. Try the hierarchy pages above."));
    return;
  }
  document.title = person.name + " | Golden Blades";

  var wrap = h("div", "person-page");
  var cardWrap = h("div", "person-card");
  cardWrap.appendChild(U.card(person, true, true));
  wrap.appendChild(cardWrap);

  var bio = (window.BIOS || {})[id] || {};
  var body = h("div", "person-body");

  var s1 = h("section", "");
  s1.appendChild(h("h2", "", "Who they are"));
  if (bio.about) {
    bio.about.split(/\n\s*\n/).forEach(function (para) { s1.appendChild(h("p", "", para)); });
  } else {
    s1.appendChild(h("p", "note", "Their story is still being written."));
  }
  body.appendChild(s1);

  var s2 = h("section", "");
  s2.appendChild(h("h2", "", "Exploits"));
  if (bio.exploits && bio.exploits.length) {
    var list = h("div", "exploits");
    bio.exploits.forEach(function (x) {
      var e = h("div", "exploit");
      if (x.title) e.appendChild(h("h3", "", x.title));
      if (x.text) e.appendChild(h("p", "", x.text));
      list.appendChild(e);
    });
    s2.appendChild(list);
  } else {
    s2.appendChild(h("p", "note", "No exploits recorded yet."));
  }
  body.appendChild(s2);
  var pics = (window.PHOTOS || {})[id] || [];
  if (pics.length) {
    var s3 = h("section", "");
    s3.appendChild(h("h2", "", "Gallery"));
    var grid = h("div", "gallery");
    pics.forEach(function (src) {
      var a = h("a", "gallery-item");
      a.href = src; a.target = "_blank"; a.rel = "noopener";
      var im = document.createElement("img");
      im.src = src; im.alt = "Photo of " + person.name; im.loading = "lazy";
      a.appendChild(im); grid.appendChild(a);
    });
    s3.appendChild(grid);
    body.appendChild(s3);
  }
  wrap.appendChild(body);
  root.appendChild(wrap);
})();
