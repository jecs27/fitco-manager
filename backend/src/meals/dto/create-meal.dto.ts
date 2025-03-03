import { IsEnum, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { MealType } from 'src/common/enums';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MealType)
  @IsNotEmpty()
  mealType: MealType;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
