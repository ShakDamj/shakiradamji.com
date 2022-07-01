---
title: GIT Workflow (Parte 1)
date: 2012-12-04
---

Acabo de leer [un artículo][1] creado por los trabajadores de [Github][2] que han dado una vuelta de tuerca a lo que sabía de GIT y creo que será muy útil compartirlo, pero primero vamos por partes:

### Control de Versiones

Prefiero empezar por lo más básico porque ésto es algo que los programadores damos por hecho pero para alguien empezando puede ser totalmente desconocido. Una de las herramientas más básicas de un programador junto con el editor de texto es un **sistema de control de versiones**. Se trata básicamente de un programa que **registra los cambios que vamos haciendo en los archivos y cuando nosotros se lo ordenamos (hacemos commit) se guarda el estado actual de los archivos**, si más adelante seguimos haciendo cambio en los archivos y en lugar de mejorar empeora gracias al sistema de control de versiones podemos revertir los archivos y dejarlos tal y como estaban en el último commit o cualquier commit anterior. Además permite que **dos o más personas puedan archivos de un mismo proyecto y cuando ambos envíen sus cambios el sistema hará lo posible por combinarlos** (hacer merge), en caso de que el merge no se pueda hacer automático el sistema notifica un conflicto de cambios y nos pide que lo hagamos a mano.

<!--more Seguir leyendo → -->

### GIT

Después de usar SVN y TFS y SourceSafe en los cuales hacer merge era dramático o bien imposible (en SourceSafe dos personas no pueden modificar el mismo archivo a la vez), descubrir GIT fue fascinante, **la eficacia con la que resuelve conflictos y la capacidad de crear, combinar y destruir ramas** con un simple comando es una herramienta invaluable. El principal problema con las grandes herramientas es que **hay tantas formas de usarlas que si no sabes lo que haces probablemente te encuentres en un caos** y esa es la sensación que tuve al dar mis primeros pasos con GIT, estar gastando tiempo y esfuerzo en usar una herramienta compleja sin conseguir exprimirle el jugo.

### GIT Flow

Finalmente me crucé con [GIT Flow][3], **una guía para aprovechar el potencial de GIT** en el ámbito laboral. La idea es bastante sencilla pero las directrices deben ser respetadas para garantizar el orden:

- Mantener en la **rama `master` una versión del código lista** para ser utilizada (production-ready)
- Mantener en la **rama `develop` las nuevas funcionalidades** completas de nuestra aplicación, esperando a que podamos lanzar otra versión estable (release)
- Las nuevas funcionalidades se desarrollan en ramas creadas a partir de la rama `develop` y una vez completadas se "mergean" a `develop`
- Cuando develop esté listo para una nueva release se abre una rama y se hace la fase final de testing y los cambios de versión. Una vez completada ésta fase la rama de release se "mergea" a `develop` y `master` y se añade un `tag` en `master` para marcar la release.
- Los bugs se arreglan en ramas creadas a partir de `master` y una vez corregidos igual que una rama de release se se actualiza la versión y se "mergea" a `master` y `develop` y se añade un tag en `master`

Para una explicación más detallada recomiendo leer el [artículo original][3] (inglés) ya que lo explica mucho mejor de lo que yo podría. Cada una de éstas operaciones está compuesta de varios comandos git que deben ser ejecutados en un orden dado y es muy común olvidar algún paso, principalmente al empezar con el Workflow, por ello **disponemos de [git-flow][4], una herramienta que añade comandos a git**. [Una vez instalado][5] podremos ejecutar comandos como:

    git flow feature start my-feature-name

Que gestionará por nosotros la creación de la rama a partir de `develop`. Podemos ver una introducción a git-flow en el artículo [Why aren't you using git-flow?][6] (ingĺés). Aunque no sobra decir que **en el caso de las interfaces gráficas de GIT hay que seguir los pasos manualmente**.

Personalmente creo que éste sistema es bueno si tenemos GIT y no tenemos claro que Workflow seguir. **Es un sistema muy extendido** entre los usuarios de GIT lo que permite que la gente se adapte rápidamente y lo considero un punto medio entre complejidad y simpleza. Hay una variante para proyectos que necesitan mantener más de una versión (es decir, la mayoría de los productos que se venden como paquete cerrado) **en ésta variante en lugar de poner un tag en `master` por versión creamos una nueva rama**, por ejemplo "release-1.4", de ésta forma disponemos de distintas ramas para cada versión. Ésto nos permite corregir un bug en una versión pasada y sacar un parche específico.

El proceso **al detectar un bug en la última release es probar las releases anteriores hasta detectar la release en la que se introdujo el bug**. Por ejemplo, estamos en la versión 1.8 pero detectamos un bug que afecta a nuestro producto desde la versión 1.2. En ese caso corregimos el bug en una rama creada a partir de la rama de la primera versión que contiene el bug, y una vez corregido se envía a cada rama de release que contenga el bug. Evidentemente **se trata de un Workflow mucho más costoso que no debe ser utilizado a menos que tengamos la necesidad** de mantener más de una versión del producto que por mi experiencia considero una mala práctica, pero si nos encontramos en ésta situación nos puede reducir los problemas y ahorrar mucho tiempo. Continúa en [la segunda parte][7]...

[1]: http://scottchacon.com/2011/08/31/github-flow.html
[2]: http://www.github.com
[3]: http://nvie.com/posts/a-successful-git-branching-model/
[4]: https://github.com/nvie/gitflow
[5]: https://github.com/nvie/gitflow/wiki/Installation
[6]: http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/
[7]: http://www.amatiasq.com/2012/12/git-workflow-flujo-de-trabajo-parte-2/ 'GIT Workflow (Flujo de trabajo) (Parte 2)'
