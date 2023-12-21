import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import{Movie} from '../movie-card/movie-card.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  currentpage=1;
  constructor(private movieService: MovieService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length) {
        const path = urlSegments[0].path;
        console.log(path);
        switch (path) {
          case 'now-playing':
            //disable the next and previous buttons
            this.movieService.getNowPlayingMovies().subscribe((data: any) => {
              this.movies = data.results;
            });
            break;
          case 'popular':
            this.movieService.getPopularMovies().subscribe((data: any) => {
              this.movies = data.results;
            });
            break;
          case 'top-rated':
            this.movieService.getTopRatedMovies().subscribe((data: any) => {
              this.movies = data.results;
            });
            break;
          case 'upcoming':
            this.movieService.getUpcomingMovies().subscribe((data: any) => {
              this.movies = data.results;
            });
            break;
          case 'favorites':
            ///////////////////////
            break;
          case 'genre':
            this.route.params.subscribe(params=>{
              this.movieService.getMoviesByGenre(1,params['id']).subscribe((data: any) => {
                this.movies = data.results;
              });
            })

            break;
          default:

            //for searching
            break;
        }
      }else{
        //normal movies
        this.movieService.getMovies().subscribe((data: any) => {
          this.movies = data.results;
        });
      }
    });


  }
  navigateToMovieDetails(movieId:any){
    this.router.navigate(['movie',movieId]);
  }
}
