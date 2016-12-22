/**
 * Created by Administrator on 2016/12/22.
 */
angular.module('linkApp', [])
    .controller('ctrl', function ($scope, $http, appService, proList, cityList, townList) {
        //初始化option中的数据
        $scope.proList = proList.data;
        $scope.cityList = cityList.data;
        $scope.townList = townList.data;
        //初始化select绑定的变量
        $scope.sel1 = proList.data[0].code;
        $scope.sel2 = cityList.data[0].code;
        $scope.sel3 = townList.data[0].code;

        /*
         监听 sel1(省) 变量 改变
         改变->
         sel2也改变
         sel3也改变
         */
        $scope.$watch('sel1', function (newVal) {
            appService.getCity(newVal)
                .success(function (result) {
                    $scope.cityList = result;
                    //默认选中第一个市
                    $scope.sel2 = result[0].code;
                })
        });

        $scope.$watch('sel2', function (newVal) {
            appService.getTown(newVal)
                .success(function (result) {
                    $scope.townList = result;
                    //默认选中第一个市
                    $scope.sel3 = result[0].code;
                })
        });

    })
    .service('appService', function ($http) {
        this.getProvince = function () {
            return $http.get('../php/list_pro.php');
        };

        /**
         * 根据省的号码 code 查询 市的数据
         * @param code 省code
         * @returns {*}
         */
        this.getCity = function (code) {
            return $http.get('../php/list_city.php?code=' + code);
        };

        /**
         * 根据市的code 查询 区/县的数据
         * @param code 市code
         * @returns {*}
         */
        this.getTown = function (code) {
            return $http.get('../php/list_town.php', {
                params: {
                    code: code
                }
            })
        }
    })