import type { Hono, Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import jwt from 'jsonwebtoken';

interface JwtPayload{
    id: string;
}

declare global{
    namespace Hono{
        interface Context{
            user?: JwtPayload
        }
    }
}

const verifyToken = async (c: Context, next: Next) => {
    const token = getCookie(c, 'access_token');
    if (!token) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) throw new HTTPException(401, { message: "Internal server error || The secret key is not defined" });
    
    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        c.set('user', decoded); 
        await next(); 
    } catch (err) {
        throw new HTTPException(401, { message: 'Unauthorized: Invalid or expired token' });
    }
}

export default verifyToken;