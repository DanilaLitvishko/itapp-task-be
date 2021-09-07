import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

import { BaseInputDto } from '../../base/dto/base-input.dto';
import { BaseOutputDto } from '../../base/dto/base-output.dto';

type Instantiable<T = any> = new (...args: any[]) => T;

@Injectable()
export abstract class BaseService<Entity, T extends BaseOutputDto> {
  constructor(
    public repository: Repository<Entity>,
    public EntityModel: Instantiable,
  ) {}

  async find(
    inputDto: BaseInputDto,
    ResponseDto: Instantiable<T>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    condition: object = {},
  ): Promise<T[]> {
    try {
      const collection: Entity[] = await this.findRecords(condition);
      return collection.map((object) => {
        return new ResponseDto(object);
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findRecords(
    // eslint-disable-next-line @typescript-eslint/ban-types
    condition: object = {},
    sortField = 'createdAt',
    sortOrder = 'DESC',
    perPage = 0,
    currentPage = 0,
  ): Promise<Entity[]> {
    return this.repository.find();
  }

  async findOne(id: number, ResponseDto: Instantiable<T>): Promise<T> {
    try {
      const object: Entity = await this.repository.findOne(id);
      return new ResponseDto(object);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async create(
    createDto: BaseInputDto,
    ResponseDto: Instantiable<T>,
  ): Promise<T> {
    try {
      const savedData: Entity = await this.createRecord(createDto);
      return new ResponseDto(savedData);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async createRecord(createDto: BaseInputDto): Promise<Entity> {
    const entityModel = new this.EntityModel({ ...createDto });
    return entityModel.save();
  }

  async update(
    updateDto: BaseInputDto,
    id: string,
    ResponseDto: Instantiable<T>,
  ): Promise<T> {
    try {
      const entityData = await this.updateRecord(updateDto, id);
      return new ResponseDto(entityData);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateRecord(updateDto: BaseInputDto, id: string): Promise<Entity> {
    await this.repository.update(id, updateDto);
    return await this.repository.findOne(id);
  }

  async delete(id): Promise<DeleteResult> {
    try {
      return await this.repository.delete(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
