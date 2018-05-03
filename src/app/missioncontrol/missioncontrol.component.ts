import { Component, OnInit } from '@angular/core';
import { MissionService } from '../mission.service';

@Component({
    selector: 'app-missioncontrol',
    templateUrl: './missioncontrol.component.html',
    styleUrls: ['./missioncontrol.component.css']
})
export class MissioncontrolComponent implements OnInit {


    astronauts = ['Lovell', 'Swigert', 'Haise'];
    history: string[] = [];
    missions = ['Fly to the moon!',
        'Fly to mars!',
        'Fly to Vegas!'];
    nextMission = 0;

    constructor(private missionService: MissionService) {
        missionService.missionConfirmed$.subscribe(
            astronaut => {
                this.history.push(`${astronaut} confirmed the mission`);
            });
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    announce() {
        const mission = this.missions[this.nextMission++];
        this.missionService.announcMission(mission);
        this.history.push(`Mission "${mission}" announced`);
        if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
    }

}
