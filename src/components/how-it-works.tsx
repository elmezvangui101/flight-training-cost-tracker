import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AviationIcon } from '@/components/aviation-icons';

export function HowItWorks() {
  return (
    <section className="how-it-works bg-gradient-to-br from-sky-50/50 via-white to-horizon-blue/5 dark:from-gray-800/50 dark:via-gray-900 dark:to-cockpit-blue/5 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="how-it-works">
      {/* Aviation background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <AviationIcon type="navigation" size={60} />
        </div>
        <div className="absolute bottom-10 right-10">
          <AviationIcon type="gauge" size={80} />
        </div>
        <div className="absolute top-1/2 left-1/4">
          <AviationIcon type="wind" size={50} />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 slide-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AviationIcon type="navigation" size={32} />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cockpit-blue via-sky-600 to-horizon-blue bg-clip-text text-transparent">
              Your Flight Path to Budget Success
            </h2>
          </div>
          <p className="text-lg text-wing-gray dark:text-gray-300 max-w-3xl mx-auto">
            Navigate your training costs with precision. Our aviation-themed tools help you track every dollar of your journey to the skies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover-lift aviation-card border-sky-200 dark:border-sky-800">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900 dark:to-sky-800 rounded-full flex items-center justify-center mb-4 floating">
                <AviationIcon type="plane" size={36} />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-cockpit-blue to-sky-600 bg-clip-text text-transparent">
                Preflight Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-wing-gray dark:text-gray-300 leading-relaxed">
                Log each training session immediately after landing. Record aircraft rental, instructor time, and all training costs. Takes 10 seconds on mobile.
              </p>
              <div className="mt-4 text-sm text-sky-600 dark:text-sky-400 font-medium flex items-center justify-center gap-2">
                <AviationIcon type="clock" size={16} />
                ✅ 13 aviation categories
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift aviation-card border-sky-200 dark:border-sky-800">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-altitude-green/10 to-emerald-100 dark:from-altitude-green/20 dark:to-emerald-900 rounded-full flex items-center justify-center mb-4 floating" style={{ animationDelay: '0.5s' }}>
                <AviationIcon type="gauge" size={36} />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-cockpit-blue to-sky-600 bg-clip-text text-transparent">
                Navigate Your Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-wing-gray dark:text-gray-300 leading-relaxed">
                Monitor your training altitude in real-time. Compare against typical PPL costs ($10,000-$15,000). Set budget targets and track your progress.
              </p>
              <div className="mt-4 text-sm text-altitude-green dark:text-green-400 font-medium flex items-center justify-center gap-2">
                <AviationIcon type="trending" size={16} />
                📊 Real-time budget tracking
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift aviation-card border-sky-200 dark:border-sky-800">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-fuel-orange/10 to-amber-100 dark:from-fuel-orange/20 dark:to-amber-900 rounded-full flex items-center justify-center mb-4 floating" style={{ animationDelay: '1s' }}>
                <AviationIcon type="navigation" size={36} />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-cockpit-blue to-sky-600 bg-clip-text text-transparent">
                Flight Log Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-wing-gray dark:text-gray-300 leading-relaxed">
                Download complete flight logs as CSV reports. Perfect for sharing with family, tax records, or loan applications. Your data, your controls.
              </p>
              <div className="mt-4 text-sm text-fuel-orange dark:text-amber-400 font-medium flex items-center justify-center gap-2">
                <AviationIcon type="wind" size={16} />
                📁 CSV export anytime
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="aviation-card bg-gradient-to-r from-sky-50 to-horizon-blue/10 dark:from-cockpit-blue/10 dark:to-sky-900/20 rounded-xl p-6 max-w-4xl mx-auto border-sky-200 dark:border-sky-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AviationIcon type="alert" size={24} />
              <h3 className="text-xl font-semibold text-cockpit-blue dark:text-sky-400">
                Why Student Pilots Need Cost Tracking
              </h3>
            </div>
            <p className="text-wing-gray dark:text-gray-300 leading-relaxed">
              Most student pilots exceed their budget by 30-50%. Our aviation-themed tracker helps you maintain financial altitude, 
              identify cost-saving tailwinds, provide transparency to sponsors, plan your route to certification, 
              and avoid turbulence in your training journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}