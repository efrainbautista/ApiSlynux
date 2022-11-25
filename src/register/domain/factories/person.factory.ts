import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { PersonName } from '../../../shared/domain/values/person-name.value';
import { Person } from '../aggregates/client/person.entity';
import { ClientId } from '../aggregates/client/client-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';
import { CorreoPerson } from 'src/shared/domain/values/person-correo.value';
import { PersonContraseña } from 'src/shared/domain/values/person-contraseña.value';

export class PersonFactory {
  public static withId(id: ClientId, name: PersonName, dni: Dni, auditTrail: AuditTrail,_correo: CorreoPerson,_contraseña: PersonContraseña): Person {
    let person: Person = new Person(name, dni, auditTrail,_correo,_contraseña);
    person.changeId(id);
    return person;
  }

  public static from(name: PersonName, dni: Dni, auditTrail: AuditTrail,_correo: CorreoPerson,_contraseña: PersonContraseña): Person {
    return new Person(name, dni, auditTrail, _correo,_contraseña);
  }
}