import { BaseOutputDto } from './base-output.dto';

export class BaseUpvoteDto extends BaseOutputDto {
  readonly upVoteCount?: number;

  readonly downVoteCount?: number;
}
