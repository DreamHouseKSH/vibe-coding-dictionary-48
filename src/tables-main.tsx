import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TableGuide } from './TableGuide.tsx'
import { PreferencesProvider } from './preferences'
import { TooltipProvider } from '@/components/ui/tooltip'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider><TooltipProvider><TableGuide /></TooltipProvider></PreferencesProvider>
  </StrictMode>,
)
