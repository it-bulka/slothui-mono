import { type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@/app/config/store/appReducer'
import { MemoryRouter } from 'react-router'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeStoryStore = (preloadedState?: any) =>
  configureStore({
    reducer: appReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { services: {}, updateToken: () => {}, extractErrorMessage: () => '' } },
        serializableCheck: false,
      }),
  })

export const withReduxStore =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (preloadedState?: any) =>
  (Story: () => ReactNode) => (
    <Provider store={makeStoryStore(preloadedState)}>
      <Story />
    </Provider>
  )

export const withRouter = (Story: () => ReactNode) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
)

export const withReduxAndRouter =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (preloadedState?: any) =>
  (Story: () => ReactNode) => (
    <Provider store={makeStoryStore(preloadedState)}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </Provider>
  )
