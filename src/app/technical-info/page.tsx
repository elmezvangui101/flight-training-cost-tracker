import type { Metadata } from 'next'
import { PWATest } from '@/components/pwa-test'

export const metadata: Metadata = {
  title: 'Technical Info',
  description: 'Hidden technical page for PWA status, cache info, and features',
  robots: { index: false, follow: false },
}

export default function TechnicalInfoPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Technical Information</h1>
      <p className="text-sm text-muted-foreground mb-6">
        This page provides Progressive Web App diagnostics (status, cache details, and features). It is not linked in the public UI.
      </p>
      <PWATest />
    </main>
  )
}