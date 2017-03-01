import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { ScoreboardComponent }  from '../components/scoreboard.component';
import { AggregatorService }    from '../service/aggregator.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  providers:    [ AggregatorService ],
  declarations: [ ScoreboardComponent ],
  bootstrap:    [ ScoreboardComponent ]
})
export class ScoreboardModule { }
