import { Module } from '@nestjs/common';
import { ArrayDatasourceService } from './datasource.service.array';
import { MongoDatasourceService } from './datasource.service.mongo';

@Module({
    providers: [ArrayDatasourceService],
    exports: [ArrayDatasourceService],
})
export class DatasourceModule {}
