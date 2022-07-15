---
title: Quadtree

links:
  live: https://amatiasq.github.io/npm-libraries/quadtree/
  github: https://github.com/amatiasq/npm-libraries/
  wikipedia:
    en: https://en.wikipedia.org/wiki/Quadtree
    es: https://es.wikipedia.org/wiki/Quadtree

labels:
  - Monorepo
  - Quadtree
  - Spatial
  - Lerna
  - Parcel
  - Data structure

iframe:
  style: |
    height: var(--available-width);
---

A Quadtree is a way to organise spatial data to efficiently locate them.

### Situation

- Let's put 100 dots in the screen randomly, call them _boids_.
- We want to know which one of such _boids_ are 50 pixels from the mouse, call this _target area_.

### The problem

A simple way of doing this is going _boid_ by _boid_ and check if their `X` and `Y` coordinates are inside the _target area_. This is computationally intensive because we have to do one check per _boid_ in the screen, even if they are far away from the _target area_.

### The solution

Give we have more than 5 _boids_ in the screen the total area is divided in four rectangles of equal size. The same process is repeated on each of the smaller rectangles, creating a **tree of quadrants** (see what I did there?) until each quadrant has 5 _boids_ or less.

## Demo

In this example the screen is filled with 100 _boids_ and the algorithm is started.

Once we have the Quadtree structure we can quickly check which _boids_ are inside a given area by walking the structure and ignoring all the branches that don't collide with the _target area_, effectively ignoring most of the _boids_ in the screen.

In this demo the _boids_ are also moving, that means the Quadtree is updated more or less 60 times per second with the new position of the _boids_.

A blue rectangle is drawn around the mouse, every _boid_ found inside that area is painted red.

---

Un Quadtree es una forma de organizar datos espaciales para ubicarlos de forma eficiente.


### Situación

- Pongamos 100 puntos en la pantalla de forma aleatoria, llamémosles _boid_.
- Queremos saber cuáles _boids_ están a 50 píxeles del mouse, llamaremos a esto _área objetivo_.

### El problema

Una forma simple de hacerlo es ir _boid_ por _boid_ y comprobar si sus coordenadas `X` e `Y` est'an dentro del _área objetivo_. Esto es computacionalmente intenso porque tenemos que hacer tantas comprobaciones como _boids_ hayan en el escenario, incluso con los que están muy lejos del _área objetivo_.

### La solución

Dado que hay más de 5 _boids_ en la pantalla el área total se divide en cuatro rectángulos de igual tamaño. El mismo proceso se repite con cada uno de los nuevos rectángulos creando un **árbol de cuadrantes** (Quad-tree) hasta que cada cuadrante tiene 5 _boids_ o menos.

## Demostración

En este ejemplo la pantalla se llena con 100 _boids_ y el algoritmo empieza.

Una vez tenemos la estructura Quadtree podemos rápidamente comprobar qué _boids_ están dentro de un área en concreto recorriendo la estructura Quadtree e ignorando todas las ramificaciones que no coincidan con el _área objetivo_, efectivamente ignorando la mayoría de los _boids_ en pantalla.

En esta demostración los _boids_ además se mueven, eso significa que el Quadtree se actualiza más o menos 60 veces por segundo con las nuevas posiciones de los _boids_.

Un rectángulo azul se dubuja alrededor del mouse, cada _boid_ encontrado dentro de esa área se pinta de rojo.
