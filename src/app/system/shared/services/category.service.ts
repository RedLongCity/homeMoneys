import {BaseApi} from '../../../shared/core/base.api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Category} from '../../../shared/models/category.model';
import {Observable} from 'rxjs';

@Injectable()
export class CategoryService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  categoriesDefUrl = 'categories';

  public addCategory(category: Category): Observable<Category> {
    return this.post(this.categoriesDefUrl, category);
  }

  public getCategories(): Observable<Category[]> {
    return this.get(this.categoriesDefUrl);
  }

  public putCategory(category: Category): Observable<Category> {
    return this.put(this.categoriesDefUrl, category);
  }
}
