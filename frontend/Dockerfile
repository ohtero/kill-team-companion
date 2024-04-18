FROM node:20.10 AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --silent && mv node_modules ../
COPY . /app
EXPOSE 5173
CMD  ["npm", "run", "dev"]

FROM node:20.10 AS prod
WORKDIR /app
COPY package.json package-lock.json
RUN npm install --production --silent && mv node_modules ../
COPY --from=dev /app/build /app/build
EXPOSE 8000
CMD ["npm", "tsc && vite build"]