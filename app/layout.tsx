import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={title:"OceanPlay — English Games for Maldivian Learners",description:"A playful, curriculum-aligned English game world for Maldivian primary students."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
