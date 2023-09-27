import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  listCategories() {
    this.cs.comicCategory().subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  listComic() {
    this.cs.comicList().subscribe(
      (data) => {
        this.comics = data;
      }
    );
  }

  listComicByCategory() {
    this.cs.comicSearchByCategory(this.category_id).subscribe(
      (data) => {
        this.comics = data;
      }
    );
  }

  updateView(comic_id:number) {
    this.cs.comicUpdateView(comic_id).subscribe();
    window.location.assign('/readcomic/' + comic_id);
  }

  comics:any = [];
  categories:any = [];
  category_id:number = 0;

  constructor(public cs: ComicService) { }

  ngOnInit() {
    this.listCategories();
    this.listComic();
  }

}
