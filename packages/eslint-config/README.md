# Common eslint-config

## Support Plugin List

-   Prettier
-   React
-   Typescript

## Usage

### Install

```
> npm i -D @klaytn/eslint-config
```

## Development

### Publish

When making modifications and deploying, follow these two steps:

1. Update the Version

```
// package.json
{
    "name": "@klaytn/eslint-config",
    "version": "0.0.4", // <- Modify the version here.
    ...
}
```

2. Deploy to the Registry

```
> npm adduser --registry https://npm.pkg.github.com/
# LOGIN TO THE REGISTRY WITH GITHUB ACCOUNT
> npm publish -w @klaytn/eslint-config
```
