import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment) segment: IonSegment;

  categories: string[] = [
    'general', 'health', 'science', 'sports', 'technology'
  ]

  news: Article[] = [];

  constructor( private newsService: NewsService) {

  }

  ngOnInit() {
    this.segment.value = 'general';
    this.getCategorizedNews(this.segment.value);
  }

  getCategorizedNews(category: string, event?) {
    console.log('event', event);
    console.log('category', category);

    this.newsService.getCategorizedNews(category).subscribe(res => {

      if (res.articles.length ===0) {
        event.target.disable= true;
        event.target.complete();
        return;
      }
      
      console.log(res);
      // this.news = res.articles;
      this.news.push(...res.articles);

      if(event) {
        event.target.complete();
      }
      
    });
  }

}
