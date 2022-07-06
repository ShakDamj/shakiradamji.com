---
published: 2022-07-04
title:
  en: Generate HTML pages from Markdown with Deno
  es: Generar páginas HTML desde Markdown con Deno
---

I've been working on a new version of this site with a clear idea:

- I want content to be Markdown
- I want it to be the fastest site ever (negotiable)
- Bilingual (N-lingual in fact)

And after some months of work I found myself taking the same unspoken assuption that I recently wrote for my friend @Shakira who helped me with this beautiful design 🙌:

> I will animate the header somehow but with CSS only, no room for JS in the site of JS guy. That's the message 🤣

That's it.

The post can end here.

But I have more to write:

That means...

- plain HTML / CSS pages
- CSS / JS embeded directly into HTML
- only necessary CSS / JS is included

And... I need to try [Deno], it looks amazing, it sounds amazing and you know you'll find issues when you start using it but what may those be?

Here's the trip to generate HTML pages from TSX with Deno:

- You have [Deno] installed
- Create .tsx file
- import `React` from `https://esm.sh/react`
- import `{ renderToStaticMarkup }` from `https://esm.sh/react-dom/server`;
- this:

```ts
// Versions included for important reasons! 🥲
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/';

// This is our only component
function MyComponent() {
  return <p>This is my page!<p>
}

// renderToStaticMarkup does the magic
const html = renderToStaticMarkup(<MyComponent />);

// send the resulting HTML to the program output
console.log(html);
```

"But Matias! want this to read from / written to the disk! not from the code itself!"

```tsx
// main.tsx
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/';

// we read arguments
const [input, output] = Deno.args;

// input/output may be relative to current working directory
const cwd = `file://${Deno.cwd()}/`;

const input_fullpath = new URL(input, cwd).pathname
const output_fullpath = new URL(output, cwd).pathname

// Import .tsx file containing the page
const inputModule = await import(input_fullpath);
const Page = inputModule.default;

const html = renderToStaticMarkup(<Page randomProp="yay" />);

await Deno.writeTextFile(output_fullpath, html);
```

```tsx
// MyPage.tsx
import React from 'https://esm.sh/react@18.2.0'

export default () => <p>This is my page!<p>
```

```shell
$ deno run --allow-read=. --allow-write=. --allow-net=https://esm.sh ./main.tsx ./MyPage.tsx ./MyPage.html
```

Permissions explained:

- `--allow-read=.` allows the script to read the folder I'm currenly at: `.`
- `--allow-write=.` same as above, it only needs input/output access each but `.` is enough most of the time
- `--allow-net=https://esm.sh` requires access to esm.sh to download dependencies: `react` and `react-dom`
- `./main.tsx` that's not a permission, that's the name of the file we created above!
- `./MyPage.tsx ./MyPage.html` those are the arguments to be passed to `input` and `ouput`, wheren't you paying attention!?

Ok but we can make this better, we don't want to pass file by file, we want to give it a folder and for it to generate another one with same structure, if only we had a...

```ts
export async function getFilesRecursively(currentPath: string) {
  const names: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    const entryPath = `${root}/${dirEntry.name}`;

    if (dirEntry.isDirectory) {
      names.push(...(await getFilesRecursively(entryPath)).sort());
    } else {
      names.push(entryPath);
    }
  }

  return names;
}
```

I'm sure that's part of `esm.sh/std` somewhere. Now let's update the `main.tsx` we created above:

```tsx
// main.tsx
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/';

// Import function to get the name of the directory of a file
import { dirname } from 'https://deno.land/std@0.143.0/path/mod.ts';

const [input, output] = Deno.args;

// quick helper function is there something in the deno.land/std like this?
const relativeToCwd = (target: string) => new URL(target, `file://${Deno.cwd()}/`);

const input_dir = relativeToCwd(Deno.args[0]);
const output_dir = relativeToCwd(Deno.args[1]);

for (const file of await getFilesRecursively(input_dir)) {
  // Import .tsx file containing the page
  const inputModule = await import(input_fullpath);
  const Page = inputModule.default;

  const html = renderToStaticMarkup(<Page randomProp="yay" />);

  // ./input/mydir/myfile.tsx becomes
  // ./output/mydir/myfile.html
  const destination = file
    .replace(input_dir, output_dir)
    .replace(/.tsx$/, '.html');

  // This creates all folders required
  // Also if the folder is already there it doesn't throw an exception :)
  await Deno.mkdir(dirname(destination), { recursive: true });

  // Write generated HTML to disk
  await Deno.writeTextFile(destination, html);
}
```

At times you may need useful to remove the output directory before you start writing to it... I do this which is not beautiful but does the job 🤷‍♀️

```ts
try {
  // This fuction does throw an error even with `{ recursive: true }` which kind of makes sense
  await Deno.remove(output, { recursive: true });
// deno-lint-ignore no-empty
} catch {}
```

From this you can start creating your site with JS knowing no JS will be rendered in the browser.

```tsx
// input/index.tsx
import React from 'https://esm.sh/react@18.2.0'

// css set aside in a variable because { } would mess with React's JSX
const styles = `
  .body { margin: 0 }
`

export default () => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My website!</title>
      <style>{styles}</style>
    </head>
    <body>
      <p>This is my index!<p>
    </body>
  </html>
)
```

```shell
$ deno run --allow-read=. --allow-write=. --allow-net=https://esm.sh ./main.tsx ./input ./output
```

And that would generate a file like this:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My website!</title>
    <style>
      .body { margin: 0 }
    </style>
  </head>
  <body>
    <p>This is my index!<p>
  </body>
</html>
```

"But Matias, you went through all that husle to get a slightly more complex way of writing HTML?"

Yes, that's exactly it, thanks for noticing. Now we have components and can componentise the sht out of those pages and since we're actually importing the files through `import()` all dependencies would be properly managed by Deno! Not just that, a Javascript environment means we can do all sort of things like processing Markdown before the generation of the page, but that's another story.

Other things that I learned along the way and would love to write about:

- Import maps (with our without slash? BOTH! and with full versions!)
  - `/deps/some-dependency.ts` why I still found them useful
  - The hell of Deno's `lock.json` file (and why it exists)

---

He estado trabajando en una versión nueva de este sitio con una idea clara:

- Quiero escribir el contenido en Markdown
- Quiero que sea el sitio más rápido que ha habido (negociable)
- Bilingüe (N-lingüe de hecho)

Después de unos meses de trabajo me encontré tomando la misma presunción no escrita que recientemente comenté a mi amiga @Shakira, quién me ayudó con este hermoso diseño 🙌

> Voy a animar la cabecera de alguna forma sólo con CSS, no hay lugar para Javascript en el sitio del tipo del Javascript. Ese es el mensaje 🤣

Eso es todo.

El post puede terminar aquí.

Pero tengo más que escribir:

Eso significa...

- Páginas con HTML / CSS plano
- CSS / JS embebido directamente en el HTML
- solo el CSS / JS necesario se incluye

Y... necesito probar [Deno], parece genial, suena genial y sabes que encontrarás problemas cuando empieces a usarlo pero cuáles podrán ser?

Aquí está el camino para generar páginas HTML desde TSX con Deno:

- Tienes [Deno] instalado
- Crea un archivo `.tsx`
- importar `React` de `https://esm.sh/react`
- importar `{ renderToStaticMarkup }` de `https://esm.sh/react-dom/server`;
- esto:

```ts
// Las versiones se incluyen por importantes razones! 🥲
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/';

// Este es nuestro único componente
function MyComponent() {
  return <p>Ésta es mi página!<p>
}

// renderToStaticMarkup hace la magia
const html = renderToStaticMarkup(<MyComponent />);

// enviar el HTML resultante a la salida del programa
console.log(html);
```

"Pero Matías! quiero que esto se pueda leer de / escribir a disco! no desde el mismo código!"

```ts
// main.tsx
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/';

// leemos los argumentos
const [input, output] = Deno.args;

// input/output pueden ser relativos al directorio de trabajo del usuario
const cwd = `file://${Deno.cwd()}/`;

const input_fullpath = new URL(input, cwd).pathname
const output_fullpath = new URL(output, cwd).pathname

// Importar el archivo .tsx que contiene la página
const inputModule = await import(input_fullpath);
const Page = inputModule.default;

const html = renderToStaticMarkup(<Page randomProp="yay" />);

await Deno.writeTextFile(output_fullpath, html);
```

```ts
// MyPage.tsx
import React from 'https://esm.sh/react@18.2.0'

export default () => <p>Ésta es mi página!<p>
```

```shell
$ deno run --allow-read=. --allow-write=. --allow-net=https://esm.sh ./main.tsx ./MyPage.tsx ./MyPage.html
```

Permisos explicados:

- `--allow-read=.` permite que el script lea la carpeta en la que estamos: `.`
- `--allow-write=.` lo mismo que arriba, solo se necesita acceso a `input`/`output` pero `.` es suficiente la mayoría de las veces
- `--allow-net=https://esm.sh` requiere acceso a esm.sh para descargar las dependencias: `react` and `react-dom`
- `./main.tsx` esto no es un permiso, es el nombre del archivo que creamos allá arriba!
- `./MyPage.tsx ./MyPage.html` estos son los argumentos que se pasarán como `input` y `ouput`, es que no estabas prestando atención!?

Ok pero podemos hacerlo mejor, no queremos pasar archivo por archivo, queremos darle una carpeta y que genere la misma estructura, si tan solo tuvieramos un...

```ts
// Leer archivos recursivamente
export async function getFilesRecursively(currentPath: string) {
  const names: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    const entryPath = `${root}/${dirEntry.name}`;

    if (dirEntry.isDirectory) {
      names.push(...(await getFilesRecursively(entryPath)).sort());
    } else {
      names.push(entryPath);
    }
  }

  return names;
}
```

Estoy seguro que algo así es parte de `esm.sh/std` por algún lado. Ahora vamos a actualizar el `main.tsx` que creamos arriba:

```ts
// main.tsx
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/';

// Importamos una función para obtener el nombre del directorio de un archivo
import { dirname } from 'https://deno.land/std@0.143.0/path/mod.ts';

const [input, output] = Deno.args;

// función auxiliar, hay algo en deno.land/std como esto?
const relativeToCwd = (target: string) => new URL(target, `file://${Deno.cwd()}/`);

const input_dir = relativeToCwd(Deno.args[0]);
const output_dir = relativeToCwd(Deno.args[1]);

for (const file of await getFilesRecursively(input_dir)) {
  // Importar el archivo .tsx que contiene la página
  const inputModule = await import(input_fullpath);
  const Page = inputModule.default;

  const html = renderToStaticMarkup(<Page randomProp="yay" />);

  // ./input/mydir/myfile.tsx
  // se convierte en
  // ./output/mydir/myfile.html
  const destination = file
    .replace(input_dir, output_dir)
    .replace(/.tsx$/, '.html');

  // Esto crea todas las carpetas necesarias
  // Además si la carpeta ya existe no lanza error :)
  await Deno.mkdir(dirname(destination), { recursive: true });

  // Escribir el HTML generado a disco
  await Deno.writeTextFile(destination, html);
}
```

A veces encontrás necesario borrar la carpeta de salida antes de empezar a escribir en ella... hice esto que no es hermoso pero hace el trabajo 🤷‍♀️

```ts
try {
  // Eesta función tira un error incluso con `{ recursive: true }` lo cuál tiene sentido
  await Deno.remove(output, { recursive: true });
} catch {}
```

From this you can start creating your site with JS knowing no JS will be rendered in the browser.

```ts
// input/index.tsx
import React from 'https://esm.sh/react@18.2.0'

// CSS puesto en una variable porque las llaves { } confundirían al JSX de React
const styles = `
  .body { margin: 0 }
`

export default () => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mi sitio web!</title>
      <style>{styles}</style>
    </head>
    <body>
      <p>Este es mi índice!<p>
    </body>
  </html>
)
```

```shell
$ deno run --allow-read=. --allow-write=. --allow-net=https://esm.sh ./main.tsx ./input ./output
```

Y generaría un archivo como este:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi sitio web!</title>
    <style>
      .body { margin: 0 }
    </style>
  </head>
  <body>
    <p>Este es mi índice!<p>
  </body>
</html>
```

"Pero Matías, has dado tantas vueltas para tener una forma ligeramente más compleja de escribir HTML?"

Si, exacto, gracias por darte cuenta. Ahora tenemos componentes y podemos crear componentes como la mirda y ya que importamos los archivos con `import()` todas las dependencias serán manejadas apropiadamente por Deno! No solo eso, un entorno Javascript signifca que podemos hacer todo tipo de lógica como procesado de Markdown antes de generar la página pero eso es otra historia.

Otras cosas que aprendí sobre la marcha y me encantaría escribir al respecto:

- Import maps (con o sin barra? AMBOS! y verión completa!)
  - `/deps/some-dependency.ts` porqué aún lo encuentro útil
  - El infierno del archivo `lock.json` de Deno (y porqué existe)
