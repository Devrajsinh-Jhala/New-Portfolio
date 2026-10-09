---
title: "How npx-vibe reviews a package before it runs"
date: 2026-10-10
topic: security
summary: "What sits between typing npx and someone else's code running on your machine, and the tool I built to look first."
---

When you type `npx some-package`, npm downloads that package and runs it straight away. If the package declares a `preinstall`, `install` or `postinstall` script, that runs too, with everything your user account can reach: environment variables, your npm token, your SSH keys.

Most of the time that is fine. But the check most of us do is a glance at the name and the download count, and coding agents now run these commands for us without even that. I wanted a step in between that actually reads the package first. That is npx-vibe.

## What it does

```bash
npx --yes npx-vibe@3.0.0 esbuild
```

This reviews `esbuild` without executing it, and ends with one of three verdicts, **Proceed**, **Caution** or **Block**, along with the lines of code that led to it. Running the package afterwards is a separate, deliberate command (`run`).

## How a review works

1. **Pin the version.** The spec is resolved to one exact version from the npm registry, together with context such as its age, publisher and weekly downloads.
2. **Download and verify.** The tarball's hash is checked against the integrity value the registry published. If that can't be checked, the review fails; it does not quietly pass. In a project scan, the hash also has to match the one in your lockfile.
3. **Open it in memory.** The archive is unzipped and parsed in memory. Nothing is extracted to disk and nothing is executed. There are hard limits (20 MiB compressed, 60 MiB unpacked, 2,000 entries), and paths or symlinks that try to escape the package are reported.
4. **Pick what to read.** A whole package is too much to read, so it reads the files that run first: the install scripts, the `bin` entry points, the files those import, and common names such as `postinstall.js` or `scripts/setup.js`. That is at most 40 files, 64 KiB each.
5. **Look for behaviour, not names.** Simple patterns look for a small set of things: reading secrets and sending data over the network, downloading something and executing it, network or shell use inside an install script, obfuscated code, writes to your home directory or shell profile, and mining indicators.
6. **Check advisories.** Known vulnerabilities for that exact version are looked up in OSV. If OSV is unreachable, the report says "unavailable", not "none found".
7. **Decide.** The findings become a score and a verdict.

## Decisions I would defend

**Popularity is context, not a discount.** Early on, a new package or a low download count raised the score. Those findings fired on every healthy new release, and noise like that trains people to ignore the output. Now age and adoption are shown as information and never change the score. A popular package with a suspicious install script is still suspicious.

**Two signals only count together when they are close.** A file that reads an environment variable and also makes a network call looks like exfiltration. In a bundled dependency those two things are routinely hundreds of lines apart and unrelated. So the pair is only treated as critical when the two sit within 800 characters of each other, or in a file tied to installation. Otherwise it is a low-severity note.

**Only strong evidence blocks.** A critical finding sets the score to 100. Everything else is capped below the block threshold of 70, so a pile of medium findings ends in Caution, where a person decides.

**Incomplete is not a pass.** If a project scan has to skip a Git dependency, or hits the package limit, the result is "incomplete" with its own exit code. Version 3 also removed a field called `safeToExecute` from the output for agents, because it promised more than a scan can know.

**AI is optional and can't outvote the evidence.** It is off by default. When it is switched on, a model's recommendation to block only counts if it points at real source lines; without that it is held at Caution.

**No runtime dependencies.** A tool that reviews your dependencies shouldn't arrive with a tree of its own.

## Where I use it

It runs on the repository for this site. Every pull request goes through a "dependency preflight" job that scans the direct dependencies and fails only on a Block:

```yaml
- uses: Devrajsinh-Jhala/NPM-Vibe-check@v2
  with:
    direct-only: true
    fail-on: block
```

For coding agents there is an `--agent` mode that prints a fixed JSON result in place of terminal text, and a read-only MCP server with the same checks.

## What it doesn't do

It is not a sandbox or an antivirus. It reads a bounded selection of files with pattern matching, so it can miss behaviour that is conditional, delayed, well hidden, or buried in a dependency of a dependency. It also produces false positives. A Proceed means "nothing alarming in what was read", not "safe".

## Where it stands

I published the first version in June 2026, and 3.0.0 on 2 October was the seventeenth release. It is also the last one planned: I have ended active maintenance, so there are no further fixes scheduled. The code stays on npm and GitHub under the MIT licence, and forks are welcome. If you use it, pin the version.

Building it taught me that detection was the smaller half of the work. The larger half was deciding what the tool is allowed to claim, and saying "I didn't check that" as clearly as "I found this".

[Documentation](https://devrajsinh-jhala.github.io/NPM-Vibe-check/) · [Source on GitHub](https://github.com/Devrajsinh-Jhala/NPM-Vibe-check) · [npm](https://www.npmjs.com/package/npx-vibe)
