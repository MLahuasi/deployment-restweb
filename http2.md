# [HTTP2 - OpenSSL](./http2.md)

[**DOCUMENTACION**](https://web.dev/articles/performance-http2?hl=es-419)

HTTP/2, originalmente llamado HTTP/2.0, es una revisión importante del protocolo de red HTTP utilizado por la World Wide Web. Fue derivado del protocolo experimental SPDY, originalmente desarrollado por Google. HTTP/2 fue desarrollado por el Grupo de Trabajo HTTP (también llamado httpbis, donde "bis" significa "dos veces") de la Internet Engineering Task Force (IETF).

HTTP/2 es la primera nueva versión de HTTP desde HTTP/1.1, que se estandarizó en RFC 2068 en 1997. El Grupo de Trabajo presentó HTTP/2 al Internet Engineering Steering Group (IESG) para su consideración como Estándar Propuesto en diciembre de 2014, y el IESG lo aprobó para publicarlo como Estándar Propuesto el 17 de febrero de 2015 (y se actualizó en febrero de 2020 con respecto a TLS 1.3). La especificación HTTP/2 se publicó como RFC 7540 el 14 de mayo de 2015.

**Los principales objetivos de HTTP/2 son**:

- Crear un mecanismo de negociación que permita a los clientes y servidores elegir usar HTTP/1.1, 2.0, o potencialmente otros protocolos no HTTP.
- Mantener una alta compatibilidad con HTTP/1.1 (por ejemplo, con métodos, códigos de estado, URIs y la mayoría de los campos de encabezado).
- `Reducir la latencia para mejorar la velocidad de carga de las páginas en los navegadores web` considerando: la `compresión de datos de los encabezados HTTP`, el HTTP/2 Server Push, `la priorización de las solicitudes`, y la `multiplexación de múltiples solicitudes a través de una única conexión TCP` (solucionando el problema de bloqueo de la cabeza de la línea a nivel de transacción HTTP en HTTP 1.x).
- Apoyar los casos de uso comunes existentes de HTTP, como los navegadores web de escritorio, los navegadores web móviles, las API web, los servidores web a varias escalas, los servidores proxy, los servidores proxy inversos, los cortafuegos y las redes de entrega de contenido.
- HTTP/2 deja todas las semánticas de alto nivel de HTTP/1.1, como los métodos, los códigos de estado, los campos de encabezado y las URIs, igual. Lo que es nuevo es cómo se enmarca y se transporta los datos entre el cliente y el servidor.

**CONFIGURACION**

La primera diferencia en la configuración es que se debe crear un servidor serguro `createSecureServer` y enviar un `key` y `cert`.

Tanto el key y el cert deben ser creados

## **CREAR CERTIFICADOS**

### **LINUX, IOS**

> - Ejecutar:

```
    openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

> - Solicita la siguiente información:

![](../../assets/06-openssl-linux.png)

> - Se crean los siguientes `keys`: `server.crt` y `server.key`

### **WINDOWS**

> - Instalar [Git](https://git-scm.com/download/win) [Git descarga OpenSSL]
> - Buscar ejecutable OpenSSL `openssl.exe` en la carpeta intalación Git [Program Files\Git\usr\bin] y copiar la dirección.
> - Editar variables de Entorno. (Digitar env en el search)
> - Seleccionar y Editar `path`
> - Crear una nueva entrada y pegar la dirección en donde se encuentra `openssl.exe`
> - Cerrar editar variables de entorno
> - en PowerShell ejecutar `OpenSSL`
> - Ejecutar en el directorio del proyecto:

```
    openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

> - Se crean los siguientes `keys`: `server.crt` y `server.key`
> - Se pueden guardar ambos archivos en un directorio `keys`

![](../../assets/06-openssl-windows.png)

## **CONFIGURAR CERTIFICADOS**

```
const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

    // OPERACIONES
    // ...
  }
);

```

> [Inicio](./README.md) | [Anterior](./http1.md) |[Siguiente](./express.md)
