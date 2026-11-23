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
  var about = bio.about;
  if (!about && person.rank) {
    var rk = person.rank;
    about = person.name + " is a " + rk + " of the Holy Reman League.";
  }
  if (about) {
    about.split(/\n\s*\n/).forEach(function (para) { s1.appendChild(h("p", "", para)); });
  } else {
    s1.appendChild(h("p", "note", "Their story is still being written."));
  }
  if (!bio.about && about) s1.appendChild(h("p", "note", "More of their story is still to be written."));
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
  var arms = (window.HERALDRY || {})[id] || [];
  if (arms.length) {
    var s5 = h("section", "");
    s5.appendChild(h("h2", "", "Heraldry"));
    var hg = h("div", "heraldry-grid");
    arms.forEach(function (a) {
      var fig = h("figure", "heraldry");
      var link = document.createElement("a"); link.href = a.full;
      var im = document.createElement("img"); im.src = a.web; im.alt = person.name + ": " + a.label; im.loading = "lazy";
      link.appendChild(im); fig.appendChild(link);
      var cap = h("figcaption", "", a.label);
      cap.appendChild(document.createElement("br"));
      var dl = document.createElement("a"); dl.href = a.full; dl.setAttribute("download", ""); dl.textContent = "Download full size (" + a.size + ")";
      cap.appendChild(dl); fig.appendChild(cap); hg.appendChild(fig);
    });
    s5.appendChild(hg);
    body.appendChild(s5);
  }
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
  var vids = (window.VIDEOS || {})[id] || [];
  if (vids.length) {
    var s4 = h("section", "");
    s4.appendChild(h("h2", "", "Videos"));
    var vg = h("div", "video-grid");
    vids.forEach(function (v) {
      var fig = h("figure", "video-card");
      var vd = document.createElement("video");
      vd.controls = true; vd.preload = "none"; vd.setAttribute("playsinline", "");
      if (v.poster) vd.poster = v.poster;
      var so = document.createElement("source"); so.src = v.src; so.type = "video/mp4";
      vd.appendChild(so); fig.appendChild(vd);
      fig.appendChild(h("figcaption", "", v.title));
      vg.appendChild(fig);
    });
    s4.appendChild(vg);
    body.appendChild(s4);
  }
  wrap.appendChild(body);
  root.appendChild(wrap);
})();
