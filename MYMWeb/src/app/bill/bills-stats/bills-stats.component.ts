import { Component, OnInit } from '@angular/core';

import { BaseService } from '../../shared/base.service';
import { UserRequest } from '../../model';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-bills-stats',
  templateUrl: './bills-stats.component.html',
  styleUrls: ['./bills-stats.component.sass']
})
export class BillsStatsComponent implements OnInit {
  request = new UserRequest();
  myChart: any;
  showPie = false;
  colors = [
    '#2d2e2e',
    '#2d2e2e',
    '#e36f47',
    '#375235',
    '#7e0800',
    '#ffdd57',
    '#3273dc',
    '#b86bff',
    '#3b3243',
    '#e4c192',
    '#9e9e9e'
  ];
  constructor(
    private base: BaseService
  ) { }

  ngOnInit() {
    this.showPie = true;
    this.getStats();
  }

  getStats() {
    this.base.getPieCharts(this.request).subscribe(res => {
      this.chartPie(res.item1, res.item2);
      this.chartit(res.item1, res.item2);
      this.chartBar(res.item1, res.item2);
    });
  }

  chartPie(labels: any, data: any) {
    const htmlRef = document.getElementById('pieChart');
    this.myChart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Έξοδα',
          data: data,
          backgroundColor: this.colors.splice(0, labels.length)
        }]
      },
      options: {
        responsive: true,
        display: true,
        defaultFontSize: 19,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }
      }
    });
  }

  chartBar(labels: any, data: any) {
    console.log(data.length);
    const htmlRef = document.getElementById('barChart');
    this.myChart = new Chart(htmlRef, {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Έξοδα',
          backgroundColor: [
            '#2d2e2e',
            '#2d2e2e',
            '#e36f47',
            '#375235',
            '#7e0800',
            '#ffdd57',
            '#3273dc',
            '#b86bff',
            '#3b3243',
            '#e4c192',
            '#9e9e9e'
          ],
          data: data,
          borderColor: [
            '#2d2e2e',
            '#2d2e2e',
            '#e36f47',
            '#375235',
            '#7e0800',
            '#ffdd57',
            '#3273dc',
            '#b86bff',
            '#3b3243',
            '#e4c192',
            '#9e9e9e'
          ],
          borderWidth: 2,
          hoverBorderWidth: 0
        }]
      }
    });
  }

  chartit(labels: any, data: any) {
    console.log(this.colors.splice(0, labels.length));
    const htmlRef = document.getElementById('polarAreaChart');
    this.myChart = new Chart(htmlRef, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          label: 'Έξοδα',
          data: data,
          backgroundColor: this.colors.splice(0, labels.length)
        }]
      },
      options: {
        responsive: true,
        display: true,
        defaultFontSize: 19,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }
      }
    });
  }
}
