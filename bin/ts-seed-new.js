#!/usr/bin/env node

// Node
const fs = require( 'fs' );
const { exec } = require( 'child_process' );
const { resolve } = require( 'path' );

// Libraries
const mustache = require( 'mu2' );
const config = require( 'git-config' );
const { Observable } = require( 'rxjs' );
const mkdirp = require( 'mkdirp' );


//
// Data
//
const templates = [
    'LICENSE',
    'README.md',
    'package.json',
    'webpack.config.js',
    'src/index.html',
    'src/index.ts'
];

const seed = resolve( __dirname, '../seed/' );

const data = {
    name: 'test',
    description: '',
    author: {
        name: '',
        email: ''
    }
};

const build = name => ( file, data ) =>
    mustache
        .compileAndRender( `${seed}/${file}.mustache`, data )
        .pipe( fs.createWriteStream( `./${name}/${file}` ) );


module.exports = ( name = 'ts-seed' ) => {

    const compile = build( name );

    const mkdirp$ = Observable.bindNodeCallback( mkdirp )( `./${name}/src` );

    const templates$ = Observable.from( templates )

    const data$ = Observable
        .bindNodeCallback( config )()
        .pluck( 'user' )
        .map( user => ( { author: user } ) )
        .map( author => Object.assign( {}, data, author, { name: name } ) );


    const install$ = Observable.bindNodeCallback( exec )
        ( 'npm install', { cwd: `./${name}` } );

    mkdirp$
        .switchMapTo( data$ )
        .switchMapTo( templates$, ( template, user ) => compile( user, template ) )
        .takeLast( 1 )
        .do( () => console.log( 'installing...' ) )
        .switchMapTo( install$ )
        .subscribe( () => console.log( 'installed' ) );

};
