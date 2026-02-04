'use client'

import { createContext, useContext, useState } from 'react'
import { ReactNode } from 'react'

const PageTitleContext = createContext<{ title: string, setTitle: (t: string) => void }>({ title: '', setTitle: () => {} })

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('Accueil')
  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  )
}

export function usePageTitle() {
  return useContext(PageTitleContext)
}
