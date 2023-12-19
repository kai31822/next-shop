import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOptions {
    expiresIn?: string | number

}
const DEFAULT_SIGN_OPTION: SignOptions = {
    expiresIn: "2h"
}

export function signJWTAccessToken(playload: JwtPayload, options: SignOptions = DEFAULT_SIGN_OPTION) {
    const secret_key = process.env.SECRET_KEY
    const token = jwt.sign(playload, secret_key!, options)
    return token
}

export function verifyJWT(token: string) {
    try {
        const secret_key = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secret_key!)
        return decoded as JwtPayload
    } catch (error) {
        console.log(error)
        return null

    }
}
