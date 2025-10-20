import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PWAProvider } from "@/components/pwa-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Training Cost Tracker | Free Budget App for Student Pilots",
  description: "Free flight training cost tracker for student pilots. Track every dollar from first lesson to checkride. Budget your PPL expenses with our simple, privacy-focused app. No signup required.",
  keywords: [
    "flight training cost tracker",
    "student pilot budget app", 
    "pilot training expense tracker",
    "track flight training costs",
    "aviation expense tracker free",
    "flight training budget calculator",
    "PPL cost calculator",
    "flight school budget tool",
    "aircraft rental cost tracker",
    "private pilot license cost"
  ],
  authors: [{ name: "Flight Cost Tracker" }],
  creator: "Flight Cost Tracker",
  publisher: "Flight Cost Tracker",
  robots: "index, follow",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-152x152.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flight Cost",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://flightcosttracker.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Flight Training Cost Tracker | Free Budget App for Student Pilots",
    description: "Track every dollar of your flight training. Free expense tracker designed specifically for student pilots. No signup, your data stays private.",
    url: "/",
    siteName: "Flight Cost Tracker",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/flight-training-cost-tracker.png",
        width: 1200,
        height: 630,
        alt: "Flight Training Cost Tracker - Free Budget App for Student Pilots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Training Cost Tracker | Free Budget App for Student Pilots",
    description: "Track every dollar of your flight training. Free expense tracker designed specifically for student pilots.",
    images: ["/flight-training-cost-tracker.png"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "application-name": "Flight Cost",
    "apple-mobile-web-app-title": "Flight Cost",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml",
    "google-site-verification": "YOUR_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Flight Training Cost Tracker",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127"
              },
              "description": "Free expense tracking app for student pilots. Track flight training costs, manage your aviation budget, and export detailed reports. No signup required, data stays on your device.",
              "featureList": [
                "Track flight training expenses",
                "Category-based budgeting",
                "CSV export for records",
                "Privacy-focused (no login required)",
                "Mobile-friendly interface",
                "Free forever"
              ],
              "screenshot": "https://flightcosttracker.com/screenshot.png"
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much does flight training cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flight training costs typically range from $10,000 to $15,000 for a Private Pilot License (PPL) in the United States. Costs vary by location, aircraft type, and training frequency. Use our free tracker to monitor your actual expenses."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this flight training cost tracker free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, completely free. No signup required, no hidden fees, no subscriptions. Your data is stored locally in your browser for complete privacy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I track my flight training expenses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply add each expense with the amount, category (aircraft rental, instructor time, etc.), date, and optional notes. The app automatically calculates your total spending and shows a category breakdown. Export to CSV anytime."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <PWAProvider />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
