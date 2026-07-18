/** Bottom tab content band (icons + labels). Safe-area is added via CSS env(). */
export const BOTTOM_NAV_CONTENT_PX = 56

/** Fixed bottom nav total offset for main padding / banners. */
export const BOTTOM_NAV_OFFSET = `calc(${BOTTOM_NAV_CONTENT_PX}px + env(safe-area-inset-bottom, 0px))`

/** Toast / snackbar clearance above the bottom nav. */
export const BOTTOM_NAV_TOAST_OFFSET = `calc(${BOTTOM_NAV_CONTENT_PX}px + env(safe-area-inset-bottom, 0px) + 12px)`
