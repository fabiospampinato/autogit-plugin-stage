# Autogit Plugin - Stage

A plugin for staging files.

## Install

```sh
npm install --save autogit-plugin-stage
```

## Usage

#### Options

This plugin uses the following options object:

```js
{
  files: ['-A'] // Files to stage
}
```

#### Configuration

Add this plugin to a command:

```js
const stage = require ( 'autogit-plugin-stage' );

module.exports = {
  commands: {
    'my-command': [
      stage ({ /* YOUR OPTIONS */ })
    ]
  }
}
```

## License

MIT © Fabio Spampinato
