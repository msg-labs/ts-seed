const { exec } = require( 'child_process' );
const { Observable } = require( 'rxjs' );


const rxExec$ = Observable.bindNodeCallback( exec );


const exec$ = ( command, cwd = './' ) =>
    rxExec$( command, { cwd: cwd } )
        .catch( ( error ) => rxExec$( 'echo "exec has failed";' ) );


module.exports.exec$ = exec$;
