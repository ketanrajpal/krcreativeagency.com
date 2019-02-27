var host = "www.krcreativeagency.com";
if (host == window.location.host && window.location.protocol != "https:") window.location.protocol = "https";

$.get("./resources/json/data.json", function(data) {
  var content = "";
  var projects = data.projects;
  $.each(projects, function(index, element) {
    content += "<article>";
    content += "<div class='control'>";
    content += "<div class='left'>";
    content += "<span class='far fa-circle'></span>";
    content += "<span class='far fa-circle'></span>";
    content += "<span class='far fa-circle'></span>";
    content += "</div>";
    content += "<div class='center'>" + element.name + "</div>";
    content += "<div class='right'><span class='fas fa-bars'></span></div>";
    content += "</div>";
    content += "<div class='content'>";
    content += "<img src=" + element.covers[808] + " alt='' />";
    content += "<div class='cover animated bounceIn'>";
    content += "<h1>" + element.name + "</h1>";
    content += "<div>";
    content += " <a href=" + element.url + " target='_blank' rel='noopener noreferrer'>Visit Project</a>";
    content += "</div>";
    content += "<p><span>Tags:</span> " + element.fields.join(", ") + "</p>";
    content += "</div>";
    content += "</div>";
    content += "<div class='statusbar'></div>";
    content += "</article>";
  });
  $(".container").append(content);
});

window.onscroll = function() {
  if (window.pageYOffset > 100) {
    $("header").addClass("top");
  } else {
    $("header").removeClass("top");
  }
  onScroll();
};

$("#navigation a").click(function() {
  var target = this.hash;
  $target = $(target);
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $target.offset().top + 2
      },
      500,
      "swing",
      function() {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      }
    );
});

function onScroll() {
  var scrollPosition = $(document).scrollTop();
  $("#navigation a").each(function() {
    var currentLink = $(this);
    var refElement = $(currentLink.attr("href"));
    if (
      refElement.position().top <= scrollPosition &&
      refElement.position().top + refElement.height() > scrollPosition
    ) {
      $("#navigation a.active").removeClass("active");
      $(this).addClass("active");
    } else {
      currentLink.removeClass("active");
    }
  });
}

var width,
  height,
  largeHeader,
  canvas,
  ctx,
  circles,
  target,
  animateHeader = true;

initHeader();
addListeners();

function initHeader() {
  width = window.innerWidth;
  height = window.innerHeight;
  target = { x: 0, y: height };

  largeHeader = document.getElementById("large-header");
  largeHeader.style.height = height + "px";

  canvas = document.getElementById("demo-canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  circles = [];
  for (var x = 0; x < width * 0.5; x++) {
    var c = new Circle();
    circles.push(c);
  }
  animate();
}

function addListeners() {
  window.addEventListener("scroll", scrollCheck);
  window.addEventListener("resize", resize);
}

function scrollCheck() {
  if (document.body.scrollTop > height) animateHeader = false;
  else animateHeader = true;
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  largeHeader.style.height = height + "px";
  canvas.width = width;
  canvas.height = height;
}

function animate() {
  if (animateHeader) {
    ctx.clearRect(0, 0, width, height);
    for (var i in circles) {
      circles[i].draw();
    }
  }
  requestAnimationFrame(animate);
}

// Canvas manipulation
function Circle() {
  var _this = this;

  // constructor
  (function() {
    _this.pos = {};
    init();
  })();

  function init() {
    _this.pos.x = Math.random() * width;
    _this.pos.y = height + Math.random() * 100;
    _this.alpha = 0.1 + Math.random() * 0.3;
    _this.scale = 0.1 + Math.random() * 0.3;
    _this.velocity = Math.random();
  }

  this.draw = function() {
    if (_this.alpha <= 0) {
      init();
    }
    _this.pos.y -= _this.velocity;
    _this.alpha -= 0.0005;
    ctx.beginPath();
    ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(255,255,255," + _this.alpha + ")";
    ctx.fill();
  };
}

$(function() {
  var icon = "<span class='fas fa-exclamation-circle'></span> ";
  $("#contactFrm").submit(function() {
    if ($("#name").val() == "" || $("#email").val() == "" || $("#phone").val() == "" || $("#message").val() == "") {
      $("#validation").html(icon + "All the above fields are required.");
      return false;
    } else {
      var namePattern = "[A-Za-z ]+";
      var phonePattern = "[0-9]+";
      /*
      if (!namePattern.test($("#name").val())) {
        $("#validation").html(icon + "Name must contain only alphabets");
      }
      */
      return false;
    }
  });
});
