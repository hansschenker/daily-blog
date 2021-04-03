import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-posts',
  template: `
  <ul>
    <li><a routerLink="add">Add a Post</a></li>
    <li><a routerLink="list">Show Posts</a></li>
  </ul>
<ul>
  <li class="text" *ngFor="let post of posts | async">
    {{post.title}}
  </li>
</ul>
<router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class PostsComponent implements OnInit {

  
    posts: Observable<Post[]>;
    constructor(firestore: AngularFirestore) {
      this.posts = firestore.collection<Post>('posts').valueChanges();
    }
  

  ngOnInit(): void {
  }

}
