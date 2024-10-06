<div align="center">
    <h1>@ayios/result<h1>
    <h3><b>A rust-like way of handling results.</b></h3>
</div>

## Example
```ts
import { Result, Ok, Err } from '@ayios/result';

async function doReject(): Promise<number> {
    return new Promise((_, reject) => reject('oh no'));
}

async function main() {
    const res: Result<number, 'oh no'> = await Result.fromPromise(doReject());
    if (res.isOk()) {
        console.log(res.unwrap()); //> number: 123
    } else if (res.isErr()) {
        console.log(res.unwrapErr()); //> string: 'oh no'
    }
}


const okResult: Result<number, string> = Ok(123);
if (okResult.isOk()) {
    console.log(okResult.unwrap()); //> number: 123
}

const errResult: Result<number, string> = Err('oh no');
if (errResult.isErr()) {
    console.log(errResult.unwrapErr()); //> string: 'oh no'
}
```

## License
All code within this repository created by Ayios is under MIT license. Other code within this repository, if present, is under its own respective license which will be displayed within their respective files.