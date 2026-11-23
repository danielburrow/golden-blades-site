// Shared header/footer for members pages. Section list is alphabetical.
(function () {
  var sections = [
    ["Crafting Guide", "/members/crafting/"],
    ["HRL", "/members/hrl/"],
    ["Meme Repository", "/members/memes/"],
    ["Shopping", "/members/shopping/"],
    ["Starter Guide", "/members/starter-guide/"]
  ];
  var path = location.pathname;
  var links = sections.map(function (s) {
    var cur = path.indexOf(s[1]) === 0 ? ' aria-current="page"' : "";
    return '<a href="' + s[1] + '"' + cur + ">" + s[0] + "</a>";
  }).join("");
  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="wrap">' +
      '<a class="brand" href="/members/">Golden Blades</a>' +
      "<nav>" + links + '<a href="/auth/logout">Sign out</a></nav>' +
      "</div>";
  }
  var footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = '<div class="wrap">Golden Blades Starter Guide</div>';
})();
