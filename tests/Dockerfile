FROM laramove_web

# # Create app directory
WORKDIR /usr/src/app
# # Install app dependencies
COPY test/ .
RUN npm Install -g mocha
RUN npm install supertest chai superagent

 CMD [ "mocha", "--exit" ]