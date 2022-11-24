import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { PersonClientDto } from '../../dtos/response/person-client.dto';
import { GetPersonClients } from '../../messages/queries/get-person-clients.query';
import { PersonMapper } from '../../mappers/person.mapper';

@QueryHandler(GetPersonClients)
export class GetPersonClientsHandler implements IQueryHandler<GetPersonClients> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetPersonClients) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      clients
    WHERE
      type = 'P'
    ORDER BY
      last_name, first_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const personClients: PersonClientDto[] = rows.map(function (row: any) {
      return PersonMapper.ormToPersonClientDto(row);
    });
    return personClients;
  }
}