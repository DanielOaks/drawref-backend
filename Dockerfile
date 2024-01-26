FROM node:20.5.1-alpine3.18
RUN mkdir -p /opt/app
WORKDIR /opt/app

# we copy package.json and yarn.lock first so that the same cached stage can
# be used here if only code changes
COPY package.json yarn.lock .
RUN yarn

# copy other files
COPY tsconfig.json docker/startup.sh .
COPY src ./src
COPY migrations ./migrations
COPY public ./public

EXPOSE 3300
RUN yarn build
CMD [ "./startup.sh" ]
