import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ERROR } from 'src/common/constants';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    if (
      this.configService.get<string>('BASIC_AUTH.USER_NAME') === username &&
      this.configService.get<string>('BASIC_AUTH.PASS') === password
    ) {
      return true;
    }
    throw new UnauthorizedException(ERROR.UNAUTHORIZED_ACCESS);
  };
}
