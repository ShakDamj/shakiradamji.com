---
published: 2011-12-09
title:
  en: El patrón Promise 🇪🇸
  es: El patrón Promise
---

> Actualización 19/3/2014: Finalmente los promises se han confirmado [para el estándar ECMAScript 6][1], dentro de poco serán nativos en Javascript :D
>
> Actualización 7/10/2016: Los promises [ya son estándar][2] y están implementados [en los navegadores][3]!!!

## PROBLEMA

Recientemente he tenido que implementar un sistema MVC en Javascript para simplificar el desarrollo sobre una plataforma y me he encontrado con el problema de que las llamadas asíncronas a servidor rompían la simpleza del código, tras un análisis identifiqué cuatro problemas:

<!-- end extract -->

#### 1 - Ensuciar la API

Todas las llamadas reciben un último argumento que es el callback:

```js
var dir = new Directory('file:///home/user/Desktop');
dir.browse(function (dir, items) {
  // ...
});
```

Con ésto la API resulta confusa desde el punto de vista de la simpleza y de la semántica. Semánticamente una función recibe la información mínima indispensable para devolver un dato relacionado a lo que se le ha solicitado, como vemos no es el caso en métodos asíncronos:

```js
void Directory.browse(Function callback);
void File.getContent(String encoding, Function callback);
void File.getPermission(Function callback);
```

<!--more Seguir leyendo → -->

### 2 - Llamadas anidadas

En muchas ocaciones deberemos ejecutar una llamada al acabar otra, ésto nos obliga a anidar callbacks:

```js
var file = new File();
file.isReadable(function (permission) {
  if (permission) {
    file.getContent(function (content) {
      // do something with the content
    });
  }
});
```

A medida que vamos añadiendo niveles de profundidad ésto se vuelve muy confuso.

### 3 - Llamadas concurrentes

También necesitaremos realizar llamadas asíncronas paralelas y ejecutar una acción al acabar todas:

```js
var isFile1Done = false;
var isFile2Done = false;

function testIsOver() {
  if (isFile1Done && isFile2Done) {
    // Both files loaded.
  }
}

File.get('http://www.somedomain.com/file1', function () {
  isFile1Done = true;
  testIsOVer();
});
File.get('http://www.somedomain.com/file2', function () {
  isFile2Done = true;
  testIsOVer();
});
```

Como podemos ver algo tan sencillo como dos peticiones paralelas necesitan mucho código para manejarlas.

### 4 - Gestión de errores

Es traumática la forma de gestionar errores mediante callbacks, el método más extendido que he visto ha sido el de nodejs, el primer argumento de cada callback es el objeto Error si es que hubo alguna excepción, lo que me parece horrible ya que cada función debe confirmar que su primer argumento es `undefined` para asegurar que no han habido errores:

```js
File.get('http://www.somedomain.com/file2', function (error, file) {
  if (error) {
    // Show blue screen of death
  }
  // do something with file.
});
```

## SOLUCION

Queda claro que las peticiones asíncronas son necesarias en cliente y servidor ya que permiten al programa continuar trabajando mientras espera la respuesta a la petición, pero éstos problemas podrían dificultar la manutención del código. Y aquí es donde viene a ayudarnos el Patrón Promise. El patrón Promise asiste a una función que no puede devolver inmediatamente su resultado (es decir, una función asíncrona) y devuelve la promesa de que tendrá el resultado en un futuro (a lo que llamo cumplir la promesa :P). A nivel de implementación, una función devuelve un objeto **Promise** que gestionará por ella el callback. Veamos cómo soluciona nuestros problemas:

#### 1 - Claridad en los métodos

La función solo debe recibir la información necesaria para hacer la petición y devuelve la promesa de que esos datos llegarán.

```js
var dir = new Directory('file:///home/user/Desktop');
var promise = dir.browse();
promise.then(function (dir, items) {
  // ...
});
```

Y ésto aún lo podríamos mejorar llamando directamente a la función then sin guardar el promise en una variable:

```js
var dir = new Directory('file:///home/user/Desktop');
dir.browse().then(function (dir, items) {
  // ...
});
```

Y muchos dirán ¿qué diferencia hay entre ésto y el código que teníamos antes? Es sencillo, la diferencia está en quién maneja el callback. Con el código anterior cada función debía encargarse de comprobar si se le había pasado un callback válido y llamarlo al acabar su tarea con los argumentos necesarios. Ahora todo ése código está en la clase `Promise` y la función puede encargarse de aquello que le corresponde siempre que devuelva un promise y le notifique cuando termine. Finalmente la API queda bastante más clara:

```js
Promise<Array<File>> Directory.browse();
Promise<String> File.getContent(String encoding);
Promise<Boolean> File.getPermission();
```

### 2 - Llamadas secuenciales

El promise trae una sorpresa que no me esperaba, el método `then` de la clase `Promise` devuelve un nuevo `promise`. Para qué? para poder ejecutar código secuencialmente, veamoslo:

```js
var file = new File();
file
  .isReadable()
  .then(function (permission) {
    if (permission) {
      return file.getContent();
    }
  })
  .then(function (content) {
    // do something with the content
  });
```

Qué es ésta locura? La idea es muy sencilla, pero es confusa porque la explicación utiliza demasiadas veces la palabra `Promise`, primero expandiremos el código para verlo más claro:

```js
var file = new File();
var promise1 = file.isReadable();

var promise2 = promise1.then(function (permission) {
  if (permission) {
    var promise3 = file.getContent();
    return promise3;
  }
});

promise2.then(function (content) {
  // do something with the content
});
```

Debemos intentar seguirlo poco a poco, la llamada a llamada `file.isReadable()` nos devuelve `promise1`, y cuando llamamos al método then de `promise1` nos devuelve `promise2`. Cuando `promise1` termina se ejecuta el callback pasado y se descubre que el callback devuelve un nuevo `Promise`, `promise3`. Cuando `promise3` se cumpla (es decir pase a estado "done") también se cumplirá el `promise2` ejecutando el callback que le han pasado. En resumen, podemos seguir añadiendo callbacks que se ejecutarán al acabar el anterior encadenando llamadas a then.

### 3 - Llamadas paralelas

Además me planteé añadir la posibilidad de manejar llamadas paralelas desde `Promise`, puesto que ya hemos visto lo complejo que puede ser. Para ésto añadí el método `and` al Promise:

```js
File.get('http://www.somedomain.com/file1')
  .and(File.get('http://www.somedomain.com/file2'))
  .then(function () {
    // Both files loaded.
  });
```

Una vez más expandamos el código para ver más claramente que está sucediendo:

```js
var promise1 = File.get('http://www.somedomain.com/file1');
var promise2 = File.get('http://www.somedomain.com/file2');
var promise3 = promise1.and(promise2);
promise3.then(function () {
  // Both files loaded.
});
```

Al expandirlo es más fácil ver lo que sucede, todo `Promise` tiene un método `and` al que se le pasa otro `Promise`, y ésto devuelve un nuevo `Promise` que se cumplirá cuando los dos primeros estén cumplidos.

### 4 - Callbacks específicos

Finalmente el patrón Promise también trae una mejora al problema de la gestión de errores, aún no lo he mencionado pero el método `then` recibe dos argumentos: el primero el callback que será llamado cuando el Promise se cumpla, el segundo otro callback que será llamado si la ejecución asíncrona falla:

```js
File.get('http://www.somedomain.com/file2').then(
  function (file) {
    // do something with file.
  },
  function (error) {
    // Show blue screen of death
  },
);
```

Esto nos permite separar claramente la responsabilidad de cada función y nos libera de la carga de comprobar errores.

## CONCLUSION

Como vemos las llamadas secuenciales traen muchos inconvenientes, pero son principalmente consecuencias de no estar acostumbrados a la programación asíncrona, si lo estuviéramos tendríamos más en mente patrones como Promise que como vemos nos ayuda a afrontar una programación que ya de por sí es complicada. En próximos posts espero mostrar paso la implementación de una clase Promise, nos vemos en la próxima.

[1]: https://github.com/lukehoban/es6features#promises
[2]: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promesa
[3]: http://caniuse.com/#search=promises
