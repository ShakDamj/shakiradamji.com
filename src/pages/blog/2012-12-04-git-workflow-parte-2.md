---
published: 2012-12-04
title:
  en: GIT Workflow (Parte 2) (🇪🇸 only)
  es: GIT Workflow (Parte 2)
---

Continuando con [mi último artículo][1], llegó la hora de hablar del gran _Github Flow_:

### Github Flow

Y finalmente [el artículo][2] que ha inspirado éste. Después de probar el Git Flow (el modelo, no la herramienta) en productos profesionales y a modo de prueba en [pequeñas librerías][3] propias y **aunque para proyectos grandes donde una release se planea durante semanas va bien, en pequeños proyectos, y en proyectos SaaS no acaba de encajar**.

<!-- end extract -->

Para empezar en pequeños proyectos no hay necesidad de planificar con antelación una release, **un proyecto pequeño necesita mucha actividad y poca burocracia para crecer**, por otro lado, en proyectos SaaS (Software as a Serivce), es decir, productos que están disponibles online y todos los usuarios tienen la última versión y reciben los cambios inmediatamente **las versiones y releases pierden fuerza. **Porqué retrasar el lanzamiento de una nueva funcionalidad cuando todos los usuarios podrían tenerla mañana sin ningún coste? en un producto clásico las funcionalidades se empaquetan para entregar al usuario la actualización un paquete cerrado y pasar el proceso de actualización la menor cantidad de veces posibles, pero **en un SaaS para el usuario no tiene ningún coste (en esfuerzo) una actualización**, simplemente la próxima vez que abra el programa tendrá la funcionalidad.

Un ejemplo de SaaS es Gmail (que estuvo más de 5 años en fase Beta por éste motivo), twitter o github. Y es éste último quién, como no podía ser de otra forma, utiliza **un flujo de trabajo de GIT que parece encajar bastante bien con la filosofía SaaS** de release constantes. Lo que ellos llaman **`Github Flow`**.

Como ellos mismos dicen después de mentar las ventajas de git-flow, "One of the bigger issues for me is that it’s more complicated than I think most developers and development teams actually require" (Uno de sus mayores problemas para mi es que **[git-flow] es más complicado de lo que creo que muchos equipos de desarrollo realmente necesitan**)

> So, why don’t we use git-flow at GitHub? Well, the main issue is that we deploy all the time." (Porqué no usamos git-flow en Github? Bueno, el mayor problema es que **nosotros hacemos releases todo el tiempo**).

Básicamente utilizan un flujo de trabajo que combina la potencia de GIT con las geniales herramientas de Github por lo que es aplicable tal cual a los proyectos alojados en Github.com:

- El contenido en `master` es una versión lista para ser utilizada, lo mismo que en git-flow.
- Crear ramas descriptivas a partir de `master` en el repositorio y hacer push constantemente.
- Abrir "Pull Request" en Github en cualquier momento
- **Hacer merge a `master` solo después de una revisión del "Pull Request"**
- Enviar el código a producción inmediatamente después del merge (es decir, enviar a los clientes)

Igual que en git-flow, `master` tiene que ser código estable listo para poner en producción, pero en éste Workflow además debe ser la rama a partir de la cual crear el resto de ramas. En resumen, **cualquier desarrollador puede crear una rama partiendo de `master` mientras tenga un nombre claro y coherente**, bien sea para corregir un bug o implementar una nueva funcionalidad. A partir de entonces el desarrollador puede hacer todos los commits que necesite y hacer `push` a la rama en el repositorio constantemente.

En Github mencionan muchas ventajas de ésta fase, en primer lugar, que al hacer pull cada desarrollador recibe información de las ramas en las que hay actividad, y si su nombre es descriptivo es sencillo de analizar. Además **en la página de Github del repositorio podemos consultar las ramas actuales y cuánto se ha avanzado en cada una**, como si de una lista de futuras funcionalidades se tratara (ver imagen artículo original). Por otro lado, los push constantes da visibilidad al resto del equipo de la actividad y garantiza la copia de seguridad de nuestros cambios. Y por fin mi parte favorita, mi descubrimiento del día, los Pull Request de Github.

**Un Pull Request consiste en que después de hacer commits y push en una rama, dejamos una notificación de intención de hacer merge a `master`**. Al hacer un Pull Request, en la página de Github del repositorio aparece nuestra notificación con la lista de commits que hemos hecho, y todos los cambios que hemos hecho (en rojo líneas borradas y en verde líneas añadidas). Esto es muy utilizado para ofrecer al dueño de un repositorio un parche o una mejora para que sea aplicado en `master`, lo que me sorprendió es el uso que le da Github.

A partir de aquí **cualquier usuario puede añadir comentarios a una línea específica del código modificado en los commits**, o un comentario general y abrir debate. Lo que a nivel profesional se conoce como **`code review`** (repaso del código) en el que un tercero nos ayuda a repasar nuestros cambios. Esto siempre que se enfoque con una actitud positiva por ambas partes, permite **extender el conocimiento de esa sección del código y detectar bugs con antelación**, simplemente porque cuatro ojos ven más que dos.

> Actually, we use it more as a branch conversation view more than a pull request (En realidad, **[los Pull Request] los usamos más como página de conversación sobre la rama que como petición de pull**).

Según el _Github Flow_ cuando hayamos acabado el desarrollo de la rama o simplemente nos hayamos atascado o necesitamos que un diseñador de el visto bueno al resultado (ya que se pueden adjuntar imágenes a los comentarios con [Markdown][4]), abrimos un Pull Request y **escribiendo @<nombre> en el comentario esa persona recibirá una notificación de nuestro Pull Request**. En Github recomiendan usar "/cc @<nombre>" para poner "En copia" a los interesados. A medida que recibimos opiniones y recomendaciones de otros usuarios mediante el Pull Request **podemos seguir haciendo commits que automáticamente se añadirán al Pull Request**.

Una vez el trabajo está hecho y hemos pasado el _code review_ esperamos (solicitamos) recibir el visto bueno de algún o varios compañeros

> This is generally a +1 or emoji or “:shipit:”" (Esto suele ser un +1 o el emoticono “:shipit:”)

**Y hayamos pasado los tests, podemos hacer el merge a `master` nosotros mismos**, cuando hagamos push de `master` con los cambios aplicados el Pull Request se cerrará automáticamente. Finalmente, inmediatamente después de hacer el merge a `master` **debemos enviar el código a producción**, que en el caso de Github lo hacen mediante un comando enviado por chat, pero debemos enviar el código inmediatamente a producción para poder detectar posibles bugs con la máxima antelación posible porque si algo nos da mala imagen como desarrolladores es que el trabajo de otra persona falle al ser enviado a producción por algo que nosotros cambiamos y no enviamos. En el artículo original se puede ver una imagen en la que **un solo día se actualizó el código de producción nada menos que 24 veces**. El mismo código que recibimos nosotros al entrar a Github.com

Ha sido largo de explicar, pero quise hacer mucho énfasis en los Pull Request ya que es un uso innovador (al menos para mi) traído de la mano de sus creadores que lo usan activamente por lo que está más que garantizada su fiabilidad. En mi opinión es **el mejor flujo de trabajo para desarrollar productos SaaS**, permitiendo lanzar funcionalidades constante e inmediatamente.

Sin embargo, como todas las grandes metodologías, creo que es muy importante la implicación de todo el equipo en el Workflow. **El Workflow está basado en que un desarrollador sabe esperar a revisar el código a fondo** y recibir feedback antes de hacer el merge a master, y creo que es bastante más complicado de lo que parece superar la tentación de tener el "trabajo hecho" pero sin revisar.

### Conclusión A la fecha me encuentro con tres Workflows para trabajar con GIT:

**Git-flow** - Bastante genérico, en mi opinión si parte del equipo ya conoce ésta metodología es la que utilizaría "por defecto" al empezar un proyecto profesional. Y aunque suene evidente, no está de más decir que para pequeños proyectos puede resultar excesivo.

##### Pros

- **Estándar** - muy conocido en la comunidad GIT
- **Genérico** - en mi opinión es fácil adaptar ésta metodología a medida que avanza el proyecto

##### Cons

- **Complejo** - Para una persona comenzando en GIT puede resultar demasiado aprender la secuencia necesaria para cada fase

**Git-flow con ramas por release** - No muy recomendable por añadir una complejidad excesiva, pero para los proyectos elefante en los que tenemos tres clientes con versiones distinta puede ahorrarnos tiempo y esfuerzo.

##### Pros

- **Utilidad clara** - personalmente saber con precisión dónde es útil es una ventaja a la hora de tenerla en considerarlo

##### Cons

- **Rebuscado** - hay que tener cierta experiencia para evitar que ésta metodología se descontrole

**Github Flow** - En mi opinión la solución perfecta para un producto SaaS.

##### Pros

- **Probado** - que éste sistema esté en marcha en Github da mucha confianza, máxime siendo ellos los creadores de una de las mejores herramientas para GIT

##### Cons

- **Equipo conscienciado** - éste Workflow requiere mucha atención ya que constantemente estaremos aplicando código en producción con los riesgos que conlleva para nuestros clientes

[1]: http://www.amatiasq.com/2012/12/git-workflow-flujo-de-trabajo-parte-1/ 'GIT Workflow (Flujo de trabajo) (Parte 1)'
[2]: http://scottchacon.com/2011/08/31/github-flow.html
[3]: https://github.com/amatiasq/jsbase
[4]: http://es.wikipedia.org/wiki/Markdown
