'use strict';
import * as express from 'express';
import { a2oj } from '../a2oj'
import { Observable } from 'rxjs';
import { Scoreboard, merge, empty } from '../scoreboard';

let router = express.Router();

function getIds(req: express.Request, source: string): string[] {
    var ids = req.query[source] || [];
    if (typeof(ids) === 'string')
        ids = [ids];
    return ids;
}

router.get('/', function (req, res) {
    const contestId = req.params['contestId'];
    const a2ojIds = getIds(req, 'a2oj');
    Observable.from(a2ojIds)
        .flatMap((id: string) => a2oj.getScoreboard(id))
        .do<Scoreboard>(console.log)
        .reduce((acc, value) => merge(acc, value), empty)
        .subscribe(
            scoreboard => res.send(scoreboard),
            err => {console.log('error'); res.send(empty)}
        )
})

export = router;
