import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { PersonRepository, PERSON_REPOSITORY } from 'src/register/domain/aggregates/client/person.repository';
import { Person } from 'src/register/domain/aggregates/client/person.entity';
import { RegisterPerson } from '../messages/commands/register-person.command';


@Injectable()
export class RegisterPersonValidator {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private personRepository: PersonRepository,
  ) {
  }

  public async validate(registerPerson: RegisterPerson,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPerson.firstName ? registerPerson.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('Se requiere de un nombre', null);
    }
    const lastName: string = registerPerson.lastName ? registerPerson.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('Se requiere de un apellido', null);
    }
    const dni: string = registerPerson.dni ? registerPerson.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('Se requiere de un DNI', null);
    }
    
    const correo: string = registerPerson.correo ? registerPerson.correo.trim() : '';
    if (correo.length <= 0) {
      notification.addError('Se requiere de un correo', null);
    }

    const contraseña: string = registerPerson.contraseña ? registerPerson.contraseña.trim() : '';
    if (contraseña.length <= 0) {
      notification.addError('Se requiere de una contraseña', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    const person: Person = await this.personRepository.getByDni(dni);
    if (person != null) notification.addError('El DNI ya esta registrado', null);
    
    return notification;
  }
}