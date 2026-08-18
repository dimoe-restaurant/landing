---
type: rule
name: content-and-design
description: Evitar patrones visuales y de escritura reconociblemente "genéricos de IA" al generar texto, UI o artifacts
tags: [writing, design, content]
---

# Contenido y diseño — evitar el "look genérico de IA"

Ciertos patrones de escritura y diseño se volvieron tan comunes en
contenido generado por LLMs que un lector los reconoce de inmediato
como "hecho por IA" — eso resta credibilidad incluso cuando el
contenido de fondo es bueno. Esta regla existe para que el output por
defecto no caiga en esos patrones, sin necesidad de pedirlo cada vez.

## Escritura

- No usar el em dash (—) como muletilla de puntuación en cada párrafo.
  Si una oración necesita una pausa, usar punto, coma, o dos puntos —
  el em dash se reserva para cuando de verdad es la opción más clara,
  no la opción por defecto.
- No abrir con frases de relleno ("es importante notar que...", "cabe
  destacar que...", "en el mundo actual..."). Ir directo al contenido.
- Preferir prosa fluida con oraciones completas sobre listas de bullets
  cuando el contenido es argumentativo o explicativo. Usar bullets solo
  para lo que genuinamente es una lista (pasos, opciones, ítems
  paralelos) — no como forma por defecto de estructurar cualquier idea.
- No titular ni encabezar anteponiendo un guion o emoji como bullet
  ("- Introducción", "🚀 Resultados") — un título es un título, no un
  ítem de lista.
- Densidad de información alta: cada oración debe aportar algo
  específico y verificable, no una afirmación genérica que aplicaría
  igual a cualquier tema ("esto mejora la eficiencia y la experiencia
  del usuario" sin decir cómo ni cuánto).
- Variar la estructura de oraciones y párrafos — el patrón "oración
  corta de impacto. Luego una más larga que elabora." repetido de forma
  mecánica en cada párrafo es tan reconocible como el em dash.

## Diseño visual (UI, artifacts, mockups)

- No usar un solo borde de color como único acento visual de una
  card/componente (el patrón "card blanca con un borde-izquierdo de 3px
  en un solo color" es el equivalente visual del em dash).
- No usar gradientes violeta-a-azul ni azul-a-cyan por defecto — son el
  gradiente por defecto reconocible de contenido generado por IA. Si el
  proyecto no tiene una paleta de marca definida, preguntar o elegir
  algo con intención, no el default genérico.
- No repetir la misma estructura de "ícono + título + párrafo corto" en
  tres columnas idénticas salvo que el contenido real sea genuinamente
  simétrico — variar jerarquía visual, tamaño, o layout según el
  contenido real, no por plantilla.
- Preferir un sistema de diseño ya existente en el proyecto (tokens de
  color, tipografía, spacing definidos) antes que elegir estética desde
  cero en cada artifact/mockup nuevo.
- Antes de dar por terminado un diseño visual nuevo, revisar si cae en
  alguno de los patrones de arriba — si sí, es señal de que se está
  usando el default en piloto automático en vez de diseñar para el
  contenido específico.

## Cuando haya ambigüedad, preguntar apuntando a la buena práctica

Si algo queda ambiguo (paleta no definida, tono no especificado,
estructura no obvia), la pregunta al usuario debe estar formulada de
forma que la opción alineada con esta regla sea la default/recomendada
— no una pregunta neutra que deje la puerta abierta al patrón genérico
por comodidad. Así el usuario adopta la buena práctica sin necesitar
conocer esta regla de antemano.

Ejemplo: en vez de "¿qué colores uso para los bordes de las cards?",
preguntar "¿la card necesita distinguirse por color, o alcanza con
jerarquía tipográfica/spacing? (recomendado: spacing/jerarquía, reserva
el color para cuando aporta significado real, ej. estado de error)".

## Cómo aplicar esto

Esta regla es una lista de qué evitar por defecto, no una lista
exhaustiva de todo lo prohibido — el criterio de fondo es: ¿este patrón
se reconoce como "plantilla de IA" antes que como una decisión hecha
para este contenido específico? Si sí, cambiarlo.
