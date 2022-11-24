import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "mysql",
    url: 'mysql://root:randy0210@localhost:3306/slynux',
    migrationsRun: true,
    logging: true,
    timezone: '+00:00',
    bigNumberStrings: false,
    entities: [
      process.env.ENVIRONMENT == 'prod' ? 
      '**/infrastructure/persistence/entities/*{.ts,.js}' : 
      'dist/**/infrastructure/persistence/entities/*{.ts,.js}'
    ],
    subscribers: [],
    migrations: [
      process.env.ENVIRONMENT == 'prod' ? 
      'shared/infrastructure/persistence/migrations/*{.ts,.js}' : 
      'dist/shared/infrastructure/persistence/migrations/*{.ts,.js}'
    ],
    migrationsTableName: "migrations"
  }),
    ClientsModule,
    UsersModule,
    NotificationsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
