import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
title: 'Gosha Kazakov-Pokrovsky',
  description: 'Director. Film and commercial director based in Moscow and Berlin.',
  keywords: 'Gosha Kazakov-Pokrovsky, Georgy Kazakov-Pokrovsky, Georgiy Kazakov-Pokrovsktiy, director, film director, commercial director',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
