import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PandocController } from './pandoc/pandoc.controller';
import { PandocModule } from './pandoc/pandoc.module';

@Module({
  imports: [PandocModule],
  controllers: [AppController, PandocController],
  providers: [AppService],
})
export class AppModule {}
