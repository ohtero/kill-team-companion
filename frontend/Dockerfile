FROM node:lts-alpine AS base
WORKDIR /app/client
COPY package.json package-lock.json ./
RUN npm install --silent

FROM base AS dev
COPY . .
EXPOSE 5173
CMD  ["npm", "run", "dev"]

FROM base AS build
COPY . .
RUN npm run type-check
RUN npm run build

FROM base AS test
COPY . .

FROM node:lts-alpine AS prod
WORKDIR /app/client 
COPY --from=build /app/client/dist ./dist
COPY package.json package-lock.json ./
RUN npm install --production --silent
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]

