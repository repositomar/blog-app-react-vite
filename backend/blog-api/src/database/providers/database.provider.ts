import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const DataBaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(configService: ConfigService) {
    const dbConfig = {
      type: 'mssql',
      host: configService.get<string>('db.mssql.host'),
      port: +configService.get<string>('db.mssql.port'),
      username: configService.get<string>('db.mssql.username'),
      password: configService.get<string>('db.mssql.password'),
      database: configService.get<string>('db.mssql.database'),
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      autoLoadEntities: true,
      synchronize: true,
    } as ConnectOptions;

    return dbConfig;
  },
});
