import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class OnlyIDParamDTO {
  @ApiProperty({
    description: 'Unique identifier of the resource',
    example: '61d9cfbf17ed7311c4b3e485',
    required: true,
  })
  @IsMongoId()
  @IsString()
  id: string;
}

export class UserIDParamDTO {
  @ApiProperty({
    description: 'Unique identifier of the resource',
    example: '61d9cfbf17ed7311c4b3e485',
    required: true,
  })
  @IsMongoId()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Unique identifier of the resource',
    example: '61d9cfbf17ed7311c4b3e485',
    required: true,
  })
  @IsMongoId()
  @IsString()
  userId: string;
}
export class OnlyIDParamDTO1 {
  // @ApiProperty({
  //   description: 'Unique identifier of the resource',
  //   example: '61d9cfbf17ealksjdkasjdd7311c4b3e485',
  //   required: true,
  // })
  // @IsString()
  // data: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsMongoId()
  id: string;
}


export class UserIDParamsDTO {
  // @ApiProperty({
  //   description: 'Unique identifier of the resource',
  //   example: '61d9cfbf17ed7311c4b3e485',
  //   required: true,
  // })
  // @IsMongoId()
  // @IsString()
  // id: string;

  @ApiProperty({
    description: 'Unique identifier of the resource',
    example: '61d9cfbf17ed7311c4b3e485',
    required: true,
  })
  @IsMongoId()
  @IsString()
  userId: string;
}

export class IdParamDto{
    @ApiProperty({
    description: 'Unique identifier of the resource',
    example: '61d9cfbf17ed7311c4b3e485',
    required: true,
  })
  @IsMongoId()
  @IsString()
  id: string;
}