import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export type Kind='topics'|'labs'|'resources';
export interface Entry { _id:string; [key:string]:string }
@Injectable({providedIn:'root'})
export class RecordsService {
 constructor(private http:HttpClient){}
 all(k:Kind):Observable<Entry[]>{return this.http.get<Entry[]>('/api/'+k);}
 create(k:Kind,body:Record<string,string>):Observable<Entry>{return this.http.post<Entry>('/api/'+k,body);}
 update(k:Kind,id:string,body:Record<string,string>):Observable<Entry>{return this.http.put<Entry>('/api/'+k+'/'+id,body);}
 delete(k:Kind,id:string):Observable<unknown>{return this.http.delete('/api/'+k+'/'+id);}
}
