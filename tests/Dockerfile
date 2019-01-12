FROM enterprise_web

COPY test/ .
RUN npm Install -g mocha
RUN npm install supertest chai superagent

 CMD [ "mocha", "--exit" ]