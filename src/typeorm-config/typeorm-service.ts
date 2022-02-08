import { ConfigService } from '../config-env/env-service';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class TypeormConfigService {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    const CONNECTIONS = {
      default: {
        type: 'postgres',
        host: this.configService.get('POSTGRES_HOST'),
        port: parseInt(this.configService.get('POSTGRES_PORT')),
        username: this.configService.get('POSTGRES_USERNAME'),
        password: this.configService.get('POSTGRES_PASSWORD'),
        schema: this.configService.get('POSTGRES_SCHEMA'),
        database: this.configService.get('POSTGRES_DATABASE'),
        entities: [path.join(__dirname, '/../entities/*.entity.{ts,js}')],
        synchronize: false,
        logging: true,
        migrations: [
          path.join(__dirname, '/../shared/typeorm/migration/*.{ts,js}'),
        ],
        cli: {
          entitiesDir: 'src/entities',
          migrationsDir: 'src/shared/typeorm/migration',
        },
        migrationsRun: false,
      },
      postgres: {
        name: 'postgres',
        type: 'postgres',
        host: this.configService.get('POSTGRES_HOST'),
        port: parseInt(this.configService.get('POSTGRES_PORT')),
        username: this.configService.get('POSTGRES_USERNAME'),
        password: this.configService.get('POSTGRES_PASSWORD'),
        database: this.configService.get('POSTGRES_DATABASE'),
        entities: [path.join(__dirname, '/../entities/*.entity.{ts,js}')],
        synchronize: false,
        dialectOptions: {
          ssl: {
            require: false,
          },
        },
      },
    };
    return CONNECTIONS[connectionName]
      ? CONNECTIONS[connectionName]
      : CONNECTIONS.default;
  }
}
