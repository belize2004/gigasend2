import React from 'react'
import ClientThemeRegistry from '../ThemeRegistryDynamic'
import { MediaBackground } from '@/components/MediaBackground'
import ProtectedPage from '@/components/ProtectedPage';

export default function layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientThemeRegistry>
      <MediaBackground>
        <ProtectedPage>
          {children}
        </ProtectedPage>
      </MediaBackground>
    </ClientThemeRegistry>
  )
}
