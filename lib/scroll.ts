/**
 * Case studies render twice: as a normal page, and inside the bottom sheet
 * where the scroller is a div rather than the window. Anything that reacts to
 * scrolling has to ask which one it's in — hard-coding `window` silently
 * breaks every scroll-driven section the moment it's opened from a card.
 */
export function scrollParent(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}
