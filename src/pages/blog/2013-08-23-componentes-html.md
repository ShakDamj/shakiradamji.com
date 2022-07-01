---
title: Componentes HTML
date: 2013-08-23
---

Acabo de caer en cuenta de porqué no me gusta angular, backbone, ember...

### El problema

Todos estos frameworks si bien intentan dividir la aplicación que vas a construír en módulos se hace esto por mantenibilidad, no por reutilización de los módulos.

En otras tecnologías generalmente creas un componente reutilizable y basta con mover el archivo de proyecto para tenerlo listo, pero estos frameworks no se puede hacer eso, por ejemplo una simple targeta que muestre los datos de una persona:

Con backbone o bien tienes un archivo enorme o tienes varios archivos, modelo, vista, plantilla, estilos... y seguramente los archivos JS y la plantilla se carguen mediante un cargador de dependencias como RequireJS con lo que para usar el módulo necesitas tenerlo o bien compilar el módulo en un solo archivo antes de utilizarlo.

Con angular la separación en módulos no es tan radical al haber mucho menos código, pero una simple directiva será un archivo JS que bien puede tener el HTML en formato string o cargarlo de un archivo aparte y el CSS debería ponerse aparte ya que si se pone en la plantilla cada vez que se instancie la directiva se estaría creando un nuevo tag style ya renderizado.

Además, ya a nivel de estándar, con los estilos tenemos el problema de que los estilos que creemos para nuestro componente reutilizable podría fácilmente afectar a un elemento de la página que no pretendíamos modificar, para ser realmente reutilizable es necesario que el CSS solo se aplique a los elementos del componente en cuestión. Analizado de esta forma parece ser que el tema es poder tener en un solo archivo un pequeño bloque de lógica, contenido y estilo que pueda ser importado en cualquier página sin afectar en nada a la página en cuestión. Y resulta HTML desde un principio nos permite definir en un solo archivo y de forma natural lógica, contenido y estilos.

### La solución

Entonces me encuentro con [estas diapositivas][1] que hablan de los HTML WebComponents y resulta ser justo lo que hace falta:

```html
<element name="x-tarjeta" extends="button">
    <template>
        <style>
            h1 {
                color: red;
            }
            img {
                height: 32px;
                width: 32px;
            }
            .separator { ... }
        </style>

        <header>
            Full name: <content select="h1"></content>
            Age: <content select=".age"></content>
        </header>
        <div class="separator"></div>
        <section>
            <content select="img"></content>
        </section>
    <template>

    <script>
        var template = this.querySelector('template');
        this.register({ // this == <element>
            prototype: {
                readyCallback: function() {
                    var dom = template.content.cloneNode(true);
                    var shadow = this.createShadowRoot()
                    shadow.appendChild(dom);
                }
            }
        });
    </script>
</element>
```

Al estar los estilos dentro del template se vuelven a añadir al dom cada vez que creamos un `x-tarjeta` (como con angular) pero en este caso gracias al `ShadowDOM` los estilos solo se aplican al template y a su contenido.

Además el estándard de html templates nos permite mezclar el template con los elementos que inserten dentro de `x-tarjeta`

```html
<!-- Uso -->
<x-tarjeta>
  <h1>A. Matías Q.</h1>
  <div class="age">24</div>
  <img src="/.../foto.png" />
</x-tarjeta>
```

Y por último el estándard html imports nos permite tener este componente en un archivo html independiente y transportable e importarlo en donde lo necesitemos, incluyendo otros compoentes.

```html
<link rel="import" href="x-tarjeta.html" />
```

### Conclusión

Ahora mismo estoy dividido entre angular y los web components:

#### Angular

- +El parseador de angular provee doble binding
- +Los templates están directamente integrados con el framework por lo que podemos manipular la lógica desde la vista, suena a mala idea pero en componentes pequeños es mantenible.
- -Un componente requiere un archivo independiente para el HTML, un JS importado desde el HTML y un CSS importado desde el HTML o desde otro CSS. (dos imports para un componente)

##### Web components

- +Compactos, tienen todo lo necesario en el mismo archivo sin que éste sea demasiado grande
- +Futuro estándar
- +Alcance del CSS limitado al componente
- -Soportado en gran parte por Chrome, pero generalmente hay que usar polyfills que no pueden reproducir toda la funcionalidad (en particular limitar el CSS)
- -Si bien es excelente para crear componentes me es difícil imaginar una web completa hecha con componentes. Desde Polymer recomiendan crear elementos hasta para componentes no visuales como AJAX o Keyboard, pero no lo vo claro.

Tal como lo veo ahora una web se compone de la parte aplicación que es todo el código único de la app que difícilmente sirva para otro proyecto y una serie de componentes, lo ideal para mi sería poder hacer la parte de aplicación con angular ya que me permite crear módulos mantenibles y utilizar los WebComponents como componentes reutilizables pero desconozco como se relaciones ambas tecnologías.

Espero poder hacer un prototipo mezclándolas y escribir más adelante...

[1]: http://www.webcomponentsshift.com/
