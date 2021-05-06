import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { Error401 } from '../errors/Error401';

config();

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
) : Promise<any> {
    if( securityName === "jwt"){
        const token = 
            request.body.token ||
            request.query.token ||
            request.header["x-access-token"]
        
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            }
            jwt.verify(
                token, 
                process.env.JWT_SECRET_KEY, 
            async function (err: any, decoded: any) {
                if (err) {
                    reject(new Error);
                } else {
                // if (decoded.scopes[0] === 'player') {
                // }
                // for (let scope of scopes) {
                //   if (!decoded.scopes.includes(scope)) {
                //     reject(new Error401('JWT does not contain required scope.'));
                //   }
                // }
                if (scopes.length > 0) {
                    if (!scopes.includes(String(decoded.user_statuses_id))) {
                        reject(new Error401("you don't have permission to this api"));
                    }
                }
                resolve(decoded);
                }
            });
        })
    }
}