import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PipeProperties, PipeProperty_Category, PipeProperty_CategoryCreate, PipeProperty_CategorySearchParams, PipeProperty_Coating, PipeProperty_CoatingCreate, PipeProperty_CoatingSearchParams, PipeProperty_Condition, PipeProperty_ConditionCreate, PipeProperty_ConditionSearchParams, PipeProperty_Grade, PipeProperty_GradeCreate, PipeProperty_GradeSearchParams, PipeProperty_Range, PipeProperty_RangeCreate, PipeProperty_RangeSearchParams, PipeProperty_Size, PipeProperty_SizeCreate, PipeProperty_SizeSearchParams, PipeProperty_SizeUpdate, PipeProperty_Thread, PipeProperty_ThreadCreate, PipeProperty_ThreadSearchParams, PipeProperty_ThreadUpdate, PipeProperty_Wall, PipeProperty_WallCreate, PipeProperty_WallSearchParams, PipeProperty_WallUpdate, PipeProperty_Weight, PipeProperty_WeightCreate, PipeProperty_WeightSearchParams, PipeProperty_WeightUpdate } from 'src/app/models/pipe.model';
@Injectable({
  providedIn: 'root'
})
export class PipePropertiesService {

  private baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }

  // -- Pipe Properties General
  getAllPipeProperties(): Observable<PipeProperties> {
    return this.http.get<PipeProperties>(`${this.baseUrl}PipeProperties`);
  }


  // --- Category ---
  getCategory(searchParams: PipeProperty_CategorySearchParams | null): Observable<PipeProperty_Category[]> {
    return this.http.get<PipeProperty_Category[]>(`${this.baseUrl}PipeProperty_Category`);
  }
  createCategory(category: PipeProperty_CategoryCreate): Observable<PipeProperty_Category> {
    return this.http.post<PipeProperty_Category>(`${this.baseUrl}PipeProperty_Category`, category);
  }
  updateCategory(id: string, category: PipeProperty_Category): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Category/${id}`, category);
  }

  // --- Coating ---
  getGetCoating(searchParams: PipeProperty_CoatingSearchParams | null): Observable<PipeProperty_Coating[]> {
    return this.http.get<PipeProperty_Coating[]>(`${this.baseUrl}PipeProperty_Coating`);
  }

  createCoating(coating: PipeProperty_CoatingCreate): Observable<PipeProperty_Coating> {
    return this.http.post<PipeProperty_Coating>(`${this.baseUrl}PipeProperty_Coating`, coating);
  }
  updateCoating(id: string, coating: PipeProperty_Coating): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Coating/${id}`, coating);
  }

  // --- Condition ---
  getConditions(searchParams: PipeProperty_ConditionSearchParams | null): Observable<PipeProperty_Condition[]> {
    return this.http.get<PipeProperty_Condition[]>(`${this.baseUrl}PipeProperty_Condition`);
  }
  createCondition(condition: PipeProperty_ConditionCreate): Observable<PipeProperty_Condition> {
    return this.http.post<PipeProperty_Condition>(`${this.baseUrl}PipeProperty_Condition`, condition);
  }
  updateCondition(id: string, condition: PipeProperty_Condition): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Condition/${id}`, condition);
  }

  // --- Grade ---
  getGrade(searchParams: PipeProperty_GradeSearchParams | null): Observable<PipeProperty_Grade[]> {
    return this.http.get<PipeProperty_Grade[]>(`${this.baseUrl}PipeProperty_Grade`);
  }
  createGrade(grade: PipeProperty_GradeCreate): Observable<PipeProperty_Grade> {
    return this.http.post<PipeProperty_Grade>(`${this.baseUrl}PipeProperty_Grade`, grade);
  }
  updateGrade(id: string, grade: PipeProperty_Grade): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Grade/${id}`, grade);
  }

  // --- Range ---
  getRange(searchParams: PipeProperty_RangeSearchParams | null): Observable<PipeProperty_Range[]> {
    return this.http.get<PipeProperty_Range[]>(`${this.baseUrl}PipeProperty_Range`);
  }
  createRange(range: PipeProperty_RangeCreate): Observable<PipeProperty_Range> {
    return this.http.post<PipeProperty_Range>(`${this.baseUrl}PipeProperty_Range`, range);
  }
  updateRange(id: string, range: PipeProperty_Range): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Range/${id}`, range);
  }

  // --- Size ---
  getSize(searchParams: PipeProperty_SizeSearchParams | null): Observable<PipeProperty_Size[]> {
    return this.http.get<PipeProperty_Size[]>(`${this.baseUrl}PipeProperty_Size`);
  }
  createSize(size: PipeProperty_SizeCreate): Observable<PipeProperty_Size> {
    return this.http.post<PipeProperty_Size>(`${this.baseUrl}PipeProperty_Size`, size);
  }
  updateSize(id: string, size: PipeProperty_SizeUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Size/${id}`, size);
  }

  // --- Thread ---
  getThread(searchParams: PipeProperty_ThreadSearchParams | null): Observable<PipeProperty_Thread[]> {
    return this.http.get<PipeProperty_Thread[]>(`${this.baseUrl}PipeProperty_Thread`);
  }
  createThread(thread: PipeProperty_ThreadCreate): Observable<PipeProperty_Thread> {
    return this.http.post<PipeProperty_Thread>(`${this.baseUrl}PipeProperty_Thread`, thread);
  }
  updateThread(id: string, thread: PipeProperty_ThreadUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Thread/${id}`, thread);
  }

  // --- Wall ---
  getWall(searchParams: PipeProperty_WallSearchParams | null): Observable<PipeProperty_Wall[]> {
    return this.http.get<PipeProperty_Wall[]>(`${this.baseUrl}PipeProperty_Wall`);
  }
  createWall(wall: PipeProperty_WallCreate): Observable<PipeProperty_Wall> {
    return this.http.post<PipeProperty_Wall>(`${this.baseUrl}PipeProperty_Wall`, wall);
  }
  updateWall(id: string, wall: PipeProperty_WallUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Wall/${id}`, wall);
  }

  // --- Weight ---
  getWeights(searchParams: PipeProperty_WeightSearchParams | null): Observable<PipeProperty_Weight[]> {
    return this.http.get<PipeProperty_Weight[]>(`${this.baseUrl}PipeProperty_Weight`);
  }
  createWeight(weight: PipeProperty_WeightCreate): Observable<PipeProperty_Weight> {
    return this.http.post<PipeProperty_Weight>(`${this.baseUrl}PipeProperty_Weight`, weight);
  }
  updateWeight(id: string, weight: PipeProperty_WeightUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Weight/${id}`, weight);
  }


  // --- Generic Getter ---
  getProperties<T>(propertyType: string, searchParams: any | null): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${propertyType}`, { params: searchParams });
  }

  // -- Generic Create and Update, but won't work for this reason:
  /*The effect for the create specifies the CategoryCreate, but the success, which requires the Category,
  * isn't getting that back from the generic method and so the error is saying that it needs the ID,
  * but it's not provided since the Create doesn't have an id. I can't specify two types in the <T> easily.
  * The only fix would be to somehow specify two different types when you create it, but that is clumsy.
  * So, the solution is to follow Angular standard practice and generate a different creaate and update method
  * for each property. But leaving these here since there may be a way to do this if given more thought. */
  createNumberProperty(propertyType: string, valueMetric: number, valueImperial: number): Observable<any> {
    const payload = { valueMetric, valueImperial }; // Construct the payload based on the method's inputs
    return this.http.post<any>(`${this.baseUrl}/${propertyType}`, payload);
  }
  createProperty<T>(propertyType: string, property: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${propertyType}`, property);
  }
  updateProperty<T>(propertyType: string, id: string, property: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${propertyType}/${id}`, property);
  }

}
