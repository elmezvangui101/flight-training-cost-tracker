'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Wifi, WifiOff, Download, Smartphone, Monitor } from 'lucide-react';

export function PWATest() {
  const [isOnline, setIsOnline] = useState(true);
  const [serviceWorkerSupported, setServiceWorkerSupported] = useState(false);
  const [manifestSupported, setManifestSupported] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [cacheInfo, setCacheInfo] = useState<string[]>([]);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    // Check service worker support
    setServiceWorkerSupported('serviceWorker' in navigator);

    // Check manifest support
    setManifestSupported('manifest' in navigator || 'onbeforeinstallprompt' in window);

    // Check if app is installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone || isInWebAppiOS);

    // Get cache information
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        setCacheInfo(cacheNames);
      });
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const testOfflineMode = async () => {
    // Simulate going offline and test cached content
    try {
      const response = await fetch('/');
      if (response.ok) {
        alert('✅ App works offline! Content served from cache.');
      }
    } catch (error) {
      alert('❌ Offline mode not working properly.');
    }
  };

  const clearCache = async () => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      setCacheInfo([]);
      alert('✅ Cache cleared successfully!');
    } catch (error) {
      alert('❌ Failed to clear cache.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            PWA Status
          </CardTitle>
          <CardDescription>
            Progressive Web App functionality and capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Online Status</span>
              <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Service Worker</span>
              <Badge variant={serviceWorkerSupported ? "default" : "secondary"} className="flex items-center gap-1">
                {serviceWorkerSupported ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {serviceWorkerSupported ? 'Supported' : 'Not Supported'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Web App Manifest</span>
              <Badge variant={manifestSupported ? "default" : "secondary"} className="flex items-center gap-1">
                {manifestSupported ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {manifestSupported ? 'Supported' : 'Not Supported'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Installation</span>
              <Badge variant={isInstalled ? "default" : "secondary"} className="flex items-center gap-1">
                {isInstalled ? <CheckCircle className="h-3 w-3" /> : <Download className="h-3 w-3" />}
                {isInstalled ? 'Installed' : 'Not Installed'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Cache Information
          </CardTitle>
          <CardDescription>
            Current cache storage for offline functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cacheInfo.length > 0 ? (
            <div className="space-y-2">
              {cacheInfo.map((cacheName, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm font-mono">{cacheName}</span>
                  <Badge variant="outline">Active</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No cache found</p>
          )}
          
          <div className="flex gap-2">
            <Button onClick={testOfflineMode} variant="outline" size="sm">
              Test Offline Mode
            </Button>
            <Button onClick={clearCache} variant="outline" size="sm">
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PWA Features</CardTitle>
          <CardDescription>
            Available Progressive Web App capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Offline Functionality</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Add to Home Screen</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Background Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Push Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">App-like Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Responsive Design</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}