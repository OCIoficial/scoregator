export type UsersScore = {[user:string]: {[problemId:string]: number}}

export const empty : Scoreboard = {
    problems: [],
    usersScore: {}
}

export interface Problem {
    title: string;
    id: string;
    judge: string;
    url: string;
}

export interface Scoreboard {
    problems: Problem[];
    usersScore: UsersScore;
}

function unique<T, A>(arr: T[], key?: (v: T) => A): T[] {
    var keyaux = key  || ((x: T) => x)
    return arr.sort((a: T, b: T) => {
        const ka = keyaux(a);
        const kb = keyaux(b);
        if (ka == kb) return 0;
        else if (ka < kb) return -1;
        else return 1;
    })
    .reduce((acc, val) => {
        if (acc.length == 0 || keyaux(acc[acc.length - 1]) != keyaux(val))
            acc.push(val)
        return acc
    }, []);
}

export function merge(sb1: Scoreboard, sb2: Scoreboard): Scoreboard {
    const problems = unique(sb1.problems.concat(sb2.problems), p => p.id);
    const users = unique(Object.keys(sb1.usersScore).concat(Object.keys(sb2.usersScore)));
    const usersScore: UsersScore = {}
    for (let user of users) {
        usersScore[user] = {};
        for (let problem of problems) {
            var score = 0;
            if (sb1.usersScore[user] && sb1.usersScore[user][problem.id])
                score = Math.max(score, sb1.usersScore[user][problem.id]);
            if (sb2.usersScore[user] && sb2.usersScore[user][problem.id])
                score = Math.max(score, sb2.usersScore[user][problem.id]);
            usersScore[user][problem.id] = score;
        }
    }
    return {problems: problems, usersScore: usersScore};
}
