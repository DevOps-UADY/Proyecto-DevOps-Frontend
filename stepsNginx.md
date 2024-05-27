### Configuración de Nginx y Pipeline en Jenkins

#### Configuración de Nginx en el Servidor

1. **Instalar SSH Server en el Servidor**:
   - Si el servidor no tiene SSH Server instalado, puedes instalarlo ejecutando:
     ```
     sudo apt update
     sudo apt install openssh-server
     ```

2. **Acceder al Servidor**:
   - Conéctate al servidor remoto utilizando SSH:
     ```
     ssh usuario@IP_del_servidor
     ```

3. **Editar el Archivo de Configuración de Nginx**:
   - Abre el archivo de configuración de Nginx en un editor de texto:
     ```
     sudo nano /etc/nginx/sites-available/default
     ```

4. **Modificar la Configuración de Nginx**:
   - Busca la directiva `root` dentro del bloque de servidor (`server { ... }`) en el archivo de configuración.
   - Cambia la ruta en la directiva `root` para que apunte a la carpeta donde se ubicará el archivo `index.html` después de la compilación.

5. **Guardar los Cambios y Cerrar el Editor**:
   - Guarda los cambios realizados en el archivo y cierra el editor.

6. **Reiniciar Nginx**:
   - Después de modificar la configuración, reinicia el servicio de Nginx:
     ```
     sudo systemctl restart nginx
     ```

#### Configuración del Pipeline en Jenkins

1. **Configurar Credenciales en Jenkins**:
   - En Jenkins, ve a "Manage Jenkins" -> "Manage Credentials" -> "Global credentials (unrestricted)" -> "Add Credentials".
   - Elige el tipo de credencial "SSH Username with private key" y proporciona la clave SSH privada.
   - Asigna un ID a la credencial y guarda.

2. **Crear un Nuevo Pipeline**:
   - En Jenkins, crea un nuevo job de tipo Pipeline.

3. **Configurar el Pipeline**:
   - Copia y pega el código del pipeline proporcionado en el `Jenkinsfile`.
   - Modifica las variables `SERVER_USER`, `SERVER_IP` y `SERVER_DEST_DIR` con los datos específicos del servidor remoto.
   - Asigna el ID de la credencial SSH creada en Jenkins a la variable `SSH_KEY`.

4. **Guardar y Ejecutar el Pipeline**:
   - Guarda la configuración del pipeline y ejecútalo.
   - Verifica que el pipeline se ejecute correctamente y que los archivos se transfieran y Nginx se reinicie correctamente después de la compilación.

Siguiendo estos pasos, deberías poder configurar tanto Nginx en el servidor como el pipeline en Jenkins para transferir archivos y reiniciar Nginx automáticamente después de una compilación exitosa. Asegúrate de personalizar los detalles del servidor y las credenciales según tu entorno específico.
