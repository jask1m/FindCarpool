import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Express } from 'express-serve-static-core';
import { UNPROTECTED_PATHS } from '../constants';
const { User, RefreshToken } = require('../User/userSchema');

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
  // check if path is in unprotected paths
  if (UNPROTECTED_PATHS.includes(req.path)) {
    return next();
  }
  console.log('Request cookies:', req.cookies);
  console.log('Request headers:', req.headers);

  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token required for authorization.' });
  }

  const accessToken = authorization.split(' ')[1];
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token required for authorization.'});
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as JwtPayload;
    const { _id } = decoded;
    req.user = await User.findOne({ _id }).select("_id");
    return next();
  } catch(error) {
    // case: access token is invalid or expired
    if (!refreshToken) {
      return res.status(401).json({ error: 'invalid access token, refresh token required.' });
    }

    try {
      const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as JwtPayload;
      const storedToken = await RefreshToken.findOne({ refreshToken });
      if (!storedToken || storedToken.expires < new Date()) {
        return res.status(401).json({ error: 'Invalid or expired refresh token.' });
      }
      const newAccessToken = jwt.sign({ _id: decodedRefreshToken.login }, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: process.env.TOKEN_DURATION });
      res.setHeader('Authorization', `Bearer ${newAccessToken}`);
      req.user = await User.findOne({ _id: decodedRefreshToken.login }).select("_id");
      return next();
    } catch(error) {
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }
  }
}

export { requireAuth };