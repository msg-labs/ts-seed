const { install } = require( './install.js' );


module.exports.install = install;

module.exports.saveDev = ( dependencies, cwd ) => install( 'dev', dependencies, cwd );

module.exports.save = ( dependencies, cwd ) => install( 'prod', dependencies, cwd );

module.exports.noSave = ( dependencies, cwd ) => install( undefined, dependencies, cwd );
