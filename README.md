# Klaytn Finder Frontend

This repository is the Frontend of the Klaytn Finder.
For the overall architecture of the finder, please refer to the [Main Repo](https://github.com/klaytn/finder/blob/main/README.md).

---

## Apps

> Working applications

-   [finder](./apps/finder)

---

## Packages

> Packages (libraries) to be used elsewhere

-   [slush](https://klaytn.github.io/finder-fe) - UI components

---

## Install

> -   For testing purposes, the `canvas` package is used. Please check [this page](https://github.com/Automattic/node-canvas/wiki/_pages) for environment-specific installation guides and install it.
> -   [`nvm`](https://github.com/nvm-sh/nvm) is used to match the node and npm versions.

```shell
nvm use
npm i
npm run build:packages
```

---

## Development

```shell
npm run watch:finder
```

---

## Npm Scripts

### Build

Build for production

-   `build:{app or package name}` - Build for production
-   `build:packages` - Build only packages

---

### Watch

Detect changes and build in development mode

-   `watch:{app or package name}`

---

### Etc

Other common scripts

-   `lint` - Check eslint/prettier
-   `lint:fix` - Automatically fix eslint/prettier where possible and then check
-   `check` - Type check (type checking is not done during the build process)
-   `test` - Run tests
