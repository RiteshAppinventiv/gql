import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DeeplinkDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  android?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ios?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  iosStoreLink?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fallback?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  token?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userType?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profile_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  user_id?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  jwt?: string;
}
