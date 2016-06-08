var scrollToElement = function (element, padding) {
  function documentVerticalScrollPosition () {
    if (window.pageYOffset) return window.pageYOffset; // Firefox, Chrome, Opera, Safari.
    if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.

    return 0; // None of the above.
  }

  function viewportHeight () {
    return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
  }

  function documentHeight () {
    return (document.height !== undefined) ? document.height : document.body.offsetHeight;
  }

  function maximumScrollPosition () {
    return documentHeight() - viewportHeight();
  }

  function elementVerticalClientPosition () {
    return element.getBoundingClientRect().top;
  }

  function animateToPosition (currentPosition, position) {
    var filter = 0.2;
    var fps = 60;
    var difference = parseFloat(position) - parseFloat(currentPosition);

    // Snap, then stop if arrived.
    var arrived = (Math.abs(difference) <= 0.5);
    if (arrived)
    {
      // Apply target.
      scrollTo(0.0, position);
      return;
    }

    // Filtered position.
    currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(position) * filter);

    // Apply target.
    scrollTo(0.0, Math.round(currentPosition));

    // Schedule next tick.
    setTimeout(function() {
      animateToPosition(currentPosition, position);
    }, (1000 / fps));
  }

  function init() {
    var currentPosition = documentVerticalScrollPosition();
    var targetPosition = currentPosition + elementVerticalClientPosition(element) - padding;
    var maxScrollPosition = maximumScrollPosition();
    var position = Math.min(targetPosition, maxScrollPosition);

    animateToPosition(currentPosition, position);
  }

  init();
};

window.scrollToElement = scrollToElement;