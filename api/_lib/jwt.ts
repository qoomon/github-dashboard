import {createSigner, createVerifier} from "fast-jwt";
import {_throw} from "./utils.js";

export const idTokenExpirationDays = 7
export const idTokenSigner = createSigner({
    key: process.env.ID_TOKEN_KEY ?
        Buffer.from(process.env.ID_TOKEN_KEY, 'base64') :
        _throw(Error('ID_TOKEN_KEY is not set in environment'))
})
export const idTokenVerifier = createVerifier({
    key: process.env.ID_TOKEN_KEY ?
        Buffer.from(process.env.ID_TOKEN_KEY, 'base64') :
        _throw(Error('ID_TOKEN_KEY is not set in environment'))
})
