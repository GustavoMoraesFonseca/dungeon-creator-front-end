import { Injectable, Injector } from '@angular/core';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { BaseService } from 'src/app/shared/service/base.service';
import { BiomeModel } from '../model/BiomeModel';

@Injectable({
  providedIn: 'root'
})
export class BiomeService extends BaseService<BiomeModel> {
  constructor(protected override injector: Injector) {
    super(UrlConstants.BIOME_URL, injector);
  }
}
