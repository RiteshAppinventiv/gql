import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { DEVICE_TYPE, LANGUAGES } from '../constants';

export class DeviceParamsDto {
  @ApiProperty({
    description: 'Type of the device',
    enum: Object.values(DEVICE_TYPE),
    example: DEVICE_TYPE.ANDROID,
  })
  @IsNotEmpty()
  @IsIn(Object.values(DEVICE_TYPE))
  readonly deviceType: DEVICE_TYPE;

  @ApiProperty({
    description: 'Device identifier',
    example: 'abcd1234',
  })
  @IsString()
  @IsNotEmpty()
  readonly deviceId: string;

  @ApiProperty({
    description: 'Timezone of the device',
    example: 'IST',
  })
  @IsString()
  @IsNotEmpty()
  readonly timeZone?: string;

  @ApiProperty({
    name: 'language',
    description: 'Language preference for response',
    enum: LANGUAGES,
    example: 'en',
  })
  @IsString()
  @IsNotEmpty()
  readonly language?: string;
}
