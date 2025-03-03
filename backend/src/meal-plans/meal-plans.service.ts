import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import MealPlan from './entities/meal-plan.entity';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { RESPONSE_MESSAGES } from 'src/common/config';

@Injectable()
export class MealPlansService {
  private mealPlanRepository: Repository<MealPlan>;

  constructor(private dataSource: DataSource) {
    this.mealPlanRepository = this.dataSource.getRepository(MealPlan);
  }

  async create(createMealPlanDto: CreateMealPlanDto): Promise<MealPlan> {
    const existingMealPlan = await this.mealPlanRepository.findOneBy({
      clientUuid: createMealPlanDto.clientUuid,
      mealUuid: createMealPlanDto.mealUuid,
      date: createMealPlanDto.date,
    });
    if (existingMealPlan) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.es.MEAL_PLAN_ALREADY_EXISTS,
      );
    }
    const newMealPlan = await this.mealPlanRepository.save({
      ...createMealPlanDto,
    });
    return newMealPlan;
  }

  async findByClient(
    clientUuid: string,
  ): Promise<{ [key: string]: MealPlan[] }> {
    const mealPlans = await this.mealPlanRepository.find({
      where: { clientUuid },
      order: { date: 'ASC' },
    });
    if (!mealPlans) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_PLAN_NOT_FOUND);
    }

    const mealPlansByDate = mealPlans.reduce((acc, mealPlan) => {
      const date = mealPlan.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(mealPlan);
      return acc;
    }, {});

    return mealPlansByDate;
  }

  async findOne(uuid: string): Promise<MealPlan> {
    const mealPlan = await this.mealPlanRepository.findOne({
      where: { uuid },
    });
    if (!mealPlan) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_PLAN_NOT_FOUND);
    }
    return mealPlan;
  }

  async update(
    uuid: string,
    updateMealPlanDto: UpdateMealPlanDto,
  ): Promise<MealPlan> {
    const mealPlan = await this.mealPlanRepository.findOne({
      where: { uuid },
    });
    if (!mealPlan) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_PLAN_NOT_FOUND);
    }
    const mealPlanUpdated = await this.mealPlanRepository.save({
      ...mealPlan,
      ...updateMealPlanDto,
    });
    return mealPlanUpdated;
  }

  async remove(uuid: string): Promise<void> {
    const mealPlan = await this.mealPlanRepository.findOne({
      where: { uuid },
    });
    if (!mealPlan) {
      throw new NotFoundException(RESPONSE_MESSAGES.es.MEAL_PLAN_NOT_FOUND);
    }
    await this.mealPlanRepository.softDelete(uuid);
  }
}
