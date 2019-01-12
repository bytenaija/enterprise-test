FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY ecosystem.config.js .
COPY .env .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install 



# Expose the listening port of your app
EXPOSE 8080


CMD ["pm2-runtime", "ecosystem.config.js", "--web"]

