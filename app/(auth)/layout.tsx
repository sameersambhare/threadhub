import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
export const metadata = {
    title: 'ThreadsHub',
    description: "An social media like app created using the nextjs."
}
const inter = Inter({
    subsets: ["latin"]
})
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    <div className="w-full items-center justify-center flex min-h-screen">{children}</div>
                </body>
            </html>
        </ClerkProvider>
    )
}