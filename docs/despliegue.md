# Documentación de Despliegue - SED Justificación Respuesta ICFES

## Estado Actual

El proyecto funciona en desarrollo (localhost) pero tiene un problema de rutas que impide cargar imágenes cuando se desplie en producción.

## Problema

Las rutas de las imágenes en la base de datos (`questions.js`) usan rutas absolutas desde `/shared/`:

```
/shared/img/questions/mat1.png
/shared/img/questions/cn66.png
```

Esto funciona en **desarrollo** (localhost) porque:
- El VirtualHost tiene un `Alias /shared` que apunta a la carpeta del proyecto

Pero en **producción**, si el proyecto está en una subcarpeta como `/saber11/` o en la raíz de otro dominio, estas rutas romperán porque `/shared/` apuntará a una carpeta que no existe.

## Soluciones Posibles

### Opción 1: Alias en Apache (Actual)

Agregar configuración en el `httpd.conf` del servidor:

```apache
Alias /shared "/ruta/completa/al/proyecto/shared"
<Directory "/ruta/completa/al/proyecto/shared">
    Require all granted
</Directory>
```

**Ventajas:**
- No requiere cambios en código/datos
- Implementación rápida

**Desventajas:**
- Requiere acceso al servidor Apache para configurar
- Si hay varios proyectos, hay que mantener múltiples Alias
- Propenso a errores de configuración

---

### Opción 2: Corregir Rutas en Datos

Cambiar las rutas de `/shared/img/...` a rutas relativas `../shared/img/...` o rutas dinámicas.

**Ejemplo de rutas relativas:**
```
../shared/img/questions/mat1.png
```

**Ventajas:**
- Funciona en cualquier servidor sin configuración adicional
- Portabilidad total
- No depende de Apache

**Desventajas:**
- Requiere cambiar datos en `questions.js`
- Si hay un campo `context` con HTML embebido, hay que sanitizarlo también

---

### Opción 3: PHP Router

Crear un archivo `shared/img/questions/*.png` que sirva las imágenes dinámicamente.

**Ventajas:**
- Control total sobre URLs
- Posible caché y optimización

**Desventajas:**
- Overkill para servir archivos estáticos
- Más código para mantener

---

### Opción 4: CDN o Almacenamiento Externo

Subir las imágenes a un CDN o servicio de almacenamiento (AWS S3, Cloudinary, etc.) y usar URLs absolutas externas.

**Ventajas:**
- Mejor rendimiento
- Escalabilidad
- URLs independientes del servidor

**Desventajas:**
- Requiere servicio externo
- Costos potenciales
- Más complejidad

---

## Recomendación

**Opción 2 (Rutas Relativas)** es la más portable para despliegue. El cambio es simple y permite que el proyecto funcione en cualquier configuración de servidor sin necesidad de modificar Apache.

## Tareas Pendientes

- [ ] Evaluar qué opción elegir
- [ ] Implementar la solución
- [ ] Probar en entorno similar a producción
- [ ] Documentar la solución elegida

## Configuración Actual de Apache (Desarrollo)

Archivo: `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

```apache
# localhost VirtualHost
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot "C:/xampp/htdocs"
    ServerName localhost
    Alias /shared "C:/xampp/htdocs/SED-Justificacion-Respuesta-ICFES/shared"
    <Directory "C:/xampp/htdocs">
        Options Indexes FollowSymLinks ExecCGI Includes
        AllowOverride All
        Require all granted
    </Directory>
    <Directory "C:/xampp/htdocs/SED-Justificacion-Respuesta-ICFES/shared">
        Require all granted
    </Directory>
</VirtualHost>

# saber11.local VirtualHost
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot "C:/xampp/htdocs/SED-Justificacion-Respuesta-ICFES"
    ServerName saber11.local
    ServerAlias www.saber11.local
    Alias /shared "C:/xampp/htdocs/SED-Justificacion-Respuesta-ICFES/shared"
    <Directory "C:/xampp/htdocs/SED-Justificacion-Respuesta-ICFES">
        Options Indexes FollowSymLinks ExecCGI Includes
        AllowOverride None
        Require all granted
    </Directory>
    <Directory "C:/xampp/htdocs/SED-Justificacion-Respuesta-ICFES/shared">
        Require all granted
    </Directory>
    ErrorLog "logs/saber11.local-error.log"
    CustomLog "logs/saber11.local-access.log" common
</VirtualHost>
```

## Historial

- 21/04/2026: Creado este documento