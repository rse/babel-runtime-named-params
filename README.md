
babel-runtime-named-params
==========================

Babel Run-Time for Named Function Parameters

<p/>
<img src="https://nodei.co/npm/babel-runtime-named-params.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/babel-runtime-named-params.png" alt=""/>

About
-----

This is the corresponding run-time for the [Babel](https://babeljs.io/) plugin
[`babel-plugin-named-params`](http://github.com/rse/babel-plugin-named-params)
which transforms so-called *named function parameters* in ECMAScript 2015 source code.
It exports a single trampoline function
`T(ctx: any, fn: Function, pp: any[], np: Object, caching?: boolean): any`
which calls `fn` (bound to context object `ctx`) with an argument list
based on the positional parameters in `pp` and the named parameters in `np`.
For figuring out the names of all parameters of function `fn`, this
internally uses the companion [`func-params`](http://github.com/rse/func-params) utility module.
See the [`babel-plugin-named-params`](http://github.com/rse/babel-plugin-named-params)
module for more details on the usage.

Installation
------------

```shell
$ npm install babel-runtime-named-params
```

License
-------

Copyright (c) 2018 Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

