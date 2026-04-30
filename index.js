#!/usr/bin/env node

import { Command } from 'commander';
import { cloneRepos } from './src/clone-repos.js';

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
  .action(async (owner, opts) => {
    await cloneRepos(owner, { yes: opts.yes ?? false });
  });

program.parseAsync();
