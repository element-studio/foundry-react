<h1 align="center" style="border-bottom: none;">📦 foundry-react</h1>
<h3 align="center">React components built by element studio for use for anyone.</h3>
<p align="center">
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/foundry-react">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/foundry-react/latest.svg">
  </a>
</p>

# Foundry React

Element studio have compiled a list of super useful components that get reused a lot.

This consists of Foundry React Core (components) and utilities (some useful js helpers).

## Getting Started

\*_This project is not really ready for use._

### Installing

```bash
npm install foundry-react --save
```

### Example code:

```javascript
import TextInput as 'foundry-react/core/inputs/TextInput';
```

The code is compiled to es6+ so if you require es5 then please use a compiler

## Documentation

There are a few components in here that are useful, however the documentation isn't quite ready.

For now just any pals that want to use this right now will have to dig through the code to see how it works.

## Contributing

Written in typescript

Uses story book to write the components in isolation

```bash
npm i && npm start # Installs dependencies and load up story book
```

```bash
npm run build-link # Builds the JS files and links them in your global directory for use in projects. Then use `npm link foundry-react` in your actual project to start using the local version for testing in situ
```

```bash
npm run build #build the JS files
```

> **Important for when publish. use npm run build-publish, so that the build files get published first.**

# License

MIT
