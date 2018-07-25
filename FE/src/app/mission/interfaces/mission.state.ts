import { Tag } from '../../shared/interfaces/core.interfaces';

export interface IMissionState {
  missions: Array<Mission>

}

export interface Mission {
  name: string;
  description: string;
  tagList: Array<Tag>;
  status: string;
}

