# Description

[![zlib/libpng](https://img.shields.io/badge/license-zlib%2Flibpng-orange.svg?style=flat-square)](http://opensource.org/licenses/Zlib)
[![CI](https://img.shields.io/github/actions/workflow/status/NSIS-Dev/Documentation/default.yml?style=flat-square)](https://github.com/NSIS-Dev/Documentation/actions)

A new [Markdown](http://daringfireball.net/projects/markdown/)-based documentation for Nullsoft Scriptable Install System ([NSIS](http://nsis.sourceforge.net)). At this point, this is mostly direct copy of the existing [scripting reference](http://nsis.sourceforge.net/Docs/Chapter4.html#), split up into several files. Over time, the goal is to improve the documentation and add further examples.

Markdown files are easily readable as plain text, but can also be viewed in special online editors such as [Prose](http://prose.io/), [Markable](http://markable.in/) or [Dillinger](http://dillinger.io/). You can converted Markdown into HTML or Wiki (e.g. using [markdown.io](http://markdown.io)), host it online using flat file CMS such as [Jekyll](http://jekyllrb.com/), [Pico](http://pico.dev7studios.com/), [Kirby](http://getkirby.com/) or the [Markdoc](http://markdoc.org) wiki platform.

## Usage

This documentation included in this package can be consumed as EcmaScript Modules.

```js
import { Callbacks, Commands, Includes, Plugins, Variables } from '@nsis/docs';

console.log(Commands['Function']);
console.log(Callbacks['.onInit']);

// Omit `$` and curly braces
console.log(Includes['LogicLib']['If']);
```

## License

zlib/libpng license
