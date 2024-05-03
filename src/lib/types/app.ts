interface BaseApp {
  id: number
  name: string
  description: string
  uuid: string
}

export type App = BaseApp &
  (
    | {
        type: 'web'
        meta: {
          background: string
          redirectTo: string
        }
      }
    | {
        type: 'vm'
        meta: {
          background: string
        }
      }
  )
