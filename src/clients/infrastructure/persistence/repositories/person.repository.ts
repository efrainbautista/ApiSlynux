import { InjectRepository } from "@nestjs/typeorm";
import { PersonMapper } from "src/clients/application/mappers/person.mapper";
import { Person } from "src/clients/domain/aggregates/client/person.entity";
import { PersonRepository } from "src/clients/domain/aggregates/client/person.repository";
import { Repository } from "typeorm";
import { PersonEntity } from "../entities/person.entity";

export class PersonEntityRepository implements PersonRepository  {
  constructor(
    @InjectRepository(PersonEntity)
    private personRepository: Repository<PersonEntity>,
  ) {}

  async create(person: Person): Promise<Person> {
    let personEntity: PersonEntity = PersonMapper.domainToEntity(person);
    personEntity = await this.personRepository.save(personEntity);
    return PersonMapper.entityToDomain(personEntity);
  }

  async update(person: Person): Promise<Person> {
    let personEntity: PersonEntity = PersonMapper.domainToEntity(person);
    let personId: number = person.getId().getValue();
    await this.personRepository.update({ id: personId }, personEntity);
    return person;
  }

  async delete(personId: number): Promise<boolean> {
    await this.personRepository.delete({ id: personId });
    return true;
  }

  async getById(id: number): Promise<Person> {
    let personEntity: PersonEntity = await this.personRepository.findOne({ where: { id: id } });
    return PersonMapper.entityToDomain(personEntity);
  }

  async getByDni(dni: string): Promise<Person> {
    let personEntity: PersonEntity = await this.personRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    return PersonMapper.entityToDomain(personEntity);
  }
}