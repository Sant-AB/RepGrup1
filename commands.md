# Crear carpeta
mkdir semana_9

# Inicializar proyecto
npm init

# Instalar librerías
npm install express bootstrap
npm install nodemon livereload connect-livereload --save-dev

# Crear directorio public
mkdir public
mkdir public/css
mkdir public/js
mkdir public/images

# Replace scripts section in package.json with:

  "scripts": {
    "start": "node server.js",
    "dev": "nodemon --ext js,html,css,json server.js"
  },