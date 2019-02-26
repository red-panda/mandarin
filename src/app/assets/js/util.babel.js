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