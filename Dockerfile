FROM node:22-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3030
CMD [ "node", "index.js", "env=STAGE" ]
