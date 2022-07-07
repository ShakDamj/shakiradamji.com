---
published: 2012-03-03
title:
  en: 'Experimento: Privacidad por instancias 🇪🇸'
  es: 'Experimento: Privacidad por instancias'
---

> Actualización 19/3/2014: Sorprendentemente parece que una propuesta del ECMAScript 6 sigue mismo el patrón descrito en este post, y yo que pensaba que era demasiado rebuscado...
>
> http://wiki.ecmascript.org/doku.php?id=harmony:classes

Como ya comenté, la privacidad en Javascript es un tema peliagudo, **el lenguaje no nos ofrece ninguna herramienta para gestionar la privacidad** automáticamente, tenemos que aprovechar el scope de **los closures para ocultar información** que el usuario de nuestra librería no necesita saber, **pero ocultar propiedades de una instancia es mucho más complicado**. Hace algunos años me empeñé en buscar una forma de conseguir privacidad por instancias que no fuera mediante el constructor, como ya expliqué en el [post anterior][1].

<!-- end extract -->

Para empezar está claro que es necesario tener un closure, para ocultar las variables desde fuera:

```js
// función de ejecución inmediata
(function (global) {
  // Contenido oculto
})(this);
```

Dentro de éste closure definiría la clase:

```js
(function (global) {
  function Persona() {
    var secreto;
  }

  Persona.prototype = {
    guardarSecreto: function (susurro) {
      secreto = susurro;
    },
    revelarSecreto: function () {
      return secreto;
    },
  };

  global.Persona = Persona;
})(this);
```

Evidentemente es imposible acceder a la variable `secreto` desde los métodos porque `secreto` **está encerrada en el constructor y no se puede acceder ella desde fuera** del constructor. Así que si quiero privacidad sin meter los métodos en el constructor por los métodos que [ya expliqué][2] la solución pasa por sacar la variable del constructor:

```js
(function (global) {
  var secreto;

  function Persona() {}
  Persona.prototype = {
    guardarSecreto: function (susurro) {
      secreto = susurro;
    },
    revelarSecreto: function () {
      return secreto;
    },
  };

  global.Persona = Persona;
})(this);

var pepe = new Persona();
var maria = new Persona();
pepe.guardarSecreto('estás en matrix');
console.log(maria.revelarSecreto());
```

<a href="http://jsfiddle.net/amatiasq/eXfkL/" target="_blank">Pruébame</a>

Bien, ahora `secreto` está fuera del constructor, pero tenemos otro problema, **todas las instancias de `Persona` comparten la misma variable!** Hay que buscar la forma de contar un secreto a `pepe` sin que `maria` se entere, dicho de otra forma, de guardar un valor en una instancia sin modificar la otra. En Javascript es muy sencillo trabajar con mappings así que porqué no guardamos en un mapping la relación instancia-valor? Así cada instancia podrá tener su valor guardado en la variable secreto sin interferir con el valor de otra instancia.

```js
(function (global) {
  var secreto = {};

  function Persona() {}
  Persona.prototype = {
    guardarSecreto: function (susurro) {
      secreto[this] = susurro;
    },
    revelarSecreto: function () {
      return secreto[this];
    },
  };

  global.Persona = Persona;
})(this);

var pepe = new Persona();
var maria = new Persona();
pepe.guardarSecreto('estás en matrix');
console.log(maria.revelarSecreto());
```

<a href="http://jsfiddle.net/amatiasq/NaphB/" target="_blank">Pruébame</a>

Esto tampoco funciona, porqué? Para entender ésto hay que investigar un poco, **los índices de los arrays y los mappings en Javascript son `strings`**, y si intentas poner un índice de otro tipo lo convierte a `string` con el método `.toString()`

```js
var array = [];
array[0] = 'Hola!';

for (var i in array) {
  if (array.hasOwnProperty(i)) {
    console.log(
      'Array tiene la propiedad --[' + i + ']-- del tipo --[' + typeof i + ']-- con el valor --[' + array[i] + ']--',
    );
  }
}

var mapping = {};
var indice = {};
mapping[indice] = 'Mundo!';

for (var i in mapping) {
  if (mapping.hasOwnProperty(i)) {
    console.log(
      'Mapping tiene la propiedad --[' +
        i +
        ']-- del tipo --[' +
        typeof i +
        ']-- con el valor --[' +
        mapping[i] +
        ']--',
    );
  }
}
```

<a href="http://jsfiddle.net/amatiasq/cQZmS/" target="_blank">Pruébame</a>

Entonces **tanto `pepe` como `maria` se convierten a `[object Object]` cuando los utilizo como índices** del mapping. Y hasta aquí había llegado hasta que descubrí los [`WeakMap` de Firefox][3]. Consiste básicamente en una clase con métodos `.set(id, valor);` y `.get(id);` por lo que cumple la misma funcionalidad que un mapping, con la diferencia de que si el único punto del programa en el que se usa una referencia es un `WeakMap`, **el recolector de basura la puede borrar**. Es una funcionalidad que es necesaria en Javascript por motivos que no voy a enumerar ahora, pero para mi trae un éxtra: "WeakMaps are key/value maps in which **keys are objects**" (Los WeakMaps son mappings clave/valor donde **las claves son objetos**). Sorpresa! Los `WeakMap` a diferencia de los mappings comunes no usan strings como claves, sino objetos. Esto haría viable la implementación anterior:

```js
(function (global) {
  var secreto = new WeakMap();

  function Persona() {}
  Persona.prototype = {
    guardarSecreto: function (susurro) {
      secreto.set(this, susurro);
    },
    revelarSecreto: function () {
      // Si no tenemos ningún secreto
      if (!secreto.has(this)) return 'Nada';
      else return secreto.get(this);
    },
  };

  global.Persona = Persona;
})(this);

var pepe = new Persona();
var maria = new Persona();

pepe.guardarSecreto('estás en matrix');
console.log('Secreto de María: ' + maria.revelarSecreto());
console.log('Secreto de Pepe: ' + pepe.revelarSecreto());
```

<a href="http://jsfiddle.net/amatiasq/dAzjx/" target="_blank">Pruébame</a>

**Nota**: Aunque los WeakMap solo están en Firefox, ésto funcionará en todos los navegadores porque he creado una clase que se comporta de forma similar, pero que no permite al recolector de basura eliminar los objetos, la implementación puede verse al final del artículo.

Funciona! Hemos conseguido guardar una variable privada por instancia con un closure por clase. Ahora llémoslo un poco más allá, que pasa si **en lugar de guardar una variable guardamos un objeto donde podremos tener todas las variables que queramos** para ésa instancia?

```js
(function (global) {
  var privadas = new WeakMap();

  function Persona() {
    // Inicializamos el objeto
    privadas.set(this, {});
    privadas.get(this).otraPrivada = 'Variable inaccesible desde fuera';
  }

  Persona.prototype = {
    guardarSecreto: function (susurro) {
      privadas.get(this).secreto = susurro;
    },
    revelarSecreto: function () {
      return privadas.get(this).secreto;
    },
  };

  global.Persona = Persona;
})(this);

var pepe = new Persona();
var maria = new Persona();

pepe.guardarSecreto('estás en matrix');
console.log('Secreto de María: ' + maria.revelarSecreto());
```

<a href="http://jsfiddle.net/amatiasq/RzDAE/" target="_blank">Pruébame</a>

<!-- TODO: This causes error `Expected "=>" but found end of file` -->
<!-- Perfecto, pero es un poco raro y repetitivo tener que hacer `privadas.set(this, {});` en el constructor y `privadas.get(this)` pra acceder a las privadas, podríamos encapsular ésto en una función: -->

```js
function privadas() {
  var map = new WeakMap();
  return function (clave) {
    if (!map.has(clave)) map.set(clave, {});
    return map.get(clave);
  };
}
```

Y ahora ésta funcion nos devuelve otra función que podremos llamar cuando queramos con la instancia para obtener las privadas. Nuestra clase queda:

```js
(function (global) {
  var p = privadas();

  function Persona() {
    p(this).secreto = 'Nada';
    p(this).otraPrivada = 'Variable inaccesible desde fuera';
  }

  Persona.prototype = {
    guardarSecreto: function (susurro) {
      p(this).secreto = susurro;
    },
    revelarSecreto: function () {
      return p(this).secreto;
    },
  };

  global.Persona = Persona;
})(this);

var pepe = new Persona();
var maria = new Persona();

pepe.guardarSecreto('estás en matrix');
console.log('Secreto de María: ' + maria.revelarSecreto());
console.log('Secreto de Pepe: ' + pepe.revelarSecreto());
```

<a href="http://jsfiddle.net/amatiasq/XmKCH/" target="_blank">Pruébame</a>

Y voilá! Tenemos privadas por clases sin crear más de un closure. :D

### Resumen

Está claro que **es aberrante pensar en crear una arquitectura basada en éste sistema**, incluso dejando de lado lo extraño de la sintaxis (`p(this)` para acceder a las privadas), **sería peligroso** porque aunque Firefox nos ofrezca `WeakMap` en el resto de navegadores tendríamos que crear una funcionalidad similiar y no podríamos evitar tener una referencia a las instancias si queremos que el sistema sea irrompible, lo que haría que el recolector de basura no pudiera borrar las instancias que ya no utilizemos con **riesgo de llenar la memoria RAM disponible**.

Como ya he dicho muchas veces, la gracia de **esto no es forzar Javascript a su límite, sino forzar la mente**, si hoy forzamos la imaginación hasta sus límites mañana podremos sobrepasarlos. La idea es ejercitar y mejorar la capacidad de buscar soluciones creativas y funcionales por extrañas o imposibles que parezcan.

Finalmente, como expliqué en la nota, aquí está la implementación que usé para que los ejemplos funcionen en navegadores que no sean Firefox, guarda en los objetos la propiedad _$$ID_ para no tener que buscar en todo el array de claves el índice del objeto:

```js
if (typeof WeakMap === 'undefined') {
  window.WeakMap = function WeakMap() {
    this.keys = [];
    this.values = [];
  };
  WeakMap.prototype = {
    constructor: WeakMap,

    set: function (key, value) {
      var id = (key.$$ID = this.keys.length);
      this.keys[id] = key;
      this.values[id] = value;
    },

    get: function (key) {
      var id = key.$$ID;

      // Si el índice del objeto no se corresponde
      // con su posición en la lista de claves
      // Es que ha sido modificado, debemos corregirlo.
      if (this.keys[id] !== key) id = this._fixIndex(key);

      return this.values[id];
    },

    has: function (key) {
      return this._fixIndex(key) !== null;
    },

    _fixIndex: function (key) {
      for (var i = this.keys.length; i--; ) if (this.keys[i] === key) return (key.$$ID = i);
      return null;
    },
  };
}
```

[1]: http://www.amatiasq.com/2012/02/conceptos-basicos-javascript-privacidad/ 'Conceptos Básicos Javascript: Privacidad'
[2]: http://www.amatiasq.com/?p=174 'Conceptos Básicos Javascript: Privacidad'
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/WeakMap 'WeakMap'
