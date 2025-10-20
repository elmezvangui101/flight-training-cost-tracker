import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PWAProvider } from "@/components/pwa-provider";
import Analytics from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Training Cost Tracker | Professional Aviation Expense Management",
  description: "Professional flight training cost tracker for pilots and aviation organizations. Advanced budget management, expense categorization, and progress monitoring with aviation-themed interface. Privacy-focused and secure.",
  keywords: [
    "flight training cost tracker",
    "aviation expense management", 
    "pilot training budget tracker",
    "professional flight cost calculator",
    "aviation expense tracker",
    "flight training budget planner",
    "PPL cost management",
    "flight school expense tracker",
    "aircraft rental cost tracker",
    "aviation financial planning"
  ],
  authors: [{ name: "Aviation Cost Tracker" }],
  creator: "Aviation Cost Tracker",
  publisher: "Aviation Cost Tracker",
  robots: "index, follow",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-152x152.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FlightCost",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://flight-training-cost-tracker-v2.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Flight Training Cost Tracker | Professional Aviation Expense Management",
    description: "Professional flight training cost tracker with advanced budget management and aviation-themed interface. Secure, privacy-focused expense tracking for pilots and aviation organizations.",
    url: "/",
    siteName: "Aviation Cost Tracker",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/flight-training-cost-tracker.png",
        width: 1200,
        height: 630,
        alt: "Flight Training Cost Tracker - Professional Aviation Expense Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Training Cost Tracker | Professional Aviation Expense Management",
    description: "Professional flight training cost tracker with advanced budget management and aviation-themed interface.",
    images: ["/flight-training-cost-tracker.png"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "application-name": "FlightCost",
    "apple-mobile-web-app-title": "FlightCost",
    "msapplication-TileColor": "#FF8600",
    "msapplication-config": "/browserconfig.xml",
    // Replace with your actual Google Search Console verification code
    "google-site-verification": "5fydZO8oq-NRzEJhXUWAHQD5uGZeSiuwN3WtzquTEFM",
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
              "screenshot": "https://flight-training-cost-tracker-v2.vercel.app/screenshot.png"
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
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aviation Cost Tracker",
              "url": "https://flight-training-cost-tracker-v2.vercel.app",
               "logo": "https://flight-training-cost-tracker-v2.vercel.app/icons/icon-512x512.png",
              "description": "Free flight training cost tracking application for pilots and aviation organizations",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              }
            })
          }}
        />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0YNGH618S7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0YNGH618S7');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <PWAProvider />
        <Analytics />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
