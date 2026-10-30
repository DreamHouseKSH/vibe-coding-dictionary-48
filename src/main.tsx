import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PreferencesProvider } from './preferences'
import { TooltipProvider } from '@/components/ui/tooltip'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider><TooltipProvider><App /></TooltipProvider></PreferencesProvider>
  </StrictMode>,
)
