FROM amazonlinux:latest

RUN yum -y install nodejs

RUN npm install -g webpack webpack-cli

WORKDIR /app

COPY package*.json ./ 

COPY . .
 
EXPOSE 3000

CMD [ "npm", "run", "prod" ]
