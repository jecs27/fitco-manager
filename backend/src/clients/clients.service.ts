import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Client from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RESPONSE_MESSAGES } from 'src/common/config';

@Injectable()
export class ClientsService {
  private clientRepository: Repository<Client>;

  constructor(private dataSource: DataSource) {
    this.clientRepository = this.dataSource.getRepository(Client);
  }

  async create(client: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findOne({
      where: { email: client.email },
    });

    if (existingClient) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.EMAIL_ALREADY_TAKEN);
    }

    const newClient = await this.clientRepository.save(client);
    return newClient;
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<{ clients: Client[]; total: number; totalPages: number }> {
    const [clients, total] = await this.clientRepository.findAndCount({
      where: {
        active: true,
      },
      skip,
      take,
    });

    if (!clients) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.CLIENT_NOT_FOUND);
    }
    return {
      clients,
      total,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(uuid: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { uuid },
    });

    if (!client) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.CLIENT_NOT_FOUND);
    }

    return client;
  }

  async update(
    uuid: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { uuid },
    });

    if (!client) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.CLIENT_NOT_FOUND);
    }

    const clientUpdated = await this.clientRepository.save({
      ...client,
      ...updateClientDto,
    });
    return clientUpdated;
  }

  async remove(uuid: string): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: { uuid },
    });

    if (!client) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.CLIENT_NOT_FOUND);
    }

    await this.clientRepository.softDelete(uuid);
  }
}
