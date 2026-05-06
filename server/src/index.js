import app, { connectMongo } from './app.js';

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectMongo();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

start();
