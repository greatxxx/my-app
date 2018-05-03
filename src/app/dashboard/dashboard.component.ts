import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';
import { EventEmitter } from 'events';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    agreed = 0;
    disagreed = 0;
    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(
            heroes => this.heroes = heroes.slice(1, 5)
        );
    }


    onVoted(agreed: boolean) {
        console.log(agreed ? this.agreed++ : this.disagreed++);
        // alert(`dashboard ---> agreed:${this.agreed}, disagreed:${this.disagreed}`);
    }

}
