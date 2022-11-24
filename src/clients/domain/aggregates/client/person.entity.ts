import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';

import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { ClientId } from './client-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Client } from './client.root.entity';
import { PersonRegistered } from '../../events/person-registered.event';

export class Person extends Client {
  private name: PersonName;
  private dni: Dni;

  public constructor(name: PersonName, dni: Dni, auditTrail: AuditTrail) {
    super(ClientType.PERSON, auditTrail);
    this.name = name;
    this.dni = dni;
  }

  public register() {
    const event = new PersonRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): PersonName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeName(name: PersonName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}