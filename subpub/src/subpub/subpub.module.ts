import { Module } from '@nestjs/common';
import { SubpubService } from './subpub.service';
import { SubpubController } from './subpub.controller';
import { ArrayDatasourceService } from 'src/datasource/datasource.service.array';

@Module({
    providers: [SubpubService, ArrayDatasourceService],
    controllers: [SubpubController],
})
export class SubpubModule {}
