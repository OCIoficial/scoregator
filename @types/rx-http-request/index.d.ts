import { Observable } from 'rxjs'
import * as http from 'http';

type Response = {body: string, response: http.IncomingMessage}

declare namespace RxHttpRequest {
    export function get(url:string): Observable<Response>;
}
