import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // scroll to active link route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(debounceTime(0))
      .subscribe(() => {
        const linkElm = document.querySelector('.nav-link.active');
        if (linkElm) {
          linkElm.scrollIntoView({ block: 'nearest' });
        }
      });
  }
}
