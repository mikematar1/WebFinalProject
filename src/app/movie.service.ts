import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '75a8241446b62f19c1b9914a7740e785'; // Replace with your TMDb API key

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
