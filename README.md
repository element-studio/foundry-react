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

# License

MIT
