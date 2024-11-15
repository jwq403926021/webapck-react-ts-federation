import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/normalize.css'
import './scss/index.scss'
import App from './App.tsx'
import {createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material";
import './locales/i18n.js'
const defaultTheme = createTheme();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
