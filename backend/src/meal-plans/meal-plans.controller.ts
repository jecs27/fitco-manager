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
} from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { Request, Response } from 'express';
import MealPlan from './entities/meal-plan.entity';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { RESPONSE_MESSAGES } from 'src/common/config';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('meal-plans')
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createMealPlanDto: CreateMealPlanDto,
  ): Promise<any> {
    const newMealPlan: MealPlan =
      await this.mealPlansService.create(createMealPlanDto);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_PLAN_CREATED_SUCCESSFULLY,
      data: newMealPlan,
    });
  }

  @Get('client/:clientUuid')
  @UseGuards(JwtAuthGuard)
  async findByClient(
    @Req() req: Request,
    @Res() res: Response,
    @Param('clientUuid') clientUuid: string,
  ): Promise<any> {
    const mealPlans = await this.mealPlansService.findByClient(clientUuid);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_PLAN_LIST_OBTAINED,
      data: {
        mealPlans,
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
    const mealPlan: MealPlan = await this.mealPlansService.findOne(uuid);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_PLAN_DATA_OBTAINED,
      data: {
        mealPlan,
      },
    });
  }

  @Put(':uuid')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('uuid') uuid: string,
    @Body() updateMealPlanDto: UpdateMealPlanDto,
  ): Promise<any> {
    const updatedMealPlan: MealPlan = await this.mealPlansService.update(
      uuid,
      updateMealPlanDto,
    );
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_PLAN_UPDATED_SUCCESSFULLY,
      data: {
        updatedMealPlan,
      },
    });
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('uuid') uuid: string,
  ): Promise<any> {
    await this.mealPlansService.remove(uuid);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_PLAN_DELETED_SUCCESSFULLY,
    });
  }
}
