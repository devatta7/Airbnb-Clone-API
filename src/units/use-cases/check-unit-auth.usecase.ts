import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class CheckUnitAuthUseCase {
  execute(unitUserId: string, currentUserId: string): void {
    if (unitUserId !== currentUserId) {
      throw new ForbiddenException(
        'You are not allowed to perform this action. Only the owner of this unit can update it.',
      );
    }
  }
}
