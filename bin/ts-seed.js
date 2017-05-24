#!/usr/bin/env node

const program = require( 'commander' );
const { version } = require( '../package.json' );

const generate = require( '../src/new' );


program
    .version( version );

program
    .arguments( '[name]' )
    .description( 'Generate a new project using the specified name' )
    .action( generate );

program
    .parse( process.argv );
