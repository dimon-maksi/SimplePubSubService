import { Module } from '@nestjs/common';
import { SubpubModule } from './subpub/subpub.module';
import { DatasourceModule } from './datasource/datasource.module';
import { DatasorceService } from './datasorce/datasorce.service';

@Module({
  providers: [DatasorceService],
  imports: [SubpubModule, DatasourceModule],
})
export class AppModule {}
