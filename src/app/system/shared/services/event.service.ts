import {BaseApi} from '../../../shared/core/base.api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Event} from '../../../shared/models/event.model';

@Injectable()
export class EventService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  eventsDefUrl = 'events';

  public addEvent(event: Event): Observable<Event> {
    return this.post(this.eventsDefUrl, event);
  }

  public getEvents(): Observable<Event[]> {
    return this.get(this.eventsDefUrl);
  }

  public putEvent(event: Event): Observable<Event> {
    return this.put(`${this.eventsDefUrl}/${event.id}`, event);
  }
}
