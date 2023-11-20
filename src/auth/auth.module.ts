import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.stratergy';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './jwt.stratergy';
import { RTStrategy } from './refreshToken.stratergy';
@Module({
  imports:[UserModule,PassportModule,
    JwtModule.register({
      global: true,
    })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,RTStrategy],
  exports:[AuthService]
})
export class AuthModule {}
