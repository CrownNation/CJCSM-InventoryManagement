import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pipe } from '../../models/pipe.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectSelectedPipe } from '../../store/pipe/pipe.selectors';
import { AppState } from '../../store/core.state';

@Component({
  selector: 'app-pipe-view',
  templateUrl: './pipe-view.component.html',
  styleUrls: ['./pipe-view.component.scss']
})
export class PipeViewComponent implements OnInit, OnDestroy {

  pipeForm!: FormGroup
  pipe: Pipe | null = null;

  pipe$: Observable<Pipe | null> = this.store.select(selectSelectedPipe);
  loading: Boolean = false;


  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {  }

  ngOnInit(): void {

    this.pipe$.pipe(takeUntil(this.destroy$)).subscribe((pipe) => {
      if (pipe) {
        console.log(pipe);
        this.loading = false;
        this.pipe = pipe;
      }
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
