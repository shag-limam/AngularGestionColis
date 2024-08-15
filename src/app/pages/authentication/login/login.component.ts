// angular import
// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { UserService } from '../../../services/user.service';


// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export default class LoginComponent {

//   // public method
//   SignInOptions = [
//     {
//       image: 'assets/images/authentication/google.svg',
//       name: 'Google'
//     },
//     {
//       image: 'assets/images/authentication/twitter.svg',
//       name: 'Twitter'
//     },
//     {
//       image: 'assets/images/authentication/facebook.svg',
//       name: 'Facebook'
//     }
//   ];

//   loginObj: { email: string; password: string } = {
//     email: "",
//     password: ""
//   };

//   constructor(private userSrv: UserService, private router: Router) {}

//   login() {
//     console.log("email",this.loginObj.email)
//     console.log("pass",this.loginObj.password)
//     this.userSrv.onLogin(this.loginObj).subscribe(response => {
//     console.log("response",response)

//       localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
//       localStorage.setItem('userType', response.userType);
//       this.router.navigateByUrl('/dashboard/default');
//     });
//   }


// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule], // Use RouterModule for routing
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  loginObj = {
    email: '',
    password: ''
  };
  isLoading = false;
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  constructor(private userSrv: UserService, private router: Router) {}

  login() {
    if (!this.loginObj.email || !this.loginObj.password) {
      // Basic validation
      return;
    }

    this.isLoading = true;
    this.userSrv.onLogin(this.loginObj).subscribe(response => {
      console.log("response", response);
      localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
      localStorage.setItem('userType', response.userType);
      this.router.navigateByUrl('/dashboard/default');
      this.isLoading = false;
    }, error => {
      console.error('Login failed', error);
      this.isLoading = false;
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../../services/user.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   // imports: [RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export default class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   isLoading = false;
//   SignInOptions = [
//     {
//       image: 'assets/images/authentication/google.svg',
//       name: 'Google'
//     },
//     {
//       image: 'assets/images/authentication/twitter.svg',
//       name: 'Twitter'
//     },
//     {
//       image: 'assets/images/authentication/facebook.svg',
//       name: 'Facebook'
//     }
//   ];

//   constructor(private userSrv: UserService, private router: Router, private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   login() {
//     if (this.loginForm.invalid) {
//       return; // Stop if form is invalid
//     }

//     this.isLoading = true;
//     const loginObj = this.loginForm.value;
    
//     this.userSrv.onLogin(loginObj).subscribe(response => {
//       console.log("response", response);
//       localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
//       localStorage.setItem('userType', response.userType);
//       this.router.navigateByUrl('/dashboard/default');
//       this.isLoading = false;
//     }, error => {
//       console.error('Login failed', error);
//       this.isLoading = false;
//     });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../../services/user.service';
// import {  RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export default class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   isLoading = false;
//   SignInOptions = [
//     {
//       image: 'assets/images/authentication/google.svg',
//       name: 'Google'
//     },
//     {
//       image: 'assets/images/authentication/twitter.svg',
//       name: 'Twitter'
//     },
//     {
//       image: 'assets/images/authentication/facebook.svg',
//       name: 'Facebook'
//     }
//   ];

//   constructor(private userSrv: UserService, private router: Router, private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   login() {
//     if (this.loginForm.invalid) {
//       return; // Stop if form is invalid
//     }

//     this.isLoading = true;
//     const loginObj = this.loginForm.value;
    
//     this.userSrv.onLogin(loginObj).subscribe(response => {
//       console.log("response", response);
//       localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
//       localStorage.setItem('userType', response.userType);
//       this.router.navigateByUrl('/dashboard/default');
//       this.isLoading = false;
//     }, error => {
//       console.error('Login failed', error);
//       this.isLoading = false;
//     });
//   }
// }

