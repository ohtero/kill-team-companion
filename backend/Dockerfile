FROM node:lts-alpine AS dev
ENV NODE_ENV=development
WORKDIR /app/backend
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /app/backend
USER node
CMD ["npm", "run", "dev"]

FROM node:lts-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app/backend
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /app/backend
USER node
CMD ["npm", "start"]
