/* SynBioHub Federator
 * Web of Registries
 *
 * SynBioHub list endpoint
 *
 * Written by Zach Zundel
 * 16-06-2017
 */

import { Request, Response } from 'express';
import { SynBioHub } from '../lib/db';

function list(req: Request, res: Response) {
    SynBioHub.findAll({
        where: {
            approved: true
        }
    }).then(synbiohubs => {
        let result = synbiohubs.map(synbiohub => {
            return {
                id: synbiohub.get('id'),
                uriPrefix: synbiohub.get('uriPrefix'),
                instanceUrl: synbiohub.get('instanceUrl'),
                description: synbiohub.get('description'),
                name: synbiohub.get('name'),
                approved: synbiohub.get('approved'),
                administratorEmail: synbiohub.get('administratorEmail'),
                updateWorking: synbiohub.get('updateWorking')
            };
        })

        let resultJson = JSON.stringify(result, null, 4);
        res.send(resultJson);
    });
}

export {
    list
};