(function() {
  var menu = document.getElementById('nav-menu');

  menu.addEventListener('click', function(evt) {
    var target = evt.target;
    var href = target.href;
    var id = target.href.split('#')[1];
    var block = document.getElementById(id);

    evt.preventDefault();
    window.scrollToElement(block, 0);
  });

})();
