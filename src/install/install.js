const { exec$ } = require( './exec' );


/**
 *
 * Maps environments to npm install switches
 *
 * undefined => do not save
 * prod      => --save
 * dev       => --save-dev
 *
 */
const saveMap = {
    prod: '--save',
    dev: '--save-dev'
};


/**
 *
 * Returns the npm install parameter associated to each environment.
 *
 *
 * @param {prod|dev?} target Target environment
 *
 * @return {string} parameter associated with the given environment
 *  empty string otherwise
 *
 */
const getTarget = target => target ? saveMap[ target ] : '';



const getInstallCommand = ( target, dependencies ) =>
    `npm install ${getTarget(target)} ${dependencies.join( ' ' )}`;


/**
 *
 * Install the dependencies targeting the desired environment
 *
 * @param {prod|dev} target How the dependencies are going to be stored
 * @param {string[]} dependencies List of dependencies to be installed
 *
 * @return {Observable<stdout,stderr>} Observable wrapped around the exec
 * command
 *
 */
const install = ( target, dependencies, cwd ) =>
    exec$( getInstallCommand( target, dependencies ), cwd );




module.exports.install = install;
