FROM node

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]