import app, { connectMongo } from '../server/src/app.js';

export default async function handler(req, res) {
  await connectMongo();
  return app(req, res);
}
