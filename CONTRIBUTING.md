# Contributing

## Branch organisation
We follow [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html).
It is recommended to use [GitFlow extensions](https://github.com/nvie/gitflow) or a source control client like [SourceTree](https://www.sourcetreeapp.com/)
Both **master** and **develop** should **not** be directly committed to.

### master
Describes what is _"live"_.

### develop
Contains work ready for the next release.

### feature
When working on something new, create a branch from **develop** prefixed with `feature/` (example `feature/updating-webpack`).
When the work is ready for review create a PR from your feature branch back to **develop**.
Features will often be used for minor and major work.

### hotfix
When working on a bug fix or patch, create a branch from **master** prefixed with `hotfix/` (example `hotfix/fixing-typo`).
When the work is ready for review create two PRs; one from your hotfix branch to **develop** and another from your hotfix branch back to **master**. A hotfix branch should contain an update to the version in the package.json file and update to the changelog.

### release
Create a branch from **develop**. It should be named with the version number, prefixed with `release/` (example `release/5.0.0`). A release branch should contain an update to the version in the `package.json` file and update to the `CHANGELOG.md`. A release branch should be merged into **develop** and **master**. Once merged, master should be tagged with the version number.

## Versioning
We use [semantic versioning](http://semver.org/). We release patch versions for bugfixes, minor versions for new features, and major versions for any breaking changes.

## Development workflow
You must check the project runs and can be built in development and production.
A typical workflow will be:

* Run `yarn` to ensure you have the latest dependencies installed
* Run `yarn run watch`
* Make changes
* Check project is running with no errors in watch mode
* Remove `node_modules` directory
* Run `yarn` to run a fresh install for development
* Run `yarn run build` to check the build process runs in development
* Remove `node_modules` directory
* Run `yarn --production` to run a fresh install for production
* Run `yarn run build --production` to check the build process runs in production

If all is working as expected with no linting warnings or errors, create a pull request.
