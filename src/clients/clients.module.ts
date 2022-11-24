import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRegisteredHandler } from '../notifications/aplication/handlers/events/person-registered.handler';
import { GetPersonClientsHandler } from './application/handlers/queries/get-person-clients.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterPersonHandler } from '../clients/application/handlers/commads/register-person.handler';
import { ClientEntity } from './infrastructure/persistence/entities/client.entity';
import { PersonEntity } from './infrastructure/persistence/entities/person.entity';

import { PersonController } from './interface/rest/person.controller';
import { PersonEntityRepository } from './infrastructure/persistence/repositories/person.repository';
import { PERSON_REPOSITORY } from './domain/aggregates/client/person.repository';
export const CommandHandlers = [RegisterPersonHandler];
export const EventHandlers = [PersonRegisteredHandler];
export const QueryHandlers = [GetPersonClientsHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([ClientEntity, PersonEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [PersonController],
  providers: [
    { useClass: PersonEntityRepository, provide: PERSON_REPOSITORY },
    PersonApplicationService,
    RegisterPersonValidator,
    PersonEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClientsModule {}
