"use strict";

const main = document.querySelector("main");
const navToggler = document.querySelector(".nav__hamburger-menu");
const collapsable = document.querySelector(".collapsible");
const offScreenMenu = document.querySelector(".collapsible__content");

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
function preventDefault(e) {
  e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  window.addEventListener("mousedown", preventDefault, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  window.removeEventListener("mousedown", preventDefault, false);
}

const lockScroll = function lockScroll() {
  if (main.classList.contains("lock-scroll")) {
    main.classList.remove("lock-scroll");
    enableScroll();
  } else {
    main.classList.add("lock-scroll");
    disableScroll();
  }
};

//close or open menu
const menuToggle = function () {
  lockScroll();
  navToggler.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  collapsable.classList.toggle("active");

  //lock scroll
  main.style.height = main.offsetHeight - 54 + "px";
};

const menuClose = function () {
  lockScroll();

  navToggler.classList.remove("active");
  offScreenMenu.classList.remove("active");
  collapsable.classList.remove("active");
};
const cancelMenu = function () {
  navToggler.classList.contains("active") && menuToggle();
  console.log("test");
};
main.addEventListener("click", cancelMenu);

navToggler.addEventListener("click", menuToggle);

// close collapsible content when off screen clicked
document.addEventListener("click", (event) => {
  if (
    !navToggler.contains(event.target) &&
    !offScreenMenu.contains(event.target)
  ) {
    navToggler.classList.contains("active") && menuClose();
  }
});
