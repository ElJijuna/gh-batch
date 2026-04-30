# gh-batch

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
git clone https://github.com/pilmee/gh-batch.git
cd gh-batch
npm link
```

## Commands

### `clone repos <owner>`

Clones all repositories from a GitHub user or organization into the current directory, one folder per repository.

```sh
gh-batch clone repos <owner> [-y]
```

**Arguments**

| Argument | Description |
|---|---|
| `<owner>` | GitHub username or organization name |

**Options**

| Option | Description |
|---|---|
| `-y, --yes` | Skip the confirmation prompt and clone immediately |

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

Cloning 3 repositories from ElJijuna...
  repo-one... done
  repo-two... done
  repo-three... done

Done: 3 cloned, 0 failed.
```

Skip the prompt:

```sh
gh-batch clone repos ElJijuna -y
```

## License

MIT
