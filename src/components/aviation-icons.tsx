import { Plane, Gauge, Navigation, Wind, Clock, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface AviationIconProps {
  type: 'plane' | 'gauge' | 'navigation' | 'wind' | 'clock' | 'dollar' | 'trending' | 'alert';
  className?: string;
  size?: number;
}

export function AviationIcon({ type, className = "", size = 24 }: AviationIconProps) {
  const iconMap = {
    plane: Plane,
    gauge: Gauge,
    navigation: Navigation,
    wind: Wind,
    clock: Clock,
    dollar: DollarSign,
    trending: TrendingUp,
    alert: AlertCircle,
  };

  const Icon = iconMap[type];
  
  return (
    <div className={`aviation-icon ${className}`}>
      <Icon 
        size={size} 
        className={`${type === 'plane' ? 'text-sky-500' : 
                   type === 'gauge' ? 'text-blue-600' :
                   type === 'navigation' ? 'text-blue-800' :
                   type === 'wind' ? 'text-green-600' :
                   type === 'clock' ? 'text-amber-600' :
                   type === 'dollar' ? 'text-emerald-600' :
                   type === 'trending' ? 'text-indigo-600' :
                   type === 'alert' ? 'text-red-600' : 'text-gray-600'}`}
      />
    </div>
  );
}

// Aviation-themed decorative elements
export function AviationBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-10 left-10 opacity-5">
        <Plane size={120} className="text-blue-600" />
      </div>
      <div className="absolute top-1/3 right-20 opacity-3">
        <Navigation size={80} className="text-blue-800" />
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-4">
        <Gauge size={100} className="text-blue-600" />
      </div>
      <div className="absolute top-2/3 right-1/3 opacity-3">
        <Wind size={90} className="text-green-600" />
      </div>
    </div>
  );
}

// Aviation-themed status indicator
export function AviationStatus({ status, label }: { status: 'active' | 'warning' | 'inactive'; label: string }) {
  const statusColors = {
    active: 'bg-green-600',
    warning: 'bg-amber-600',
    inactive: 'bg-gray-600'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusColors[status]} status-indicator`}></div>
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );
}

// Aviation-themed badge
export function AviationBadge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'info' }) {
  const variantStyles = {
    default: 'bg-gradient-to-r from-sky-100 to-blue-100 text-blue-800 border border-sky-200',
    success: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200',
    warning: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200',
    info: 'bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border border-blue-200'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}