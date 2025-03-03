import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';
import { RESPONSE_MESSAGES } from 'src/common/config';
import Meal from './entities/meal.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createMealDto: CreateMealDto,
  ): Promise<any> {
    const newMeal: Meal = await this.mealsService.create(createMealDto);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_CREATED_SUCCESSFULLY,
      data: newMeal,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ): Promise<any> {
    const { meals, total, totalPages } = await this.mealsService.findAll(
      skip,
      take,
    );
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_LIST_OBTAINED,
      data: {
        meals,
        total,
        totalPages,
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
    const meal = await this.mealsService.findOne(uuid);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_DATA_OBTAINED,
      data: {
        meal,
      },
    });
  }

  @Put(':uuid')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('uuid') uuid: string,
    @Body() updateMealDto: UpdateMealDto,
  ): Promise<any> {
    const updatedMeal = await this.mealsService.update(uuid, updateMealDto);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_UPDATED_SUCCESSFULLY,
      data: {
        updatedMeal,
      },
    });
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('uuid') uuid: string,
  ): Promise<any> {
    await this.mealsService.remove(uuid);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.MEAL_DELETED_SUCCESSFULLY,
    });
  }
}
