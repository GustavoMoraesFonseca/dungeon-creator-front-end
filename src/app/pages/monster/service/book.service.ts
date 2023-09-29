import { BookModel } from './../model/BookModel';
import { Injectable, Injector } from '@angular/core';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { BaseService } from 'src/app/shared/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends BaseService<BookModel> {
  constructor(protected override injector: Injector) {
    super(UrlConstants.BOOK_URL, injector);
  }
}
