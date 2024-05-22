// getting-started.js
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.db_url as string);

    // Start the server
    const server = app.listen(config.port, () => {
      console.log(`E-commerce app listening on port ${config.port}`);
    });

    // Handle server disconnection
    server.on('disconnect', () => {
      console.error('Server disconnected');
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (error) => {
      console.error('Unhandled Promise Rejection:', error);
      process.exit(1);
    });
  } catch (err) {
    // Handle database connection errors
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
}

main();
