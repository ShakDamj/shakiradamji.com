---
published: 2011-12-18
title:
  en: 'Patrón Promise: Implementación (🇪🇸 only)'
  es: 'Patrón Promise: Implementación'
---

Lo prometido es deuda (bien lo saben las funciones) y he encontrado un momento para empezar a explicar la forma en la que he implementado el patrón Promise en mi caso, no tiene porqué ser la mejor, pero cumple con su cometido.

**NOTA:** Me gustaría implementarla en Test Driven Development, pero ya es bastante para quien lee y para el que escribe seguir la implementación como para encima añadir TDD, pero no quisiera dejar de recomendarlo.

<!-- end extract -->

### Primero: Funcionalidad básica

Lo que necesitamos de un objeto Promise es:

- Crear instancias totalmente independientes
- Añadirle callbacks que serán llamados cuando se cumpla la promesa
- Notificarle cuando se ha cumplido la promesa

<!--more Seguir leyendo → -->

Con los objetivos en la mano es más sencillo ver que hacer, lo primero necesitamos una clase, a la hora de crear clases en Javascript yo me decanto por el patrón de constructor con prototipos que espero explicar algún día.

```js
function Promise() {}
```

**Segundo punto:** poder añadirle callbacks, ésto consiste en el método `.then()` al que deberemos poder llamar pasándole las funciones que queremos que se ejecuten cuando la promesa se cumpla. Puesto de debe poderse añadir más de un callback para cada promise lo más lógico sería crear un Array donde almacenarlos

```js
function Promise() {
  this._callbacks = [];
}
```

Y el método `.then()` que vaya añadiendo al Array los callbacks que se le pasen, puesto que es mejor que los errores se detecten cuanto antes también podemos asegurarnos que el callback es una función:

```js
Promise.prototype.then = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error("[Promise.then] El argumento 'callback' no es una función " + typeof callback);
  }

  this._callbacks.push(callback);
};
```

Y ahora que ya tenemos todos los callbacks en un Array necesitamos algún sistema para avisarle al Promise que ya tiene los datos que necesita y que se los pase a los callbacks. Sobre ésto no he visto ninguna implementación, pero a mi me parece bastante razonable crear un método `Promise.done()` que notifica al Promise que ya está cumplido y ejecuta los callbacks.

```js
Promise.prototype.done = function () {
  var callback;
  for (var i = 0; i < this._callbacks.length; i++) {
    callback = this._callbacks[i];
    callback();
  }
};
```

Y ya lo tenemos hecho, hemos creado un Promise básico, vamos a probarlo. Imaginemos cualquier función asíncrona, por ejemplo vamos a crear una función que nos avise cuando pase un segundo:

```js
function esperarUnSegundo() {
  var promise = new Promise();
  // Hacemos un timeout a mil milisegundos
  setTimeout(function () {
    promise.done();
  }, 1000);
  return promise;
}

esperarUnSegundo().then(function () {
  alert('Ha pasado un segundo =D');
});
```

<a href="http://jsfiddle.net/amatiasq/4LBWd/2/" target="_blank">Pruébame</a>

Si probamos todo el código veremos que al cabo de un segundo ejecuta el alert.

Todo funciona perfectamente, vamos un punto más allá, ésta vez descarguemos una página, como no nos importa ahora mismo el código que descarga la página fingiremos llamar a una función `peticiónHttp(url, callback)` que lo hará por nosotros.

```js
function descargar(url) {
  var promise = new Promise();
  peticiónHttp(url, function (codigoHtml) {
    promise.done();
  });
  return promise;
}
descargar('www.google.com').then(function () {
  // Y ahora?
});
```

Sorpresa! La función ha descargado la página y obtenido el html, pero nuestro Promise no ha sido capaz de pasarlo al callback. La función del Promise en un principio era avisar cuando una tarea asíncrona termina, pero la mayoría de las tareas asíncronas devuelven un resultado y cuando avisemos al Promise que se ha cumplido también querremos que pase el resultado a todos los callbacks. Para ello modificaremos el método done y para que pase a los callbacks todos los argumentos que se le pasen a él (si no sabes lo que hace el método apply puedes mirarlo [aquí][1]):

```js
Promise.prototype.done = function () {
  // Guardamos los argumentos que se le ha pasado a .done()
  var args = arguments;
  var callback;
  for (var i = 0; i < this._callbacks.length; i++) {
    callback = this._callbacks[i];
    // Y se los pasamos al callback
    callback.apply(null, args);
  }
};
```

Y ya está, ahora podemos pasarle argumentos a `.done()`:

```js
function descargar(url) {
  var promise = new Promise();
  peticiónHttp(url, function (codigoHtml) {
    promise.done(codigoHtml);
  });
  return promise;
}

descargar('www.google.com').then(function (codigoHtml) {
  alert(codigoHtml);
});
```

Ya tenemos nuestra versión 0.1 de la clase Promise :D

### Segundo: Gestión de errores

Hasta aquí ya tenemos un Promise con el que avisar cuando acaba una tarea asíncrona, pero nos olvidamos de algo muy importante, a la hora de programar no todo sale como quisiéramos y muchas veces nos encontramos con errores, que pasaría si `peticiónHttp()` fallara? Que jamás se ejecutaría el `.done()` del Promise que hemos devuelto y el callback esperará sentado a que lo llamen el resto de su vida. Hay que preparar el Promise para que avise cuando algo va mal. Necesitamos añadirle al Promise:

- Poder añadir callbacks especiales para cuando se produzca un error
- Avisarle cuando se produzca un error
- Que le pase al callback de error el objeto Error que se ha lanzado

Lo primero es que el Promise no solo reciba un callback normal sino que también reciba otro callback que será ejecutado solo si se produce un error. Una idea que me gusta es dárselo al método `.then()` como segundo argumento, ya que el primero es el callback normal. Y éste debería guardarlo, para ello debemos crear otro Array donde guardar los callbacks de errores:

```js
function Promise() {
  this._callbacks = [];
  this._onError = [];
}
Promise.prototype.then = function (callback, onError) {
  // Validamos el callback normal
  if (typeof callback !== 'function') {
    throw new Error("[Promise.then] El argumento 'callback' no es una función " + typeof callback);
  }
  // Validamos el callback de error. Como es opcional puede ser 'undefined' o una función
  if (onError && typeof onError !== 'function') {
    throw new Error("[Promise.then] El argumento 'onError' no es una función " + typeof onError);
  }

  this._callbacks.push(callback);
  // Si no era undefined debe ser una función, porque ya lo validamos
  if (onError) {
    this._onError.push(onError);
  }
};
```

Como se ve es prácticamente lo mismo que para los callbacks, ya que se trata de lo mismo, un callback por si hay errores. Ahora vamos a matar los últimos dos puntos de un tiro. Añadiremos un método para avisar al Promise cuando se produzca un error y le pasaremos el objeto Error para que lo pase a todos los callbacks de error.

```js
Promise.prototype.fail = function (error) {
  var callback;
  for (var i = 0; i < this._onError.length; i++) {
    callback = this._onError[i];
    callback(error);
  }
};
```

Y ya está, ahora cuando llamemos al método `.fail()` llamará a todos los callbacks de error y les pasará el objeto Error. Ahora podemos adaptar la función `descargar()` para que también notifique cuando se produzca un error:

```js
function descargar(url) {
  var promise = new Promise();
  try {
    peticiónHttp(url, function (codigoHtml) {
      promise.done(codigoHtml);
    });
  } catch (error) {
    promise.fail(error);
  }
  return promise;
}
descargar('www.google.com').then(function (codigoHtml) {
  alert(codigoHtml);
});
```

Ahora ya podemos decir que tenemos la versión 0.2 del Promise tengo que dejar para otro post métodos más complicados como `.then()` concatenados y el `.and()` porque ya es muy tarde. Aquí dejo el código completo al que le he añadido la propiedad `_estado` para evitar que se pueda cumplir o fallar un Promise cuando ya está cumplido o fallado.

```js
function Promise() {
  this._callbacks = [];
  this._onError = [];
  this._estado = 'esperando';
}

Promise.prototype.then = function (callback, onError) {
  // Validamos el callback normal
  if (typeof callback !== 'function')
    throw new Error("[Promise.then] El argumento 'callback' no es una función " + typeof callback);

  // Validamos el callback de error. Como es opcional puede ser 'undefined' o una función
  if (onError && typeof onError !== 'function')
    throw new Error("[Promise.then] El argumento 'onError' no es una función " + typeof onError);

  this._callbacks.push(callback);
  // Si no era undefined debe ser una función, porque ya lo validamos
  if (onError) this._onError.push(onError);
};

Promise.prototype.done = function (error) {
  if (this._estado !== 'esperando') throw new Error('Intentando cumplir un promise que ya ha finalizado');

  this._estado = 'cumplido';
  // Guardamos los argumentos que se le ha pasado a .done()
  var args = arguments;
  var callback;

  for (var i = 0; i < this._callbacks.length; i++) {
    callback = this._callbacks[i];
    // Y se los pasamos al callback
    callback.apply(null, args);
  }
};

Promise.prototype.fail = function (error) {
  if (this._estado !== 'esperando') throw new Error('Intentando hacer fallar un promise que ya ha finalizado');

  this._estado = 'fallado';
  var callback;

  for (var i = 0; i < this._onError.length; i++) {
    callback = this._onError[i];
    callback(error);
  }
};
```

[1]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply 'appy method'
