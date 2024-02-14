import Nav from './components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <head> 
        <Script src="https://cdn.tiny.cloud/1/mnjsi8c00iga0yq3zcnsif090me3lskqlwtz5y5mmr6twwdg/tinymce/6/tinymce.min.js" referrerPolicy="origin"></Script>
        <Script src="https://cdn.tiny.cloud/1/mnjsi8c00iga0yq3zcnsif090me3lskqlwtz5y5mmr6twwdg/tinymce/6/plugins/anchor/plugin.min.js" referrerPolicy="origin"></Script>
        </head>
      <body className={inter.className}>
        <Nav/>
        {children}
        </body>
    </html>
  )
}
