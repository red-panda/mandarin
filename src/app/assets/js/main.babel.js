let sidebar = (function () {
    let $sidebar;
    let _activeClass = 'sidebar--active';
    let _bodyActiveClass = 'body--backdrop';
    let _contentActiveClass = 'content--sidebar';
    let $content = document.getElementById('content');
    let $body = document.body;

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
        init: function () {
            let $headerBurger = document.getElementById('header-burger');
            $sidebar = document.getElementById('sidebar');

            $headerBurger.addEventListener('click', function (e) {
                e.preventDefault();
                toggleSidebar();
            });

            let $sidebarControls = document.getElementsByClassName('js-sidebar-control');

            for (var i = 0; i < $sidebarControls.length; i++) {
                let $sidebarControl = $sidebarControls[i];
                $sidebarControl.addEventListener('click', function (e) {
                    e.preventDefault();
                    toggleSidebar();
                });
            }
        }
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    sidebar.init();
});