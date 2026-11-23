// Shared header/footer. Public pages get the public nav; /members/ pages get the
// members nav with dropdowns. House comes first; everything else is alphabetical.
(function () {
  var path = location.pathname;
  var members = path.indexOf("/members/") === 0;

  // [label, href, children?]  children: [label, href]
  var publicNav = [
    ["About", "/about/"],
    ["Join", "/join/"],
    ["Videos", "/videos/"]
  ];
  var membersNav = [
    ["House", "/members/house/", [
      ["Hierarchy", "/members/house/hierarchy/"],
      ["Primer", "/members/house/primer/"]
    ]],
    ["Carta Arcanum", "/members/carta-arcanum/", [
      ["Briefadel and Ownership", "/members/carta-arcanum/briefadel/"],
      ["Land and Holdings", "/members/carta-arcanum/holdings/"],
      ["Palazzo Program", "/members/carta-arcanum/palazzi/"]
    ]],
    ["Guides", "/members/guides/", [
      ["Combat", "/members/guides/combat/"],
      ["Crafting", "/members/guides/crafting/"],
      ["Shopping", "/members/guides/shopping/"]
    ]],
    ["HRL", "/members/hrl/", [
      ["Constitution", "/members/hrl/constitution/"],
      ["Heraldry & Flags", "/members/hrl/heraldry/"],
      ["Hierarchy", "/members/hrl/hierarchy/"]
    ]],
    ["Meme Repository", "/members/memes/"],
    ["Videos", "/videos/"]
  ];

  function cur(href) { return path.indexOf(href) === 0 ? ' aria-current="page"' : ""; }
  function esc(s) { return s.replace(/&/g, "&amp;"); }

  var items = (members ? membersNav : publicNav).map(function (n) {
    if (!n[2]) return '<a href="' + n[1] + '"' + cur(n[1]) + ">" + esc(n[0]) + "</a>";
    var menu = n[2].map(function (c) {
      return '<a href="' + c[1] + '"' + cur(c[1]) + ">" + esc(c[0]) + "</a>";
    }).join("");
    return '<div class="dd"><a href="' + n[1] + '"' + cur(n[1]) + ">" + esc(n[0]) + "</a>" +
      '<button type="button" class="caret" aria-expanded="false" aria-label="' + esc(n[0]) + ' menu">&#9662;</button>' +
      '<div class="dd-menu">' + menu + "</div></div>";
  }).join("");

  var tail = members
    ? '<a href="/auth/logout">Sign out</a>'
    : '<a class="nav-members" href="/members/">Members</a>';

  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="wrap">' +
      '<a class="brand" href="' + (members ? "/members/" : "/") + '">Golden Blades</a>' +
      "<nav>" + items + tail + "</nav></div>";

    var dds = header.querySelectorAll(".dd");
    function closeAll(except) {
      dds.forEach(function (d) {
        if (d !== except) {
          d.classList.remove("open");
          d.querySelector(".caret").setAttribute("aria-expanded", "false");
        }
      });
    }
    dds.forEach(function (d) {
      var btn = d.querySelector(".caret");
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = !d.classList.contains("open");
        closeAll(d);
        d.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    document.addEventListener("click", function () { closeAll(null); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(null); });
  }

  var footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = '<div class="wrap">Golden Blades</div>';
})();
