FROM node:20-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY .env .env
RUN npm ci

COPY . .

ARG FRONTEND_PORT

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "run", "dev"]
