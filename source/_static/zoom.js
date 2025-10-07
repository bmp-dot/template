document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img.zoomable').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      // Open in a new window (instead of replacing current tab)
      window.open(img.currentSrc || img.src, '_blank', 'noopener,noreferrer');
    });
  });
});
