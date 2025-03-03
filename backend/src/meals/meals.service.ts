import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { RESPONSE_MESSAGES } from 'src/common/config';
import Meal from './entities/meal.entity';

@Injectable()
export class MealsService {
  private mealRepository: Repository<Meal>;

  constructor(private dataSource: DataSource) {
    this.mealRepository = this.dataSource.getRepository(Meal);
  }

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const existingMeal = await this.mealRepository.findOne({
      where: { name: createMealDto.name },
    });
    if (existingMeal) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_ALREADY_EXISTS);
    }
    const newMeal = await this.mealRepository.save({
      uuid: uuid(),
      ...createMealDto,
    });
    return newMeal;
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<{ meals: Meal[]; total: number; totalPages: number }> {
    const [meals, total] = await this.mealRepository.findAndCount({
      where: {
        active: true,
      },
      skip,
      take,
    });
    if (!meals) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_NOT_FOUND);
    }
    return {
      meals,
      total,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(uuid: string): Promise<Meal> {
    const meal = await this.mealRepository.findOne({
      where: { uuid },
    });
    if (!meal) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_NOT_FOUND);
    }
    return meal;
  }

  async update(uuid: string, updateMealDto: UpdateMealDto): Promise<Meal> {
    const meal = await this.mealRepository.findOne({
      where: { uuid },
    });
    if (!meal) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_NOT_FOUND);
    }
    const mealUpdated = await this.mealRepository.save({
      ...meal,
      ...updateMealDto,
    });
    return mealUpdated;
  }

  async remove(uuid: string): Promise<void> {
    const meal = await this.mealRepository.findOne({
      where: { uuid },
    });
    if (!meal) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_NOT_FOUND);
    }
    await this.mealRepository.softDelete(uuid);
  }
}
