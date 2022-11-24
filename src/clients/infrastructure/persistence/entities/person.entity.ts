import { ChildEntity, Column } from 'typeorm';
import { ClientType } from '../../../domain/aggregates/client/client-type.enum';
import { DniValue } from '../values/dni.value';
import { PersonNameValue } from '../values/person-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.PERSON)
export class PersonEntity extends ClientEntity {
  @Column((type) => PersonNameValue, { prefix: false })
  public name: PersonNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;
}