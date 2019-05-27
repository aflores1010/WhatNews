import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { TopHeadlinesResponse } from '../interfaces/interfaces';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;
  headlinePage = 0;
  categorizedPage = 0;
  currentCategory: string;


  headers = new HttpHeaders({
    'X-Api-key': this.apiKey
  })

  constructor(private httpClient: HttpClient) { }

  private executeQuery<T>(query: string) {
    query = this.apiUrl + query;
    return this.httpClient.get<T>( query , {headers: this.headers} );
  }

  getTopHeadlines() {
    this.headlinePage++;
    console.log('headlinePage: ', this.headlinePage);
    return this.executeQuery<TopHeadlinesResponse>('/top-headlines?country=us&page='+this.headlinePage)
   // return this.httpClient.get<TopHeadlinesResponse>('https://newsapi.org/v2/top-headlines?country=us&apiKey=2f5766a8dc594dc0a3757118df44655c');
  }

  getCategorizedNews(category: string) {
    console.log('currentCategory: ', this.currentCategory);
    console.log('Category: ', category)
    if (this.currentCategory !== category) {
      console.log('Inside service changed category')
      this.currentCategory = category;
      this.categorizedPage = 0;
    }
    this.categorizedPage++;
    console.log('Inside service categorizedPage', this.categorizedPage )
   return this.executeQuery<TopHeadlinesResponse>('/top-headlines?country=co&category=' + category + '&page=' + this.categorizedPage)
   // return this.httpClient.get<TopHeadlinesResponse>('https://newsapi.org/v2/top-headlines?country=co&apiKey=2f5766a8dc594dc0a3757118df44655c&category=' + category);
  }
}
