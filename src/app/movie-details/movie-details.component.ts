import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId:any;
  movieDetails: any;
  movieCast:any;
  constructor(private route: ActivatedRoute,private movieService: MovieService) { }

  ngOnInit(): void {
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

}
