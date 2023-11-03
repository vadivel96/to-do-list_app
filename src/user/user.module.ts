import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schema/user.schema';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports:[MongooseModule.forFeature([{name:'user',schema:userSchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
