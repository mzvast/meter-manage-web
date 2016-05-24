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

  it('getProducts should get products ', inject(function($httpBackend) {
    dataManager.getProducts();
    $httpBackend
        .expect('GET', 
          '/api/products')
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
});
