import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {

  async listComic() {
    this.cs.comicShowFavorites(await this.storage.get('user_id')).subscribe(
      (data) => {
        this.favorites = data;
      }
    );
  }

  updateView(comic_id:number) {
    this.cs.comicUpdateView(comic_id).subscribe();
    window.location.assign('/readcomic/' + comic_id);
  }

  favorites:any = [];

  constructor(public cs:ComicService, private storage: Storage) { }

  ngOnInit() {
    this.listComic();
  }

}
