/**
 * iOS-надёжная блокировка скролла body.
 *
 * `body { overflow: hidden }` на iOS Safari **не блокирует** rubber-band scroll
 * и пользователь может пролистывать страницу под открытым модалом. Единственный
 * способ — заморозить body через `position: fixed` + `top: -scrollY` и при
 * закрытии вернуть исходную scroll-позицию.
 *
 * Поддерживает несколько одновременных открытий (header drawer + lead modal):
 * счётчик lockCount запоминает сколько источников держат лок, реальный unlock
 * срабатывает только когда счётчик возвращается к нулю.
 */

let lockCount = 0;
let savedScrollY = 0;
let savedBodyStyles: {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
} | null = null;

export function lockBodyScroll() {
  if (typeof document === "undefined") return;

  if (lockCount === 0) {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    const body = document.body;
    savedBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }
  lockCount += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0 && savedBodyStyles) {
    const body = document.body;
    body.style.position = savedBodyStyles.position;
    body.style.top = savedBodyStyles.top;
    body.style.left = savedBodyStyles.left;
    body.style.right = savedBodyStyles.right;
    body.style.width = savedBodyStyles.width;
    body.style.overflow = savedBodyStyles.overflow;
    savedBodyStyles = null;
    /*
     * `scrollTo` без smooth — мгновенно. Иначе при close модала viewport «прыгает»
     * вверх и потом плавно опускается, выглядит как баг.
     */
    window.scrollTo(0, savedScrollY);
  }
}
