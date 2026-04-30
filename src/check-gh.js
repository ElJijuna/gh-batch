import { execSync } from 'child_process';

export function checkGh() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch {
    console.error('Error: gh CLI is not installed.');
    console.error('Install it from https://cli.github.com/ and run `gh auth login`.');
    process.exit(1);
  }

  try {
    execSync('gh auth status', { stdio: 'ignore' });
  } catch {
    console.error('Error: gh CLI is not authenticated.');
    console.error('Run `gh auth login` to authenticate.');
    process.exit(1);
  }
}
