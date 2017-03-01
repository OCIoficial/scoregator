import { Injectable }  from '@angular/core';
import { Http } from '@angular/http';

import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Scoreboard }  from '../scoreboard';

const SCOREBOARD1 : Scoreboard = {
    problems: [
        {title: 'P1', id: 'id1', judge: 'uva', url: 'www.problem.com'},
        {title: 'P2', id: 'id2', judge: 'uva', url: 'www.problem.com'},
        {title: 'P3', id: 'id3', judge: 'uva', url: 'www.problem.com'},
    ],
    usersScore: {
        'user1': {'id1': 1,
            'id2': 0
        },
        'user2': {
            'id1': 0,
            'id2': 10
        }
    },
}

const SCOREBOARD2 : Scoreboard = {
    problems: [
        {title: 'P1', id: 'id1', judge: 'uva', url: 'www.problem.com'},
        {title: 'P2', id: 'id2', judge: 'uva', url: 'www.problem.com'},
        {title: 'P3', id: 'id3', judge: 'uva', url: 'www.problem.com'},
    ],
    usersScore: {
        'user1': {
            'id1': 1,
            'id3': 0
        },
        'user2': {
            'id1': 0,
            'id3': 10
        }
    },
}

@Injectable()
export class AggregatorService {
  constructor(private http : Http) {}
  getScoreboard(): Observable<Scoreboard> {
      // return Observable.of(SCOREBOARD1);
      // return Observable.timer(0, 10000).map(
      //     (idx, val) => idx % 2 ? SCOREBOARD1 : SCOREBOARD2
      // )
      return Observable.timer(0, 30000).flatMap(
          (idx, val) => this.http.get('http://localhost:3000/aggregate?a2oj=29710')
              .map(s => s.json() as Scoreboard)
      ).do(console.log)
  }
}
