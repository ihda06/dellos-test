import { ServerResponse } from "./server";

export interface Multimedia {
  rank: number;
  subtype: string;
  caption: string;
  credit: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    xlarge: string;
    xlargewidth: number;
    xlargeheight: number;
  };
  crop_name: string;
}

export interface Person {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Byline {
  original: string;
  person: Person[];
  organization?: string;
}

export interface Article {
  abstract: string;
  web_url: string;
  snippet: string;
  print_page: number;
  print_section: string;
  source: string;
  multimedia: Multimedia[];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface MostApiResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: {
    published_date: string;
    uri: string;
    title: string;
    abstract: string;
    url: string;
    byline: string;
    media: {
      "media-metadata": {
        url: string;
      }[];
    }[];
  }[];
}

export interface MyArticle {
  title: string;
  image: string | null;
  date: string;
  id: string;
  abstract: string;
  price: string;
  author: string;
  url: string;
}

export interface ArticlesResponse extends ServerResponse<Article[]> {}
