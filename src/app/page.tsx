'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image'
import { PWATest } from '@/components/pwa-test';
import { HowItWorks } from '@/components/how-it-works';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';
import { AviationIcon, AviationBackground } from '@/components/aviation-icons';
import { 
  trackExpenseAdded, 
  trackExpenseDeleted, 
  trackExpenseEdited, 
  trackBudgetSet, 
  trackDataExported,
  trackThemeToggled 
} from '@/components/analytics';

interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
  notes: string;
}

const CATEGORIES = [
  "Aircraft Rental",
  "Instructor Time", 
  "Ground School",
  "Medical Certificate",
  "Written Test Fees",
  "Checkride Fee",
  "Books & Materials",
  "Headset & Equipment",
  "ForeFlight/EFB Subscription",
  "Club Membership Dues",
  "Fuel Costs",
  "Landing/Airport Fees",
  "Other"
];

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [exportSuccess, setExportSuccess] = useState('');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editError, setEditError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [budgetGoal, setBudgetGoal] = useState(0);
  const [showBudgetSettings, setShowBudgetSettings] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [amountError, setAmountError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    loadExpenses();
    loadDarkModePreference();
    loadBudgetGoal();
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Onboarding guide for first-time visitors
    const seenGuide = localStorage.getItem('seenGuide');
    if (!seenGuide) {
      setShowGuide(true);
      localStorage.setItem('seenGuide', 'true');
    }

    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadExpenses = () => {
    try {
      const stored = localStorage.getItem('flightExpenses');
      if (stored) {
        setExpenses(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const loadDarkModePreference = () => {
    try {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) {
        setDarkMode(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Track theme toggle
    trackThemeToggled(newDarkMode ? 'dark' : 'light');
    
    try {
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const loadBudgetGoal = () => {
    try {
      const stored = localStorage.getItem('budgetGoal');
      if (stored) {
        setBudgetGoal(parseFloat(stored));
        setBudgetInput(stored);
      }
    } catch (error) {
      console.error('Error loading budget goal:', error);
    }
  };

  const saveBudgetGoal = (goal: number) => {
    try {
      localStorage.setItem('budgetGoal', goal.toString());
      setBudgetGoal(goal);
    } catch (error) {
      console.error('Error saving budget goal:', error);
    }
  };

  const handleSetBudget = () => {
    const goal = parseFloat(budgetInput);
    if (!isNaN(goal) && goal > 0) {
      saveBudgetGoal(goal);
      
      // Track budget setting
      trackBudgetSet(goal);
      
      setShowBudgetSettings(false);
      setSuccess('Budget goal set successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Please enter a valid budget amount greater than 0');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleClearBudget = () => {
    saveBudgetGoal(0);
    setBudgetInput('');
    setShowBudgetSettings(false);
    setSuccess('Budget goal cleared!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const calculateBudgetProgress = () => {
    if (budgetGoal <= 0) return 0;
    const total = calculateTotal();
    return Math.min((total / budgetGoal) * 100, 100);
  };

  const getBudgetStatus = () => {
    if (budgetGoal <= 0) return { text: 'No budget set', color: 'text-gray-600 dark:text-gray-300' };
    const total = calculateTotal();
    const percentage = (total / budgetGoal) * 100;
    
    if (percentage >= 100) {
      return { text: 'Budget exceeded!', color: 'text-red-600 dark:text-red-300' };
    } else if (percentage >= 80) {
      return { text: 'Budget warning', color: 'text-yellow-600 dark:text-yellow-400' };
    } else {
      return { text: 'On track', color: 'text-green-600 dark:text-green-300' };
    }
  };

  const saveToLocalStorage = (expenses: Expense[]) => {
    try {
      localStorage.setItem('flightExpenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
      setError('Storage quota exceeded. Please export your data.');
    }
  };

  const validateForm = () => {
    let valid = true;
    if (!amount || parseFloat(amount) <= 0) {
      setAmountError('Enter a valid amount (> 0)');
      valid = false;
    } else {
      setAmountError('');
    }
    if (!category) {
      setCategoryError('Select a category');
      valid = false;
    } else {
      setCategoryError('');
    }
    if (!date) {
      setDateError('Select a date');
      valid = false;
    } else {
      setDateError('');
    }
    if (!valid) setError('Please fix the highlighted fields');
    return valid;
  };

  // Inline validation handlers
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setAmount(v);
    if (!v || parseFloat(v) <= 0) setAmountError('Enter a valid amount (> 0)');
    else setAmountError('');
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    setCategory(v);
    if (!v) setCategoryError('Select a category'); else setCategoryError('');
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setDate(v);
    if (!v) setDateError('Select a date'); else setDateError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    const newExpense: Expense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date,
      notes: notes.substring(0, 200)
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    saveToLocalStorage(updatedExpenses);

    // Track expense addition
    trackExpenseAdded(category, parseFloat(amount));

    // Clear form
    setAmount('');
    setCategory('');
    setNotes('');
    setDate(new Date().toISOString().split('T')[0]);

    setSuccess('Expense added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id: number, amount: number) => {
    if (confirm(`Delete this $${amount.toFixed(2)} expense?`)) {
      const expenseToDelete = expenses.find(exp => exp.id === id);
      const updatedExpenses = expenses.filter(exp => exp.id !== id);
      setExpenses(updatedExpenses);
      saveToLocalStorage(updatedExpenses);
      
      // Track expense deletion
      if (expenseToDelete) {
        trackExpenseDeleted(expenseToDelete.category);
      }
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setEditAmount(expense.amount.toString());
    setEditCategory(expense.category);
    setEditDate(expense.date);
    setEditNotes(expense.notes);
    setEditError('');
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setEditAmount('');
    setEditCategory('');
    setEditDate('');
    setEditNotes('');
    setEditError('');
  };

  const validateEditForm = () => {
    if (!editAmount || parseFloat(editAmount) <= 0) {
      setEditError('Please enter a valid amount greater than 0');
      return false;
    }
    if (!editCategory) {
      setEditError('Please select a category');
      return false;
    }
    if (!editDate) {
      setEditError('Please select a date');
      return false;
    }
    return true;
  };

  const handleUpdateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');

    if (!validateEditForm() || !editingExpense) return;

    const updatedExpense: Expense = {
      ...editingExpense,
      amount: parseFloat(editAmount),
      category: editCategory,
      date: editDate,
      notes: editNotes.substring(0, 200)
    };

    const updatedExpenses = expenses.map(exp => 
      exp.id === editingExpense.id ? updatedExpense : exp
    );
    
    setExpenses(updatedExpenses);
    saveToLocalStorage(updatedExpenses);
    
    // Track expense editing
    trackExpenseEdited(editCategory, parseFloat(editAmount));
    
    handleCancelEdit();
    
    setSuccess('Expense updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  const calculateCategoryBreakdown = () => {
    const breakdown: { [key: string]: number } = {};
    expenses.forEach(exp => {
      breakdown[exp.category] = (breakdown[exp.category] || 0) + exp.amount;
    });
    const total = calculateTotal();
    return Object.entries(breakdown)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Amount', 'Notes'];
    const rows = expenses.map(exp => [
      exp.date,
      exp.category,
      exp.amount.toFixed(2),
      `"${exp.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flight-training-expenses-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Track CSV export
    trackDataExported('CSV');
    
    setExportSuccess('CSV exported successfully!');
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const total = calculateTotal();
  const categoryBreakdown = calculateCategoryBreakdown();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 relative">
      {/* Aviation Background Elements */}
      <AviationBackground />

      {/* Sticky Top Navigation */}
      <nav role="navigation" aria-label="Primary" className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-sky-200 dark:border-sky-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AviationIcon type="plane" size={20} />
            <span className="text-sm sm:text-base font-semibold">Flight Training Cost Tracker</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <a href="#budget-altimeter" className="hover:text-sky-700 dark:hover:text-sky-300 focus-visible:ring-2 ring-sky-500 rounded px-1">Budget</a>
            <a href="#add-expense" className="hover:text-sky-700 dark:hover:text-sky-300 focus-visible:ring-2 ring-sky-500 rounded px-1">Add Expense</a>
            <a href="#category-breakdown" className="hover:text-sky-700 dark:hover:text-sky-300 focus-visible:ring-2 ring-sky-500 rounded px-1">Breakdown</a>
            <a href="#expenses" className="hover:text-sky-700 dark:hover:text-sky-300 focus-visible:ring-2 ring-sky-500 rounded px-1">Expenses</a>
            <a href="#pwa-status" className="hover:text-sky-700 dark:hover:text-sky-300 focus-visible:ring-2 ring-sky-500 rounded px-1">PWA</a>
            <a href="#faq" className="hover:text-sky-700 dark:hover:text-sky-300 focus-visible:ring-2 ring-sky-500 rounded px-1">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${isOnline ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </nav>

      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-600 text-white px-4 py-2 rounded z-50">
        Skip to main content
      </a>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10 space-y-12">
        {/* Header */}
        <header className="text-center mb-8 slide-in">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 border border-sky-200 dark:border-sky-800 hover-lift focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-fuel-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-cockpit-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="floating">
              <AviationIcon type="plane" size={48} className="text-orange-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black font-aviation bg-gradient-to-r from-blue-600 via-sky-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
              Flight Training Cost Tracker
            </h1>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 subtitle font-medium">
            Track every dollar from first lesson to checkride
          </p>

          {/* Total Display */}
          <div className="total-display rounded-xl p-6 mb-8 aviation-card">
            <div className="flex items-center justify-center gap-2 mb-3">
              <AviationIcon type="dollar" size={20} />
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Investment</div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-green-500 bg-clip-text text-transparent" id="totalAmount">
              {formatCurrency(total)}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-3 flex items-center justify-center gap-2">
              <AviationIcon type="gauge" size={16} />
              Your Private Pilot License journey
            </div>
          </div>

          {/* Budget Progress */}
          <div className="aviation-card rounded-xl p-6 mb-8 hover-lift">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <AviationIcon type="gauge" size={20} />
                <h3 className="text-lg font-semibold text-cockpit-blue dark:text-sky-400">Budget Altimeter</h3>
              </div>
              <button
                onClick={() => setShowBudgetSettings(!showBudgetSettings)}
                className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 font-medium text-sm flex items-center gap-1 hover-lift px-3 py-1 rounded-lg bg-sky-50 dark:bg-sky-900/20"
              >
                <AviationIcon type="navigation" size={16} />
                {budgetGoal > 0 ? 'Adjust Course' : 'Set Budget'}
              </button>
            </div>
            
            {budgetGoal > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-wing-gray dark:text-gray-300 flex items-center gap-2">
                    <AviationIcon type="dollar" size={16} />
                    {formatCurrency(total)} of {formatCurrency(budgetGoal)}
                  </span>
                  <div className="flex items-center gap-2">
                    <AviationIcon 
                      type={calculateBudgetProgress() >= 100 ? 'alert' : 
                             calculateBudgetProgress() >= 80 ? 'alert' : 'trending'} 
                      size={16} 
                    />
                    <span className={`text-sm font-medium ${
                      calculateBudgetProgress() >= 100 
                        ? 'text-nav-red dark:text-red-300' 
                        : calculateBudgetProgress() >= 80 
                        ? 'text-fuel-orange dark:text-yellow-300' 
                        : 'text-altitude-green dark:text-green-300'
                    }`}>
                      {getBudgetStatus().text}
                    </span>
                  </div>
                </div>
                <div className="aviation-progress w-full rounded-full h-4 mb-3">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 relative overflow-hidden ${
                      calculateBudgetProgress() >= 100 
                        ? 'bg-gradient-to-r from-nav-red to-red-600' 
                        : calculateBudgetProgress() >= 80 
                        ? 'bg-gradient-to-r from-fuel-orange to-yellow-500' 
                        : 'bg-gradient-to-r from-altitude-green to-emerald-500'
                    }`}
                    style={{ width: `${calculateBudgetProgress()}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-right text-sm text-wing-gray dark:text-gray-300 flex items-center justify-end gap-2">
                  <AviationIcon type="trending" size={14} />
                  {calculateBudgetProgress().toFixed(1)}% of budget used
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-wing-gray dark:text-gray-300">
                <AviationIcon type="navigation" size={32} className="mx-auto mb-3 opacity-50" />
                <p>No flight plan set. Click "Set Budget" to track your training journey.</p>
              </div>
            )}

            {/* Budget Settings */}
            {showBudgetSettings && (
              <div className="mt-4 pt-4 border-t border-sky-200 dark:border-sky-800">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <AviationIcon type="dollar" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wing-gray" />
                    <input
                      type="number"
                      placeholder="Enter budget target"
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 aviation-input rounded-lg focus:outline-none"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <button
                    onClick={handleSetBudget}
                    className="aviation-btn-primary px-6 py-2 rounded-lg text-white font-medium hover-lift flex items-center gap-2"
                  >
                    <AviationIcon type="navigation" size={16} />
                    Set Course
                  </button>
                  {budgetGoal > 0 && (
                    <button
                      onClick={handleClearBudget}
                      className="px-4 py-2 bg-nav-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium hover-lift flex items-center gap-2"
                    >
                      <AviationIcon type="alert" size={16} />
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <main role="main" id="main-content">
          <article>


            {/* Add Expense Form */}
            <section id="add-expense" className="aviation-card rounded-xl p-6 mb-8 hover-lift border border-sky-200 dark:border-sky-800 shadow-lg" aria-label="Add expense form">
              <div className="flex items-center gap-3 mb-6">
                <AviationIcon type="navigation" size={28} />
                <h2 className="text-3xl font-bold font-aviation text-cockpit-blue dark:text-sky-400">Log Flight Training Expense</h2>
              </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 px-4 py-3 rounded mb-4" role="alert" aria-live="polite">
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300 px-4 py-3 rounded mb-4" role="status" aria-live="polite">
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
                <span>{success}</span>
              </div>
            )}
            {exportSuccess && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300 px-4 py-3 rounded mb-4" role="status" aria-live="polite">
                {exportSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      step="0.01"
                      placeholder="Amount ($)"
                      value={amount}
                      onChange={handleAmountChange}
                      aria-invalid={!!amountError}
                      aria-describedby="amount-error"
                      className="w-full px-3 py-2 aviation-input rounded-lg focus:outline-none"
                      required
                    />
                    {amountError && (
                      <p id="amount-error" className="mt-1 text-xs text-red-600 dark:text-red-300">{amountError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={handleCategoryChange}
                      aria-invalid={!!categoryError}
                      aria-describedby="category-error"
                      className="w-full px-3 py-2 aviation-select rounded-lg focus:outline-none"
                      required
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {categoryError && (
                      <p id="category-error" className="mt-1 text-xs text-red-600 dark:text-red-300">{categoryError}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={handleDateChange}
                      aria-invalid={!!dateError}
                      aria-describedby="date-error"
                      className="w-full px-3 py-2 aviation-input rounded-lg focus:outline-none"
                      required
                    />
                    {dateError && (
                      <p id="date-error" className="mt-1 text-xs text-red-600 dark:text-red-300">{dateError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Notes (optional)
                    </label>
                    <input
                      type="text"
                      id="notes"
                      placeholder="Notes (optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={200}
                      className="w-full px-3 py-2 aviation-input rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full aviation-btn-primary py-3 px-4 rounded-md shadow hover:-translate-y-0.5 transition-all font-semibold text-lg min-h-[48px]"
              >
                Add Expense
              </button>
            </form>
          </section>



          {/* Category Breakdown */}
          {categoryBreakdown.length > 0 && (
            <section id="category-breakdown" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-sky-200 dark:border-sky-800 p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
          <AviationIcon type="trending" size={28} />
          <h2 className="text-3xl font-bold font-aviation mb-4 text-gray-800 dark:text-gray-200">Spending by Category</h2>
        </div>
              {/* Text Breakdown */}
              <div className="space-y-3">
                {categoryBreakdown.map(({ category, amount, percentage }) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{category}</span>
                        <span className="text-gray-900 dark:text-gray-100 font-semibold">
                          {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Expense List */}
          <section id="expenses" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-sky-200 dark:border-sky-800 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
          <AviationIcon type="clock" size={28} />
          <h2 className="text-3xl font-bold font-aviation mb-4 text-gray-800 dark:text-gray-200">Expenses</h2>
        </div>
            {expenses.length === 0 ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                No expenses yet. Add your first expense above!
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {expenses.map((expense, index) => (
                  <div
                    key={expense.id}
                    className={`p-4 rounded-lg border ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                    } hover:shadow-md transition-shadow`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 dark:text-gray-200">{expense.category}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">{expense.date}</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mr-4">
                        {formatCurrency(expense.amount)}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id, expense.amount)}
                          className="text-red-600 dark:text-red-300 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expense.notes && (
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {expense.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Export Button */}
          <div className="mb-8 text-center">
            <button
                onClick={exportToCSV}
                className="aviation-btn-secondary py-2 px-6 rounded-md shadow transition-colors font-semibold min-h-[44px]"
              >
                Export CSV
              </button>
          </div>

          {/* How It Works Section */}
          <HowItWorks />

          {/* Typical PPL Costs Summary */}
          <section className="aviation-card rounded-xl p-6 mb-8 border border-sky-200 dark:border-sky-800 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <AviationIcon type="gauge" size={28} />
              <h2 className="text-3xl font-bold font-aviation text-cockpit-blue dark:text-sky-400">Typical PPL Costs</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-sky-100 dark:border-sky-900">
                <div className="font-semibold">Aircraft Rental</div>
                <div className="text-wing-gray">$150–200/hr</div>
              </div>
              <div className="p-3 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-sky-100 dark:border-sky-900">
                <div className="font-semibold">Instructor Time</div>
                <div className="text-wing-gray">$50–75/hr</div>
              </div>
              <div className="p-3 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-sky-100 dark:border-sky-900">
                <div className="font-semibold">Materials & Fees</div>
                <div className="text-wing-gray">$1,000+</div>
              </div>
            </div>
          </section>





          {/* FAQ Section */}
          <FAQ />
          </article>
        </main>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 aviation-btn-primary rounded-full w-12 h-12 shadow-lg flex items-center justify-center focus-visible:ring-2 focus-visible:ring-aviation-orange"
            aria-label="Scroll to top"
          >
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M3 12l7-7 7 7H3z"/></svg>
          </button>
        )}

        {/* Onboarding Guide */}
        {showGuide && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">How to Use</h3>
                <button onClick={() => setShowGuide(false)} aria-label="Close guide" className="text-gray-500 hover:text-gray-700">×</button>
              </div>
              <ol className="list-decimal ml-5 space-y-2 text-sm">
                <li>Set your training budget in <a href="#budget-altimeter" className="text-sky-600 underline">Budget Altimeter</a>.</li>
                <li>Log expenses in <a href="#add-expense" className="text-sky-600 underline">Add Expense</a>.</li>
                <li>Review category breakdown and export CSV for records.</li>
              </ol>
              <div className="text-right mt-4">
                <button onClick={() => setShowGuide(false)} className="aviation-btn-primary px-4 py-2 rounded-md">Got it</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Edit Modal */}
      {editingExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Expense</h3>
              
              {editError && (
                <div className="bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 px-4 py-3 rounded mb-4">
                  {editError}
                </div>
              )}

              <form onSubmit={handleUpdateExpense} className="space-y-4">
                <div>
                  <label htmlFor="edit-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    id="edit-amount"
                    step="0.01"
                    placeholder="Amount ($)"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full px-3 py-2 aviation-input rounded-lg focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="edit-category"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 aviation-select rounded-lg focus:outline-none"
                    required
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="edit-date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3 py-2 aviation-input rounded-lg focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    id="edit-notes"
                    placeholder="Notes (optional)"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    maxLength={200}
                    className="w-full px-3 py-2 aviation-input rounded-lg focus:outline-none"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                  type="submit"
                  className="flex-1 aviation-btn-primary py-2 px-4 rounded-md transition-colors font-medium"
                >
                  Update
                </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 active:bg-gray-500 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}