/* SynBioHub Federator
 * Web of Registries
 *
 * Graphical registry list page
 *
 * Written by Zach Zundel
 * 16-06-2017
 */

var sha1 = require('sha1');

import { Request, Response } from 'express';
import { SynBioHub, SynBioHubInstance } from '../lib/db';
import { Config } from '../lib/config';
import * as pug from 'pug';

function registries(req: Request, res: Response) {
    let config = new Config();

    SynBioHub.findAll({
        where: {
            approved: true
        }
    })
        .then(synbiohubs => {
            let locals = {
                config: config.get(),
                section: 'login',
                user: req.session.user,
                synbiohubs: synbiohubs || [],
            };

            res.send(pug.renderFile('src/templates/views/registries.jade', locals))
        })
}

export {
    registries
}
