import type { RequirementResponse } from 'ts4ocds/extensions/requirements';

import type { AvailableVariant } from './available-variant';

export interface SelectedVariant extends Omit<AvailableVariant, 'criteria'> {
  requirementResponses?: [RequirementResponse];
}
