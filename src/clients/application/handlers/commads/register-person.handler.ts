import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPerson } from '../../messages/commands/register-person.command';
import { PersonMapper } from '../../mappers/person.mapper';
import { Person } from 'src/clients/domain/aggregates/client/person.entity';
import { Inject } from '@nestjs/common';
import { PersonRepository, PERSON_REPOSITORY } from 'src/clients/domain/aggregates/client/person.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterPerson)
export class RegisterPersonHandler
  implements ICommandHandler<RegisterPerson> {
  constructor(
    private dataSource: DataSource,
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: PersonRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterPerson) {
    let person: Person = PersonMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      person = await this.personRepository.create(person);
      if (person == null) throw new Error("");
      person = this.publisher.mergeObjectContext(person);
      person.register();
      person.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      person = null;
    } finally {
      await queryRunner.release();
    }
    return person;
  }
}