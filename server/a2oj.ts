'use strict';
import { RxHttpRequest } from 'rx-http-request';
import { Observable } from 'rxjs';
import { Problem, Scoreboard, UsersScore } from './scoreboard';

export namespace a2oj {
    function getUser(row: any[]) {
        const re = /<a[^>]+>([^<]+)<\/a>/;
        return re.exec(row[1])[1];
    }

    function getScore(score: string[]) {
        const re = /(?:<[bi]>)?(\d+)\/(\d+)(?:<\/[bi]>)?/;
        const match = re.exec(score[0]);
        if (match)
            return Number(match[1]) > 0 ? 100 : 0;
        else
            return 0;
    }

    function getProblem(problem: any) : Problem {
        return {
            title: problem.Title,
            judge: problem.Judge,
            id: `${problem.Judge}-${problem.LinkID}`,
            url: problem.URL
        }
    }

    function getJson(url: string): Observable<any> {
        return RxHttpRequest.get(url)
            .map(data => data.response.statusCode === 200 ? JSON.parse(data.body) : {});
    }

    export function getScoreboard(contestId: string) : Observable<Scoreboard> {
        return Observable.zip(
            getJson(`https://a2oj.com/get?type=contestProblems&ID=${contestId}`),
            getJson(`https://a2oj.com/get?type=contestRows&ID=${contestId}`))
            .map(([a2ojProblems, scoreboard]) => {
                const problems : Problem[] = a2ojProblems.map((p:any) => getProblem(p));
                const rows : any[][] = scoreboard['ScoreboardRows'];
                const usersScore: UsersScore = {};
                for (const row of rows) {
                    const user = getUser(row);
                    usersScore[user] = {}
                    for (var i = 0; i < problems.length; ++i)
                        usersScore[user][problems[i].id] = getScore(row[5 + i]);
                }
                return {problems: problems, usersScore: usersScore} as Scoreboard
            })
    }
}
