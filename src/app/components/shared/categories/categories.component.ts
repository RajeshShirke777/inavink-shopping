import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  
  @Input('categories') categories: Array<Category> = [];

  constructor() { }

  ngOnInit() {
  }

}
