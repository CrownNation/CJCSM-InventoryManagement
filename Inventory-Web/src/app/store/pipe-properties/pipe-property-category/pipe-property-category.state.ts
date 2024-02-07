import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Category } from "src/app/models/pipe.model";



export interface PipeProperty_CategoryState extends EntityState<PipeProperty_Category> {
    loadingCategories: boolean;
    errorLoadingCategories: HttpErrorResponse | null;

    creatingCategory: boolean,
    createdCategory: PipeProperty_Category | null,
    errorCreatingCategory: HttpErrorResponse | null,

    selectedCategory: PipeProperty_Category | null,
    errorLoadingSelectedCategory: HttpErrorResponse | null
}


