import BaseEntity from 'src/common/database/base-entity';
import { Entity, Column, Index, Generated, OneToMany } from 'typeorm';
import MealPlan from 'src/meal-plans/entities/meal-plan.entity';

@Entity({ name: 'clients' })
export default class Client extends BaseEntity {
  @Index()
  @Generated('increment')
  @Column({ type: 'int', name: 'client_id', unsigned: true, nullable: false })
  clientId: number;

  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;

  @Column({ type: 'varchar', name: 'phone', length: 10, nullable: false })
  phone: string;

  @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'address', nullable: true })
  address: string;

  @Column({ type: 'varchar', name: 'emergency_contact', nullable: true })
  emergencyContact: string;

  @Column({
    type: 'varchar',
    name: 'emergency_phone',
    length: 10,
    nullable: true,
  })
  emergencyPhone: string;

  @Column({ type: 'tinyint', name: 'active', nullable: false, default: 1 })
  active: boolean;

  @OneToMany(() => MealPlan, (mealPlan) => mealPlan.client)
  mealPlans: MealPlan[];
}
