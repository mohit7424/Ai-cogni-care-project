import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from './authmiddleware.js';
import type { UserRole } from '../features/auth/types/authtypes.js';

export function roleMiddleware(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required before role verification',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to roles [${allowedRoles.join(', ')}]`,
      });
      return;
    }

    next();
  };
}

