import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/service/base.service';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { MonsterModel } from '../model/MonsterModel';

@Injectable({
  providedIn: 'root'
})
export class MonsterService extends BaseService<MonsterModel> {
  constructor(protected override injector: Injector) {
    super(UrlConstants.MONSTER_URL, injector);
  }
}
