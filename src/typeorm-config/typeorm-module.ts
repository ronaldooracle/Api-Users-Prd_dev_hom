import { ConfigModule } from '../config-env/env-module';
import { Module, Global } from '@nestjs/common';
import { TypeormConfigService } from './typeorm-service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [TypeormConfigService],
  exports: [TypeormConfigService],
})
export class TypeormConfigModule {}
