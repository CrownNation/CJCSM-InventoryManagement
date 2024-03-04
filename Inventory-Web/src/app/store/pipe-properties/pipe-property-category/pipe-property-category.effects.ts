import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import { 
    actionGetCategories,
    actionGetCategoriesSuccess,
    actionGetCategoriesError,
    actionCreatePipeProperty_Cateogry,
    actionCreatePipeProperty_CategorySuccess,
    actionCreatePipeProperty_CategoryError,
    actionUpdatePipeProperty_Category,
    actionUpdatePipeProperty_CategorySuccess,
    actionUpdatePipeProperty_CategoryError
  } from './pipe-property-category.actions';

@Injectable()
export class PipeProperty_CategoryEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  // Creates a new observable effect
  loadCategories$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actionGetCategories),
    switchMap(() =>
      this.pipePropertiesService.getCategory(null).pipe(
        map(categories => actionGetCategoriesSuccess({ categories })),
        catchError(errorLoadingCategories => of(actionGetCategoriesError({ errorLoadingCategories })))
      )
    )
  )
);

createCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actionCreatePipeProperty_Cateogry),
    switchMap(data =>
      this.pipePropertiesService.createCategory(data.categoryCreate).pipe(
        map(category => actionCreatePipeProperty_CategorySuccess({ category })),
        catchError(errorCreatingCategory => of(actionCreatePipeProperty_CategoryError({ errorCreatingCategory })))
      )
    )
  )
);


  // Effect to handle category updates
updateCategory$ = createEffect(() =>
this.actions$.pipe(
  ofType(actionUpdatePipeProperty_Category),
  switchMap(({ id: categoryId, category: categoryUpdate }) =>
    this.pipePropertiesService.updateCategory(categoryId, categoryUpdate).pipe(
      map(() => actionUpdatePipeProperty_CategorySuccess({ id: categoryId, category: categoryUpdate})),
      catchError(errorUpdatingCategory => of(actionUpdatePipeProperty_CategoryError({ error: errorUpdatingCategory })))
    )
  )
)
);

}