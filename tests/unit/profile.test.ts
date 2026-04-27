// Imports Vitest test utilities
import { describe, expect, it } from 'vitest';
// Imports profile data
import { profile } from '@/lib/profile';

// Test suite for profile data
describe('profile data', () => {
  // Test - verifies core identity fields
  it('contains core identity', () => {
    expect(profile.name).toBe('Baman Prasad Guragain');
    expect(profile.alias).toBe('MrTrotid');
    expect(profile.role.length).toBeGreaterThan(5);
  });

  // Test - verifies featured projects are present
  it('contains required featured projects', () => {
    // Gets project names
    const names = profile.projects.map((project) => project.name);
    expect(names).toContain('AQ Sentinel');
    expect(names).toContain('MeroAushadhi');
    expect(names).toContain('Sherlock Scramble Solver');
  });
});
