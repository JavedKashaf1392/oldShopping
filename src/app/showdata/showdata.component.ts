import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent implements OnInit {

  show : any=[];

  public url='https://jsonplaceholder.typicode.com/todos';
  constructor(private http:HttpClient) { }


  getAllData(){
    this.http.get(this.url).subscribe(
      data=>{
        this.show=data;
        console.log(data);
      }
    )
  }


  ngOnInit(): void {
    this.getAllData();
  }

}
