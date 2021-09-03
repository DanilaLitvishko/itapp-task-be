import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileInfoDto {
  @ApiProperty()
  @IsString()
  @Expose()
  readonly fileName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  readonly contentType: string;
}
