import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './common/database/create-database';
import { ClientsModule } from './clients/clients.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
