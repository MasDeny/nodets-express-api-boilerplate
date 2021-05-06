import { ValidateError } from '@tsoa/runtime';
import { Response, Request, NextFunction } from 'express';
import { Error401 } from './Error401';
import { Error422 } from './Error422';


export const notFoundHandler = (_req, res: Response) => {
    return res.status(404).json({
        success: false,
        message: "Not Found",
        error: "Not Found"
    })
}

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    if (err instanceof ValidateError) {
        return res.status(422).json({
            success: false,
            message: "Validation Failed",
            error: err?.fields[Object.keys(err?.fields)[0]].message,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            success:  false,
            message: "Internal Server Error",
            error: err.message
        });
    }
    if (err instanceof Error401 ){
        return res.status(401).json({
            success: false,
            message: "Unauthorized !!",
            error: err.message
        })
    }
    if (err instanceof Error422 ){
        return res.status(422).json({
            success: false,
            message: "Validation Failed",
            error: err.message
        })
    }
    if (err instanceof Error) {
        return res.status(400).json({
        success: false,
        message: 'Bad Request',
        error: err.message,
        });
    }

  next();
}