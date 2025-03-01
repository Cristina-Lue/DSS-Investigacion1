# Usa una imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Establece la variable de entorno para producción
ENV NODE_ENV=production

# Instala las dependencias de producción
RUN npm install --production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 5000
EXPOSE 5000

# Define el comando para iniciar la aplicación
CMD ["node", "server.js"]
