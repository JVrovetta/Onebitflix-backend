import jwt from 'jsonwebtoken'

const secret = 'chaveDoJRT'

const jwtServices = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, { expiresIn: expiration })
  }
}

export { jwtServices }