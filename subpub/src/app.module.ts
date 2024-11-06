import { Module } from '@nestjs/common';
import { SubpubModule } from './subpub/subpub.module';

@Module({
  providers: [],
  imports: [SubpubModule],
})
export class AppModule {}
