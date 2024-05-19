import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RackWithStock } from '../../../models/rack.model'; // Update import to RackWithStock
import { selectSelectedRack } from '../../../store/rack/rack.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/core.state';

@Component({
  selector: 'app-rack-view',
  templateUrl: './rack-view.component.html',
  styleUrls: ['./rack-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RackViewComponent implements OnInit, OnDestroy {

  customerForm!: FormGroup
  rack: RackWithStock | null = null;

  rack$: Observable<RackWithStock | null> = this.store.select(selectSelectedRack);
  loading: Boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rack$.pipe(takeUntil(this.destroy$)).subscribe((rack) => {
      if (rack) {
        this.loading = false;
        this.rack = rack;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
