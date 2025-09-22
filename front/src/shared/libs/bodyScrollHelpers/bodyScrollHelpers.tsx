/**
 * Disables page scrolling and adds `padding-right`
 * to compensate for scrollbar width, preventing UI shift.
 */
export const disableBodyScroll = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = "hidden"
  document.body.style.paddingRight = `${scrollBarWidth}px`
}

/**
 * Restores page scrolling and removes `padding-right`,
 * returning the page to its original state.
 */
export const enableBodyScroll = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = ""
}