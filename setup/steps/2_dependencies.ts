import { execSync } from 'node:child_process';

import { logInfo, logSuccess, logError, getPackageManager } from '../utils';

// Install dependencies
export function installDependencies(): void {
  try {
    // Check for package manager
    const packageManager = getPackageManager();

    logInfo(`Using ${packageManager} as package manager`);

    execSync(`${packageManager} install`, { stdio: 'ignore' });
    logSuccess('Dependencies installed successfully');
  } catch (error) {
    logError('Failed to install dependencies');
    throw error;
  }
}
