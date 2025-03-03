import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './common/database/create-database';
import { ClientsModule } from './clients/clients.module';
import { MealsModule } from './meals/meals.module';
import { MealPlansModule } from './meal-plans/meal-plans.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
        return dataSource.options;
      },
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    MealsModule,
    MealPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
