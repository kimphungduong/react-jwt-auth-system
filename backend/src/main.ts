import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS config
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://react-jwt-auth-liart.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean) as string[],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Middleware xử lý OPTIONS (fix cho Render)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      return res.sendStatus(200);
    }
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
