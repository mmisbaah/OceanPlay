import AppHubConnector from '../atollingo/components/AppHubConnector';
import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"OceanPlay — English Games for Maldivian Learners",description:"A playful, curriculum-aligned English game world for Maldivian primary students.",icons: { icon: [{url:'/browser-icon-v2.png',type:'image/png'}], shortcut:'/browser-icon-v2.png', apple:'/browser-icon-v2.png' }};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head><body><AppHubConnector app="OceanPlay">{children}</AppHubConnector></body></html>}

