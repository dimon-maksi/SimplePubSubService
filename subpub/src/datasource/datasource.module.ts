import { Module } from '@nestjs/common';
import { ArrayDatasourceService } from './datasource.service.array';
import { MongoDatasourceService } from './datasource.service.mongo';

@Module({
    providers: [ArrayDatasourceService, MongoDatasourceService],
})
export class DatasourceModule {}
