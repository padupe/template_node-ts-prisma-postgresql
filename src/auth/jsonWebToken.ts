import { sign, verify } from "jsonwebtoken"
import { logging } from "@utils/logging"

export function signJWT(payload: object, secret_key: string, options: object) {

    return sign({payload}, secret_key, options)
}

export function verifyJWT(token: string, secret_key: string, options: object) {

    return verify(token, secret_key, options, function (err, decoded) {
        if (err) {
            logging.error(`${err}`)
            return false
        }
        return decoded
    })
}