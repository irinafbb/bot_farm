FROM node:14.15.1-alpine3.11 as builder
WORKDIR /usr/src/app
COPY ./ ./

RUN npm i \
    && npm run clean \
    && npm run build-ts \
    && rm -rf node_modules

FROM builder
ENV TZ=Europe/Moscow
RUN addgroup -S app && adduser -S app -G app
ENV HOME=/home/app
ENV APP_HOME=/home/app/api

WORKDIR $APP_HOME
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist/ ./dist

CMD ["node", "dist/app.js"]
