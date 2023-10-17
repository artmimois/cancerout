# Use the official Nginx image as a base
FROM nginx:latest

# Copy your Nginx configuration file into the container
COPY myapp.conf /etc/nginx/conf.d/default.conf

# Copy your application's files into the container
COPY . /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 8080

# Update Nginx configuration to listen on the desired port
RUN sed -i 's/listen 80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]