const { exec$ } = require( './exec' );


const init$ = ( pwd ) => exec$( 'git init .', pwd );


module.exports.init$ = init$;
