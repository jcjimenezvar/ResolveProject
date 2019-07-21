import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "src/assets", "dist/" );

// Eliminar carpeta tmp dentro de assets (usado en la descarga de imagenes)
shell.rm("-R", "dist/assets/tmp");

// Inicializar carpeta tmp dentro de assets (usado en la descarga de imagenes)
shell.mkdir("dist/assets/tmp");