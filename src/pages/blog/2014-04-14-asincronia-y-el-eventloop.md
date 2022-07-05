---
published: 2014-04-14
title:
  en: Asincronía y el EventLoop (🇪🇸 only)
  es: Asincronía y el EventLoop
---

Me gustaría hacer un repaso al tema de la asincronía en Javascript porque me llama la atención que pese a tener casi 20 años es un tema que sigue madurando y he visto surgir buenas ideas recientemente.

### El event loop

Primero lo primero, de donde sale la asincronía. Javascript es un lenguaje cuya ejecución se basa en lo que se llama **event loop** (bucle de eventos). El _event loop_ es una cola donde se van añadiendo los bloques de código que quieren ejecutarse, por ejemplo: cuando el navegador está renderizando el HTML de una página y se encuentra un tag `<script>` el contenido de ese elemento se añade al _event loop_ para que sea ejecutado tan pronto como sea posible.

<!-- end extract -->

Lo mismo ocurre cuando la página ya está cargada y el usuario hace click. Si tenemos una función listener (también llamado callback) escuchando los eventos click de un objeto esa función se añade a la cola del _event loop_ para que el sistema lo ejecute tan pronto como sea posible.

De esta forma todos los bloques de código que se ejecutan en javascript han sido bloques de código que entraron a la cola del _event loop_ y cuando llegó su turno fueron ejecutados. Podemos entenderlo más fácilmente si implementamos un falso event loop en Javascript:

```js
var eventLoop = {
  _queue: [],

  add: function (fn) {
    // añadimos la función a la cola
    this._queue.push(fn);

    // si está desocupado ejecutar la función
    if (!this.running) this.executeNext();
  },

  executeNext: function () {
    if (this.running || this._queue.length === 0) return;

    this.running = true;
    var block = this._queue.shift();
    block();
    this.running = false;

    this.executeNext();
  },
};
```

<a target="_black" href="http://jsfiddle.net/amatiasq/k9ebk/">Pruébame</a>

Esto significa que mientras un bloque esté ejecutándose ningún otro bloque de código puede estar ejecutándose a la vez. Pero si un proceso tarda mucho (como leer el disco, comunicarse con el servidor, esperar una determinada cantidad de tiempo...) lo que hacemos es pasarles una función que será añadida al _event loop_ cuando el proceso acabe.

Cada "bloque" que el _event loop_ ejecuta se llama "un tick del event loop", de ahí el nombre de la función `process.nextTick` de NodeJS.

Una forma sencilla de controlar el _event loop_ es mediante `setTimeout`, `setInterval` y `setImmediate`, podemos crear funciones similares que hagan la misma funcionalidad (simplificada) pero para nuestro `eventLoop`:

```js
function mySetImmediate(fn) {
  eventLoop.add(fn);
}

function mySetTimeout(fn, milliseconds) {
  // la unica forma de dejar pasar el tiempo
  // es mediante el VERDADERO setTimeout ;)
  setTimeout(function () {
    mySetImmediate(fn);
  }, milliseconds);
}

function mySetInterval(fn, milliseconds) {
  function execute() {
    fn();
    mySetTimeout(execute, milliseconds);
  }

  mySetTimeout(execute, milliseconds);
}
```

Como se puede ver tanto setTimeout como setInterval esperan la cantidad de milisegundos definida y **entonces añaden** el bloque al _event loop_, si el _event loop_ está ocupado en ese momento puede tardar un poco más de lo esperado en ejecutarse nuestra función.

Entiendiendo esto es más fácil entender porqué Javascript funciona de la forma que funciona.

- Solo hay un bloque de código ejecutandose en cada momento
- Los bloques se encolan
- Se considera asíncrono a una sección de código que será ejecutada en un "tick" distinto

```js
var a = 1;
setTimeout(function () {
  // esta función es asíncrona porque el tick que llama a setTimeout
  // tiene que acabar antes que esta función sea invocada.
  a = 2;
}, 100);
```

En el caso de javascript para el navegador además nos encontramos con que el _event loop_ es compartido por Javascript y el motor de renderizado del navegador. Como el _event loop_ solo puede ejecutar un bloque por vez resulta que si estamos ejecutando Javascript el navegador no puede renderizar la página y vice versa, si la página tarda mucho en renderizarse retrasará la ejecución del Javascript. Esto es así porque desde Javascript podemos modificar el DOM y si el navegador intenta renderizar la página mientras nosotros la modificamos tendríamos otro tipo de problemas peores.

Pero es importante tener esto en cuenta ya que un proceso Javascript que tarde demasiado "congelará" la página, no funcionarán los clicks, scroll, ni siquiera los `:hover`.

### Un poco de historia

Cuando Javascript fue desarrollado la comunicación asíncrona con el DOM se solucionó mediante eventos y tiene todo el sentido del mundo. Quieres saber cuando el usuario hace click en un elemento? Registra el evento y el navegador te avisará, quieres saber cuando el usuario haga scroll? registra el evento!

El problema empezó cuando empezamos a usar eventos para cosas no tan claras, como eventos puntuales que solo se disparaban una vez:

```js
window.addEventListener('load', function() { ... });
someAjax().onready = function() { ... };
```

Incluso para controlar errores

```js
xhr.onerror = function() { ... };
document.querySelector("script").onerror = function() { ... };
```

Hasta para controlar un progreso (en APIs modernas incluso)

```js
var reader = new FileReader();
reader.onprogress = function() { ... };
```

Pero al no estar acostumbrados a trabajar con asincronía de esta forma no fuimos capaces de ver que estabamos usando una herramienta para todo, como dicen por ahí "para un hombre con un martillo todo es un clavo".

En node decidieron adaptar el patrón "Continuous Passing Style", que consiste en pasar callbacks a funciones asíncronas

```js
fs.readFile("foo", function() { ... });
```

Y por suerte integraron `EventEmitter`, que permitió crear APIs que usaran eventos sin más complejidad. Y lo que es mejor, incluyeron los streams, una forma de gestión de asincronía creada para que podamos acceder a un recurso por partes. Con el tiempo llegaron los promises que fue lo primero que me hizo plantearme si estábamos enfocando la asincronía de forma coherente.

En total he llegado a resumir los distintos tipos de asincronía en dos, ambos con la característica de que necesitan gestionar también errores:

- **Valor asíncrono**: el callback se invoca una sola vez en el futuro
- **Collección asíncrona**: el callback se invoca una vez por cada elemento en la colección

###  Valor asíncrono

En el primer caso tenemos un valor asíncrono, puede ser el valor devuelto por una función asíncrona o el valor puede ser nulo en cuyo caso simplemente funcionaría para detectar cuando el proceso ha finalizado. Este caso está cubierto por los Promises.

Desde mi punto de vista se trata de una especie de meta-programación, tenemos un valor (el promise) que sustituye al valor real para que podamos seguir con nuestra ejecución síncrona.

```js
var contentPromise = file.readContent();
return contentPromise;
```

###  Colección asíncrona

Podemos verlo como un array asíncrono, que a medida que se le van añadiendo elementos va invocando a su callback. En este grupo metería a todo componente asíncrono que invoque a su callback más de una vez:

- Flujo de datos
- Progreso
- Eventos

Una de las funcionalidades que más me gustan de [Dart][1] es que [han sustituído los eventos DOM por streams][2], un pequeño detalle pero que es todo un cambio de concepto, los eventos DOM son una lista de tamaño indeterminado. Cada vez que el usuario hace click es como añadir ese evento al stream de eventos click de ese elemento. Al ser un stream podemos escucharlo, filtrarlo, manipularlo... de la misma forma que hacemos con una colección. Incluso hay implementaciones que tienen métodos `.forEach` y `.filter` y `.map` cumpliendo la misma interfaz que el resto de colecciones.

Por otro lado los streams siguen siendo útiles para su funcionalidad primera, entregarnos un contenido que vamos recibiendo por partes, es decir; en lugar de cargar un achivo de 1Gb en memoria, un stream nos lo va entregando en bloques más pequeños así podemos trabajarlos y liberar memoria. Además en casos como medidores de progresos encajan perfectamente, siendo cada actualización del progreso un elemento del stream.

###  Y todo junto

> Nota: el código a continuación es adaptado de otros lenguajes y no existe en Javascript

Incluso hay implementaciones muy completas que integran perfectamente los stream y los promises, podemos hacer de forma sencilla cosas como capturar el primer click en la pagina

```js
// window.onClick instanceof Stream
var firstClick = window.onClick.first;
firstClick.then(function() { ... });
```

Comprobar si las primeras diez teclas han sido "flecha derecha"

```js
var firstTenKeys = input.onKeyDown.take(10);
var keyRightTenTimes = firstTenKeys.every(function (event) {
  return event.keyCode === 39;
});
keyRightTenTimes.then(function (value) {
  if (value) console.log('You like left arrow! :D');
});
```

Capturar solo el tercer click en la página

```js
var thirdClick = input.onKeyDown.elementAt(3);
thirdClick.then(function (event) {
  console.log('You clicked three times :)');
});
```

Obtener todo el contenido del archivo desde el stream, no hace falta un método especial

```js
var stream = file.getReadStream()
var fileContent = stream.join('');
fileContent.then(function(content) { ... });
```

O detectar el primer evento `readystatechange` en que el `readyState` sea `4`, convertirlo en promise y devolver la respuesta

```js
return xhr.onReadyStateChange
  .filter(function (event) {
    return xhr.readyState === 4;
  })
  .first.then(function () {
    return xhr.responseText;
  });
```

Unificar varias operaciones

```js
// readFile returns promise
var concat = new Stream([readFile('./header.html'), readFile('./content.html'), readFile('./footer.html')]);
stream.listen(function (chunk) {
  response.write(chunk);
});
```

Incluso cosas más complejas como detectar la primera acción del usuario en la página

```js
// Promise.race devuelve un promise que se completará
// cuando el primer promise de la lista se complete
Promise.race([window.onClick.first, window.onKeyDown.first, window.onMouseMove.first]).then(function (event) {
  console.log('El usuario ha disparado el evento ' + event.type);
});
```

Y hasta capturar el evento `load` de window aunque ya haya pasado:

```js
setTimeout(function () {
  window.onLoad.first(function () {
    // Me van a invocar aunque el evento
    // ya haya pasado :)
  });
}, 1000 * 60 * 60); // una hora
```

### Resumen

La gestión de la asincronía, que siempre ha sido un caos, se simplifica de forma radical gracias a una buena combinación de Stream/Promises. Espero poder actualizar la entrada de los promises con los nuevos promises estándard de ECMAScript 6 :)

Conocen más patrones de gestión de asincronía?

[1]: https://www.dartlang.org/
[2]: https://www.dartlang.org/articles/improving-the-dom/#events
