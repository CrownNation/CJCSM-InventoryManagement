import { Component } from '@angular/core';
import { PipeProperty_Category } from 'src/app/models/pipe.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppState } from '../../store/core.state';
import { Store, select } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { selectAllCategories } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.selectors';

@Component({
  selector: 'app-pipe-property-category',
  templateUrl: './pipe-property-category.component.html',
  styleUrls: ['./pipe-property-category.component.scss']
})
export class PipePropertyCategoryComponent {

  dataSource: MatTableDataSource<PipeProperty_Category> = new MatTableDataSource<PipeProperty_Category>;

  displayedColumns: string[] = [
    'name',
    'isActive'
  ];

  
  private destroy$ = new Subject<void>();

  categories$: Observable<PipeProperty_Category[]> = this.store.select(selectAllCategories);
  loading$: Observable<Boolean> = this.store.select((selectLoadingTallies));

  constructor(
    private router: Router,
    private store: Store<AppState>)
  {  }



  viewCategory(pipeProperty_Category: PipeProperty_Category) {
    //this.store.dispatch(actionGetTallyById({tallyId: tally.tallyId}));
  }
}
