FROM node:18-alpine AS build-frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine AS final

WORKDIR /app

# Copier les fichiers backend
COPY package*.json ./
RUN npm install
COPY backend.js ./
COPY .env ./

# Copier le frontend buildé
COPY --from=build-frontend /app/frontend/dist ./frontend/dist

EXPOSE 80

CMD ["node", "backend.js"]
