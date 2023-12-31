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

    this.route.params.subscribe(params=>{
      this.movieId=params['id'];
    })
    this.movieService.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.movieDetails = data;
    });
    this.movieService.getMovieCast(this.movieId).subscribe((data:any)=>{
      this.movieCast=data.cast;
    });
    const storedValue = localStorage.getItem(this.movieId);
    if(storedValue!=null){
      this.isFavorite=true;
    }else{
      this.isFavorite=false;
    }

  }

  setFavorite(){
    let temp = {id:this.movieDetails.id,title:this.movieDetails.title,overview:this.movieDetails.overview,poster_path:this.movieDetails.poster_path};

    const storedValue = localStorage.getItem(this.movieId);
    if(storedValue!=null){
      localStorage.removeItem(this.movieId);
      this.isFavorite=false;
    }else{
      console.log(this.movieDetails);
      localStorage.setItem(this.movieId, JSON.stringify(temp));
      this.isFavorite=true;
    }

  }
  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home route
  }


}
