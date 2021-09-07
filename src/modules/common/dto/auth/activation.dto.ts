import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ActivationDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  readonly activationCode: string;
}
