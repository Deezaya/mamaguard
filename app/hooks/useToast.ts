/**
 * useToast Hook - Show toast notifications
 */

import { useCallback } from 'react';

export interface ToastOptions {
  duration?: number;
}

export const useToast = () => {
  const showToast = useCallback((title: string, message: string, options?: ToastOptions) => {
    const { duration = 3500 } = options || {};

    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <strong>${title}</strong>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // Remove toast after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, duration);
  }, []);

  const success = useCallback(
    (title: string, message: string) => showToast(title, message),
    [showToast]
  );

  const error = useCallback(
    (title: string, message: string) => showToast(title, message),
    [showToast]
  );

  const info = useCallback(
    (title: string, message: string) => showToast(title, message),
    [showToast]
  );

  return { showToast, success, error, info };
};
