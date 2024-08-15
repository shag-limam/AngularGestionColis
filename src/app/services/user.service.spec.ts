import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { LoginResponse } from './LoginResponse'; // Adjust import path if necessary

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  // Mock data for testing
  const mockLoginResponse: LoginResponse = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXNAZ21haWwuY29tIiwiaWF0IjoxNzIzNDI2NDc1LCJleHAiOjE3MjM0MzAwNzV9.vJS3NPRPSOUdRZwD2Q_HetEbop54U-TSvOreQREF-oo',
    expiresIn: 3600000,
    userType: 'Admin'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that no outstanding requests are left
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onLogin', () => {
    it('should store token data in localStorage on successful login', () => {
      const loginObj = { email: 'test@example.com', password: 'password' };

      service.onLogin(loginObj).subscribe(response => {
        expect(response).toEqual(mockLoginResponse);

        // Check localStorage values
        expect(localStorage.getItem('token')).toEqual(mockLoginResponse.token);
        expect(localStorage.getItem('expiresIn')).toEqual(JSON.stringify(mockLoginResponse.expiresIn));
        expect(localStorage.getItem('userType')).toEqual(mockLoginResponse.userType);
      });

      const req = httpMock.expectOne('http://localhost:8006/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockLoginResponse);
    });
  });

  // Add additional tests for other methods if needed
});
