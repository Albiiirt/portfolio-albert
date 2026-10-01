# Fuentes de vídeo de stock

Los vídeos de portada de Mirazur y Madrid se han montado a partir de
clips de Pexels, cosidos con `ffmpeg` (`xfade`, ~225ms) para mantener la misma
gramática visual que las transiciones Remotion del resto del sitio. Se
descargaron bajo la [licencia de Pexels](https://www.pexels.com/license/), que
permite su uso y modificación en webs comerciales sin atribución obligatoria.
No se usan como marca ni se sugiere el respaldo de las personas o negocios que
aparecen en ellos.

Última actualización: 1 de octubre de 2026.

## Mirazur — `public/covers/mirazur.mp4`

4 cortes. Se mantienen los dos que a Albert le gustaban (romero + cocinero) y
se sustituyen el bote de plástico y el plano de fuego por dos planos nuevos de
emplatado, para reforzar la idea de "cocinero trabajando".

- Detalle de romero y hierbas sobre mesa verde (clip ya existente, se mantiene).
- Cocinero emplatando en la cocina del pase (clip ya existente, se mantiene).
- [Professional chef plating a gourmet dish](https://www.pexels.com/video/professional-chef-plating-a-gourmet-dish-39498949/) — nuevo, pinzas emplatando con detalle de mango y foie.
- [Chef plating gourmet mushrooms in kitchen](https://www.pexels.com/video/chef-plating-gourmet-mushrooms-in-kitchen-39453014/) — nuevo, cocinero colocando una seta con pinzas sobre plato vacío, misma estética oscura y cálida.

## Enoturismo Madrid — `public/covers/madrid.mp4`

4 cortes. Se sustituye solo el primero (valle de montaña genérico, sin viñas
visibles) por un plano aéreo que sí muestra filas de viña con claridad. Los
otros tres cortes se mantienen tal cual.

- [Aerial view of rolling vineyards at sunset](https://www.pexels.com/video/aerial-view-of-rolling-vineyards-at-sunset-32889119/) — nuevo, sustituye el primer corte.
- Vista aérea de filas de viña (clip ya existente, se mantiene).
- Tractor avanzando entre hileras de viña con casas al fondo (clip ya existente, se mantiene).
- Racimos de uva y hojas en primer plano (clip ya existente, se mantiene).

## Turisme Jaén — sin vídeo

No se ha encontrado en Pexels ni Pixabay ningún plano real (aéreo o de calle/
edificio) de la ciudad de Jaén, su catedral o el Castillo de Santa Catalina con
licencia libre. Las búsquedas devuelven paisajes genéricos de Andalucía
(Ronda, Granada, Málaga) etiquetados de forma engañosa como "Jaén". Siguiendo
el criterio de no usar metraje inventado o de otra ciudad, `turisme-jaen` se
queda con su cover estático `cover-jaen.webp` (sin cambios) y sin campo
`video`. Pendiente: encargar o localizar metraje genuino si se quiere vídeo de
portada para este proyecto.

## La Rioja Turismo — sin vídeo

Se probó un montaje con la bodega Ysios (Santiago Calatrava, Laguardia —
administrativamente Álava, no La Rioja, aunque dentro del paisaje de la
D.O.Ca. Rioja). Albert decidió (1 de octubre de 2026) quedarse con la foto
estática por ahora en vez de ese vídeo. `la-rioja-turismo` usa
`cover-rioja.webp` como imagen de fondo del hero (mismo patrón que
`turisme-jaen`) y no tiene campo `video`.
