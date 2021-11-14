import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {


  public token: string;
  public selectedTab: string;
  public  keyword:string;
  constructor() { }
}
