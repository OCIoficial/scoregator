import { Component, OnInit } from '@angular/core';

import { Scoreboard, Problem } from '../scoreboard'

import { AggregatorService } from '../service/aggregator.service'

interface Row {
    user: string;
    scores: number[];
    total: number;
}

@Component({
  selector: 'scoreboard',
  styleUrls: ['css/scoreboard.component.css'],
  template: `
<table *ngIf="problems">
    <thead>
        <tr>
            <th class="rank">Rank</th>
            <th>User</th>
            <th *ngFor="let problem of problems; let i = index">
                <a [attr.href]="problem.url" target="_blank" tooltip="problem.title">P{{i + 1}}</a>
            </th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let row of table; let rank = index">
            <td class="rank">{{rank + 1}}</td>
            <td>{{row.user}}</td>
            <td *ngFor="let cell of row.scores" [ngClass]="{'correct': cell > 0, 'incorrect': cell == 0}">
                {{cell}}
            </td>
            <td>{{row.total}}</td>
        </tr>
    <tbody>
</table>
`
})
export class ScoreboardComponent implements OnInit{
    table: Row[];
    problems: Problem[];

    constructor(private aggregator : AggregatorService) {}

    ngOnInit(): void {
        let observable = this.aggregator.getScoreboard();
        observable.subscribe(
            scoreboard => {
                this.table = this.getTable(scoreboard);
                this.problems = scoreboard.problems;
            }
        )
    }

    getTable(scoreboard : Scoreboard) : Row[] {
        let table : Row[] = [];
        let users = scoreboard.usersScore;
        let problems = scoreboard.problems;
        for (let user in users) {
            let row = problems.map(problem => users[user][problem.id] || 0);
            let total = row.reduce((a,b) => a + b, 0);
            table.push({user: user, scores: row, total: total});
        }
        table.sort((row1, row2) => row2.total - row1.total);
        return table;
    }
}

