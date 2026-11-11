import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './src/router.js';
import swaggerSpec from './src/swagger.js';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Books and Authors API is running',
    documentation: '/api-docs'
  });
});

app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' });
});

export default app;
