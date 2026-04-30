#!/usr/bin/env node

import { Command } from 'commander';
import { cloneRepos } from './src/clone-repos.js';
import { refreshRepos } from './src/refresh-repos.js';

const program = new Command();

program
  .name('gh-batch')
  .description('Batch operations for GitHub repositories using gh CLI')
  .version('0.0.1');

const clone = program.command('clone');

clone
  .command('repos <owner>')
  .description('Clone all repositories from a GitHub owner')
  .option('-y, --yes', 'skip confirmation prompt')
  .option('-p, --path <path>', 'destination directory', '.')
  .action(async (owner, opts) => {
    await cloneRepos(owner, { yes: opts.yes ?? false, path: opts.path });
  });

const refresh = program.command('refresh');

refresh
  .command('repos <owner>')
  .description('Run git fetch --prune on all local repos from a GitHub owner')
  .option('-p, --path <path>', 'directory to search for cloned repos', '.')
  .action(async (owner, opts) => {
    await refreshRepos(owner, { path: opts.path });
  });

program.parseAsync();
