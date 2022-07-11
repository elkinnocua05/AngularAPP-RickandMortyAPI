import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, identity, take } from 'rxjs';
import {tap} from 'rxjs/operators';
import { Character, DataResponse, Episode } from '../interfaces/data.interface';

const QUERY = gql`
 {
  episodes {
    results {
      name
      episode
    }
  }
   characters {
    results {
      id
      name
      status
      species
      gender
      image
    }
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
private episodesSubject = new BehaviorSubject<Episode[]>([]);
episodes$ = this.episodesSubject.asObservable();

private charactersSubject = new BehaviorSubject<Character[]>([]);
characters$ = this.charactersSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.getDataAPI();
  } 

    private getDataAPI():void{

      this.apollo.watchQuery<DataResponse>({
        query: QUERY
      }).valueChanges.pipe(
        take(1),
        tap( ({data}) => {
          const {characters, episodes} = data;
          this.charactersSubject.next(characters.results);
          this.episodesSubject.next(episodes.results);
        })
      ).subscribe();

    }

    getCharactersByPage(pageNum: number): void {
      const QUERY_BY_PAGE = gql`{
        characters(page: ${pageNum}) {
          results {
            id
            name
            status
            species
            gender
            image
          }
        }
      }`;
    }
}
