import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoListModule } from './to-do-list/to-do-list.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),
   MongooseModule.forRoot('mongodb+srv://vadivel:vadivel123@cluster0.kmcide7.mongodb.net/TO_DO_LIST_APP'),
  ToDoListModule,
  UserModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
