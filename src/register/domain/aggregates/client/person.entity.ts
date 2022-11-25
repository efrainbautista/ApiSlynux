import { ClientType } from 'src/register/domain/aggregates/client/client-type.enum';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { ClientId } from './client-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Client } from './client.root.entity';
import { PersonRegistered } from '../../events/person-registered.event';
import { CorreoPerson } from 'src/shared/domain/values/person-correo.value';
import { PersonContraseña } from 'src/shared/domain/values/person-contraseña.value';

export class Person extends Client {
  private name: PersonName;
  private dni: Dni;
  private correo: CorreoPerson; 
  private contraseña: PersonContraseña; 

  public constructor(_name: PersonName, _dni: Dni, _auditTrail: AuditTrail, _correo: CorreoPerson,_contraseña: PersonContraseña) {
    super(ClientType.PERSONCOMUN, _auditTrail);
    this.name = _name;
    this.dni = _dni;
    this.correo = _correo;
    this.contraseña = _contraseña;
  } 

  public register() {
    const event = new PersonRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue(),this.correo.getCorreo(),this.contraseña.getContraseña());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }
  public getCorreo(): CorreoPerson {
    return this.correo;
  }
  public getContraseña(): PersonContraseña {
    return this.contraseña;
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