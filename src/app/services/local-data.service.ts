import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  news: Article[] = [];

  constructor( private storage: Storage) { }

  saveFavorite( newFavorite: Article) {

    const exist = this.news.find( article => article.title === newFavorite.title );

    if( !exist ) {
      this.news.unshift(newFavorite);
      this.storage.set('favorites', this.news);
    }
  }

  async loadFavorites() {
    const favoritesLoaded  = await this.storage.get('favorites');
    if (favoritesLoaded) {
      this.news = favoritesLoaded;
      return this.news;
    }
  }

  deleteFavorite(favoriteToDelete: Article) {
    this.news = this.news.filter( article => article.title !== favoriteToDelete.title);
    this.storage.set('favorites', this.news);
  }


}
