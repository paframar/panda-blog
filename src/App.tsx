import React from 'react'
import AppRouter from './AppRouter'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from './context/AuthContext'
import { ErrorProvider } from './context/ErrorContext'

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <ErrorProvider>
              <AppRouter />
            </ErrorProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
