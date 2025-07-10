import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: number
  email: string
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header missing or malformed' })
    return // ✅ Make sure to return here
  }

  const token = authHeader.split(' ')[1]
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET not defined in environment')
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload

    // Attach user info to request
    ;(req as any).user = {
      id: decoded.id,
      email: decoded.email,
    }

    return next() // ✅ Return the call to next()
// oxlint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' })
    return // ✅ Ensure response ends here
  }
}
