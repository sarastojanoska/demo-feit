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
    this.posts = [
      { id:1, photoUrl: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwj6h7CItJDnAhWSKewKHTuWAgkQjRx6BAgBEAQ&url=https%3A%2F%2Fdisney.fandom.com%2Fwiki%2FCaptain_Hook&psig=AOvVaw19Gkd_Ofi1zDA6cDl8Fld4&ust=1579548823421422:' },
      { id:2, photoUrl: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjMt5DftJDnAhVPNOwKHdDfC4QQjRx6BAgBEAQ&url=https%3A%2F%2Fmaleficent.fandom.com%2Fwiki%2FMaleficent&psig=AOvVaw0aMKdt8YnFi4bYI5VJgEiR&ust=1579549003506454:' },
      { id:3, photoUrl: 'https://vignette.wikia.nocookie.net/disney/images/4/42/Profile_-_Lady_Tremaine.jpeg/revision/latest?cb=20190312052116:' },
      { id:4, photoUrl: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwiIyOPotZDnAhXKoaQKHTQ0ALEQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.zedge.net%2Fwallpaper%2F97824b6e-f546-3a71-a1a6-79c7e9835699&psig=AOvVaw2R_YkglT2r2LvDaUYWesCX&ust=1579549282023809:' },
      { id:5, photoUrl: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi8i96FtpDnAhWM2qQKHevgBXEQjRx6BAgBEAQ&url=https%3A%2F%2Fdisney.fandom.com%2Fwiki%2FUrsula&psig=AOvVaw3soeaTOSc0UPRgJW-XIqOu&ust=1579549344587792:' },
      { id:6, photoUrl: 'https://vignette.wikia.nocookie.net/disney/images/6/60/Profile_-_Jafar.jpeg/revision/latest?cb=20190312023726:' },
      { id:7, photoUrl: 'https://vignette.wikia.nocookie.net/disney/images/8/89/Profile_-_The_Evil_Queen.jpeg/revision/latest?cb=20190312020700:' },
      { id:8, photoUrl: 'https://vignette.wikia.nocookie.net/parody/images/a/ab/Snow-white-disneyscreencaps.com-8111.jpg/revision/latest/scale-to-width-down/340?cb=20160206090402:' },
      { id:9, photoUrl: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwiEtcGWt5DnAhWFCuwKHcu3AwIQjRx6BAgBEAQ&url=https%3A%2F%2Fdisney.fandom.com%2Fwiki%2FCruella_De_Vil&psig=AOvVaw0xIq1H2gmy3kHZcggzlTCg&ust=1579549659002207:' },
      { id:10, photoUrl: 'https://vignette.wikia.nocookie.net/morgs-lion-king/images/d/d2/Scar.jpg/revision/latest?cb=20180602133050:' }

    ];

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
