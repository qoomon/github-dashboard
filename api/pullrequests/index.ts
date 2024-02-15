import {VercelRequest, VercelResponse} from '@vercel/node'

import StatusCodes from 'http-status-codes'
import fetch from 'node-fetch'
import {run} from "../_lib/utils.js";

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


    return response.status(StatusCodes.OK)
        .send('Hello World')
}
