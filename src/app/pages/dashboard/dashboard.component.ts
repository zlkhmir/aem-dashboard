import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';

import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  loading = true;

  donutChartData!: ChartData<'doughnut'>;
  barChartData!: ChartData<'bar'>;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any) => {
        this.dashboardData = res;

        this.donutChartData = {
          labels: res.chartDonut.map((x: any) => x.name),
          datasets: [
            {
              data: res.chartDonut.map((x: any) => x.value)
            }
          ]
        };

        this.barChartData = {
  labels: res.chartbar.map((x: any) => x.name),
  datasets: [
    {
      label: 'Monthly Performance',
      data: res.chartbar.map((x: any) => x.value),

      // Green bars
      backgroundColor: [
        '#e4b1e5',
        '#e4b1e5',
        '#e4b1e5',
        '#e4b1e5',
        '#e4b1e5',
        '#e4b1e5',
        '#e4b1e5'
      ],

      borderColor: '#e4b1e5',
      borderWidth: 1,
      borderRadius: 3,
      hoverBackgroundColor: '#e4b1e5'
    }
  ]
};

        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.loading = false;
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}