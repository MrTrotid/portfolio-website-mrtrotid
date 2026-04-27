// Imports clsx for conditional class names
import { clsx, type ClassValue } from 'clsx';
// Imports tailwind-merge for merging Tailwind classes
import { twMerge } from 'tailwind-merge';

// Utility function to merge and deduplicate Tailwind CSS classes
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
