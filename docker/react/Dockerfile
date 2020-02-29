# base image
FROM node

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./package.json .
COPY ./package-lock.json  .

RUN npm install --silent
RUN npm install react-scripts@latest -g --silent

# Bundle app source
COPY . .

# start app
CMD ["npm", "start"]

