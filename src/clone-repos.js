import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';
import * as readline from 'readline';

export async function cloneRepos(owner, { yes = false, path = '.' } = {}) {
  const targetPath = resolve(path);

  if (!existsSync(targetPath)) {
    console.error(`Path does not exist: ${targetPath}`);
    process.exit(1);
  }

  let repos;
  try {
    const output = execSync(
      `gh repo list ${owner} --json name,nameWithOwner --limit 1000`,
      { encoding: 'utf8' }
    );
    repos = JSON.parse(output);
  } catch (err) {
    console.error(`Failed to fetch repositories for "${owner}"`);
    console.error(err.message);
    process.exit(1);
  }

  if (repos.length === 0) {
    console.log(`No repositories found for ${owner}`);
    return;
  }

  if (!yes) {
    console.log(`\nRepositories for ${owner}:`);
    repos.forEach((repo, i) => console.log(`  ${i + 1}. ${repo.name}`));
    console.log();

    const answer = await prompt(
      `Do you want to clone ${repos.length} repositories? (yes/no): `
    );
    if (!['yes', 'y'].includes(answer.trim().toLowerCase())) {
      console.log('Aborted.');
      return;
    }
  }

  console.log(`\nCloning ${repos.length} repositories into ${targetPath}...`);
  let failed = 0;

  for (const repo of repos) {
    process.stdout.write(`  ${repo.name}... `);
    try {
      execSync(`gh repo clone ${repo.nameWithOwner} ${repo.name}`, {
        cwd: targetPath,
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
  console.log(`\nDone: ${succeeded} cloned, ${failed} failed.`);
}

function prompt(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}
