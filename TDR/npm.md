# Guidance on using NPM

- suggested by Jeff on May 1, 2025 -

A Bit of "Jeff" Guidance:

- when you fetch changes from the repo, consider running "npm ci" (not npm install)
- npm ci requires a package-lock.json file, and will delete and reinstall all packages based on that.
- (if a package.json has a dependency that isn't in package-lock.json, it will install it and add it to the package-lock.json)
- npm ci never changes package.json or package-lock.json (it is frozen)

- Any changes to package.json and/or package-lock.json should be in a PR by themselves, and have some sort of approval.

## Drivers

List reasons, rational here

## When to Reconsider

How do we revist this or know we should?
