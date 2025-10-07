javascript
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img.zoomable').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      // Open the *built* image URL (what Sphinx put in src) in a new tab
      window.open(img.currentSrc || img.src, '_blank');
    });
  });
});
