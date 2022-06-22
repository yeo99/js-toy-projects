;(function () {
  'use strict'

  // DOM 가져오는 유틸 함수
  const get = (element) => document.querySelector(element);

  class Chart {
    constructor(
      parent = 'body',
      data = {},
      {width, height, radius, colors},
      ){
        this.parents = get(parent);
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.legends = document.createElement('div');
        this.legends.classList.add('legends');
        this.parents.appendChild(this.canvas);
        this.parents.appendChild(this.legends);
        this.label = ''
        this.total = 0;
        this.datas = Object.entries(data);
        this.radius = radius;
        this.colors = colors;
      }

      getTotal = () => {
        for (const [data, value] of this.datas) {
          this.total += value
        }
      }

      drawCanvas = (centerX, centerY, radius, startAngle, endAngle, color) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.moveTo(centerX, centerY);
        this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        this.ctx.closePath();
        this.ctx.fill();
      }

      // 메서드 => 객체에 포함된 함수들
      // drawChart 메서드 생성
      drawChart = (donutChart, centerX, centerY, fontOption) => {
        let initial = 0;
        let index = 0;
        let fontSize = fontOption.font.split('px')[0] || 14

        for (const [data, value] of this.datas) {
          const angleValue  = (2 * Math.PI * value) / this.total
          this.drawCanvas (
            centerX,
            centerY,
            this.radius,
            initial,
            initial + angleValue,
            this.colors[index]
          )

          this.ctx.moveTo(centerX, centerY);

          const triangleCenterX = Math.cos(initial + angleValue / 2);
          const triangleCenterY = Math.sin(initial + angleValue / 2);
          const labelX = centerX - fontSize + ((2 * this.radius) / 3) * triangleCenterX;
          const labelY = centerY + (this.radius / 2) * triangleCenterY;
          const text = Math.round((100 * value) / this.total) + '%';

          this.ctx.fillStyle = !!fontOption ? fontOption.color : 'black';
          this.ctx.font = !!fontOption ? fontOption.font : `${fontSize}px arial`;
          this.ctx.fillText(text, labelX, labelY);

          initial += angleValue
          index ++;
        }
      }
  }

  const data = {
    guitar: 30,
    bass: 20,
    drun: 25,
    piano: 18,
  }

  const option = {
    radius: 150,
    width: 700,
    height: 500,
    colors: ['#c15454', '#6fd971', '#687bd2', '#b971e0'],
  }

  const labelOption = {
    color: '#fff',
    font: "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
  }

  // 차트 생성. canvas div에 옵션값을 넘겨줘서 클래스 문법으로 사용
  const chart = new Chart('.canvas', data, option)
  const { width, height, radius } = option;
  chart.getTotal();
  // chart.drawlegends();
  chart.drawChart(false, width / 2 + 10 + radius, height / 2, labelOption)
})()
