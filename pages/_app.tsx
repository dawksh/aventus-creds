import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/components/ui/themeProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}
