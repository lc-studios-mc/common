# @lc-studios-mc/common

## Overview

Utilities for Minecraft Bedrock scripting with `@minecraft/server` API.

## Tech Stack

- Runtime: Bun
- Language: TypeScript
- Formatting: Prettier

## Project Structure

- `src/`: Source files
- `tests/`: Test files (use `bun:test`)

## Commands

- `bun install`: install dependencies
- `bun test`: run tests
- `bun run typecheck`: check type safety
- `bunx prettier --write <path>`: format specific file(s) — preferred over
  `--write .`

## Code Style

- Strict TypeScript (see tsconfig)
- Verify type safety after making edits
- Format touched files
- Write tests based on the intended/expected behavior — don't assume the current
  implementation is correct

## Notes

- Bun only — no `node` or `npm` commands.
