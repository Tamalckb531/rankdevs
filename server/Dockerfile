FROM node:20.12.0-alpine3.19	

WORKDIR /app


COPY package.json package-lock.json* tsconfig.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]