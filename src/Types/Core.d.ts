import { IncomingHttpHeaders } from "http";
import { Request } from "express";
import { Iuser } from "./Iuser";

interface IApiRequest<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user?: Iuser,
    headers: IncomingHttpHeaders & {
        token?: string
    }
}

export type IGetId = {
    id: string
}
export { IApiRequest }