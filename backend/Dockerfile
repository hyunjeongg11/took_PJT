# Use a base image with JDK
FROM openjdk:17-jdk-slim

# Add a directory for the application
WORKDIR /app

# Copy the JAR file into the container
COPY build/libs/*.jar app.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
