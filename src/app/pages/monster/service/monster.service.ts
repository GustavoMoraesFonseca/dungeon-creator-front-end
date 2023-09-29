import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/service/base.service';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { MonsterModel } from '../model/MonsterModel';
import { Observable, catchError } from 'rxjs';
import { ResponseModel } from 'src/app/shared/model/ResponseModel';
import { MonsterFilterResponseModel } from '../model/MonsterFilterResponseModel';
import { MonsterFilterRequestModel } from '../model/MonsterFilterParamsModel';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonsterService extends BaseService<MonsterModel> {
  constructor(protected override injector: Injector) {
    super(UrlConstants.MONSTER_URL, injector);
  }

  getMonstersByParams(params: MonsterFilterRequestModel): Observable<ResponseModel<MonsterFilterResponseModel[]>> {
    const p = this.getHttpParams(params);
    console.log(p)
    return this.http.get<ResponseModel<MonsterFilterResponseModel[]>>
    (
      `${this.baseURL}/filter`,
      {headers: this.headers, params: p}
    ).pipe(
      catchError(this.handleError)
    );
  }

  private getHttpParams(params: MonsterFilterRequestModel): HttpParams {
    return new HttpParams()
      .set('biomeId', params.biomeId)
      .set('bookId', params.bookId)
      .set('level', params.level)
      .set('monsterTypeId', params.monsterTypeId)
      .set('playersLevel', params.playersLevel)
      .set('region', params.region)
      .set('isRandomMonster', params.isRandomMonster);
  }
}
