import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';

import authRoutes from './routes/auth.routes';
import weatherRoutes from './routes/weather.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

// Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
  });
