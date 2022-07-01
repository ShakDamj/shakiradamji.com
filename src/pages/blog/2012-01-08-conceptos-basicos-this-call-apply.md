---
title: 'Conceptos Básicos Javascript: this, .call() y .apply()'
date: 2012-01-08
---

Antes de continuar con el Patrón Promise me gustaría explicar en paralelo Conceptos Básicos de Javascript. Entendiendo que estamos hablando de Javascript como lenguaje y no vamos a hablar sobre conceptos básicos del DOM o como abrir una nueva ventana en el navegador, sino detalles de Javascript puro, tanto en cliente como en servidor.

### De dónde sale _this_

He pensado que sería un buen punto empezar por una curiosidad bastante desconocida para los recién llegados a Javascript: La variable `this`, también llamado el `scope` o más correctamente `contexto` de la función. En los lenguajes basados en clases más extendidos (Java, C++, C#...) encontramos que **los métodos de la clase siempre disponen de la variable `this` que nos permite acceder a nuestra propia instancia** sobre la que se está ejecutando el método. Es decir, si tenemos la clase

```js
class MyClass {
  String myField;
  void myMethod() {
    this.myField;
  }
}
```

Veremos que en myMethod siempre tendremos `this` apuntando a una variable del tipo `MyClass` que contendrá un campo `myField`. En Javascript ésto no es así, **en Javascript todo son objetos**, incluidas las funciones y métodos, ambos **son instancias de `Function`**, y como tales no están ligadas a un objeto en particular. Miremos el código:

```js
function myFunction() {
  console.log(this.name);
}

var objectA = {
  name: 'Alice',
  myMethod: myFunction,
};

var objectB = {
  name: 'Bob',
  myMethod: myFunction,
};
```

Aquí tenemos dos objetos totalmente independientes y ambos tienen la propiedad `myMethod` apuntado a `myFunction` a pesar de que no tienen una clase en común más que `Object`. Entonces cuál es **el valor de this** en `myFunction`? No es fijo, **cambia según como lo llamemos**.

```js
objectA.myMethod();
// Imprime "Alice"

objectB.myMethod();
// Imprime "Bob"
```

<a href="http://jsfiddle.net/amatiasq/YUX5B/" target="_blank">Pruébame</a>

<!--more Seguir leyendo → -->

Como vemos el valor de `this` cambia según sobre que objeto lo llamemos. Bien, Javascript sabe que valor tiene que poner a `this` antes de llamar a una función, pero nosotros necesitamos entenderlo para no encontrarnos con bugs imposibles de corregir. Para ésto hay una regla de oro: **el objeto `this` pasado a una función es el objeto que está antes del punto que precede los paréntesis que invocan a la función**. Es decir, la llamada `objectA.myMethod()` la podríamos dividir en cuatro partes: _ **objectA**: El objeto que contiene la función _ **. (punto)**: Separa el objeto de su propiedad (la función) _ **myMethod**: Nombre de la función _ **() (paréntesis)**: Ejecutan la función En éste caso vemos que

**antes del punto está `objectA`** por lo que será `objectA` lo **que se le pasará a la variable `this`** del método `myMethod`.

### Casos más complejos

#### Más de un punto

Ahora vamos a ver casos en los que tenemos más o menos de un punto, es menos difícil de lo que parece. Para empezar, que pasa si usamos namespaces:

```js
amq.test.StringHelper.firstToUpperCase('myname');
```

Aquí cuál es el valor de `this`? Si miramos la regla de oro veremos que solo el punto que precede a los paréntesis debe importarnos, por lo que tenemos:

- **amq.test.StringHelper**: El objeto que contiene la función
- **. (punto)**: Separa el objeto de su propiedad (la función)
- **firstToUpperCase**: Nombre de la función
- **() (paréntesis)**: Ejecutan la función El valor de

**`this` siempre es el objeto que está antes del último punto**, es decir, el objeto **que contiene la función**.

#### Sin puntos

Pero que pasa si no hay ningún punto? si la función no está en ningún objeto?

```js
function testScope() {
  console.log(this);
}
testScope();
```

Aquí podríamos pensar que `this` es `null` y tendría sentido pero no, Javascript define que una función invocada sin contexto, el contexto debe ser el Objeto Global, que en el caso de un navegador sería `window`. Por lo que en **una función que no esté contenida en ningún objeto recibirá el objeto global** como `this`.

### Callbacks

Ya con toda ésta base podemos abordar el problema de los callbacks, supongamos que tenemos una función que hace un proceso asíncrono y necesitamos pasarle un callback para que se ejecute cuando el proceso asíncrono termine. Para el ejemplo pondremos que la tarea asíncrona sea esperar un segundo

```js
function esperarUnSegundo(callback) {
  setTimeout(function () {
    callback();
  }, 1000);
}
```

Perfecto, ya tenemos una función que espera que pase un segundo y llama al callback, pero que pasa si la usamos de ésta forma?

```js
var alice = {
  nombre: 'Alice',
  cansarse: function () {
    alert(this.nombre + ' se ha cansado de esperar');
  },
};
esperarUnSegundo(alice.cansarse);
```

<a href="http://jsfiddle.net/amatiasq/erfJF/" target="_blank">Pruébame</a>

Aquí tenemos un problema, al parecer `this.nombre` no es "Alice". Porqué? Repasemos la regla de oro, `this` será el objeto que está antes del punto que precede a los paréntesis que ejecutan la función. Busquemos los paréntesis que ejecutan la función:

```js
callback();
```

Y vemos que no hay ningún punto delante. **La función la hemos extraído del objeto** `alice`, pero al extraerla la hemos desvinculado de él y al llamarlo ya no se le pasa `alice` porque ya no se la llama con `alice.<nombre del método>` Entonces cómo hacemos para que callback no pierda su contexto? para que mantenga el valor de `this` a `alice`?

### Los métodos de `Function`

Para ésto vienen en nuestra ayuda los métodos de `Function`, como ya dijimos, **las funciones son instancias de la clase `Function` y como tal tienen también métodos propios**. Los más utilizados son `.call()` y `.apply()`

#### `.call()` Imaginemos que tenemos otra vez el objeto `alice` y que guardamos su método en una variable.

```js
var alice = {
  nombre: 'Alice',
  cansarse: function () {
    console.log(this.nombre);
  },
};

var myFunction = alice.cansarse;
```

Si llamamos a `myFunction` directamente lo estaríamos llamando sin contexto por lo el la variable `this` tendría el objeto global dentro de `myFunction`, como podemos hacer que ejecute `myFunction` pero pasándole `alice` como `this`? Para ésto tenemos las funciones `.call()` y `.apply()`, empecemos por la función `.call()`.

**La función `.call()` recibe los mismos argumentos que la función mas uno, el valor que tendrá `this` que se pasa antes que los demás argumentos**. Es decir, nuestra función `myFunction` no recibe ningún argumento así que si llamamos a su método `.call()` y le pasamos lo que queremos que sea `this` es decir, `alice` conseguiremos que el método funcione igual que si lo hubiésemos llamado con `alice.cansarse`

```js
myFunction.call(alice);
```

<a href="http://jsfiddle.net/amatiasq/kbr5t/" target="_blank">Pruébame</a>

Ahora vamos a probar lo mismo con una función que reciba argumentos:

```js
var alice = {
  nombre: 'Alice',
  saludar: function (amigo1, amigo2) {
    alert('Hola ' + amigo1 + ' y ' + amigo2 + ', yo soy ' + this.nombre);
  },
};

var myFunction = alice.saludar;
myFunction.call(alice, 'Bob', 'Rob');
```

<a href="http://jsfiddle.net/amatiasq/HZuPL/" target="_blank">Pruébame</a>

Como se ve, hemos conseguido modificar el valor que tiene `this` cuando se ejecuta la función, es decir el contexto.

#### .apply()

El método `.apply()` actúa de forma bastante similar a `.call()`, pero con una variación, solo **recibe dos argumentos, el primero es el contexto de la función**, el valor de `this` **y el segundo será un array que contendrá los argumentos que se le pasarán a la función**, veamos su uso en el ejemplo anterior:

```js
myFunction.apply(alice, ['Bob', 'Rob']);
```

<a href="http://jsfiddle.net/amatiasq/bSmeR/" target="_blank">Pruébame</a>

Esto aunque en un principio parezca bastante inútil nos servirá cuando, queriendo o no cambiar el contexto de una función, **querramos llamarla y no sepamos ni nos interese saber cuántos argumentos tiene**, supongamos que tenemos la función `callWithAlice()` que llama a la función `.saludar()` de `alice` y le pasa todos los argumentos que recibe.

**Nota 1:** Para ésto hace falta aclarar que el objeto `arguments` es una especie de array con los argumentos pasados a la función, más adelante profundizaremos en ello.

**Nota 2:** En éste caso no queremos cambiar el contexto, pero como estamos llamando a `.apply()` tenemos que darle uno, por lo que le damos `alice` que es el contexto que ya tenía.

```js
function callWithAlice() {
  alice.saludar.apply(alice, arguments);
}
callWithAlice('Rob', 'Bob');
```

<a href="http://jsfiddle.net/amatiasq/VrESt/" target="_blank">Pruébame</a>

#### Bonus: .bind()

Ahora que ya entendemos el contexto, `.call()` y `.apply()` sabremos que cuando pasemos una función como callback si no queremos perder el contexto de la función deberemos hacer:

```js
function esperarUnSegundo(callback) {
  setTimeout(function() {
    callback();
  }, 1000);
});

esperarUnSegundo(function() {
  alice.myMethod();
});
```

O bien:

```js
function esperarUnSegundo(callback, context) {
  setTimeout(function() {
    callback.call(context);
  }, 1000);
});

esperarUnSegundo(alice.myMethod, alice);
```

Pero ésto puede ser un poco tedioso cuando manejas muchos callbacks de éste tipo, para ello se ha creado el método `.bind()`. Es un método de `Function` que devuelve otra función. Confuso, verdad?

**`.bind()` recibe un argumento, el contexto que se le podrá a la función sobre la que se aplica el `.bind()` y devolverá una función** que cuando sea llamada ejecutará la función original con el contexto que se le pasó a `.bind()`. Lo veremos mejor con un ejemplo:

```js
var alice = {
  nombre: 'Alice',
  saludar: function () {
    console.log('Hola! Soy ' + this.nombre);
  },
};

var myFunction = alice.saludar.bind(alice);
myFunction();
```

<a href="http://jsfiddle.net/amatiasq/NUWCy/" target="_blank">Pruébame</a>

Lo que hemos hecho en la línea 8 es crear una función que cuando sea invocada llamará a `saludar` y le pasará `alice` como contexto.

### Y ya está!

Con éste repaso ya deberíamos ser capaces de entender la parte más complicada para un recién llegado a Javascript, la modificación del contexto. Es una técnica que requiere mucha práctica, pero detrás de la cual se esconde la mitad del potencial de Javascript y como tal, también nos abre los ojos a muchos bugs que de otra forma serían imposibles de entender.

De hecho, para los que les gusta romperse la cabeza como yo, les dejo un caramelo: Todas las funciones tienen los métodos `.call()`, `.apply()` y `.bind()`, es cierto. Pero éstos métodos también son funciones, eso significa que podemos hacer ésto? Que resultado tendría? Se los dejo a ustedes ;)

```js
alice.saludar.call.call.call.call.apply.bind();
```

Y que pasa si llamo a uno de éstos métodos y no le paso scope?

```js
alice.saludar.call(null);
```

Espero que haya sido claro y conciso, pero me temo que ha sido más de lo primero que de lo segundo. Pronto tendré otro artículo sobre Conceptos Básicos de Javascript. Saludos.
