import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterPersonRequest } from '../dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../dtos/response/register-person-response.dto';
import { RegisterPersonValidator } from '../validators/register-person.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterPerson } from '../messages/commands/register-person.command';
import { PersonRepository, PERSON_REPOSITORY } from 'src/clients/domain/aggregates/client/person.repository';
import { Person } from 'src/clients/domain/aggregates/client/person.entity';
import { PersonMapper } from '../mappers/person.mapper';

@Injectable()
export class PersonApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPersonValidator: RegisterPersonValidator,
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: PersonRepository,
  ) {}

  async register(
    registerPersonRequest: RegisterPersonRequest,
  ): Promise<Result<AppNotification, RegisterPersonResponse>> {
    const registerPerson: RegisterPerson = PersonMapper.dtoRequestToCommand(registerPersonRequest);
    const notification: AppNotification = await this.registerPersonValidator.validate(registerPerson);
    if (notification.hasErrors()) return Result.error(notification);
    const person: Person = await this.commandBus.execute(registerPerson);
    const response: RegisterPersonResponse = PersonMapper.domainToDtoResponse(person);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.personRepository.getById(id);
  }
}