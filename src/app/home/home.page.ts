import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listRating() {
    this.cs.comicLimitRating().subscribe(
      (data) => {
        this.ratings = data;
      }
    );
  }

  listView() {
    this.cs.comicLimitView().subscribe(
      (data) => {
        this.views = data;
      }
    );
  }

  listComment() {
    this.cs.comicLimitComment().subscribe(
      (data) => {
        this.comments = data;
      }
    );
  }

  updateView(comic_id:number) {
    this.cs.comicUpdateView(comic_id).subscribe();
    window.location.assign('/readcomic/' + comic_id);
  }

  ratings:any = [];
  views:any = [];
  comments:any = [];

  constructor(public cs: ComicService) { }

  option = {
    freeMode: true,
    slidesPerview: 3.5,
    slidesOffsetBefore: 5,
    centeredSlides: true,
    spaceBetween: 10,
  }

  carousel = {
    autoplay:true,
    slidesPerview: 5
  }

  ngOnInit() {
    this.listRating();
    this.listView();
    this.listComment();
  }
  // constructor() {}

}
