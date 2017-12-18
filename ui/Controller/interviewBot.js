angular.module('InterviewApp', ['InterviewApp.controllers', 'datatables']);

angular.module('InterviewApp.controllers', []).controller('interviewController', function($scope, DTOptionsBuilder, $http) {
    var positionValue;
    var arrayProfile = new Array();
    $http.get('https://62d937ce.ngrok.io/getdata')
        .success(function(data) {
                $scope.userList = eval(data.dataAry);
        }).error(function(data) {
            $scope.userList= "No Data to Display";
            console.log('Error: ' + data);
        })
    $scope.vm = {};
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('order', [0, 'asc']);
    $http.get('https://62d937ce.ngrok.io/getcountsdata')
        .success(function(data) {
            for (var i = 0; i < data.dataAry.length; i++) {
                highchartArray = {};
                highchartArray.name = data.dataAry[i].position_applied_for;
                highchartArray.y = data.dataAry[i].application_count;
                highchartArray.drilldown = data.dataAry[i].position_applied_for;
                arrayProfile.push(highchartArray);
            }
            Highcharts.chart('highChartData', {
                chart: {
                    type: 'pie',
                    backgroundColor: 'rgba(255, 255, 255, 0.0)'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}' //'{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">No of applicant for</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    color: '#ffffff',
                    data: arrayProfile,
                    events: {
                        click: function(e) {
                            alert("areaClicked");
                        }
                    }
                }]
            });
        }).error(function(data) {
            console.log('Error: ' + data);
        })
        $scope.unmatched = function() {
            $(".unmachedQuestionPanel").toggle();
        };
        $http.get('https://62d937ce.ngrok.io/getunresolved')
        .success(function(data) {
            $scope.unmatchedQuestions = data.dataAry;
        }).error(function(data) {
            console.log('Error: ' + data);
        })
        $scope.answer=[];
         $scope.sendUnmatchedData = function (ques,value,index) {
            var data = {
                id: value,
                question: ques,
                answer: $scope.answer[index]
            };
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            $http.post('https://62d937ce.ngrok.io/makeresolved', data, config)
            .success(function (data, status, headers, config) {
                $scope.unmatchedQuestions= data.dataAry;
            })
            .error(function (data, status, header, config) {
                console.log("Error="+status);
            });
        };
});