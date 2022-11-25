import { ChildEntity, Column } from 'typeorm';
import { ClientType } from '../../../domain/aggregates/client/client-type.enum';
import { ContraseñaValue } from '../values/contraseña.value';
import { CorreoValue } from '../values/correo.value';
import { DniValue } from '../values/dni.value';
import { PersonNameValue } from '../values/person-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.PERSONCOMUN)
export class PersonEntity extends ClientEntity {
  @Column((type) => PersonNameValue, { prefix: false })
  public name: PersonNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;
  
  @Column((type) => CorreoValue, { prefix: false })
  public correo: CorreoValue;

  @Column((type) => ContraseñaValue, { prefix: false })
  public contraseña: ContraseñaValue;
}