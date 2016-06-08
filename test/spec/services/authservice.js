'use strict';

describe('Service: authService', function () {

  // load the service's module
  beforeEach(module('manageApp',function($urlRouterProvider,$httpProvider) {
  $urlRouterProvider.deferIntercept();//延迟url改变，保持当前state，避免报错
  $httpProvider.interceptors.pop();//移除RAP拦截器，使得$httpBackend可以正常拦截
}));

  // instantiate service
  var AuthService;
  beforeEach(inject(function (_AuthService_) {
    AuthService = _AuthService_;
  }));


  it('should do something', function () {
    expect(!!AuthService).toBe(true);
  });

  it('before login ,should return false ', function() {
    expect(AuthService.authStatus).toBe(false);
  });

  it('login success,should return true ', inject(function($httpBackend) {
    AuthService.doLogin('abc','123');
    $httpBackend
        .expect('POST', 
          '/api/login',
          {
            username:'abc',
            password:'123'
          })
        .respond(200, 
          {
            status: 'success',
            token:'12345'
        });
      $httpBackend.flush();
      expect(AuthService.authStatus).toBe(true);
  }));

  it('login fail,should return false ', inject(function($httpBackend) {
    AuthService.doLogin('a','b');
    $httpBackend
        .when('POST', 
          '/api/login'
          )
        .respond(200, 
          {
            status: 'fail'
        });
        
      $httpBackend.flush();
      expect(AuthService.authStatus).toBe(false);
  }));

  it('logout ,should return false ', function() {
    AuthService.authStatus=true;
    expect(AuthService.authStatus).toBe(true);
    AuthService.doLogout();
    expect(AuthService.authStatus).toBe(false);
  });

  it('Login By username|password should return token', inject(function ($httpBackend) {
  
      AuthService.doLoginByPass('abc','123');
  
      
      $httpBackend
        .expect('POST', 
          '/api/login',
          {
            username:'abc',
            password:'123'
          })
        .respond(200, 
          {
            status: 'success',
            token:'12345'
        });
  
  
      $httpBackend.flush();
          expect(AuthService.token).toBe('12345');
    }))

  it('Verified token should return true', inject(function ($httpBackend) {
      AuthService.token = '12345';
      AuthService.doLoginByToken();
  
      
      $httpBackend
        .expect('POST', 
          '/api/verifytoken',
          {
            token:'12345'
          })
        .respond(200, 
          {
            status: 'success'
        });
  
  
      $httpBackend.flush();
            expect(AuthService.authStatus).toBe(true);
    }))


  it('Invalid token should return false', inject(function ($httpBackend) {
    
      AuthService.token = 'badToken';
      AuthService.doLoginByToken();
  
      
      $httpBackend
        .when('POST', 
          '/api/verifytoken'
          )
        .respond(200, 
          {
            status: 'fail'
        });
  
  
      $httpBackend.flush();

      expect(AuthService.authStatus).toBe(false);
    }))
});
