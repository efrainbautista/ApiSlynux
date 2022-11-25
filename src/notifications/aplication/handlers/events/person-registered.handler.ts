import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PersonRegistered } from '../../../../register/domain/events/person-registered.event';

@EventsHandler(PersonRegistered)
export class PersonRegisteredHandler implements IEventHandler<PersonRegistered> {
  constructor() {}

  async handle(event: PersonRegistered) {
    console.log('******Persona Registrada******');
    console.log(event);
  }
}