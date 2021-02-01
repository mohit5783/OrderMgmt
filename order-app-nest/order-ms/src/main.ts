import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const msOption = {
  transport: Transport.TCP,
  options: {
    host: '0.0.0.0',
    port: 5001,
    retryAttempts: 5,
    retryDelay: 1000
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, msOption);
  await app.listen(() => {
    console.log("Microservice for Orders is Listening...!!");
  });
}
bootstrap();
