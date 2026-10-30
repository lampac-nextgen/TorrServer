/** react-aria buttons expose disabled as the `disabled` attribute or `aria-disabled`. */
export const isDisabled = (el: HTMLElement) =>
  el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true'
