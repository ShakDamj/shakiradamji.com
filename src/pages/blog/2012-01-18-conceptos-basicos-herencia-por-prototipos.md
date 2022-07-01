---
title: 'Conceptos Básicos Javascript: Herencia por prototipos'
date: 2012-01-18
---

Llegó la hora de entrar el en tema que realmente confunde a los recién llegados a Javascript, principalmente para quienes vienen de lenguajes que implementan la orientación a objetos mediante clases, que son la gran mayoría.

### Orientación a Objetos

Primero deberemos aclarar que significa Programación Orientada a Objetos (POO u OOP en ingés).

[Según la Wikipedia][1], la descripción es:

> es un paradigma de programación que usa objetos y sus interacciones, para diseñar aplicaciones y programas informáticos. Está basado en varias técnicas, incluyendo herencia, abstracción, polimorfismo y encapsulamiento.

Como vemos un lenguaje orientado a objetos **no necesariamente tiene que implementarse mediante clases**, cualquier sistema que proporcione [herencia][2], [abstracción][3], [polimorfismo][4] y [encapsulamiento][5] es una implementación de orientación a objetos válida. Como ya dijimos, el sistema de clases es el más extendido, utilizado por C++, Java, C#, PHP, Python, ActionScript3, Perl, Objective-C, Ruby, etc... **Javascript no tiene clases, utiliza el sistema de herencia por prototipos**, veamos la diferencia:

<!--more Seguir leyendo → -->

**En un lenguaje basado en clases** tenemos dos tipos de conceptos, los objetos en sí, referencias que pueden ser almacenadas, modificadas y pasadas como argumentos. Y por otro lado **las clases, objetos intangibles, no podemos guardarlos en variables ni pasar como argumento**, no podemos manipularlos ni comprobar si existen excepto por reflexión, que consiste en herramientas del lenguaje para obtener objetos (tangibles, del tipo anterior) que **representan a las clases** a las que no podemos acceder. En un lenguaje de éste tipo las clases están una capa por encima de los objetos y definen la herencia, abstracción, encapsulamiento y polimorfismo de los objetos que se obtendrán a partir de ellas, tienen una función de plantillas para crear objetos definidas antes de ejecutarse el código del programa.

**En un lenguaje orientado a prototipos** no hay clases que definan la herencia, los objetos mismos heredan de otros objetos. No hay clases cuando el programa se inicia, sino que se crean objetos y se le ordena a otros objetos que hereden de ellos. Por ejemplo, si tenemos un objeto eventEmitter y queremos crear instancias creamos nuevos objetos y hacemos que hereden de eventEmitter.

### [[Prototype]]

Una vez entendido el concepto podemos pasar a la práctica, sabemos que para crear instancias de clases hacemos `new MyClass()` pero cómo hacemos que objetos hereden de objetos? Aquí entran los prototipos. **Todos los objetos Javascript tienen una propiedad oculta que llamaremos `[[Prototype]]`**, con corchetes (aunque en algunos navegadores es posible acceder a ella mediante la propiedad `.__proto__`, con dos barras bajas a cada lado, pero no es estándar) **que es un puntero al objeto del cual hereda**. Y que significa que hereda? Podríamos resumir la herencia en que un objeto tiene las mismas propiedades que otro.

Con ésto nos ahorramos tener que poner las mismas propiedades en más de un objeto. Esto trae un nuevo concepto que puede confundir a muchos: **en Javascript todo es una instancia, y cuando heredamos de un objeto también se puede decir que estamos creando una instancia de ése objeto**, para evitar confunsiones **suele decirse que un objeto "extiende" otro**. Imaginemos que tenemos un objeto perro que hereda de animal. Que significa ésto? que la propiedad `[[Prototype]]` de perro es animal, o lo que es lo mismo:

```js
perro.__proto__ == animal; // true
```

El código de ejemplo es el siguiente:

```js
var animal = {};
animal.estaVivo = function () {
  return true;
};

var perro = {};
perro.__proto__ = animal;
console.log(perro.estaVivo);
```

<a href="http://jsfiddle.net/amatiasq/tyK4u/" target="_blank">Pruébame</a>

Vemos que `perro.estaVivo` es la función que asignamos a `animal` cómo puede ser ésto? Por la herencia por prototipos. **Javascript ha buscado la propiedad `estaVivo` en `perro` pero no la ha encontrado, entonces accede a su propiedad `[[Prototype]]` (o `__proto__`)** donde nosotros guardamos `animal`. Entonces busca `estaVivo` en `animal` y lo encuentra. Por eso `perro.estaVivo` nos devuelve el método de `animal`. Podríamos representarlo así:

![Diagrama][6]

Y si animal no hubiese tenido la propiedad `estaVivo`? En ese caso debemos tener en cuenta que animal también es un objeto y que todos los objetos tienen prototipo, en caso de que no le asignemos ninguno su prototipo es `Object.prototype`. Es otra forma de decir que **en Javascript todos los objetos extienden `Object.prototype`**. `Object.prototype` es el equivalente a la clase `Object` de Java o C#.

```js
var animal = {};
console.log(animal.__proto__ === Object.prototype);
```

<a href="http://jsfiddle.net/amatiasq/29S2r/" target="_blank">Pruébame</a>

Y si tampoco encuentra la propiedad en `Object.prototype`? lo busca en el `[[Prototype]]` de `Object.prototype` pero sorpresa! **`Object.prototype.__proto__` es `null`**. Eso significa que **es el último objeto de la jerarquía de herencia**, si llegado a éste punto Javascript no encuentra la propiedad que le pedimos devuelve `undefined`.

Esta jerarquía de prototipos suele llamarse **cadena de prototipos** del objeto. Por ejemplo, `Object.prototype` tiene la propiedad `.toString()`, entonces si volvemos a crear `perro` heredando de `animal`, su propiedad `.toString()` que será? Javascript recorrerá la jerarquía de prototipos de `perro` hasta encontrar `.toString()` que está en `Object.prototype`.

```js
var animal = {};
animal.estaVivo = function () {
  return true;
};

var perro = {};
perro.__proto__ = animal;
console.log(perro.toString === Object.prototype.toString);
```

<a href="http://jsfiddle.net/amatiasq/4rVg4/" target="_blank">Pruébame</a>

### Como modificar una propidad inaccesible?

Bien, la teoría ha ido correctamente, pero como ya dijimos, **`__proto__` no es estándar**, y por lo tanto no podemos contar con que funcione en cualquier motor de Javascript, **entonces cómo se supone que vamos a implementar herencia en Javascript?** Para ello Javascript provee de una funcionalidad un tanto difícil de entender así que intentaremos ir poco a poco.

**Toda función, creada en Javascript tiene una propiedad llamada `.prototype` que no debe confundirse con `[[Prototype]]`**, el `[[Prototype]]` de las funciones apunta a `Function.prototype` que es un objeto que tiene funciones como `.call()`, `.apply()` y `.bind()`. No, en éste caso nos referimos a que todas las funciones tienen una propiedad llamada `prototype` que es un objeto vacío. Y porqué se llama `prototype` si no tiene nada que ver con el `[[Prototype]]` de la función? **Porque los objetos que creemos llamando a ésa función con `new` tendrán su `[[Prototype]]` apuntando a la propiedad `prototype` de la función:**

```js
function myFunct() {}
var obj = new myFunct();
console.log(obj.__proto__ === myFunct.prototype);
```

<a href="http://jsfiddle.net/amatiasq/r2F8G/" target="_blank">Pruébame</a>

Sorpresa! **Hemos modificado la propiedad oculta `[[Prototype]]` de `obj`!** Quizás te preguntes porqué no se estandariza la propiedad accesible `__proto__`? Porque con el sistema de las funciones el lenguaje se asegura que **sólo podemos modificar la propiedad `[[Prototype]]` de objetos nuevos**, no de existentes. De ésta forma, en las implementaciones estándar donde no podemos acceder a la propiedad `__proto__` no podemos modificar el prototipo de una función o de `Object.prototype` ni podemos evitar que un objeto extienda de `Object.prototype`, poniendo su propiedad `__proto__` a `null` romperíamos ésta regla del lenguaje.

Pero **entonces `myFunct` es una clase? Podría decirse que si, pero no es una clase como las que estamos acostumbrados a ver, es una función, es un objeto y es tangible**, el hecho de crear nuevos objetos con `new` seguido de una función es solo una sintaxis que se añadió a Javascript para parecerse a Java, lenguaje en plena expansión cuando Javascript fue diseñado. Ahora que entendemos que `myFunct.prototype` es igual al `[[Prototype]]` de los objetos que creemos con la función podemos crear objetos que extiendan del mismo objeto:

```js
function myFunct() {}
myFunct.prototype = {
  name: 'Alice',
  lastname: 'Smith',
  fullname: function () {
    return this.name + ' ' + this.lastname;
  },
};

var instancia1 = new myFunct();
var instancia2 = new myFunct();

console.log(instancia1.fullname() + 'n' + instancia2.fullname());
console.log(instancia1.__proto__ == instancia2.__proto__);
```

<a href="http://jsfiddle.net/amatiasq/F2yQy/" target="_blank">Pruébame</a>

E incluso podemos crear un objeto que extienda de una instancia de myFunct!

```js
instancia1.name = 'Bob';
function extenderInstancia1() {}
extenderInstancia1.prototype = instancia1;
var subInstancia = new extenderInstancia1();

var texto = 'Fullname: ' + subInstancia.fullname() + 'n';
texto += 'Es instancia de extenderInstancia1? ' + (subInstancia instanceof extenderInstancia1) + 'n';
texto += 'Es instancia de myFunct? ' + (subInstancia instanceof myFunct) + 'n';
texto += 'Es instancia de Object? ' + (subInstancia instanceof Object);

alert(texto);
```

<a href="http://jsfiddle.net/amatiasq/Ggj6T/" target="_blank">Pruébame</a>

### `extend()`

Pero éste lío de tener funciones que parecen clases pero no son clases exactamente y crean instancias y tener que crear funciones para extender es bastante confuso, por ello, los defensores de no mezclar la herencia por prototipos con éstas falsas clases proponen usar la función `extend`:

```js
function extend(proto) {
  function intermediario() {}
  intermediario.prototype = proto;
  return new intermediario();
}
```

Y con ésta función podemos extender objetos sin necesidad de crear funciones intermedias:

```js
var base = {
  name: 'Alice',
  lastname: 'Smith',
  fullname: function () {
    return this.name + ' ' + this.lastname;
  },
};

var instancia1 = extend(base);
var instancia2 = extend(base);

instancia1.name = 'Bob';
var subInstancia = extend(instancia1);
console.log(subInstancia.fullname());
```

<a href="http://jsfiddle.net/amatiasq/WZFAH/" target="_blank">Pruébame</a>

Como vemos, el código queda bastante más claro, es por ésto que en la 5ª edición de ECMAScript (el estándar en el que está basado Javascript), se decidió añadir `Object.create()` que [cumple la misma funcionalidad][7] que la función `extend()` que hemos creado.

### Resumen

Es un camino duro pasar de un lenguaje basado en clases a uno basado en prototipos, requiere mucha práctica, una mente abierta y muchas ganas de aprender. Pero las ganancias son grandes, incluso para desarrolladores que no necesiten tocar Javascript considero que aprender éste patrón aporta ventajas porque **entender ambos patrones en mente nos abre a nuevas ideas, nos ayuda a tener siempre presente que las cosas no tienen porque ser como estamos acostumbrados a que sean, y a buscar nuevas soluciones a nuevos problemas y por último pero no menos importante, nos mantiene activos**. Espero que sea fácil seguir el post aunque se que ha crecido más allá de lo deseado, pido comprensión ya que escribir no es mi punto fuerte, pero para eso está la práctica, para mejorar ;)

[1]: https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos
[2]: https://es.wikipedia.org/wiki/Herencia_(programaci%C3%B3n_orientada_a_objetos)
[3]: https://es.wikipedia.org/wiki/Abstracci%C3%B3n_(programaci%C3%B3n_orientada_a_objetos)
[4]: https://es.wikipedia.org/wiki/Polimorfismo_(programaci%C3%B3n_orientada_a_objetos)
[5]: https://es.wikipedia.org/wiki/Encapsulamiento_(programaci%C3%B3n_orientada_a_objetos)
[6]: /wp-content/uploads/2012/01/prototype.png
[7]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
