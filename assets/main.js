var listofgigstocome = document.querySelectorAll("ul>li>div.ns-notpassed");
var nextgig = listofgigstocome[listofgigstocome.length - 1];
if (nextgig) {
  nextgig.classList.add("ns-nextgig");
}

window.addEventListener("load", () => {
  quicklink.listen({
    origins: !0,
    priority: !0
  });
});


window.onload = function(){
  var anchors = document.getElementById('ns-target').getElementsByTagName('a');
  for (var i=0; i<anchors.length; i++){
    anchors[i].setAttribute('target', '_blank');
  }
}

// Lazy load images
window.addEventListener("load", function () {
  var timer, images, viewHeight;

  function init() {
    images = document.body.querySelectorAll("[data-src]");
    viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    lazyload(0);
  }

  function scroll() {
    lazyload(200);
  }

  function lazyload(delay) {
    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      var changed = false;

      requestAnimationFrame(function () {
        for (var i = 0; i < images.length; i++) {
          var img = images[i];
          var rect = img.getBoundingClientRect();

          if (!(rect.bottom < 0 || rect.top - 100 - viewHeight >= 0)) {
            img.onload = function (e) {
              e.target.className = "loaded";
            };

            img.className = "notloaded";
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
            changed = true;
          }
        }

        if (changed) {
          filterImages();
        }

        timer = null;
      });
    }, delay);
  }

  function filterImages() {
    images = Array.prototype.filter.call(images, function (img) {
      return img.hasAttribute("data-src");
    });

    if (images.length === 0) {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", init);
      return;
    }
  }

  // polyfill for older browsers
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  window.addEventListener("scroll", scroll);
  window.addEventListener("resize", init);

  init();
});

window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  var postsList = params.get("post");
  if (postsList == "allposts") {
    var divsToHide = document.getElementsByClassName("ns-post-summary"); //divsToHide is an array
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.visibility = "hidden"; // or
      divsToHide[i].style.display = "none"; // depending on what you're doing
    }
    var appendToPageLink = document.getElementsByClassName("page-link");
    for (var i = 0; i < appendToPageLink.length; i++) {
      appendToPageLink[i].href = appendToPageLink[i].href + "?post=allposts";
    }
  }
    // style BIO
    var time = document.getElementsByTagName("time")[0];
    var bio = document.getElementsByClassName("container")[0];
    time.innerHTML = "";
    bio.classList.add("ns-bio");
  
});

if (navigator.share) {
  const shareButton = document.querySelector(".ns-share-btn");
  shareButton.style.visibility = "visible";
  shareButton.addEventListener("click", (event) => {
    navigator.share({
      title: document.title,
      url: document.location.href
    });
  });
}