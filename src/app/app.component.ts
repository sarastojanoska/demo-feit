import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailComponent} from './posts-details/post-details.component';
import { InstagramApiService } from './instagram-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'feit-instagram1-app';
  pageNumber: number=1;

  posts:Post[] =  [];

  constructor(public dialog: MatDialog,private apiService: InstagramApiService) {

    this.apiService.getPosts(1).subscribe((receivedPosts)=>{
      this.posts = receivedPosts;
    });

    this.getPosts();
  }

  onClick(post: Post){
    const dialogRef = this.dialog.open(PostDetailComponent, {
      width:'850px',
      height:'700px',
      data: {clickedPost: post}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onLoadMore(){
    this.pageNumber++;
    this.getPosts();
  }

  getPosts(){
    this.apiService.getPosts(this.pageNumber).subscribe((receivedPosts)=>{
      this.posts = receivedPosts;
    });
  }
}
