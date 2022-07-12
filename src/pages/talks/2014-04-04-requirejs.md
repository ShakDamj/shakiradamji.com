---
title:
  en: Modularize your Javascript
  es: Modulariza tu Javascript

links:
  slides: https://repos.amatiasq.com/requirejs-speech-amatiasq/public/
---

This is a talk I gave at a Betabeers Barcelona event about how to use [RequireJS and it's CommonJS compatibility][1]:

```js
define(function(require, exports, module) {
  var foo = require('./foo');

  return { bar: 1 };
});
```

Sadly I choose a [niche presentation micro-framework][2] which at some point I forgot how to run and couldn't invest the time to re-learn it. This wouldn't had happen if I documented or at least took notes about how to use it, lesson learned.

The unformatted conntent of the slides is still accessible [here][3]

---

Esta es una charla que di en un evento de Betabeers Barcelona sobre cómo usar [RequireJS en compatibilidad con CommonJS][1]:

```js
// foo.js
define(function(require, exports, module) {
  return { bar: 1 };
});
```

```js
// main.js
define(function(require, exports, module) {
  var foo = require('./foo');

  return { quz: foo.bar };
});
```

Por desgracia elegí un [micro-framework de presentaciones][2] que en algún momento olvidé como usar y no pude invertir el tiempo en volver a aprenderlo. Esto no habría pasado si hubiese documentado o al menos hubiese tomado notas sobre como usarlo, lección aprendida.

El contenido sin formato de las diapositivas sigue accesible [aquí][3]


[1]: https://requirejs.org/docs/commonjs.html
[2]: https://github.com/bespokejs/bespoke
[3]: https://repos.amatiasq.com/requirejs-speech-amatiasq/slides.html