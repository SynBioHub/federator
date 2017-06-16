/* SynBioHub Federator
 * Web of Registries
 *
 * Application entry point
 *
 * Written by Zach Zundel
 * 16-06-2017
 */

import *  as fs from 'fs'
import { app } from './src/app';
import { Config } from './src/lib/config';
import {sequelize, umzug} from './src/lib/db';

let config = new Config();

let server = app();

let port = config.get('applicationPort');


if(!fs.existsSync('data/registries.sqlite')) {
    sequelize.sync({ force: true }).then(startServer)
} else {
    umzug.up().then(() => {
        startServer()
    })
}

function startServer() {
    server.listen(port);
}
