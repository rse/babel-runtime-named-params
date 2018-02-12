/*
**  babel-runtime-named-params -- Babel Run-Time for Named Function Parameters
**  Copyright (c) 2018 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  external dependency  */
const funcParams = require("func-params")

/*  the API function  */
function callFunctionWithNamedParameters (ctx, fn, pp, np, caching = true) {
    /*  sanity check arguments  */
    if (!(typeof fn === "function"))
        throw new Error("invalid function parameter")
    if (!(typeof pp === "object" && pp instanceof Array))
        throw new Error("invalid positional-parameter parameter")
    if (!(typeof np === "object"))
        throw new Error("invalid named-parameter parameter")

    /*  determine function parameter names  */
    let names = funcParams(fn, caching)

    /*  initialize function arguments  */
    let args = new Array(names.length)
    let mask = new Array(names.length)
    for (let i = 0; i < names.length; i++) {
        args[i] = undefined
        mask[i] = false
    }

    /*  detect special options argument  */
    let optIndex = names.findIndex((name) =>
        name.match(/^(?:opt(?:ion)?|setting)s?$/))

    /*  process named parameters  */
    Object.keys(np).forEach((name) => {
        let i = names.indexOf(name)
        if (i < 0 && optIndex >= 0) {
            if (!mask[optIndex])
                args[optIndex] = {}
            args[optIndex][name] = np[name]
            mask[optIndex] = true
        }
        else if (i >= 0 && i === optIndex) {
            if (typeof np[name] !== "object")
                throw new Error(`invalid type of option-style named parameter "${name}" (expected object)`)
            if (!mask[optIndex])
                args[optIndex] = {}
            args[optIndex] = Object.assign({}, np[name], args[optIndex])
            mask[optIndex] = true
        }
        else if (i >= 0) {
            args[i] = np[name]
            mask[i] = true
        }
        else
            throw new Error(`unknown named parameter "${name}"`)
    })

    /*  process positional parameters  */
    let j = 0
    for (let i = 0; i < pp.length; i++) {
        while (j < names.length && mask[j])
            j++
        args[j++] = pp[i]
    }

    /*  call function  */
    return fn.apply(ctx, args)
}

/*  export the API function  */
module.exports = callFunctionWithNamedParameters

