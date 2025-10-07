document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img.zoomable').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function (event) {
      event.preventDefault(); // ⛔ stop default navigation
      event.stopPropagation(); // ⛔ stop bubbling to parent links
      window.open(img.currentSrc || img.src, '_blank', 'noopener,noreferrer');
      return false; // ⛔ stop any further handling
    });
  });
});
