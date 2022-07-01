---
title: Construcción de objetos
date: 2014-03-12
---

> Este artículo quedó muy complejo y caótico, por eso voy a intentar dividirlo en partes, recomiendo leer los nuevos post en lugar de este.
>
> _Parte 1_: [Type.new()][1]

##  TL;DR

Buscando optimizaciones para un juego en javascript encontré [un paradigma de definición de tipos y creación de objetos][2] que cambió mi forma de ver el lenguaje.

---

He hablado antes de la limitación de los constructores javascript:

```js
function Person(name) {
  this.name = name;
}
Person.prototype.methodA = function() { ... }
```

En este caso quiero referirme a las limitaciones en cuanto a memoria pero hará falta un poco de introducción

<!--more Seguir leyendo → -->

## Recolector de Basura

Javascript cuenta con un recolector de basura (Garbage collector) que periódicamente busca y elimina los objetos que nuestro código ya no utiliza, en los sistemas javascript modernos están lo bastante optimizados para detectar los objetos a los que ya no podemos utilizar porque no lo tenemos en ninguna variable:

```js
var a = {};
a = null;
```

En la próxima pasada del recolector de basura el objeto que teníamos en la variable `a` será eliminado de la memoria.

Esto es muy cómodo porque no necesitamos limpiar la memoria manualmente, pero como javascript solo tiene un hilo el recolector de basura impide que ningún código se ejecute mientras está recolectando objetos y en aplicaciones que hacen un uso intenso del procesador, como los juegos en los que debemos generar 60 fotogramas por segundo, una pasada del recolector de basura puede congelar la imagen una fracción de segundo reduciendo la jugabilidad.

Podemos reducir esto intentando ahorrarle trabajo al recolector de basura, es decir, intentando no crear y abandonar demasiados objetos en memoria. Para esto podemos cambiar el código para no crear un objeto que solo usaremos en una función o podemos intentar reutilizar los objetos que ya no nos sirvan. Esto es un punto clave para conseguir un buen rendimiento

## Constructores Javascript

Y aquí entran los constructores, la forma más común de crear objetos en Javascript

```js
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
var v = new Vector(0, 0);
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/tHMB2/">Pruébame</a>

Cuando invocamos un constructor con `new` el operador hace algo similar a esto

```js
function fakeNew(Constructor, params) {
  var instance = Object.create(Constructor.prototype);
  Constructor.apply(instance, params);
  return instance;
}
var v = fakeNew(Vector, [0, 0]);
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/wgeZP/">Pruébame</a>

Vemos el el constructor en sí es una función normal y corriente solo que se usa su propiedad `prototype` como prototipo del nuevo objeto y se le pasa el nuevo objeto como `this` (si no sabes lo que hace `apply` lo encontrarás [aquí][3]).

Un secreto poco conocido de los constructores es que como funciones que son pueden devolver un valor. Pero [haciendo pruebas][4] he encontrado que cierto tipo de valores son ignorados por new. En resumen parece ser que si el constructor devuelve un valor nativo (`null`, `Boolean`, `Number` y `String`) `new` lo ignora y devuelve la instancia recién creada, pero si es un objeto (`{}`, `[]`, `new Date()`...) devuelve ese objeto con lo que para que la función `fakeNew` funcione de forma idéntica al operador new debería ser así:

```js
function fakeNew(Constructor, params) {
  var instance = Object.create(Constructor.prototype);
  var value = Constructor.apply(instance, params);

  if (typeof value === 'object' && value !== null) return value;

  return instance;
}
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/3D9es/">Pruébame</a>

## Devolviendo valores desde el constructor

Entonces sabiendo que podemos devolver un objeto desde un constructor quizás podamos usar esto para ahorrar trabajo al recolector de basura si en lugar de devolver un objeto nuevo cada vez reutilizamos antiguos, lo que en cualquier lenguaje se llama una [`factory`][5], así que supongamos que tenemos el siguiente constructor:

```js
function MyNumber(value) {
  this.value = value;
}
var num = new MyNumber(3);
```

Y queremos que si ya existe un objeto con ese número nos lo devuelva en lugar de crear otro pero no queremos cambiar todo el código así que la función tiene que seguir funcionando con el operador `new`.

```js
function MyNumber(value) {
  if (MyNumber.cache[value]) return MyNumber.cache[value];

  this.value = value;
  MyNumber.cache[value] = this;
  return this;
}
MyNumber.cache = {};

var num1 = new MyNumber(3);
var num2 = new MyNumber(3);
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/pn2Qf/">Pruébame</a>

Y parece que hemos conseguido ahorrar trabajo al recolector de basura, en lugar de tener dos objetos iguales tenemos uno reutilizado. Pero solo en apariencia, si echamos un vistazo a la función `fakeNew` veremos que la segunda llamada a `MyNumber` si que ha creado un objeto, solo que nos ha devuelto otro, pero el objeto existe y se reservó espacio en memoria y el recolector de basura va a tener que eliminarlo.

Entonces parece ser que que el operador `new` **siempre** crea un objeto con en consiguiente trabajo para el recolector de basura.

## Alternativas

Llegado a este punto probé me di cuenta que para estas operaciones como los juegos, que hacen un uso intenso del procesador y la memoria lo más recomendable era evitar el operador `new`. Decidí probar varias alternativas, la primera y más sencilla, que cada "constructor" (ahora una simple función) creara directamente los objetos que necesita:

```js
function Vector(x, y) {
  return { x: x, y: y };
}
var v = Vector();
```

Pero esto tiene la desventaja que ese objeto no prototipa `Vector.prototype` así que si queremos métodos prototipados habría que probar más algo como:

```js
function Vector(x, y) {
  var instance = Object.create(Vector.prototype);
  instance.x = x;
  instance.y = y;
}
var v = Vector(x, y);
```

Pero esto era mucho código repetido en cada constructor además el hecho de repetir el nombre del constructor complicaba aún más el código.

## `Constructor.protototype` => `prototype.constructor`

En este punto me di cuenta de un factor muy curioso, todas las funciones javascript tienen la propiedad `prototype` que a su vez tiene (por defecto) la propiedad `constructor` que es el propio constructor:

```js
function Testing() {}
console.log(Testing.prototype.constructor === Testing);

var proto = Testing.prototype;
console.log(proto.constructor.prototype === proto);
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/f9rZp/">Pruébame</a>

Esto me hizo pensar que quizás la intención original de los objetos en javascript no era tener constructores que contienen prototipos sino tener prototipos que contienen constructores:

```js
var Vector = {
  constructor: function (x, y) {
    this.x = x;
    this.y = y;
  },
  toString: function () {
    return '[Vector{' + this.x + ',' + this.y + '}]';
  },
};

var v = Object.create(Vector);
v.constructor(0, 0);
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/LVMnC/">Pruébame</a>

Vaya! No parece una forma mucho más sencilla de declarar tipos? [Aquí][6] podemos comparar el mismo tipo escrito con constructores y con este paradigma y juzguen ustedes mismos.

Desde luego no es tan bonito instanciarlos pero si declararlos, mucho más sencillo, tan sencillo que me hace preguntarme si quizás la intención inicial al diseñar el lenguaje no sería la de crear objetos de una forma similar a ésta:

```js
// NOT valid javascript
var Vector = {
  constructor: function(x, y) { ... }
};
var v = Object.instanciate(Vector, [ 0, 0 ]);
```

Incluso se parece bastante a la forma de escribir clases en ECMAScript6

```js
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  },
  toString() { ... }
}
```

##  <a name="paradigma"><code>Type.new()</code> es el nuevo <code>new</code>!</a>

Entonces con esto en mente decidí invertir el proceso, en lugar de crear un constructor y añadir métodos a su prototipo decidí crear un prototipo que contenga el constructor.

Y ya que instanciarlo requiere cierta complejidad decidí crear también un método para instanciar, como ECMAScript5 nos permite usar palabras reservadas como propiedades de objeto la llamé `new`

NOTA: dentro del método `new` `this` es `Vector`, si no conoces como funcionan los contextos en javascript te recomiendo leer [esto][3];

```js
var Vector = {
  new: function () {
    var instance = Object.create(this);
    instance.constructor.apply(instance, arguments);
    return instance;
  },

  constructor: function (x, y) {
    this.x = x;
    this.y = y;
  },

  toString: function () {
    return '[Vector{' + this.x + ',' + this.y + '}]';
  },
};

var v = Vector.new(0, 0);
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/wtQ8S/">Pruébame</a>

Resultó muy sencillo y agradable, lo que lo hace más fácil de mantener. Un último detalle es que todos mis tipos usaban un método `new` idéntico así que decidí hacerlo global para que cada uno de mis tipos pudiera referenciarlo

```js
function $new() {
  var instance = Object.create(this);
  instance.constructor.apply(instance, arguments);
  return instance;
}

var Vector = {
  new: $new,
  constructor: function(x, y) {
    this.x = x;
    this.y = y;
  },
  ...
};

var Cell = {
  new: $new,
  constructor: function(row, col) {
    this.position = row + '-' + col;
  }
};
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/46TaS/">Pruébame</a>

Me encontré muy a gusto con este nuevo paradigma de definir tipos y crear objetos, incluso tiene bonus inesperados como que todos los subtipos tienen el método `new` para crear subinstancias

```js
var vector3D = Vector.new(0, 0);
vector3D.z = 10;

var other = vector3D.new(3, 4);
console.log(other.z); // 10
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/LPAu7/">Pruébame</a>

Me parece un paradigma mucho más natural en javascript, más orientado a objetos (y menos a clases) a objetos que extienden de objetos. Es el paradigma que he seguido en [mis últimas implementaciones][7] y es muy sencillo y cómodo aunque en este caso preferí usar `init` en lugar de `constructor` por ser más compacto y específico ya que no se trata de construir sino de inicializar.

Personalmente recomiendo a todo javascripter probar al menos en proyectos personales este paradigma ya que es una forma de ignorar las parafernalias de los constructores y ver la naturaleza pura y sencilla de javascript que está ahí aunque hayan mil capas puestas encima.

## Todo junto

Volviendo a los inicios, el recolector de basura, utilizando éste paradigma la operación de crear objetos (el operador `new` y el método `.new()`) está en nuestro control ya que podemos modificar el método `.new()` e impedir que se cree ningún objeto cuando nos haga falta sin cambiar el resto del código, si yo tengo este código

```js
var MyNumber = {
  new: $new,

  constructor: function (value) {
    this.value = value;
  },
};

var num1 = MyNumber.new(3);
var num2 = MyNumber.new(3);

console.log(num1 === num2); // false
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/j54Gx/">Pruébame</a>

Podemos cambiarlo para que deje de crear objetos duplicados sin que el código ajeno tenga que cambiarse, lo que demuestra una buena encapsulación

```js
var MyNumber = {
  _cache: {},
  new: function (value) {
    if (this._cache[value]) return this._cache[value];

    var instance = $new.call(this);
    Object.freeze(instance);
    this._cache[value] = instance;
    return instance;
  },

  constructor: function (value) {
    this.value = value;
  },
};

var num1 = MyNumber.new(3);
var num2 = MyNumber.new(3);

console.log(num1 === num2); // true
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/Xhqb5/">Pruébame</a>

Y ahora si hemos conseguido evitar que ningún objeto se cree en la segunda llamada a `MyNumber.new(3)` reduciendo el trabajo del recolector de basura. Esta es una forma muy sencilla de evitar crear objetos duplicados que por el otro lado requiere que los objetos sean inmutables, es decir que no se puedan modificar, esto está hecho en el ejemplo mediante Object.freeze. De lo contrario si cambiamos la propiedad `value` de `num1` también cambiaríamos la pripiedad `value` de `num2` ya que son el mismo objeto. Si necesitamos otro tipo de valor podemos crear otro objeto

```js
var Vector = {
  ...

  merge: function(vector) {
    return Vector.new(this.x + vector.x, this.y + vector.y);
  },
};
```

Por otro lado tenemos otro tipo de objetos que no son tan fáciles de reciclar, por ejemplo las entidades de un juego (enemigos, objetos interactuables...) que se crean y se destruyen constantemente y no hay dos iguales. Para estos casos decidí añadir el método `.dispose()` que lo que hace es pedirle al objeto que vuelva al estado de un objeto recién creado para que pueda ser reciclado la próxima vez que necesitemos otra instancia, en pocas palabras debe deshacer el trabajo del constructor.

```js
var Enemy = {
  _pool: [],
  new: function () {
    var instance = this._pool.length ? this._pool.pop() : Object.create(this);

    instance.constructor.apply(this, arguments);
    return instance;
  },

  constructor: function () {
    this.id = createId();
  },

  dispose: function () {
    delete this.id;
    Enemy._pool.push(this);
  },

  die: function () {
    console.log('Tell my wife I love her...');
  },
};

var enemy1 = Enemy.new();
enemy1.die();
enemy1.dispose();
// aquí deberíamos setear enemy1 a null
// porque puede ser reciclado en cualquier momento
//enemy1 = null;

var enemy2 = Enemy.new();
console.log(enemy1 === enemy2); // true
```

<a target="_blank" href="http://jsfiddle.net/amatiasq/YyLwZ/">Pruébame</a>

Los que hayan usado C++ notarán que parece que estemos volviendo a la gestión de memoria manual pero son los extremos que hay que llegar cuando necesitamos eficiencia.

Et voilà! Cambiando solo el método `new` hemos conseguido optimizar nuestro programa para reducir el trabajo del recolector de basura y conseguir más eficiencia en el código. En mi opinión las posibilidades de mejorar el comportamiento de todo el código cambiando solo una pequeña parte tiene un potencial enorme que no debe ser subestimado. Por supuesto estos son conceptos, como todas las optimizaciones, que solo deben aplicarse allí cuando y donde se encuentre un cuello de botella y no antes.

De momento seguiré con mi juego usando estos patrones, en cuanto al futuro parece ser que ECMAScript6 ha puesto la mira sobre este problema, entre las nuevas funcionalidades encontramos el símbolo `@@create` que [si no lo he entendido mal][8] nos permitirá re-definir la creación de objetos mediante el operador `new`, es decir, reescribiendo el método estático `@@create` podremos evitar que `new` cree un objeto

```js
// Source: https://github.com/lukehoban/es6features

// Pseudo-code of Array
class Array {
  constructor(...args) {
    /* ... */
  }
  static [Symbol.create]() {
    // Install special [[DefineOwnProperty]]
    // to magically update 'length'
  }
}

// User code of Array subclass
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

// Two-phase 'new':
// 1) Call @@create to allocate object
// 2) Invoke constructor on new instance
var arr = new MyArray();
arr[1] = 12;
arr.length == 2;
```

Por otro lado el paradigma de crear objetos con un método `.new()` es un sistema muy agradable que facilita muchas cosas, me ha dado buenas experiencias y permite tener un código más legible (no más `Constructor.prototype.method` por todos lados) más conciso y más controlable. Creo que es algo muy recomendable.

[1]: http://blog.amatiasq.com/2014/03/type-new/
[2]: http://blog.amatiasq.com/2014/03/construccion-de-objetos#paradigma
[3]: http://blog.amatiasq.com/2012/01/javascript-conceptos-basicos-this-call-y-apply/
[4]: http://jsfiddle.net/amatiasq/p8Red/
[5]: https://en.wikipedia.org/wiki/Factory_object
[6]: http://jsfiddle.net/amatiasq/D6cJY/
[7]: https://github.com/amatiasq/mq/tree/master/src
[8]: https://github.com/lukehoban/es6features
