import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  listComic() {
    this.cs.comicList().subscribe(
      (data) => {
        this.comics = data;
      }
    );
  }

  searchComic() {
    this.cs.comicSearch(this.keyword).subscribe(
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
  keyword:string = "";

  constructor(public cs: ComicService) { }

  ngOnInit() {
    this.listComic();
  }

}
