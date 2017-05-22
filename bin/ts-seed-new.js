#!/usr/bin/env node

// Node
const fs = require( 'fs' );
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
    'package.json',
    'webpack.config.js',
    'src/index.html',
    'src/index.ts'
];

const user$ = Observable
    .bindNodeCallback( config )()
    .pluck( 'user' );

const seed = resolve( __dirname, '../seed/' );

const data = {
    name: 'test',
    description: 'Just a test, nothing else :)',
    author: {
        name: '',
        email: ''
    }
};

const build = ( name, data ) => file => 
    mustache
        .compileAndRender( `${seed}/${file}.mustache`, data )
        .pipe( fs.createWriteStream( `./${name}/${file}` ) );


// TODO refactor
module.exports = ( name = 'ts-seed' ) => {

    const mkdirp$ = Observable.bindNodeCallback( mkdirp );

    const templates$ = Observable.from( templates )
    
    const data$ = user$
        .map( user => ( { author: user } ) )
        .map( author => Object.assign( {}, data, author ) );

    const builds$ = templates$
        .switchMapTo( data$, ( template, data ) => [ template, data ] )
        .do( function ( data ) { console.dir( data ) } )
        .map( data => build( name, data[1] )( data[0] ) )

    mkdirp$( `./${name}/src` )
        .switchMapTo( data$ )
        .switchMapTo( builds$ )
        .subscribe( _ => console.log( 'template moved' ) );

};
