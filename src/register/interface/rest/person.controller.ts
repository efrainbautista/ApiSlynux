import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterPersonRequest } from 'src/register/application/dtos/request/register-person-request.dto';
import { PersonApplicationService } from 'src/register/application/services/person-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterPersonResponse } from 'src/register/application/dtos/response/register-person-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetPersonClients } from 'src/register/application/messages/queries/get-person-clients.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('clients/person')
@ApiTags('clients/person')
export class PersonController {
  constructor(
    private readonly personApplicationService: PersonApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({summary: 'Register'})
  async register(
    @Body() registerPersonRequest: RegisterPersonRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPersonResponse> = await this.personApplicationService.register(registerPersonRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetPersonClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const person = await this.personApplicationService.getById(id);
      return ApiController.ok(response, person);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}