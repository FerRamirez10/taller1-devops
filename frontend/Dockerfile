# Etapa de construcción
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Ejecuta la construcción de la aplicación React con Vite
RUN npm run build

# Etapa de producción
FROM node:18-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app/dist ./dist

# Copia el package.json para las dependencias de producción
COPY --from=build /app/package*.json ./

# Instala solo las dependencias de producción
RUN npm install --only=production

# Expone el puerto 5000 para que la app esté disponible
EXPOSE 5000

# Inicia la app usando un servidor simple para servir el contenido estático de React
CMD ["npx", "serve", "dist", "-l", "5000"]