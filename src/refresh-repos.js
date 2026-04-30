import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

export async function refreshRepos(owner, { path = '.' } = {}) {
  const targetPath = resolve(path);

  let entries;
  try {
    entries = readdirSync(targetPath);
  } catch {
    console.error(`Cannot read directory: ${targetPath}`);
    process.exit(1);
  }

  const repos = [];

  for (const entry of entries) {
    const dirPath = join(targetPath, entry);

    try {
      if (!statSync(dirPath).isDirectory()) continue;
    } catch {
      continue;
    }

    try {
      const origin = execSync('git remote get-url origin', {
        cwd: dirPath,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim().toLowerCase();

      const lowerOwner = owner.toLowerCase();

      // covers both HTTPS (github.com/owner/) and SSH (github.com:owner/)
      if (
        origin.includes(`github.com/${lowerOwner}/`) ||
        origin.includes(`github.com:${lowerOwner}/`)
      ) {
        repos.push({ name: entry, path: dirPath });
      }
    } catch {
      // not a git repo or no origin remote
    }
  }

  if (repos.length === 0) {
    console.log(`No local repositories found for ${owner} in ${targetPath}`);
    return;
  }

  console.log(`\nFetching ${repos.length} repositories from ${owner}...`);
  let failed = 0;

  for (const repo of repos) {
    process.stdout.write(`  ${repo.name}... `);
    try {
      execSync('git fetch --all --prune', {
        cwd: repo.path,
        stdio: ['ignore', 'ignore', 'pipe'],
      });
      console.log('done');
    } catch (err) {
      console.log('failed');
      console.error(`    -> ${err.stderr?.toString().trim() || err.message}`);
      failed++;
    }
  }

  const succeeded = repos.length - failed;
  console.log(`\nDone: ${succeeded} fetched, ${failed} failed.`);
}
