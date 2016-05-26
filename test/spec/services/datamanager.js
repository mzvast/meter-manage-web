'use strict';

describe('Service: dataManager', function() {

    // load the service's module
    beforeEach(module('manageApp', function($urlRouterProvider, $httpProvider) {
        $urlRouterProvider.deferIntercept(); //延迟url改变，保持当前state，避免报错
        $httpProvider.interceptors.pop(); //移除RAP拦截器，使得$httpBackend可以正常拦截
    }));

    // instantiate service
    var dataManager;
    beforeEach(inject(function(_dataManager_) {
        dataManager = _dataManager_;
    }));

    it('should do something', function() {
        expect(!!dataManager).toBe(true);
    });
    /////////////
    //products //
    /////////////
    it('C|createProduct should create product ', inject(function($httpBackend) {
        dataManager.products.save({
            "json": {
                "batch": 99,
                "describe": "vxhcrt",
                "name": "Patricia Wilson",
                "supplier": "Patricia Wilson"
            }
        });
        $httpBackend
            .expect('POST',
                '/api/v2/products', {
                    "json": {
                        "batch": 99,
                        "describe": "vxhcrt",
                        "name": "Patricia Wilson",
                        "supplier": "Patricia Wilson"
                    }
                })
            .respond(200, {
                "status": "success"
            });
        $httpBackend.flush();
    }));
    it('R|getProducts should get products ', inject(function($httpBackend) {
        dataManager.products.get({ current_page: 1, items_per_page: 10, order_by: "id", reverse: true });
        $httpBackend
            .expect('GET',
                '/api/v2/products?current_page=1&items_per_page=10&order_by=id&reverse=true')
            .respond(200, {
                "products": "content"
            });
        $httpBackend.flush();
    }));

    it('U|update Products should update products ', inject(function($httpBackend) {
        dataManager.products.update({ id: 1 }, {
            "json": {
                "batch": 99,
                "describe": "vxhcrt",
                "name": "Patricia Wilson",
                "supplier": "Patricia Wilson"
            }
        });
        $httpBackend
            .expect('PUT',
                '/api/v2/products/1', {
                    "json": {
                        "batch": 99,
                        "describe": "vxhcrt",
                        "name": "Patricia Wilson",
                        "supplier": "Patricia Wilson"
                    }
                })
            .respond(200, {
                "products": [{
                    "batch": 99,
                    "create_date": "1990-02-26",
                    "describe": "vxhcrt",
                    "id": 1,
                    "name": "Patricia Wilson",
                    "supplier": "Patricia Wilson"
                }]
            });
        $httpBackend.flush();
    }));

    it('D|removeProduct should remove products ', inject(function($httpBackend) {
        dataManager.products.delete({ id: 1234 });
        $httpBackend
            .expect('DELETE',
                '/api/v2/products/1234')
            .respond(200, {
                "status": "success"
            });
        $httpBackend.flush();
    }));




    /////////////////
    //notification //
    /////////////////
    it('addNotification should add Notification', function() {
        dataManager.addNotification("info", "test message");
        expect(dataManager.getNotifications()[0]).toEqual({ "type": "info", "message": "test message" });
    });

    it('removeNotification should remove Notification', function() {
        dataManager.addNotification("info", "test message");
        dataManager.addNotification("success", "test message 2");
        expect(dataManager.getNotifications().length).toBe(2);
        dataManager.removeNotification(0);
        expect(dataManager.getNotifications().length).toBe(1);
        expect(dataManager.getNotifications()[0]).toEqual({ "type": "success", "message": "test message 2" });
    });


    //////////
    //users //
    //////////
    it('C|createUser should create user ', inject(function($httpBackend) {
        dataManager.users.save({
            "json": {
                "age": 28,
                "create_date": "1976-09-28",
                "exp": "eysqkfdrvj",
                "id": 2,
                "name": "Laura Williams",
                "perm": "测试员",
                "skill": "enzuxiogv"
            }
        });
        $httpBackend
            .expect('POST',
                '/api/v2/users', {
                    "json": {
                        "age": 28,
                        "create_date": "1976-09-28",
                        "exp": "eysqkfdrvj",
                        "id": 2,
                        "name": "Laura Williams",
                        "perm": "测试员",
                        "skill": "enzuxiogv"
                    }
                })
            .respond(200, {
                "status": "success"
            });
        $httpBackend.flush();
    }));
    it('R|getUsers should get users ', inject(function($httpBackend) {
        dataManager.users.get({ current_page: 1, items_per_page: 10, order_by: "id", reverse: true });
        $httpBackend
            .expect('GET',
                '/api/v2/users?current_page=1&items_per_page=10&order_by=id&reverse=true')
            .respond(200, {
                "users": "content"
            });
        $httpBackend.flush();
    }));

    it('U|update user should update user ', inject(function($httpBackend) {
        dataManager.users.update({ id: 1 }, {
            "json": {
                "age": 28,
                "create_date": "1976-09-28",
                "exp": "eysqkfdrvj",
                "id": 2,
                "name": "Laura Williams",
                "perm": "测试员",
                "skill": "enzuxiogv"
            }
        });
        $httpBackend
            .expect('PUT',
                '/api/v2/users/1', {
                    "json": {
                        "age": 28,
                        "create_date": "1976-09-28",
                        "exp": "eysqkfdrvj",
                        "id": 2,
                        "name": "Laura Williams",
                        "perm": "测试员",
                        "skill": "enzuxiogv"
                    }
                })
            .respond(200);
        $httpBackend.flush();
    }));

    it('D|removeUser should remove user ', inject(function($httpBackend) {
        dataManager.users.delete({ id: 1234 });
        $httpBackend
            .expect('DELETE',
                '/api/v2/users/1234')
            .respond(200);
        $httpBackend.flush();
    }));

});
