import { Injectable, Injector } from '@angular/core';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { BaseService } from 'src/app/shared/service/base.service';
import { MonsterTypeModel } from '../model/MonsterTypeModel';

@Injectable({
  providedIn: 'root'
})
export class MonsterTypeService extends BaseService<MonsterTypeModel> {
  constructor(protected override injector: Injector) {
    super(UrlConstants.MONSTER_TYPE_URL, injector);
  }
}
