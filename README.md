# gh-batch

[![npm version](https://img.shields.io/npm/v/gh-batch)](https://www.npmjs.com/package/gh-batch)
[![npm downloads](https://img.shields.io/npm/dm/gh-batch)](https://www.npmjs.com/package/gh-batch)
[![Release](https://github.com/ElJijuna/gh-batch/actions/workflows/release.yml/badge.svg)](https://github.com/ElJijuna/gh-batch/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js >=18](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

Batch operations for GitHub repositories using the [`gh`](https://cli.github.com/) CLI.

## Requirements

- [Node.js](https://nodejs.org/) 18+
- [gh CLI](https://cli.github.com/) installed and authenticated (`gh auth login`)

## Installation

```sh
npm install -g gh-batch
```

Or clone and link locally:

```sh
git clone https://github.com/ElJijjuna/gh-batch.git
cd gh-batch
npm link
```

## Commands

### `clone repos <owner>`

Clones all repositories from a GitHub user or organization, one folder per repository.

```sh
gh-batch clone repos <owner> [-y] [-p <path>]
```

**Arguments**

| Argument | Description |
|---|---|
| `<owner>` | GitHub username or organization name |

**Options**

| Option | Description |
|---|---|
| `-y, --yes` | Skip the confirmation prompt and clone immediately |
| `-p, --path <path>` | Destination directory (default: current directory) |

**Examples**

Prompt before cloning:

```sh
gh-batch clone repos ElJijuna
```

```
Repositories for ElJijuna:
  1. repo-one
  2. repo-two
  3. repo-three

Do you want to clone 3 repositories? (yes/no): yes

Cloning 3 repositories into /home/user/projects...
  repo-one... done
  repo-two... done
  repo-three... done

Done: 3 cloned, 0 failed.
```

Skip the prompt and clone into a specific directory:

```sh
gh-batch clone repos ElJijuna -y -p ~/projects
```

### `refresh repos <owner>`

Runs `git fetch --all --prune` on all locally cloned repositories from a GitHub owner. Detects repos by checking their `origin` remote URL.

```sh
gh-batch refresh repos <owner> [-p <path>]
```

**Arguments**

| Argument | Description |
|---|---|
| `<owner>` | GitHub username or organization name |

**Options**

| Option | Description |
|---|---|
| `-p, --path <path>` | Directory to search for cloned repos (default: current directory) |

**Examples**

```sh
gh-batch refresh repos ElJijuna
```

```
Fetching 3 repositories from ElJijuna...
  repo-one... done
  repo-two... done
  repo-three... done

Done: 3 fetched, 0 failed.
```

```sh
gh-batch refresh repos ElJijuna -p ~/projects
```

## Contributing

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec. Releases and the CHANGELOG are generated automatically on every push to `main`.

| Prefix | Triggers |
|---|---|
| `feat:` | minor version bump |
| `fix:` | patch version bump |
| `BREAKING CHANGE:` (in footer) | major version bump |
| `chore:`, `docs:`, `refactor:` | no release |

## License

MIT
