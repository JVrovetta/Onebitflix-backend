import jwt, { VerifyCallback } from 'jsonwebtoken'

const secret = 'chaveDoJRT'

const jwtServices = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, { expiresIn: expiration })
  },

  verifyToken: (token: string, callbackfn: VerifyCallback) => {
    jwt.verify(token, secret, callbackfn)
  }
}

export { jwtServices }