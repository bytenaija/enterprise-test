FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY ecosystem.config.js .
COPY .env .

ENV NODE_ENV production
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production


# Expose the listening port of your app
EXPOSE 8080


# Show current folder structure in logs
RUN ls -al -R

CMD ["pm2-runtime", "ecosystem.config.js", "--web"]

