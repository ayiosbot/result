/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Ayios. All rights reserved.
 *  All code within this repository created by Ayios is under MIT license. Other code within
 *  this repository is under its own respective license which will be displayed within their
 *  respective files or around the areas of their code.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export interface IResult<T, E> { ok: boolean; value: T | E };
export type AsyncResult<T, E> = Promise<Result<T, E>>;
export class Result<T, E> {
    private readonly result: IResult<T, E>;
    constructor(result: IResult<T, E>) {
        this.result = result;
    }

    public isOk(): this is Result<T, never> {
        return this.result.ok;
    }
    public isErr(): this is Result<never, E> {
        return !this.result.ok;
    }
    public unwrap(): T {
        if (this.isOk()) {
            return this.result.value as T;
        }
        throw new Error(`Tried to unwrap an Err value: ${this.result.value}`);
    }
    public unwrapErr(): E {
        if (this.isErr()) {
            return this.result.value as E;
        }
        throw new Error(`Tried to unwrap an Ok value: ${this.result.value}`);
    }
    public static async fromPromise<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
        try {
            return Ok(await promise);
        } catch (error) {
            return Err(error as E);
        }
    }
}

/** Create an Ok response */
export function Ok<T>(value?: T): Result<T, never> {
    return new Result<T, never>({ ok: true, value: value as T });
}

/** Create an Err response */
export function Err<E>(error: E): Result<never, E> {
    return new Result<never, E>({ ok: false, value: error });
}