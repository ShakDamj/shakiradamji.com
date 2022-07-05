---
published: 2012-02-26
title:
  en: 'Conceptos Básicos Javascript: Privacidad (🇪🇸 only)'
  es: 'Conceptos Básicos Javascript: Privacidad'
---

### Introducción

Uno de los temas más frecuentes cuando uno se inicia en Javascript es la privacidad, principalmente viniendo de **lenguajes como Java, C# o C++; donde publican o se ocultan propiedades de los objetos mediante modificadores. Javascript** no posee dichos modificadores sino que **todas las propiedades de los objetos son públicas** lo que puede ser muy confuso para una persona poco diestra en ésta técnica, entre los que me incluyo.

Personalmente cuando diseño un componente (objeto/clase/librería), es porque quiero que ese componente cumpla una funcionalidad, por ejemplo, si yo quiero tener una clase que represente a una impresora necesito enviarle datos y que los imprima; **mi prioridad es que dicho componente sea sencillo de utilizar, lo que facilita la reutilización del componente**. Por lo que primero imagino cómo me gustaría usarlo:

<!-- end extract -->

```js
var impresora = new Impresora();
impresora.encender();
impresora.imprimir(datos);
impresora.apagar();
```

Como se ve, para cumplir la funcionalidad me basta con tres métodos, pero si yo escribo mi clase impresora con solo tres métodos probablemente duplicaría mucho código, por ejemplo, que `.imprimir()` y `.apagar()` deban comprobar si hay papel en la impresora.

<!--more Seguir leyendo → -->

### Soluciones

#### Hacer toda la interfaz pública

Podríamos crear in método público `.hayPapel()`, pero personalmente prefiero que la API, la interfaz pública de mi componente sea tan sencilla como sea posible por lo que no quiero hacer ése método público. **Cuando tengo que usar una librería ajena no quiero saber cómo está hecha, quiero saber como usarla**. Por ello si ésta clase tiene el método `.hayPapel()` le estoy diciendo al programador que ese método está ahí para usarlo, cuando en realidad no es así, ese método está ahí para ayudarme a mi como desarrollador de la clase a no duplicar código.

#### Usar la convención de Barra Baja (Underscore, '`_`')

Una práctica muy común en Javascript es añadir al principio o al final del nombre de la propiedad el símbolo barra baja con lo que la propiedad es pública, pero **por convención las propiedades que empiezan o finalizan con barra baja no deben ser llamadas desde fuera del componente**:

```js
function Impresora() { }
Impresora.prototype = {
    encender: function() { ... },
    apagar: function() { ... },
    imprimir: function(datos) { ... },
    _hayPapel: function() { ... }
};
```

Este es el método más extendido que he visto en Javascript, porque es una solución que **no afecta al tiempo de ejecución del programa**. Javascript simplemente accede a una propiedad pública sin pérdida de rendimiento. Es una buena solución siempre que se respete la convención, de lo contrario estaríamos acoplando componentes. Eso quiere decir que si quiero hacer pública una propiedad tengo que cambiarle el nombre en todos los puntos en que la utilizo? Desgraciadamente si, pero siempre tienes el consuelo de que será dentro de tu propia librería, ya que si cambias una variable de privada a pública no debería haber ningún punto fuera de tu código que accediera a ésa propiedad, y si lo que estás haciendo es cambiarla de pública a privada... bueno, evidentemente hay que refactorizar el código que utilizara tu librería de cualquier forma.

#### Privacidad por constructor

Los closures son un curioso método de privacidad, cuando creamos una función dentro de otra, **la función hija puede acceder a las variables de la función padre, pero no al revés**:

```js
var a = 5;

function() {
    var b = 6;

    function() {
        var c = 7;
        // Desde aquí puedo acceder a 'a', 'b' y 'c'
    }

    // Desde aquí puedo acceder a 'a' y 'b'.
    // 'c' no existe
}

// Desde aquí solo puedo acceder a 'a'.
// 'b' y 'c' no existen
```

Con ésto podemos buscar la privacidad, si analizamos el constructor de la clase `Impresora` veremos que es una función, igual que las del ejemplo. De alguna forma **podemos crear variables privadas ahí**.

```js
function Impresora() {
  var a = 'Privada!';
  console.log('Accediendo desde dentro:' + a);
}

var temp = new Impresora();
console.log("Intentando acceder desde fuera usando 'temp.a': " + temp.a);

// Esta línea no se ejecuta porque 'a' no existe aquí y falla.
console.log("Intentando acceder desde fuera usando 'a': " + a);
```

<a href="http://jsfiddle.net/amatiasq/qJnvS/" target="_blank">Pruébame</a>

Funciona! Ahora añadamos los métodos:

```js
function Impresora() {
  var a = 'Privada!';
}

Impresora.prototype = {
  probando: function () {
    console.log("Intentando acceder desde un método usando 'this.a': " + this.a);

    // Esta línea no se ejecuta porque 'a' no existe aquí y falla.
    console.log("Intentando acceder desde un método usando 'a': " + a);
  },
};

var temp = new Impresora();
temp.probando();
```

<a href="http://jsfiddle.net/amatiasq/jQLQf/" target="_blank">Pruébame</a>

Pero no podemos acceder desde los métodos! **Porque no están dentro del closure**, de que nos sirve una variable privada si no podemos acceder a ella desde los métodos públicos? Hay una solución: el closure en el que hemos guardado la variable privada es el constructor del objeto, por lo que podríamos aprovechar el dinamismo de Javascript e injectar los métodos en el objeto dentro del constructor, así los métodos podrían acceder a las variables privadas:

```js
function Impresora() {
  var a = 'Privada!';

  // This es el objeto que éste constructor está creando
  this.probando = function () {
    console.log("Intentando acceder desde un método usando 'this.a': " + this.a);
    console.log("Intentando acceder desde un método usando 'a': " + a);
  };
}

var temp = new Impresora();
temp.probando();
```

<a href="http://jsfiddle.net/amatiasq/gRVqv/" target="_blank">Pruébame</a>

Bien! éste sistema funciona, verdad? No tiene ningún inconveniente? Bueno, tiene uno, pero no es visible a simple vista porque nuestro cerebro y el intérprete de Javascript funcionan de forma distinta. **Para nosotros `this.probando = function() { ... }` es crear una función y añadirla a todos las instancias de `Impresora`** pero el intérprete no lo ve así, para la máquina Javascript **estamos creando una función por cada método para cada instancia** y tiene sentido, si la primera función `probando` que creamos accede a la variable privada `a` de la primera instancia que creamos necesitaremos una función distinta para acceder a la variable privada de la segunda instancia que creemos.

Eso quiere decir que **si creamos 10.000 instancias de `Impresora` tendremos 10.000 funciones que hacen casi lo mismo en la memoria? Si.** Con las computadoras actuales es casi despreciable, pero si estamos manejando un proyecto en Javascript que puede estar creando y borrando instancias de la clase durante días (por ejemplo un programa de servidor o una RIA), tendremos un problema a medio plazo.

### Privacidad de librería

Ahora tengo que confesar que he hecho trampas, todos los patrones descritos son para hacer privacidad a nivel de clase, pero **hay una forma más sencilla de hacer privada una clase entera, los closures**. Ahora pensarás "pero me acabas de decir que los closures volvían a crear los métodos por cada instancia!" si, cuando el closure es el constructor. **Pero si englobamos toda la clase en un closure podemos tener privacidad a nivel de librería:**

```js
// función de ejecución inmediata, se crea, se ejecuta y no se vuelve a utilizar
// es el closure que guardará la privacidad
(function (global) {
  var contador = 0;

  function Impresora() {
    contador++;
  }

  // Creamos un método estático
  Impresora.cantidadDeInstancias = function () {
    return contador;
  };

  global.Impresora = Impresora;
})(this);

var temp = new Impresora();
var temp2 = new Impresora();
console.log(Impresora.cantidadDeInstancias());
```

<a href="http://jsfiddle.net/amatiasq/HJzAB/" target="_blank">Pruébame</a>

La variable `contador` es **privada a nivel de librería**, significa que **todo lo que esté dentro del closure accede a ella** y como podemos ver todo el código dentro del closure accede a la misma variable, lo que significa que todas las instancias de `Impresora` comparten la misma variable. También podemos usar éste patrón para ocultar clases y funciones, **lo único que será publicado de dentro del closure será lo que guardemos en la variable `global`.**

```js
// función de ejecución inmediata, se crea, se ejecuta y no se vuelve a utilizar
// es el closure que guardará la privacidad
(function (global) {
  function Papel() {}
  Papel.prototype = {
    hayPapelEn: function (impresora) {
      // no hay papel
      return false;
    },
    pedirAlUsuario: function () {
      console.log('Oye tu! ponme papel!');
    },
  };

  var papel = new Papel();

  function Impresora() {}
  Impresora.prototype = {
    imprimir: function (datos) {
      if (!papel.hayPapelEn(this)) papel.pedirAlUsuario();
      // imprimir
    },
  };

  global.Impresora = Impresora;
})(this);

var temp = new Impresora();
temp.imprimir();
```

<a href="http://jsfiddle.net/amatiasq/vc2ke/" target="_blank">Pruébame</a>

Este es un patrón muy recomendable, ya que mediante una función autoejecutable ocultamos todo lo que el usuario de nuestra librería no necesita conocer. Por poner un ejemplo, [node.js][1] utiliza un patrón similar para generar librerías, en las que todas las variables que creamos en el archivo .js quedan ocultas y solo se exponen las propiedades que añadimos al objeto global `exports`. Ejemplo de saludo.js:

```js
var saludo = 'Hola!';
function saludar() {
  console.log(saludo);
}
exports.saludar = saludar;
```

Si tuviera que decir un defecto de éste patrón, es que **todo lo que queramos englobar dentro del closure deberá estar en el mismo archivo**, ya que el código debe estar dentro del closure y éste no puede estar repartido entre archivos. Ésto es un problema si queremos que dos clases con mucha lógica se comuniquen y no queremos acabar con un archivo de 1.000 líneas de código.

### Resumen

No voy a opinar si la decisión de hacer todo público al crear Javascript es buena o mala porque en mi opinión **no es que hacer todo público sea malo, sino que no estamos acostrumbrados a utilizarlo**. Por ello, porque la mayoría de los programadores estamos acostumbrado a tener privacidad en los componentes, buscamos entre las opciones que nos da el lenguaje para simularlo.

En cuanto a mi, me parece interesante las posibilidades de un lenguaje tan flexible como Javascript a nivel académico, al fin y al cabo el objetivo de la investigación es tener la mente flexible para que a la hora de la verdad podamos ver caminos alternativos que nos ofrecen una mejor solución para un problema en particular. Un ejemplo de ésto es un patrón de privacidad por instancia que descubrí recientemente, hablaré de él en el [próximo post][2].

[1]: http://nodejs.org/
[2]: http://www.amatiasq.com/?p=208 'Experimento: Privacidad por instancias'
