# Étape 1 : Build du projet Java avec Maven
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Étape 2 : Exécution de l'app avec JDK
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV PORT 8080
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
