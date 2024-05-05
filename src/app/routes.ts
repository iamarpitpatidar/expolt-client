const adminPrefix = '/admin'
const settingsPrefix = `${adminPrefix}/settings`

export const routes = {
  settings: {
    general: `${settingsPrefix}`,
    resource: `${settingsPrefix}/resource`,
    network: `${settingsPrefix}/network`,
    account: `${settingsPrefix}/account`,
    appearance: `${settingsPrefix}/appearance`,
    notifications: `${settingsPrefix}/notifications`,
  },
}
