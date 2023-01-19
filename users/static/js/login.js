function set_tabs_inactive() {
    var elements = document.getElementsByClassName('tablinks');
    for (var i in elements) {
        if (elements.hasOwnProperty(i)) {
        elements[i].id = " ";
    }
    }
}


function showTab(tab) {
    set_tabs_inactive();
    $('#Login').toggle();
    $('#Signup').toggle();
    tab.id = "tab-active";
}