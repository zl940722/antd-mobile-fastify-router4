import { observable, action} from 'mobx'
import { MainApi } from 'api/index'

const api = new MainApi();

export class MainStore {

    constructor() {
       console.log(api);
       this.changeValue('this is main')
    }

  @observable public value: string = '';

  @action public changeValue(v) {
    this.value = v;
  }
}

export const mainStore = new MainStore();