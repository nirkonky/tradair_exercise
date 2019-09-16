const tradair = angular.module('tradair',[]);

tradair.controller('indexController', ['$scope','$http','$window', function($scope,$http,$window) {
    //if we couldnt fetch the content from backend - show error
    $scope.showError = false;
    $scope.errorMessage = "Sorry,couldnt fetch the required data , try again later.";

    fetchData();

    checkIfUserDragTheChartBefore();

    //drag and drop code.
    let dm = document.getElementById('dragme'); 
    dm.addEventListener('dragstart',drag_start,false); 
    document.body.addEventListener('dragover',drag_over,false); 
    document.body.addEventListener('drop',drop,false); 

    //check if user drag the chart before load the page. -- refresh
    function checkIfUserDragTheChartBefore(){
        if( $window.localStorage.left && $window.localStorage.top){
            $scope.dragChartStyle = {'top':$window.localStorage.top,'left':window.localStorage.left}
        }
    }

    //change the graph height and width via the submit button
    $scope.graphHeightAndWidth = function(){
        $scope.chart.setSize($scope.graphWidth, $scope.graphHeight);
    }

    //drag start event listener
    function drag_start(event) {
        const style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
    } 

    //drag over event listener
    function drag_over(event) { 
        event.preventDefault(); 
        return false; 
    } 

    //drag drop event listener
    function drop(event) { 
        $window.localStorage.setItem("event",event);
        const offset = event.dataTransfer.getData("text/plain").split(',');
        let dm = document.getElementById('dragme');
        dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        event.preventDefault();

        $window.localStorage.setItem("left",dm.style.left)
        $window.localStorage.setItem("top",dm.style.top)
        return false;
    } 

    //redraw chart via size
    $scope.redrawChart = function(size){
        
        switch(size) {
            case "small":
                $scope.chart.setSize(400);
                $window.localStorage.setItem("size",400)
                break;
            case "large":
                $scope.chart.setSize(600);
                $window.localStorage.setItem("size",600)
                break;
            case "auto":
                $scope.chart.setSize(null);
                break;
            default:
                $scope.chart.setSize(null);
                break;
        }
    }

  
    //render the chart on the html
    function renderChart(){
        $scope.chart = Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'TradAir Exercise'
            },
            xAxis: {
                title: {
                    text: 'Date'
                },
                categories: $scope.data.dates
            },
            yAxis: {
                title: {
                    text: 'Rates'
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ' Rate'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: $scope.data.currencyPairsEachName,
            credits: {
                enabled: false
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        });
        $scope.chart.setSize($window.localStorage.size);

    }

    //fetch the data from backend.
    function fetchData(){
        $http({
            method: 'GET',
            url: '/fetchCurrencyPairsRates'
        }).then(function successCallback(response) {
            if(!response.data.error){
                $scope.data = response.data.body;
                renderChart();
            }else{
                $scope.showError = true;
            }
            
            }, function errorCallback(response) {
                $scope.showError = true;
            });
    }
}]);