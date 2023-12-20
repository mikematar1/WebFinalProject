import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '75a8241446b62f19c1b9914a7740e785'; // Replace with your TMDb API key

  constructor(private http: HttpClient) { }

  getMovies(pageindex:number = 1): Observable<any> {
    const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageindex}&api_key=${this.apiKey}`;
    return this.http.get(url);

  }

  getGenres(): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }
  getMovieDetails(movieId: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&append_to_response=credits`;
    return this.http.get(url);
  }

  getMovieCast(movieId: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}&append_to_response=credits`;
    return this.http.get(url);
  }

}
