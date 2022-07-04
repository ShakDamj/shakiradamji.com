---
title: Object.create vs new
date: 2013-04-13
---

> Actualización 19/3/2014: Finalmente he entendido la utilidad de reemplazar `new`, se puede ver [aquí][1]

JotaEseros! Tengo un dilema existencial que me impide dormir.

Hasta donde sé los constructores hacen más o menos esto

```js
function fakeNew(Ctor) {
  var instance = Object.create(Ctor.prototype);
  instance.constructor();
  return instance;
}
```

<!-- end extract -->

Todo empezó cuando quise hacer polyfill de Object.create(), así podría crear objectos sin usar `new`, decidí usar la versión sencilla

```js
Object.create = function (proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};
```

Y empecé a crear un montón de objetos y a prototiparlos, pero como los objetos muchas veces necesitaban inicializar sus propiedades les hice el método `.init()`

```js
var base = {
  init: function () {
    EmitterMixin.call(this);
    return this;
  },
};

var obj = Object.create(base).init();
```

Pero claro, tengo que acordarme de devolver `this` siempre al acabar `.init()` y muchas veces lo olvidaba o me olvidaba de invocar `.init()` que es peor. Así que intentando como simplificar la inicialización de un objeto pensé crear una funcioń global que se encargara de invocar a `Object.create`, llamar a la función inicializadora y devolver this:

```js
function create(proto) {
  var child = Object.create(proto);
  child.init();
  return child;
}
```

Y me empezaron a dar ganas de reventarme la cabeza contra la pared al darme cuenta que **lo que estaba haciendo es prácticamente lo mismo que hace el operador nativo `new`** pero mucho más lento y, en caso de usar el polyfill the `Object.create` incluso usando `new` por debajo.

Entonces me pregunto, que beneficios aporta abandonar `new`? es [notablemente más rápido][2] en la mayoría de navegadores y por la naturaleza de javascript solemos necesitar crear una función inicializadora que en el caso de `new` es el constructor.

Y lo que es más grave aún, he notado que **usaba dos tipos diferentes de objetos**, unos "_abstractos_" y otros "_instancias_" la mayor diferencia es que en las instancias tenía que invocar `.init()` siempre mientras que los abstractos no era necesario porque solo serían usados para crear otros objetos que los prototiparan. Y es un patrón que he visto mientras usaba `new`:

```js
function Foo() { }
Foo.prototype.method = function() { ... };

function Bar() { }
// Objeto "abstracto", no se invoca inicializador
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.other = function() { ... };

// Objeto "instancia"
// se invoca el constructor como inicializador
var obj = new Bar();
```

Realmente hay es una ventaja abandonar `new`? estamos seguros que no se trata de una herramienta de alto nivel que simplifica algo que igualmente tendremos que hacer nosotros a mano? Que pros y contras tienen `new` y `Object.create`?

[1]: http://blog.amatiasq.com/2014/03/type-new/
[2]: http://jsperf.com/object-create-vs-constructor-vs-object-literal/49
