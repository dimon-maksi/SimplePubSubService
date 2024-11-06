import { Module } from '@nestjs/common';
import { SubpubService } from './subpub.service';
import { SubpubController } from './subpub.controller';

@Module({
  providers: [SubpubService],
  controllers: [SubpubController]
})
export class SubpubModule {}
