FROM node:24.19.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:24.19.0 AS runtime

WORKDIR /app

ENV NODE_ENV=prod

COPY package.json package-lock.json ./

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/main"]
