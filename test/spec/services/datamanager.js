'use strict';

describe('Service: dataManager', function () {

  // load the service's module
  beforeEach(module('manageApp',function($urlRouterProvider,$httpProvider) {
  $urlRouterProvider.deferIntercept();//延迟url改变，保持当前state，避免报错
  $httpProvider.interceptors.pop();//移除RAP拦截器，使得$httpBackend可以正常拦截
}));

  // instantiate service
  var dataManager;
  beforeEach(inject(function (_dataManager_) {
    dataManager = _dataManager_;
  }));

  it('should do something', function () {
    expect(!!dataManager).toBe(true);
  });
  /////////////
  //products //
  /////////////
  it('getProducts should get products ', inject(function($httpBackend) {
    dataManager.getProducts();
    $httpBackend
        .expect('GET', 
          '/api/products?size=10&page=1')
        .respond(200, 
          {
            "products":"content"
        });
      $httpBackend.flush();
  }));

  it('createProduct should create product ', inject(function($httpBackend) {
    dataManager.createProduct({"data":"data"});
    $httpBackend
        .expect('POST', 
          '/api/products',{
            "data":"data"
          })
        .respond(200, 
          {
            "status":"success"
        });
      $httpBackend.flush();
  }));

  it('updateProduct should update product ', inject(function($httpBackend) {
    dataManager.updateProduct({"data":"data"},15);
    $httpBackend
        .expect('PUT', 
          '/api/products/15',{
            "data":"data"
          })
        .respond(200, 
          {
            "status":"success"
        });
      $httpBackend.flush();
  }));

  it('addNotification should add Notification', function () {
    dataManager.addNotification("info","test message");
    expect(dataManager.getNotifications()[0]).toEqual({"type":"info","message":"test message"});
  });

  it('removeNotification should remove Notification', function () {
    dataManager.addNotification("info","test message");
    dataManager.addNotification("success","test message 2");
    expect(dataManager.getNotifications().length).toBe(2);
    dataManager.removeNotification(0);
    expect(dataManager.getNotifications().length).toBe(1);
    expect(dataManager.getNotifications()[0]).toEqual({"type":"success","message":"test message 2"});
  });

  it('removeProduct should remove products ', inject(function($httpBackend) {
    dataManager.removeProduct(1234);
    $httpBackend
        .expect('DELETE', 
          '/api/products/1234')
        .respond(200, 
          {
            "status":"success"
        });
      $httpBackend.flush();
  }));
  //////////
  //users //
  //////////
  it('getUsers should get users ', inject(function($httpBackend) {
    dataManager.getUsers();
    $httpBackend
        .expect('GET', 
          '/api/users?size=10&page=1')
        .respond(200, 
          {
            "users":"content"
        });
    $httpBackend.flush();
}));
  it('createUser should create user ', inject(function($httpBackend) {
    dataManager.createUser({"data":"data"});
    $httpBackend
        .expect('POST', 
          '/api/users',{
            "data":"data"
          })
        .respond(200, 
          {
            "status":"success"
        });
      $httpBackend.flush();
  }));

  it('updateUser should update User ', inject(function($httpBackend) {
    dataManager.updateUser({"data":"data"},15);
    $httpBackend
        .expect('PUT', 
          '/api/users/15',{
            "data":"data"
          })
        .respond(200, 
          {
            "status":"success"
        });
      $httpBackend.flush();
  }));

  it('removeUser should remove Users ', inject(function($httpBackend) {
    dataManager.removeUser(1234);
    $httpBackend
        .expect('DELETE', 
          '/api/users/1234')
        .respond(200, 
          {
            "status":"success"
        });
      $httpBackend.flush();
  }));
});
