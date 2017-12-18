angular.module('InterviewApp', ['InterviewApp.controllers', 'datatables']);

angular.module('InterviewApp.controllers', []).controller('interviewController', function($scope, DTOptionsBuilder) {
    $scope.userList = [{

            Name: 'Anita',
            Notice: '2 Month',
            Experience: '6 Year',
            Profile: 'Sr Engineer',
            expected:'1900000',
            current:'1200000'
        },
        {
            Name: 'Pankaj',
            Notice: '2 Month',
            Experience: '6 Year',
            Profile: 'Sr Engineer',
            expected:'1900000',
            current:'1200000'
        },
        {
            Name: 'Anil',
            Notice: '2 Month',
            Experience: '5 Year',
            Profile: 'Engineer',
            expected:'1900000',
            current:'1200000'
        },
        {
            Name: 'Himanshu',
            Notice: '2 Month',
            Experience: '9 Year',
            Profile: 'Associate Engineer',
            expected:'1900000',
            current:'1200000'
        },
        {
            Name: 'Dharmendra',
            Notice: '2 Month',
            Experience: '1 Year',
            Profile: 'Jr Engineer',
            expected:'1900000',
            current:'1200000'
        },
        {
            Name: 'Rohit',
            Notice: '2 Month',
            Experience: '2 Year',
            Profile: 'Engineer',
            expected:'1900000',
            current:'1200000'
        }
    ];

    $scope.vm = {};

    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('order', [0, 'asc']);


//Highcharts
var totalOpening = 20;
var devops = 6;//(6/20)*100;
var Developer  =3;// (3/20)*100;
var Testing = 5;//(5/20)*100;
var Manager =  3;//(3/20)*100;
var hr = 3;//(3/20)*100;

    Highcharts.chart('container', {
        chart: {
            type: 'pie',
            backgroundColor:'rgba(255, 255, 255, 0.0)'
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
                    format: '{point.name}: {point.y}'//'{point.name}: {point.y:.1f}%'
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
            color:'#ffffff',
            data: [{
                name: 'DevOps',
                y: devops,
                drilldown: 'DevOps'
            }, {
                name: 'Developer',
                y: Developer,
                drilldown: 'Developer'
            }, {
                name: 'Testing',
                y: Testing,
                drilldown: 'Testing'
            }, {
                name: 'Manager',
                y: Manager,
                drilldown: 'Manager'
            }, {
                name: 'Human Resource',
                y: hr,
                drilldown: 'Human Resource'
            }]
        }]
    });
});