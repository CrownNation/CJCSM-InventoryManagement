import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Category } from "src/app/models/pipe.model";


export interface PipeProperty_CategoryState extends EntityState<PipeProperty_Category> {
    loadingCategories: boolean;
    errorLoadingCategories: HttpErrorResponse | null;

    creatingCategory: boolean,
    createdCategory: PipeProperty_Category | null,
    errorCreatingCategory: HttpErrorResponse | null,

    updatingCategory: boolean; // Tracks whether an update operation is in progress
    updatedCategory: PipeProperty_Category | null; // Holds the last updated category
    errorUpdatingCategory: HttpErrorResponse | null; // Holds any error that occurred during updating

    selectedCategory: PipeProperty_Category | null,
    errorLoadingSelectedCategory: HttpErrorResponse | null
}


