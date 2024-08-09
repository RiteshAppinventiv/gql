import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsOptional, IsString } from 'class-validator';

export class LocationDto implements LocationI {
  @ApiPropertyOptional({
    example: '123 Main St, San Francisco, CA, USA',
    description: 'The full street address of the location',
  })
  @IsString()
  @IsOptional()
  fullAddress: string;

  @ApiPropertyOptional({
    example: '94105',
    description: 'The postal code of the location',
  })
  @IsOptional()
  postalCode: string;

  @ApiPropertyOptional({
    example: 37.7749,
    description: 'The latitude of the location',
  })
  @IsLatitude()
  @IsOptional()
  lat: number;

  @ApiPropertyOptional({
    example: -122.4194,
    description: 'The longitude of the location',
  })
  @IsLongitude()
  @IsOptional()
  lng: number;

  @ApiPropertyOptional({
    example: 'San Francisco',
    description: 'The city of the location',
  })
  @IsOptional()
  city: string;

  @ApiPropertyOptional({
    example: 'CA',
    description: 'The state or province of the location',
  })
  @IsOptional()
  state: string;

  @ApiPropertyOptional({
    example: 'USA',
    description: 'The country of the location',
  })
  @IsOptional()
  country: string;
}
