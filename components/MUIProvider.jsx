'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

export default function MUIProvider({ children }) {
  return (
    <AppRouterCacheProvider>
      {children}
    </AppRouterCacheProvider>
  )
}
