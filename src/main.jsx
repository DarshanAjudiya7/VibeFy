import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import App from './App'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}queueMicrotask

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#1db954',
          colorBackground: '#191919',
          colorText: 'white',
          colorInputBackground: '#2a2a2a',
          colorInputText: 'white',
          borderRadius: '12px',
        },
        elements: {
          card: 'bg-[#121212] border border-white/10 shadow-2xl',
          headerTitle: 'text-2xl font-black text-white',
          headerSubtitle: 'text-[#b3b3b3]',
          socialButtonsBlockButton: 'bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all',
          socialButtonsBlockButtonText: 'text-white font-semibold',
          formButtonPrimary: 'bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]',
          footerActionLink: 'text-[#1db954] hover:text-[#1ed760] font-bold',
          formFieldInput: 'bg-[#2a2a2a] border-white/5 focus:border-[#1db954] focus:ring-1 focus:ring-[#1db954] transition-all',
          dividerText: 'text-[#b3b3b3]',
          dividerLine: 'bg-white/10'
        }
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)


