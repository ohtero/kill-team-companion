FROM node:lts-alpine AS base
WORKDIR /app/server
COPY package.json package-lock.json ./
RUN npm install --silent

FROM base AS dev
WORKDIR /app/server
COPY . .
EXPOSE 3000
# RUN chown -R myapp /app/backend
# USER myapp
CMD ["npm", "run", "dev"]

FROM base AS build
WORKDIR /app/server
COPY . .
RUN npm run build

FROM node:lts-alpine AS prod
WORKDIR /app/server
COPY --from=build /app/server/dist ./dist
COPY package.json package-lock.json ./
RUN npm install --production
EXPOSE 3000
# RUN chown -R node /app/backend
# USER node
CMD ["npm", "run", "start"]

