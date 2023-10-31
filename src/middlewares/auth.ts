import { NextFunction, Request, Response } from "express";
import { jwtServices } from "../services/jwtServices.js";
import { userServices } from "../services/userServices.js";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User.js";

interface AuthenticatedRequest extends Request {
  user?: UserInstance | null
}

const ensureAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) return res.status(401).json({ message: 'Access denied | Token not found...' })

  //Exemplo de formato original: (Bearer jjsgksjkhkjhskjhkahdkjhsdkjhaskj)
  const token = authorizationHeader.replace(/Bearer /, '')

  jwtServices.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === 'undefined') return res.status(401).json({ message: 'Access denied | Invalid token...' })
    req.user = await userServices.findByEmail((decoded as JwtPayload).email)
    next()
  })

}

export { ensureAuth }