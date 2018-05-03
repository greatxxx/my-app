import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
    private _default: string;
    private searchTerms = new Subject<string>();

    heroes$: Observable<Hero[]>;

    @Input()
    set setDefault(def: string) {
        this._default = def;
    }
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onVoted = new EventEmitter<boolean>();
    voted = false;

    vote(agreed: boolean) {
        this.onVoted.emit(agreed);
        this.voted = agreed;
    }

    constructor(private heroService: HeroService) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.vote(term ? true : false);
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        // this.default = 'search some thing';
        this.heroes$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.heroService.searchHeroes(term)),
        );
    }
}
