import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { UsersCrontrollher } from './users/users.controllher';
import { AppService } from './app.service';
import { TypeormConfigService } from './typeorm-config/typeorm-service';
import { TypeormConfigModule } from './typeorm-config/typeorm-module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      useClass: TypeormConfigService,
    }),
    TypeOrmModule.forRootAsync({
      name: 'postgres',
      useClass: TypeormConfigService,
    }),
    TypeormConfigModule,
    HttpModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(UsersCrontrollher);
  }
}
