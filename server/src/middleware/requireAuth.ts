import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../User/userSchema';
import { Express } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// requireAuth middleware is applied to all routes except the login and register routes
// to prevent unauthenticated users from accessing protected routes
const requireAuth = async(req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/user/login' || req.path === '/user/register') {
    return next();
  }
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token required for authorization.' });
  }

  const token = authorization.split(' ')[1];

  try {
    // verify token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    const { _id } = decodedToken;
    req.user = await User.findOne({ _id }).select("_id");
    console.log("User is authenticated.");
    next();
  } catch(error: unknown) {
    console.log("Error verifying token: ", error);
    return res.status(401).json({ error: 'Request is not authorized.' });
  }
}

export { requireAuth };