(function () {
  var D = window.MEMES;
  var dlg = document.getElementById("viewer");
  var stage = document.getElementById("viewer-stage");
  var cap = document.getElementById("viewer-cap");

  function open(kind, title, file) {
    stage.innerHTML = "";
    if (kind === "image") {
      var im = document.createElement("img");
      im.src = "/members/memes/media/flyers/" + file + ".jpg";
      im.alt = title;
      stage.appendChild(im);
    } else {
      var v = document.createElement("video");
      v.src = "/members/memes/media/gifs/" + file + ".mp4";
      v.autoplay = true; v.loop = true; v.muted = true; v.controls = true; v.playsInline = true;
      stage.appendChild(v);
    }
    cap.textContent = title;
    dlg.showModal();
  }
  dlg.addEventListener("close", function () { stage.innerHTML = ""; });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  document.getElementById("viewer-close").addEventListener("click", function () { dlg.close(); });

  function fill(id, items, kind) {
    var grid = document.getElementById(id);
    items.forEach(function (it) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "meme";
      var im = document.createElement("img");
      im.loading = "lazy"; im.alt = it[0];
      im.src = kind === "image"
        ? "/members/memes/media/flyers/" + it[1] + "-thumb.jpg"
        : "/members/memes/media/gifs/" + it[1] + ".jpg";
      var t = document.createElement("span"); t.textContent = it[0];
      b.appendChild(im); b.appendChild(t);
      if (kind === "video") { var p = document.createElement("i"); p.className = "play"; p.setAttribute("aria-hidden", "true"); p.textContent = "▶"; b.appendChild(p); }
      b.addEventListener("click", function () { open(kind, it[0], it[1]); });
      grid.appendChild(b);
    });
  }
  fill("grid-flyers", D.flyers, "image");
  fill("grid-gifs", D.gifs, "video");
})();
