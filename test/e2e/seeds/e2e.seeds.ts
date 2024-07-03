import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

@Injectable()
export class Seeds {
  async run(queryRunner: QueryRunner) {

  }
}
