FROM node:latest


# Bundle APP files
COPY src src/
COPY test test/
COPY package.json .
COPY .env .

ENV NODE_ENV production
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

RUN npm install chai supertest superagent --save-dev

RUN npm install -g mocha

# Show current folder structure in logs
RUN ls -al -R

# Expose the listening port of your app
EXPOSE 3000


CMD [ "mocha", "--exit" ]