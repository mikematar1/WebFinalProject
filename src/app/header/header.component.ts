import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: string = '';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navigateToNowPlaying(){
    this.router.navigate(['now-playing']);
  }
  navigateToPopular(){
    this.router.navigate(['popular']);
  }
  navigateToTopRated(){
    this.router.navigate(['top-rated']);
  }
  navigateToUpcoming(){
    this.router.navigate(['upcoming']);
  }
  navigateTofavorites(){
    this.router.navigate(['favorites']);
  }
  onSubmit() {
    // Check if the search string is not empty
    if (this.search.trim()) {
      // Navigate to the /movie/:movieName route
      this.router.navigate(['search', this.search.trim()]);
      this.search = ''; // Optionally clear the search input after navigation
    }
  }

}
