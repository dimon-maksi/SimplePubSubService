import { Module } from '@nestjs/common';
import { SubpubModule } from './subpub/subpub.module';
import { DatasourceModule } from './datasource/datasource.module';
import { ArrayDatasourceService } from './datasource/datasource.service.array';

@Module({
    imports: [SubpubModule, DatasourceModule],
    providers: [ArrayDatasourceService],
})
export class AppModule {}
