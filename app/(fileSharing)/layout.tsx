import React from 'react'
import ClientThemeRegistry from '../ThemeRegistryDynamic'
import { MediaBackground } from '@/components/MediaBackground'
import { FileProvider } from '@/context/FileContext'

export default function layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientThemeRegistry>
      <MediaBackground>
        <FileProvider>{children}</FileProvider>
      </MediaBackground>
    </ClientThemeRegistry>
  )
}
