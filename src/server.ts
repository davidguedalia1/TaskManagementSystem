import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import app from './app';

console.log('Starting the server...');

console.log('MongoDB URI:', config.MONGO_URI);

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

console.log('Server script execution finished');