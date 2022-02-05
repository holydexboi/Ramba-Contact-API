import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';


interface myRequest extends Request
{
    user: string | JwtPayload
}

export default myRequest;
