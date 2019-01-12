# FROM node:latest

# # Create app directory
# WORKDIR /usr/src/app
# # Install app dependencies
# COPY package*.json ./
# RUN npm install
# # Copy app source code
# COPY . .
# #Expose port and start application
# EXPOSE 8080
# CMD [ "npm", "start" ]

FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY ecosystem.config.js .
COPY .env .

ENV NODE_ENV production
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install 


# Expose the listening port of your app
EXPOSE 8080


# Show current folder structure in logs
RUN ls -al -R

CMD ["pm2-runtime", "ecosystem.config.js", "--web"]

