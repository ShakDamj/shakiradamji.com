---
published: 2013-04-30
title:
  en: ECMAScript 5 _.extend (🇪🇸 only)
  es: ECMAScript 5 _.extend
---

A algunos ya os he comentado los problemas que [NC Zakas comenta][1] con el `_.extend` de underscore y los getters:

```js
var a = {
  init: function () {
    this.list = [];
  },

  get first() {
    return this.list[0];
  },
};
```

<!-- end extract -->

O

```js
var a = {
  init: function () {
    this.list = [];
  },
};

Object.defineProperty(a, 'first', {
  get: function () {
    return this.list[0];
  },
});
```

Y que si hacemos `_.extend(a)` va a fallar porque intentará hacer `result.first = a.first` ejecutando el getter. Pero como aún no hemos llamado al `.init()` en `a` porque solo es un prototipo, la propiedad `.list` es undefined produciendo un error.

Pues bien, yo creía que esto se solucionaba extrayendo el descriptor de la propiedad y usando ese mismo descriptor para copiar la propiedad al nuevo objeto:

```js
function extend(obj) {
  var result = {};
  var properties = Object.keys(obj);

  properties.forEach(function (prop) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    Object.defineProperty(result, prop, descriptor);
  });

  return result;
}
```

Pero he usado esto en la librería de promises y me he dado cuenta que solo hereda las propiedades directas, tanto `Object.keys` como `Object.getOwnPropertyDescriptor` solo funcionan si la propiedad está directamente declarada en el objeto y no en ninguno de sus prototipos. Y no hay ninguna forma de decir `Object.getPropertyDescriptorFromHimOrHisPrototypes()` así que la única forma es recorrer todos los prototipos.

```js
function extend(obj) {
  var result = {};
  var proto = obj;

  while (proto) {
    Object.keys(proto).forEach(function (prop) {
      var descriptor = Object.getOwnPropertyDescriptor(proto, prop);
      Object.defineProperty(result, prop, descriptor);
    });

    proto = Object.getPrototypeOf(proto);
  }

  return result;
}
```

Pero eso tampoco funciona del todo bien porque las propiedades de los ancestros se impondrían sobre las propiedades propias del objeto. Así que primero hay que empezar por el último prototipo y acabar por el propio objeto

```js
function extend(obj) {
  var result = {};
  var proto = obj;
  var protos = [];

  while (proto) {
    protos.push(proto);
    proto = Object.getPrototypeOf(proto);
  }

  protos.reverse().forEach(function (ancestor) {
    Object.keys(ancestor).forEach(function (prop) {
      var descriptor = Object.getOwnPropertyDescriptor(ancestor, prop);
      Object.defineProperty(result, prop, descriptor);
    });
  });

  return result;
}
```

Y esto ya funciona, pero le falta un detallito, mediante el property descriptor se puede poner que una propiedad no sea enumerable por lo que no se interará sobre ella con un `for .. in ..` ni con `Object.keys` pero si las podemos obtener si utilizamos `Object.getOwnPropertyNames` (Fuente: [MDN][2]). Así que remplazando `Object.keys` con `Object.getOwnPropertyNames` esta vez si (espero, rezo, suplico -.-) tenemos una función que crea una copia de todas las propiedades propias y heredadas de un objeto.

```js
function ecma5extend(obj) {
  var proto = obj;
  var protos = [];
  var result = {};

  while (proto) {
    protos.push(proto);
    proto = Object.getPrototypeOf(proto);
  }

  protos.reverse().forEach(function (ancestor) {
    Object.getOwnPropertyNames(ancestor).forEach(function (prop) {
      var descriptor = Object.getOwnPropertyDescriptor(ancestor, prop);
      Object.defineProperty(result, prop, descriptor);
    });
  });

  return result;
}
```

Como al final el código ha quedado bastante más complejo de lo que me gustaría lo he apuntado en [un Gist][3] que podría venirles bien.

[1]: http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
[2]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
[3]: https://gist.github.com/amatiasq/5492466
