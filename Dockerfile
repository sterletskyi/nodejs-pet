FROM node:14.17.0
WORKDIR /code
ENV PORT 80
COPY package.json /code/package.json
COPY .env /code/env
RUN npm install
COPY . /code
#CMD [ "npm", "run", "start"]