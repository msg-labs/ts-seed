# Typescript web seed project

Generate a new typescript project in matter of seconds.

**It establish the base, you add the magic!**

## installing

Install globally the ```ts-seed``` package:
```
npm install -g @msg-labs/ts-seed
```

## Usage

```

  Usage: ts-seed [options] <name>

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -d, --prod <dep>  Dependencies to install along the default ones
    -D, --dev <dep>   Development dependencies to install along the default ones

```

## Multiple dependencies

To add multiple dependencies of any kind of type just add more switches

```
ts-seed my-project -d pug -d lodash -D mocha
```

Will install ```pug``` and ```lodash``` as dependencies and ```mocha``` as
devDependency

## The structure

```

[name]
|-- .git
|--- |-- ...
|--- `-- ...
|-- LICENSE
|-- README.md
|-- package.json
|-- src
|   |-- index.html
|   `-- index.ts
|-- tsconfig.json
|-- tslint.json
`-- webpack.config.js

```

## Licensing

Copyright © 2017 Miguel Sanchez Gonzalez <miguelsanychez@gmail.com>

This work is free. You can redistribute it and/or modify it under the terms of
the Do What The Fuck You Want To Public License, Version 2, as published by Sam
Hocevar. See the LICENSE file for more details.

This program is free software. It comes without any warranty, to the extent
permitted by applicable law. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2, as
published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
