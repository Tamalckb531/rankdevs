sudo docker run -p 3001:3001 -e DATABASE_URL='your-database-url' -e JWT_SECRET_KEY='your-secret-key' -e NODE_ENV='development' -e LOCAL_ORIGIN='http://localhost:3000' rankdevs-docker-img
