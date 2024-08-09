FROM node:18.19 as builder

# set working directory
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g npm@8.3.1
RUN npm install -g @angular/cli
RUN mkdir -p /appnode
USER node
WORKDIR /app
COPY --chown=1000:1000 . /app
