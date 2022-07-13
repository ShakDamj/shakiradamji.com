const scrollers = (await $$('[data-scrollclass]'))
  .map((x) => ({
    el: x,
    className: x.dataset.scrollclass,
    offset: x.dataset.scrolloffset || 0,
  }))
  .filter((x) => x.className);

const pendingScrollers = new Set(scrollers);

if (pendingScrollers.size) {
  addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;

    for (const scroller of pendingScrollers) {
      const { el, className, offset } = scroller;

      if (scrolled > offset) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  });
}
