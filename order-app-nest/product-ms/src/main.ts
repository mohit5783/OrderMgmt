import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const msOption = {
  transport: Transport.TCP,
  options:{
    host: '0.0.0.0',
    port:5003,
    retryAttempts: 5,
    retryDelay: 1000
  }
}
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, msOption);
  await app.listen(()=>{
    console.log("Microservice for Products is Listening...!!");
  });
}
bootstrap();
