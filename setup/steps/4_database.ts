import { execSync } from 'node:child_process';

import { logSuccess, logError, getPackageManager } from '../utils';

export function runMigrations(): void {
  try {
    execSync(`${getPackageManager()} db:generate`, { stdio: 'ignore' });
    logSuccess('Database migrations completed successfully');
  } catch (error) {
    logError('Failed to run database migrations');
    throw error;
  }
}
