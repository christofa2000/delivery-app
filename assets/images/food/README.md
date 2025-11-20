# 📸 Imágenes de Comida

Esta carpeta está destinada a guardar las imágenes de los productos de comida.

## 🎯 Cómo usar tus propias fotos

### Opción 1: Usar fotos locales (recomendado para producción)

1. **Guardar las fotos** en esta carpeta (`assets/images/food/`)
2. **Nombrarlas** de forma clara, por ejemplo:
   - `pizza-napolitana.jpg`
   - `burger-clasica.jpg`
   - `sushi-variado.jpg`
   - etc.

3. **Actualizar** `services/constants/mock-data.ts`:

```typescript
// En lugar de URL de Unsplash:
image: 'https://images.unsplash.com/photo-...'

// Usar require local:
image: require('@/assets/images/food/pizza-napolitana.jpg')
```

### Opción 2: Usar URLs externas (actual)

Actualmente, la app usa imágenes de **Unsplash** (URLs externas).

**Ventajas:**
- ✅ Funciona inmediatamente
- ✅ No aumenta el tamaño de la app
- ✅ Imágenes profesionales de alta calidad

**Desventajas:**
- ❌ Requiere conexión a internet
- ❌ Puede ser más lento
- ❌ Dependencia externa

### Opción 3: Combinar ambas

Podés usar fotos locales para productos principales y URLs para el resto:

```typescript
{
  id: 'pizza-1',
  name: 'Pizza Napolitana',
  image: require('@/assets/images/food/pizza-napolitana.jpg'), // Local
  // ...
},
{
  id: 'pizza-2',
  name: 'Pizza Cuatro Quesos',
  image: 'https://images.unsplash.com/photo-...', // URL
  // ...
}
```

## 📝 Categorías de fotos que tenés

Según las imágenes que compartiste:

1. **Pizzas** (varias variedades)
2. **Sushi** (rolls, nigiri, sashimi)
3. **Hamburguesas** (clásicas, dobles, gourmet)
4. **Pasta** (con diferentes salsas)
5. **Ensaladas** (frescas, coloridas)
6. **Platos gourmet** (presentación premium)

## 🎨 Recomendaciones de formato

- **Formato:** JPG o PNG
- **Tamaño:** 800x600px (proporción 4:3)
- **Peso:** Menos de 500KB por imagen
- **Calidad:** 80-90% (balance entre calidad y tamaño)

## 🔧 Optimizar imágenes antes de usar

Podés usar herramientas online para optimizar las fotos:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

## 📂 Estructura sugerida

```
assets/images/food/
  ├── pizzas/
  │   ├── napolitana.jpg
  │   ├── cuatro-quesos.jpg
  │   └── pepperoni.jpg
  ├── sushi/
  │   ├── mix.jpg
  │   ├── california.jpg
  │   └── sashimi.jpg
  ├── hamburguesas/
  │   ├── clasica.jpg
  │   ├── doble-cheddar.jpg
  │   └── veggie.jpg
  └── pastas/
      ├── alfredo.jpg
      ├── bolognesa.jpg
      └── carbonara.jpg
```

## 🚀 Estado actual

**✅ Implementado:**
- Todos los productos tienen imágenes de Unsplash
- El componente `FoodCard` muestra las imágenes correctamente
- La pantalla de detalle también muestra las imágenes
- Fallback a placeholder si no hay imagen

**📌 Para usar tus fotos:**
1. Guardá las fotos en esta carpeta
2. Actualizá el campo `image` en `mock-data.ts`
3. Listo! 🎉

