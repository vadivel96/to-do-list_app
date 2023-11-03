import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.stratergy';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './jwt.stratergy';
@Module({
  imports:[UserModule,PassportModule,
    JwtModule.register({
      global: true,
      secret: "jwtConstants.secret",
      signOptions: { expiresIn: '2d' },
    })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
