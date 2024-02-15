import {VercelRequest, VercelResponse} from '@vercel/node'
import {kv} from "@vercel/kv";

import StatusCodes from 'http-status-codes'
import fetch from 'node-fetch'
import {_throw, firstValue, run} from "../_lib/utils.js";
import {idTokenSigner, idTokenVerifier} from "../_lib/jwt.js";
import {getUser} from "../_lib/user-store.js";

const oauthAppCredentials = {
    clientId: process.env.CLIENT_ID ?? _throw(Error('CLIENT_ID is not set in environment')),
    clientSecret: process.env.CLIENT_SECRET ?? _throw(Error('CLIENT_SECRET is not set in environment')),
}

export default async (request: VercelRequest, response: VercelResponse) => run(async () => {
    switch (request.method) {
        case 'GET':
            return await handleGet(request, response)
        default:
            return response.status(StatusCodes.METHOD_NOT_ALLOWED)
                .send({error: StatusCodes.getStatusText(StatusCodes.METHOD_NOT_ALLOWED)})
    }
}).catch(error => {
    console.error("[ERROR]", error)
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({error: StatusCodes.getStatusText(StatusCodes.INTERNAL_SERVER_ERROR)})
})


async function handleGet(request: VercelRequest, response: VercelResponse) {
    console.log('handleGet')

    let user
    const idToken = request.cookies['id_token']
    if (idToken) {
        console.log('got id_token cookie')
        const callerIdentity = idTokenVerifier(idToken)
        user = await getUser(callerIdentity.user)
    }

    if (!user) {
        return response.status(StatusCodes.UNAUTHORIZED)
            .send({error: StatusCodes.getStatusText(StatusCodes.UNAUTHORIZED)})
    }

    return response.status(StatusCodes.OK)
        .send({user: user.login})
}
