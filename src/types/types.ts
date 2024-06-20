import { Request } from "express";

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParamsAndBody<T, P> = Request<T, {}, P>;
export type RequestWithParmas<T> = Request<T>;
