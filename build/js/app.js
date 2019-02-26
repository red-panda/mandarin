"use strict";

function hasClass(el, className) {
  var testClass = false;

  if (el.classList) {
    testClass = el.classList.contains(className);
  } else {
    testClass = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  return testClass;
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}
"use strict";

var sidebar = function () {
  var $sidebar;
  var _activeClass = 'sidebar--active';
  var _bodyActiveClass = 'body--backdrop';
  var _contentActiveClass = 'content--sidebar';
  var $content = document.getElementById('content');
  var $body = document.body;

  function showSidebar() {
    if (window.innerWidth < 769) {
      addClass($body, _bodyActiveClass);
    }

    addClass($sidebar, _activeClass);
    addClass($content, _contentActiveClass);
  }

  function hideSidebar() {
    if (window.innerWidth < 769 || hasClass($body, _bodyActiveClass)) {
      removeClass($body, _bodyActiveClass);
    }

    removeClass($sidebar, _activeClass);
    removeClass($content, _contentActiveClass);
  }

  function toggleSidebar() {
    if (isActive()) {
      hideSidebar();
    } else {
      showSidebar();
    }
  }

  function isActive() {
    return hasClass($sidebar, _activeClass);
  }

  return {
    init: function init() {
      var $headerBurger = document.getElementById('header-burger');
      $sidebar = document.getElementById('sidebar');
      $headerBurger.addEventListener('click', function (e) {
        e.preventDefault();
        toggleSidebar();
      });
      var $sidebarControls = document.getElementsByClassName('js-sidebar-control');

      for (var i = 0; i < $sidebarControls.length; i++) {
        var $sidebarControl = $sidebarControls[i];
        $sidebarControl.addEventListener('click', function (e) {
          e.preventDefault();
          toggleSidebar();
        });
      }
    }
  };
}();

document.addEventListener("DOMContentLoaded", function () {
  sidebar.init();
});