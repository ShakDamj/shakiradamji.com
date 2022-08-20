const scrollers = [...document.querySelectorAll(selector)]
  .map((x) => ({
    el: x,
    className: x.dataset.scrollclass,
    offset: x.dataset.scrolloffset || 0,
    tolerance: x.dataset.scrolltolerance || 0,
  }))
  .filter((x) => x.className);

const pendingScrollers = new Set(scrollers);

if (pendingScrollers.size) {
  addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;

    for (const { el, className, offset, tolerance } of pendingScrollers) {
      const scrollDiff = scrolled - offset;

      if (Math.abs(scrollDiff) < tolerance) {
        return;
      }

      const hasClass = el.classList.contains(className);
      const shouldHaveClass = scrollDiff > 0;

      if (shouldHaveClass === hasClass) {
        return;
      }

      if (shouldHaveClass) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  });
}
