# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --omit=dev

# Copia el resto de la aplicación
COPY . .

# Expone el puerto que usará el contenedor
EXPOSE 5000

# Comando para iniciar la API
CMD ["node", "server.js"]
