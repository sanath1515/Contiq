FROM openjdk:11

WORKDIR /micro-service

COPY target/*.jar app.jar

EXPOSE 8090 

CMD [ "java","-jar","app.jar" ]