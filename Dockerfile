FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
<<<<<<< HEAD
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
=======
RUN npm install --production
COPY src ./src
ENV NODE_ENV=production
CMD ["node", "src/server.js"]
>>>>>>> 14654b3 (Backend)
