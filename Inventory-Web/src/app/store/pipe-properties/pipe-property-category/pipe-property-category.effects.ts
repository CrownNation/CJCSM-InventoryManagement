import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";
import { 
    actionGetCategories,
    actionGetCategoriesSuccess,
    actionGetCategoriesError,
    actionCreatePipeProperty_Cateogry,
    actionCreatePipeProperty_CategorySuccess,
    actionCreatePipeProperty_CategoryError
  } from './pipe-property-category.actions';

@Injectable()
export class PipeProperty_CategoryEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  // Creates a new observable effect
  // Action Filtering: this.actions$.pipe(ofType(actionGetTallies), ... takes the stream of all actions and filters it, letting through only those actions that are of the type actionGetTallies. 
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetCategories),
      switchMap(() =>
        this.pipePropertiesService.getCategory(null).pipe( // Assuming no searchParams for simplicity
          map(categories => actionGetCategoriesSuccess({ categories })),
          catchError(error => of(actionGetCategoriesError({ error })))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreateCategory),
      switchMap(action =>
        this.pipePropertiesService.addCategory(action.category).pipe(
          map(category => actionCreateCategorySuccess({ category })),
          catchError(error => of(actionCreateCategoryError({ error })))
        )
      )
    )
  );
}