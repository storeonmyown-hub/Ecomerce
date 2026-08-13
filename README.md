# ON MY OWN — E-commerce

Demo en producción: https://on-my-own-store.vercel.app

E-commerce editorial y responsive para **ON MY OWN**, construido con Next.js, React, TypeScript y Tailwind CSS. Incluye Home, catálogo de drops, fichas con galería, selectores de talla/color y contacto de compra por WhatsApp. No incluye pasarela de pagos, autenticación, backend ni base de datos.

## Requisitos

- Node.js 20.9 o superior
- npm 10 o superior

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Para validar producción:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Estructura

```text
app/          Layout, metadata, estilos y Home
components/   Componentes de interfaz reutilizables
data/         Productos y categorías tipados
public/       Fotografías y recursos públicos normalizados
lib/          Generación segura del enlace y mensaje de WhatsApp
```

## Fotografías

Guarda los archivos optimizados en `public/images/` y referencia cada ruta desde el componente o archivo de datos correspondiente. Usa nombres descriptivos, formato WebP/AVIF cuando sea posible y conserva una proporción similar a la imagen reemplazada para evitar saltos de layout.

Las imágenes actuales son assets editoriales demo generados para esta interfaz. Deben sustituirse por fotografías oficiales de ON MY OWN antes del lanzamiento.

## Productos

Los productos se administran en `data/products.ts` como objetos tipados. Cada producto define slug, nombre, categoría, precio, descripción, colores, tallas, portada, cuatro imágenes de catálogo y disponibilidad.

Para agregar un drop:

1. Crea `public/products/drop-00x/`.
2. Exporta `feed.webp` para la portada vertical.
3. Exporta `01-models.webp`, `02-product.webp`, `03-size-guide.webp` y `04-details.webp`.
4. Agrega el objeto correspondiente en `data/products.ts`.

Si el precio todavía no está confirmado, conserva `priceCop: null`: la interfaz mostrará “PRECIO POR CONFIRMAR”.

## Variables de entorno

Copia `.env.example` como `.env.local` y completa únicamente los datos reales:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
```

El número de WhatsApp debe incluir código de país y solo dígitos, sin `+`, espacios ni guiones. Si una variable social queda vacía, el enlace se muestra desactivado de forma segura.

## Publicar en GitHub

La carpeta debe convertirse primero en un repositorio local:

```bash
git init -b main
git add .
git commit -m "feat: publish ON MY OWN storefront demo"
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git remote -v
git push -u origin main
```

Crea previamente en GitHub un repositorio vacío, sin README, licencia ni `.gitignore`. GitHub solicitará autenticación; no uses ni compartas la contraseña de tu cuenta. Puedes autenticarte con GitHub CLI mediante `gh auth login` o con el administrador de credenciales de Git.

## Despliegue en Vercel

1. Inicia sesión en Vercel usando GitHub.
2. Ve a **Add New → Project** y autoriza el acceso al repositorio.
3. Pulsa **Import** y conserva `Framework Preset: Next.js` y `Root Directory: ./`.
4. En **Environment Variables**, agrega las tres variables de `.env.example` para Production, Preview y Development.
5. Pulsa **Deploy** y valida navegación, imágenes y enlaces en móvil y escritorio.

Después de conectar el repositorio, cada `git push` a `main` genera automáticamente un nuevo despliegue de producción; las demás ramas generan previews.

## Datos pendientes para publicar ventas

Antes del lanzamiento comercial todavía se necesitan precios, disponibilidad real por variante, número de WhatsApp, logo definitivo, políticas aprobadas y confirmación de derechos de todos los gráficos de las prendas.
