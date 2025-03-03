import { IsEnum, IsDateString, IsString } from 'class-validator';
import { MealType } from 'src/common/enums';

export class CreateMealPlanDto {
  @IsString()
  clientUuid: string;

  @IsString()
  mealUuid: string;

  @IsEnum(MealType)
  mealType: MealType;

  @IsDateString()
  date: string;
}
