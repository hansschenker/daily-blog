import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Daily Blog</h1>
    <a routerLink="posts">Posts</a>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'daily-blog';
}
