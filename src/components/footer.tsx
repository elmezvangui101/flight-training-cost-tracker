import { AviationIcon } from '@/components/aviation-icons';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-cockpit-blue via-horizon-blue to-sky-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Aviation background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20">
          <AviationIcon type="plane" size={100} />
        </div>
        <div className="absolute bottom-10 left-20">
          <AviationIcon type="navigation" size={80} />
        </div>
        <div className="absolute top-1/2 right-1/3">
          <AviationIcon type="wind" size={60} />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="floating">
                <AviationIcon type="plane" size={28} />
              </div>
              <h3 className="text-xl font-bold">Flight Cost Tracker</h3>
            </div>
            <p className="text-sky-100 leading-relaxed mb-4">
              Premium aviation expense tracking for student pilots. Navigate your training budget from first lesson through checkride. 
              Your data stays securely in your cockpit - complete privacy guaranteed.
            </p>
            <div className="flex items-center gap-2 text-sm text-sky-200">
              <AviationIcon type="trending" size={16} />
              <span>Made for future pilots, by aviation professionals</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AviationIcon type="navigation" size={20} />
              <h4 className="text-lg font-semibold">Navigation</h4>
            </div>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                <li>
                  <a href="#how-it-works" className="text-sky-100 hover:text-white transition-colors flex items-center gap-2 hover-lift inline-block">
                    <AviationIcon type="gauge" size={14} />
                    Flight Instructions
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sky-100 hover:text-white transition-colors flex items-center gap-2 hover-lift inline-block">
                    <AviationIcon type="alert" size={14} />
                    Preflight Checklist
                  </a>
                </li>
                <li>
                  <a 
                    href="https://reddit.com/r/flying" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-100 hover:text-white transition-colors flex items-center gap-2 hover-lift inline-block"
                  >
                    <AviationIcon type="wind" size={14} />
                    Pilot Community
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.faa.gov/pilots/training" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-100 hover:text-white transition-colors flex items-center gap-2 hover-lift inline-block"
                  >
                    <AviationIcon type="navigation" size={14} />
                    FAA Resources
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Training Cost Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AviationIcon type="dollar" size={20} />
              <h4 className="text-lg font-semibold">Typical PPL Route</h4>
            </div>
            <div className="space-y-3 text-sm text-sky-100">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <AviationIcon type="plane" size={14} />
                  Aircraft Rental:
                </span>
                <span className="font-medium">$8,000-12,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <AviationIcon type="gauge" size={14} />
                  Instructor Time:
                </span>
                <span className="font-medium">$3,000-5,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <AviationIcon type="navigation" size={14} />
                  Materials & Fees:
                </span>
                <span className="font-medium">$1,000-2,000</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-white border-t border-sky-700 pt-2">
                <span className="flex items-center gap-2">
                  <AviationIcon type="trending" size={14} />
                  Total Route:
                </span>
                <span>$12,000-19,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mt-8 pt-8 border-t border-sky-700">
          <div className="text-center">
            <p className="text-sm text-sky-200 mb-4 leading-relaxed">
              Aviation Navigation: flight training cost tracker • student pilot budget app • pilot training expense tracker • 
              aviation expense tracker • track flight training costs • PPL cost calculator • flight school budget tool • 
              aircraft rental cost tracker • private pilot license cost • aviation budget planner
            </p>
            <div className="flex items-center gap-4 text-sm text-sky-200">
              <span>© 2025 Flight Cost Tracker</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span>Built with</span>
                <AviationIcon type="trending" size={16} />
                <span>for the aviation community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional SEO Content */}
        <div className="mt-8 pt-8 border-t border-sky-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-sky-200">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AviationIcon type="gauge" size={18} />
                <h5 className="font-semibold text-white">Why Navigate Your Training Costs?</h5>
              </div>
              <p className="leading-relaxed">
                Flight training is a significant investment. Most students exceed their planned budget by 30-50%. 
                Our aviation tracker helps you plan your route, maintain financial altitude, and avoid unexpected turbulence on your path to becoming a pilot.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AviationIcon type="alert" size={18} />
                <h5 className="font-semibold text-white">Cockpit Privacy</h5>
              </div>
              <p className="leading-relaxed">
                Unlike other expense trackers, your financial flight data never leaves your device. 
                No accounts, no servers, no tracking. Just pure aviation-grade cost tracking for student pilots who value privacy and security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}