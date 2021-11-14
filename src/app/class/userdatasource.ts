import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { User } from './user';
import { UserService } from '../service/user.service';
import { UserListResponse } from './UserListResponse';
import { GenericService } from '../service/generic.service';
 
export class Userdatasource implements DataSource<User>{
 
    keyword:string;
    private todoSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();
 
    constructor(private todoService: UserService) { }
 

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.todoSubject.asObservable();
    }
 
    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
 
    loadTodos(keyword:string,pageNumber = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        console.log("data class is herer"+keyword);
        if(keyword != null){
         this.todoService.AllUsers(keyword,{page: pageNumber, size: pageSize})
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: UserListResponse) => {
                this.todoSubject.next(result.list);
                this.countSubject.next(result.totalItems);  
            }
            );
        }else{
            this.todoService.AllUsers1({page: pageNumber, size: pageSize})
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: UserListResponse) => {
                this.todoSubject.next(result.list);
                this.countSubject.next(result.totalItems);
            }
            );

        }
       
    }
}