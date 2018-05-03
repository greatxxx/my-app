import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MissionService {
    private missionAnnouncedSource = new Subject<string>();
    private missionConfirmedSource = new Subject<string>();

    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();

    announcMission(mission: string) {
        this.missionAnnouncedSource.next(mission);
    }

    confirmMission(mission: string) {
        this.missionConfirmedSource.next(mission);
    }

    constructor() { }

}
