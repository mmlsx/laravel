/**
 * Created by zhangshiping on 16-5-13.
 */
//dataPath(),数据源地址
define(['app',dataPath()],function(app,datas){
    app.register.controller('home-loginCtrl',["$scope",'$http',function($scope,$http){
        $scope.data_key = '/home/login';
        $scope.captcha = '/data/home/auth/captcha';
        $scope.errorFieldMap = {};
        updateData(); //全部数据更新

        /**
         * 用户登录
         */
        $scope.login = function(){
            var post_data = {
                username:$scope.username,
                password:$scope.password,
                verify:$scope.verify,
                remember:$scope.remember,
                _token:datas._token
            };
            if($scope.remember){
                post_data.remember = 1;
            }else{
                post_data.remember = undefined;
            }
            $http.post('/data/home/auth/login',post_data).success(function(res){
                //登录成功跳转
                //window.location.href = '#'+res.redirect || '#/admin/index';
            }).error(function(data){
                if(typeof data == "object"){
                    for(var i in data){
                        for(var j in data[i]){
                            data[i][j] = data[i][j].replace(i.replace('_',' ')+' ',$scope.errorFieldMap[i]);
                        }
                    }
                    $scope.error = data;
                }
            });
        }

        /**
         * 切换验证码
         */
        $scope.switchCaptcha = function(){
            $scope.captcha = '/data/home/auth/captcha?time='+(new Date()).getTime();
        }
    }])

})
