const { exec$ } = require( './exec' );


const init$ = ( pwd ) => exec$( 'git init .', pwd );

const commitMessage = 'chore: Initial commit';
const addCmd = 'git add -A';
const commitCmd = `git commit -m "${commitMessage}"`;

const firstCommit$ = pwd => {
    return exec$( addCmd, pwd )
        .do( function () { console.dir( arguments ); })
        .switchMapTo( exec$( commitCmd, pwd ) );
}


module.exports = { init$, firstCommit$ };
