/** Fired after BT settings are successfully saved so open dialogs can refetch. */
export const SETTINGS_CHANGED_EVENT = 'torrserver:settings-changed'

export const notifySettingsChanged = (): void => {
  try {
    window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT))
  } catch {
    // ignore (SSR / non-browser)
  }
}
