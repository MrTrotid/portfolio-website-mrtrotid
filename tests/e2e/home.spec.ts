// Imports Playwright test utilities
import { expect, test } from '@playwright/test';

// E2E test - verifies home page renders core sections
test('home renders core sections', async ({ page }) => {
  // Navigate to home page
  await page.goto('/');

  // Verifies main heading is visible
  await expect(page.getByRole('heading', { level: 1, name: /Baman Prasad Guragain/i })).toBeVisible();
  // Verifies Projects heading is visible
  await expect(page.getByRole('heading', { name: /Projects/i })).toBeVisible();
  // Verifies Contact heading is visible
  await expect(page.getByRole('heading', { name: /Contact/i })).toBeVisible();
});

// E2E test - verifies mobile navigation is available
test('mobile layout keeps navigation available', async ({ page }) => {
  // Navigate to home page
  await page.goto('/');
  // Verifies Projects link is visible on mobile
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
});
