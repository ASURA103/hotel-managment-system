import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './lib/store.js' 
import { ThemeProvider } from './Components/ThemeContext.jsx'
import { setupApi } from './lib/api.js'

setupApi()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
