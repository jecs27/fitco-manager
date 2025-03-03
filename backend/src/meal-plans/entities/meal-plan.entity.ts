import BaseEntity from 'src/common/database/base-entity';
import { Entity, Column, Index, Generated, ManyToOne, JoinColumn } from 'typeorm';
import Client from 'src/clients/entities/client.entity';
import Meal from 'src/meals/entities/meal.entity';
import { MealType } from 'src/common/enums';

@Entity({ name: 'meal_plans' })
export default class MealPlan extends BaseEntity {
  @Index()
  @Generated('increment')
  @Column({
    type: 'int',
    name: 'meal_plan_id',
    unsigned: true,
    nullable: false,
  })
  mealPlanId: number;

  @Column({
    type: 'uuid',
    name: 'client_uuid',
    nullable: false,
  })
  clientUuid: string;

  @Column({
    type: 'uuid',
    name: 'meal_uuid',
    nullable: false,
  })
  mealUuid: string;

  @Column('enum', {
    enum: MealType,
    name: 'meal_type',
    nullable: false,
  })
  mealType: MealType;

  @Column({
    type: 'date',
    name: 'date',
    nullable: false,
  })
  date: string;

  @ManyToOne(() => Client, (client) => client.mealPlans)
  @JoinColumn({ name: 'client_uuid', referencedColumnName: 'uuid' })
  client: Client;

  @ManyToOne(() => Meal)
  @JoinColumn({ name: 'meal_uuid', referencedColumnName: 'uuid' })
  meal: Meal;
}
