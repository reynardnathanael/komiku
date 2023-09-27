import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { ComicModel } from '../comic.model';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
})
export class ComicComponent implements OnInit {

  json:string = '...Menunggu dari Observable'; 

  listComic() {
    this.cs.comicList().subscribe(
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

  constructor(public cs: ComicService) { }

  ngOnInit() {
    this.listComic();
  }

}
