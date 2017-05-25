#!/usr/bin/env node

const program = require( 'commander' );

const { version } = require( '../package.json' );
const generate = require( '../src/new' );


const deps = ( dependency, dependencies ) => ( [
    ...dependencies,
    dependency
] );


program
    .version( version );

program
    .usage( '[options] <name>' )
    .option( '-d, --prod <dep>', 'Dependencies to install along the default ones', deps, [] )
    .option( '-D, --dev <dep>', 'Development dependencies to install along the default ones', deps, [] )
    .action( generate );

program
    .parse( process.argv );
