import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  isFavorite: boolean = false;

  movieId:any;
  movieDetails: any;
  movieCast:any;
  constructor(private route: ActivatedRoute,private movieService: MovieService,private router:Router) { }

  ngOnInit(): void {
    this.checkFavorite();

    this.route.params.subscribe(params=>{
      this.movieId=params['id'];
    })
    this.movieService.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.movieDetails = data;
    });
    this.movieService.getMovieCast(this.movieId).subscribe((data:any)=>{
      this.movieCast=data.cast;
    });

  }
 toggleFavorite(movie: any): void {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex((m: any) => m.id === movie.id);

    if (index === -1) {
      // If the movie is not in favorites, add it
      favorites.push(movie);
    } else {
      // If the movie is already in favorites, remove it
      favorites.splice(index, 1);
    }

    // Save the updated favorites back to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home route
  }
  checkFavorite(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.isFavorite = favorites.some((m: any) => m.id === this.movieDetails.id);
  }

}
