import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Wall, PipeProperty_WallCreate, PipeProperty_WallSearchParams } from "src/app/models/pipe.model";

export const wallsKey = '[Pipe Properties Wall]';

// Get actions
export const actionGetWalls = createAction(
    `${wallsKey} Get Walls`,
    props<{ searchParams: PipeProperty_WallSearchParams | null }>()
);
export const actionGetWallsSuccess = createAction(
    `${wallsKey} Get Walls Success`,
    props<{ walls: PipeProperty_Wall[] }>()
);
export const actionGetWallsError = createAction(
    `${wallsKey} Get Walls Failure`,
    props<{ errorLoadingWalls: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Wall = createAction(
    `${wallsKey} Create PipeProperty_Wall`,
    props<{ wallCreate: PipeProperty_WallCreate }>()
);
export const actionCreatePipeProperty_WallSuccess = createAction(
    `${wallsKey} Create PipeProperty_Wall Success`,
    props<{ wall: PipeProperty_Wall }>()
);
export const actionCreatePipeProperty_WallError = createAction(
    `${wallsKey} Create PipeProperty_Wall Error`,
    props<{ errorCreatingWall: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Wall = createAction(
    `${wallsKey} Update PipeProperty_Wall`,
    props<{ id: string; wall: PipeProperty_Wall }>()
);
export const actionUpdatePipeProperty_WallSuccess = createAction(
    `${wallsKey} Update PipeProperty_Wall Success`,
    props<{ id: string; wall: PipeProperty_Wall }>()
);
export const actionUpdatePipeProperty_WallError = createAction(
    `${wallsKey} Update PipeProperty_Wall Error`,
    props<{ error: HttpErrorResponse }>()
);

// Reset notifications
export const resetWallNotifications = createAction(`${wallsKey} Reset Wall Notifications`);
