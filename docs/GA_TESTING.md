# Guía de Testing para Google Analytics

## 🧪 Métodos de Testing

### 1. Testing en Localhost (Verificar que NO se trackea)

**Objetivo:** Confirmar que el tracking está deshabilitado en desarrollo.

**Pasos:**
1. Ejecutar la aplicación en modo desarrollo:
   ```bash
   npm run frontend:start
   ```

2. Abrir la consola del navegador (F12 → Console)

3. Navegar entre diferentes rutas:
   - `http://localhost:4200/#/home`
   - `http://localhost:4200/#/allergies`
   - `http://localhost:4200/#/maturity`

4. **Verificar en consola:**
   - Deberías ver: `[GA] Tracking disabled - Development mode or localhost`
   - O: `[GA] Would track page view: {...}` (muestra qué se trackearía, pero no lo envía)
   - **NO deberías ver llamadas a `gtag` en la pestaña Network**

5. **Verificar en Network tab:**
   - Filtrar por "collect" o "google-analytics"
   - **NO deberían aparecer requests a Google Analytics**

### 2. Testing en Producción (Verificar que SÍ se trackea)

**Objetivo:** Confirmar que el tracking funciona en producción.

**Opción A: Build local en modo producción**

1. Hacer build en modo producción con baseHref local:
   ```bash
   npm run frontend:build:test
   ```
   
   **Nota:** Este comando usa `--base-href /` para que funcione localmente. 
   Para producción en GitHub Pages, usa `npm run frontend:build` (que usa el baseHref correcto).

2. Servir los archivos estáticos (puedes usar `http-server`):
   ```bash
   npx http-server frontend/dist -p 8080
   ```

3. Abrir en el navegador: `http://localhost:8080`

4. **Verificar en consola:**
   - Deberías ver: `[GA] Page view tracked: {...}`
   - **NO deberías ver el mensaje de "Tracking disabled"**

5. **Verificar en Network tab:**
   - Filtrar por "collect" o "google-analytics"
   - **Deberías ver requests a `www.google-analytics.com/g/collect`**

**Opción B: Testing en GitHub Pages (Recomendado)**

1. Hacer commit y push de los cambios:
   ```bash
   git add .
   git commit -m "Add Google Analytics tracking service"
   git push origin main
   ```

2. Esperar a que el workflow de GitHub Actions complete el deploy (ver en Actions tab)

3. Abrir la aplicación en producción:
   ```
   https://ihtsdo.github.io/sct-implementation-demonstrator/
   ```

4. Abrir la consola del navegador (F12 → Console)

5. Navegar entre diferentes rutas y verificar:
   - `[GA] Page view tracked: {...}` en consola
   - Requests a Google Analytics en Network tab

### 3. Verificar Llamadas a gtag en Consola

**Método directo:**

1. Abrir la consola del navegador
2. Ejecutar:
   ```javascript
   // Verificar que gtag está disponible
   console.log('gtag available:', typeof gtag !== 'undefined');
   
   // Ver el dataLayer
   console.log('dataLayer:', window.dataLayer);
   ```

3. Navegar entre rutas y observar el `dataLayer` - debería crecer con cada navegación

### 4. Usar Google Analytics DebugView

**Para testing en tiempo real:**

1. Instalar la extensión "Google Analytics Debugger" para Chrome:
   - https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna

2. Activar la extensión

3. Abrir Google Analytics → Admin → DebugView

4. Navegar en la aplicación y ver los eventos en tiempo real en DebugView

### 5. Verificar en Google Analytics Real-Time

**Para ver datos en tiempo real:**

1. Ir a Google Analytics: https://analytics.google.com/

2. Seleccionar la propiedad correspondiente al ID `G-7SK998GPMX`

3. Ir a: **Reports → Real-time → Overview**

4. Navegar en la aplicación y deberías ver:
   - Usuarios activos
   - Páginas vistas en tiempo real
   - Eventos de página

5. Verificar que los nombres de página sean descriptivos (ej: "Allergies Demo" en lugar de "/allergies")

### 6. Verificar Metadata de Páginas

**Para confirmar que se envía la metadata correcta:**

1. En la consola del navegador, ejecutar:
   ```javascript
   // Interceptar llamadas a gtag
   const originalGtag = window.gtag;
   window.gtag = function(...args) {
     console.log('[GA Call]', args);
     return originalGtag.apply(this, args);
   };
   ```

2. Navegar entre rutas y verificar en consola que se envían:
   - `page_path`: Ruta limpia (ej: "/allergies")
   - `page_title`: Nombre descriptivo (ej: "Allergies Demo")
   - `page_category`: Categoría (ej: "Demos")
   - `page_section`: Sección si aplica (ej: "Clinical")
   - `page_location`: URL completa

### 7. Testing de Rutas Específicas

**Verificar mapeo de rutas:**

| Ruta | Título Esperado | Categoría | Sección |
|------|----------------|-----------|---------|
| `/` o `/home` | Home | Main | - |
| `/allergies` | Allergies Demo | Demos | Clinical |
| `/maturity` | Maturity Assessment | Maturity | - |
| `/maturity/dashboard` | Maturity Dashboard | Maturity | Analytics |
| `/clinical-record/123` | Clinical Record - Patient 123 | Demos | EHR |
| `/reports/fsn` | FSN Changes Report | Reports | - |

### 8. Verificar que No Hay Duplicados

**Asegurar que cada ruta solo se trackea una vez:**

1. Navegar a una ruta
2. Verificar en consola que solo aparece un `[GA] Page view tracked`
3. Refrescar la página - debería trackear solo una vez más
4. Navegar a otra ruta y volver - cada navegación debería trackear una vez

## ✅ Checklist de Testing

- [ ] En localhost: NO se trackea (mensaje en consola)
- [ ] En producción: SÍ se trackea (requests visibles)
- [ ] Los nombres de página son descriptivos
- [ ] Se envía metadata completa (categoría, sección)
- [ ] Rutas dinámicas funcionan (ej: `/clinical-record/:patientId`)
- [ ] No hay duplicados de tracking
- [ ] Google Analytics Real-Time muestra los eventos
- [ ] DebugView muestra los eventos correctamente

## 🐛 Troubleshooting

**Problema: No se trackea en producción**
- Verificar que `isDevMode()` retorna `false` en producción
- Verificar que `gtag` está disponible
- Verificar la consola por errores

**Problema: Se trackea en localhost**
- Verificar que `isDevMode()` retorna `true` en desarrollo
- Verificar el fallback de hostname

**Problema: Nombres de página incorrectos**
- Verificar el mapeo en `routeMetadata`
- Verificar que la ruta se está parseando correctamente

**Problema: Duplicados**
- Verificar que `hasTrackedInitialRoute` funciona correctamente
- Verificar que no hay múltiples instancias del servicio
