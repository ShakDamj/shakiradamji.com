---
title:
  en: Typescript's Identifier types
  es: Tipos de identificación en Typescript

links:
  slides: https://docs.google.com/presentation/d/e/2PACX-1vQi4i1jz4sRQNqz8iPt2B0BO3hnPbK0pX-3mU009Bnsk5nhDLUOQ8aAKNTL5mqnAn3dtKgflmQ90eWS/pub

iframe:
  src: "https://docs.google.com/presentation/d/e/2PACX-1vQrG_Ovz6TC208tg8wzBY-EhnQ6b2MJfVb-RMFDxJf7eEwNpYzMBDqeMBMrzKF420gcOuE1nHTg6AV9/embed?start=true&loop=true&delayms=3000"
  style: |
    margin: 1rem 0 0;
    height: calc(calc(var(--available-width) * 0.563) + 36px);
---

Here I explain a concept I found using Typescript where one can use string literal types and types union to create custom unique types.

This is particularly useful for identifiers, which we (hopefuly) never embed into the code but are rather read from an external source and passed to another component untouched.

Let's say we have two kind of entities in our program: `User` and `Product`, and both have a property `id` of type `ObjectId`. Nothing prevents us to accidentally pass a user ID where a product ID is expected, only a runtime error that would scare our users and steal our peace of mind. By creating and using different types for such IDs (like `UserId` and `ProductId`) we can use Typescript's power to ensure we never mix them accidentally.

This was the approach I took in a tool to create Discord bots with Deno called [`Denord`][1], having different kinds of IDs such as [`GuildId`][2], [`ChannelId`][3] and [`MessageId`][4].

```ts
// any string would work
type UserId = 'my-random-string-for-UserId';
type ProductId = 'my-random-string-for-ProductId';

function getUser(id: UserId) {}
function getProduct(id: ProductId) {}

const userId = '' as UserId;
const productId = '' as ProductId;

getUser(userId);
getUser(productId); // error
getUser(productId as UserId); // error

getProduct(productId);
getProduct(userId); // error
getProduct(userId as ProductId); // error
```

---

Aquí explico un concepto que encontré usando Typescript donde uno puede usar un tipo "string literal" con "union types" para crear nuevos tipos únicos.

Esto es particularmente útil para identificadores, los cuales (espero) nunca escribimos directamente en el código sino que son leídos de un programa externo y se pasan a otro componente intactos.

Digamos que tenemos dos tipos de entidades en nuestro programa: `Usuario` y `Producto`, y ambos tienen una propiedad `id` del tipo `ObjectId`. Nada previene que accidentalmente pasemos un ID de usuario donde se espera un ID de producto, solo un error en tiempo de ejecución que asustará a nuestros usuarios y robará nuestra paz mental. Creando distintos tipos para dichos IDs (como `IdUsuario` e `IdProducto`) podemos usar el poder de Typescript para asegurarnos que nunca los mezclamos accidentalmente.

```ts
// cualquier string sirve
type UserId = 'text-random-para-UserId';
type ProductId = 'text-random-para-ProductId';

function getUser(id: UserId) {}
function getProduct(id: ProductId) {}

const userId = '' as UserId;
const productId = '' as ProductId;

getUser(userId);
getUser(productId); // error
getUser(productId as UserId); // error

getProduct(productId);
getProduct(userId); // error
getProduct(userId as ProductId); // error
```

Este fue el enfoque que tomé en una herramenta para crear bots de Discord en deno llamada [`Denord`][1], que usa distintos tipos de identificadores como [`GuildId`][2] (gremio), [`ChannelId`][3] y [`MessageId`][4].

(solo disponible en inglés 🇬🇧)


[1]: https://github.com/amatiasq/deno/tree/master/denord
[2]: https://github.com/amatiasq/deno/blob/master/denord/internals/endpoint-urls.ts#L74-L135
[3]: https://github.com/amatiasq/deno/blob/bd5a49105569f3996a3c76e3dc09e3305cdeb150/denord/DiscordClient.ts#L45
[4]: https://github.com/amatiasq/deno/blob/bd5a49105569f3996a3c76e3dc09e3305cdeb150/denord/structure/Message.ts#L47-L53