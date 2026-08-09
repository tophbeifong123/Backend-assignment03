import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (
  configService?: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  host: configService?.get<string>('DB_HOST') ?? process.env.DB_HOST ?? 'localhost',
  port: Number(configService?.get<number>('DB_PORT') ?? process.env.DB_PORT ?? 5432),
  username: configService?.get<string>('DB_USERNAME') ?? process.env.DB_USERNAME ?? 'postgres',
  password: String(configService?.get<string>('DB_PASSWORD') ?? process.env.DB_PASSWORD ?? 'postgres'),
  database: configService?.get<string>('DB_DATABASE') ?? process.env.DB_DATABASE ?? 'assignment02',

  autoLoadEntities: true,

  synchronize: false,
});

