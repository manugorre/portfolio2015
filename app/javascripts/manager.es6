
'use strict';
var socket    = io();
var date      = new Date();
var tabDay    = new Array('Dimanche', 'Lundi', 'Mardi',
                          'Mercredi','Jeudi','Vendredi', 'Samedi');
var today     = tabDay[date.getDay()];
var myLineChart;

var Manager = {
  init() {
    this.socketGet();
    this.chartUser();
    //this.onChangeDay();
  },
  getPastDay() {
    //var i = 0;
    // for (;;) {
    //   if ( tabDay[tabDay.length - 1] === today) break;
    //   var last = tabDay.pop();
    //   console.log(last);
    //   tabDay.unshift(last);
    //   console.log(tabDay);
    //   i++;
    // }

    if (tabDay[tabDay.length - 1] !== today) {
      var last = tabDay.pop();
      //console.log(last);
      tabDay.unshift(last);
      //console.log(tabDay);
      if (tabDay[tabDay.length - 1] !== today) {
        var last = tabDay.pop();
        tabDay.unshift(last);
      }
      if (tabDay[tabDay.length - 1] !== today) {
        var last = tabDay.pop();
        tabDay.unshift(last);
      }
      if (tabDay[tabDay.length - 1] !== today) {
        var last = tabDay.pop();
        tabDay.unshift(last);
      }
      if (tabDay[tabDay.length - 1] !== today) {
        var last = tabDay.pop();
        tabDay.unshift(last);
      }
      if (tabDay[tabDay.length - 1] !== today) {
        var last = tabDay.pop();
        tabDay.unshift(last);
      }
    }

    return tabDay;
  },
  // onChangeDay(){
  //   var app = this;
  //   var before = date.getSeconds();
  //   setInterval(function(){
  //     console.log(before, date.getSeconds());
  //     if(date.getSeconds() !== before){
  //       console.log('ouitamere');
  //       myLineChart.addData([50], tabDay[0]);
  //       myLineChart.removeData();
  //     }
  //     setTimeout(function(){
  //       before = date.getSeconds();
  //       console.log('67', before);
  //     }, 1500);
  //     console.log('69', before);
  //   }, 1500);
  // },
  chartUpdate() {
    myLineChart.datasets[0].points[2].value = 50;
    // Would update the first dataset's value of 'March' to be 50
    myLineChart.update();
  },
  calcPourcent() {
    // var ​total = 0;
    // ​for (i = 0; i < graphique.length; i++){
    //   ​total += parseInt(graphique[i][1]);
    // ​}
    // console.log(total);
    // ​afficher+='<table border='0' cellspacing='0' cellpadding='0'>';
    // ​for (i=0;i<graphique.length;i++){​
    // ​pourcentage=Math.round(graphique[i][1]*100/total);
    // ​afficher+='<tr>'​afficher+='<td>'+graphique[i][0]+'</td><td>'+pourcentage+'%</td>'​afficher+='</tr>';
    // ​}
    // ​afficher+='</table>'
    // ​document.write(afficher+'<br>Nombre de disques achetés : <b>'+total+'</b>')
  },
  chartUser() {

    var days = this.getPastDay();

    var data = {
      labels: days,
      datasets: [
        {
          label: 'My Second dataset',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    var ctx = document.getElementById('visitors-chart').getContext('2d');
    myLineChart = new Chart(ctx).Line(data, {animationSteps: 15});
    //Chart.defaults.global.responsive = true;

    // setInterval(function(){
    //   // Add two random numbers for each dataset
    //   myLineChart.addData([50], 'e');
    //
    //   myLineChart.removeData();
    // }, 5000);
  },
  socketGet() {
    socket.on('currentUser', function(cUser) {
      $('.info-box .current-total .counter').text(cUser);
    });
    socket.on('totalUser', function(tUser) {
      $('.info-box .visitor-total .counter').text(tUser);
    });
  }
};

module.exports = Manager;
