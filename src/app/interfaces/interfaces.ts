export interface TopHeadlinesResponse {
    status: string;
    totalResults: number;
    articles: Article[];
    error?: string;
  }
  
 export interface Article {
    source: Source;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
  }
  
 export interface Source {
    id?: string;
    name: string;
  }