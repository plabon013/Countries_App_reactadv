import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Controller, Get } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

dotenv.config(); // Load environment variables

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

@Controller()
export class AppController {
  @Get('protected_data')
  async getProtectedData() {
    const { data, error } = await supabase.from('protected_data').select('*');
    if (error) {
      return { error: error.message };
    }
    return data;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve React static files
  app.useStaticAssets(join(__dirname, '..', 'frontend'));
  app.setBaseViewsDir(join(__dirname, '..', 'frontend'));

  // Enable CORS for local React development
  app.enableCors({
    origin: 'http://localhost:5180', // Restrict to frontend only
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5001);
}

bootstrap();
