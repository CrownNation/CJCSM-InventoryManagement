import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { Tally, TallyTypes } from '../../models/tally.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectSelectedTally } from '../../store/tally/tally.selectors';

@Component({
  selector: 'app-tally-view',
  templateUrl: './tally-view.component.html',
  styleUrls: ['./tally-view.component.scss']
})
export class TallyViewComponent  implements OnInit, OnDestroy{

  tallyForm!: FormGroup
  tally: Tally | null = null;

  tally$: Observable<Tally | null> = this.store.select(selectSelectedTally);
  loading: Boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {  }

  ngOnInit(): void {

    this.tally$.pipe(takeUntil(this.destroy$)).subscribe((tally) => {
      if (tally) {       
        
        console.log('tally', tally);

        this.loading = false;
        this.tally = tally;
      } 
    });    

    this.buildForm();
  }

  buildForm() {

    this.tallyForm = new FormGroup({
      tallyType: new FormControl('', []),      
      tallyNumber: new FormControl('', []),
      customer: new FormControl('', []),
      dateStart: new FormControl('', []),
      dateEnd: new FormControl('', [])           
    });
  }

  displayTallyType(tallyType: number) {
    if(tallyType === TallyTypes.TallyIn) {
      return 'In'
    }
    else if(tallyType === TallyTypes.TallyOut) {
      return 'Out'
    }
    
    return ''    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
