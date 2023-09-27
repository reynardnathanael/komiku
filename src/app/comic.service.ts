import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComicModel } from './comic.model';

var local = "http://localhost/uas_api/";
var host = "https://ubaya.fun/hybrid/160720034/uas_api/";

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  comicList():Observable<any> {
    return this.http.get(host + "showcomics.php")
  }

  comicContents(comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "readcomic.php", body);
  }

  comicComments(comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "showcomments.php", body);
  }

  comicReplies(comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "showreplies.php", body);
  }

  comicAddComment(user_id:string, comic_id:number, isi:string, parent_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    body = body.set('comic_id', comic_id);
    body = body.set('isi', isi);
    body = body.set('parent_id', parent_id);
    return this.http.post(host + "addcomment.php", body);
  }

  comicCheckRating(user_id:string, comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "ratingcondition.php", body);
  }

  comicAddRating(user_id:string, comic_id:number, rating:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    body = body.set('comic_id', comic_id);
    body = body.set('rating', rating);
    return this.http.post(host + "addrating.php", body);
  }

  comicShowFavorites(user_id:string):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    return this.http.post(host + "showfavorite.php", body);
  }

  comicCheckFavorite(user_id:string, comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "checkfavorites.php", body);
  }

  comicAddFavorite(user_id:string, comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "addfavorites.php", body);
  }

  comicRemoveFavorite(user_id:string, comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "deletefavorite.php", body);
  }

  comicSearch(keyword:string):Observable<any> {
    let body = new HttpParams();
    body = body.set('keyword', keyword);
    return this.http.post(host + "showcomics.php", body);
  }

  comicCategory():Observable<any> {
    return this.http.get(host + "showcategories.php")
  }

  comicSearchByCategory(category_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('category_id', category_id);
    return this.http.post(host + "showcomics.php", body);
  }

  comicLimitRating():Observable<any> {
    let body = new HttpParams();
    body = body.set('order_rating', 6);
    return this.http.post(host + "showcomics.php", body);
  }

  comicLimitComment():Observable<any> {
    let body = new HttpParams();
    body = body.set('order_comment', 5);
    return this.http.post(host + "showcomics.php", body);
  }

  comicLimitView():Observable<any> {
    let body = new HttpParams();
    body = body.set('order_view', 5);
    return this.http.post(host + "showcomics.php", body);
  }

  comicUpdateView(comic_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set('comic_id', comic_id);
    return this.http.post(host + "addview.php", body);
  }

  constructor(private http: HttpClient) { }
}
