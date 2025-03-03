import BaseEntity from 'src/common/database/base-entity';
import { MealType } from 'src/common/enums';
import { Entity, Column, Index, Generated } from 'typeorm';

@Entity({ name: 'meals' })
export default class Meal extends BaseEntity {
  @Index()
  @Generated('increment')
  @Column({ type: 'int', name: 'meal_id', unsigned: true, nullable: false })
  mealId: number;

  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;

  @Column({ type: 'enum', name: 'meal_type', enum: MealType, nullable: false })
  mealType: MealType;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'tinyint', name: 'active', nullable: false, default: 1 })
  active: boolean;
}
