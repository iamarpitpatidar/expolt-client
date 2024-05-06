import * as appActions from './apps'
import * as authActions from './auth'
import * as userActions from './users'
import * as SettingsActions from './settings'

export const { getAdminApps, getApps, createApp, updateApp, deleteApp } =
  appActions
export const { login, resetPassword, sendPasswordResetMail } = authActions
export const { getUsers, createUser, updateUser, deleteUser } = userActions
export const { getSettings } = SettingsActions
