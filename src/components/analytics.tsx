'use client';

import { useEffect } from 'react';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics tracking events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for the expense tracker
export const trackExpenseAdded = (category: string, amount: number) => {
  trackEvent('expense_added', 'expense_management', category, amount);
};

export const trackExpenseDeleted = (category: string) => {
  trackEvent('expense_deleted', 'expense_management', category);
};

export const trackExpenseEdited = (category: string, amount: number) => {
  trackEvent('expense_edited', 'expense_management', category, amount);
};

export const trackBudgetSet = (amount: number) => {
  trackEvent('budget_set', 'budget_management', 'budget_amount', amount);
};

export const trackDataExported = (format: string) => {
  trackEvent('data_exported', 'data_management', format);
};

export const trackDataImported = (itemCount: number) => {
  trackEvent('data_imported', 'data_management', 'items_imported', itemCount);
};

export const trackThemeToggled = (theme: string) => {
  trackEvent('theme_toggled', 'ui_interaction', theme);
};

export const trackCategoryFiltered = (category: string) => {
  trackEvent('category_filtered', 'ui_interaction', category);
};

// Page view tracking
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-0YNGH618S7', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Component for initializing analytics
export const Analytics = () => {
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname, document.title);
  }, []);

  return null;
};

export default Analytics;