import { PresetSorter } from './presetSorter.interface';
import { PresetFilter } from './presetFilter.interface';

export interface Preset {
  filters?: PresetFilter[];
  sorters?: PresetSorter[];
  pagination?: {
    pageNumber: number;
  };
}
