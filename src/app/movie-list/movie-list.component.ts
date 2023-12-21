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
  path:any='';
  constructor(private movieService: MovieService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length) {
        const path = urlSegments[0].path;
        this.path=path;
        console.log(this.path);
        this.loadmovies(this.path);
      }else{
        //normal movies
       this.loadmovies(this.path);
      }
    });


  }
  navigateToMovieDetails(movieId:any){
    this.router.navigate(['movie',movieId]);
  }
  nextPage(){
    this.currentpage++;
    this.loadmovies(this.path);
  }
  previousPage(){
    if(this.currentpage>1){
      this.currentpage--;
      this.loadmovies(this.path)
    }

  }
  loadmovies(path=''){
    if(path){
      switch (path) {
        case 'now-playing':
          //disable the next and previous buttons
          this.movieService.getNowPlayingMovies(this.currentpage).subscribe((data: any) => {
            this.movies = data.results;
          });
          break;
        case 'popular':
          this.movieService.getPopularMovies(this.currentpage).subscribe((data: any) => {
            this.movies = data.results;
          });
          break;
        case 'top-rated':
          this.movieService.getTopRatedMovies(this.currentpage).subscribe((data: any) => {
            this.movies = data.results;
          });
          break;
        case 'upcoming':
          this.movieService.getUpcomingMovies(this.currentpage).subscribe((data: any) => {
            this.movies = data.results;
          });
          break;
        case 'favorites':
          ///////////////////////
          const allValues: any[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const value = localStorage.getItem(localStorage.key(i) as any) as any;
            console.log(value.overview);
            allValues.push(value);
          }
          this.movies=allValues;

          break;
        case 'genre':
          this.route.params.subscribe(params=>{
            this.movieService.getMoviesByGenre(this.currentpage,params['id']).subscribe((data: any) => {
              this.movies = data.results;
            });
          })

          break;
        default:
          this.route.params.subscribe(params=>{
            this.movieService.getMoviesByName(params['name']).subscribe((data: any) => {
              this.movies = data.results;
            });
          })
          //for searching
          break;
      }
    }else{
      this.movieService.getMovies(this.currentpage).subscribe((data: any) => {
        this.movies = data.results;
      });
    }

  }
}
