import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import Client from './entities/client.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthService } from 'src/auth/auth.service';
import { RESPONSE_MESSAGES } from 'src/common/config';

@Controller('clients')
export class ClientsController {
  constructor(
    private clientsService: ClientsService,
    private authService: AuthService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() client: CreateClientDto,
  ): Promise<any> {
    await this.authService.validateAndGetUserFromRequest(req);
    const newClient: Client = await this.clientsService.create(client);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.CLIENT_CREATED_SUCCESSFULLY,
      data: newClient,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @Req() req: Request,
    @Res() res: Response,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ): Promise<any> {
    await this.authService.validateAndGetUserFromRequest(req);
    const { clients, total } = await this.clientsService.findAll(skip, take);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.CLIENT_LIST_OBTAINED,
      data: {
        clients,
        total: total,
      },
    });
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('uuid') uuid: string,
  ): Promise<any> {
    const client: Client = await this.clientsService.findOne(uuid);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.CLIENT_DATA_OBTAINED,
      data: {
        client,
      },
    });
  }

  @Put(':uuid')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('uuid') uuid: string,
    @Body() client: UpdateClientDto,
  ): Promise<any> {
    const updatedClient: Client = await this.clientsService.update(
      uuid,
      client,
    );
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.CLIENT_UPDATED_SUCCESSFULLY,
      data: { updatedClient },
    });
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('uuid') uuid: string,
  ): Promise<any> {
    await this.clientsService.remove(uuid);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.CLIENT_DELETED_SUCCESSFULLY,
    });
  }
}
