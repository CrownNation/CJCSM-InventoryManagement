import { HttpErrorResponse } from "@angular/common/http";
import { PipeProperties } from "src/app/models/pipe.model";

export interface PipePropertiesState {
    loadingProperties: boolean;
    pipeProperties: PipeProperties | null;
    errorLoadingProperties: HttpErrorResponse | null;
}
