import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../ApiService';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  kd_pengeluaran: string[] = [];
  tanggal_keluar: string[] = [];
  keterangan: string[] = [];
  nama_pengeluaran: string[] = [];

  constructor(private _apiService: ApiserviceService) {}

  ngOnInit() {
    this.fetchUangData();
    this.fetchPengeluaran();
  }

  async fetchUangData() {
    try {
      const res = await this._apiService.getUang();

      if (res.msg === 'ok') {
        // Mengambil data kd_pengeluaran dan nama_pengeluaran dari res.data
        this.kd_pengeluaran = res.data.map((item: { kd_pengeluaran: string }) =>
          item.kd_pengeluaran.toString()
        );
        this.tanggal_keluar = res.data.map((item: { tanggal_keluar: string }) =>
          item.tanggal_keluar.toString()
        );
        this.keterangan = res.data.map((item: { keterangan: string }) =>
          item.keterangan.toString()
        );

        // Memanggil metode untuk menampilkan grafik
        this.showChartData();
      } else if (res.msg === 'notFound') {
        console.log('Data not found');
      } else {
        console.error('Error fetching data:', res.err);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }
  async fetchPengeluaran() {
    try {
      const res = await this._apiService.getPengeluaran();

      if (res.msg === 'ok') {
        // Mengambil data kd_pengeluaran dan nama_pengeluaran dari res.data
        this.kd_pengeluaran = res.data.map((item: { kd_pengeluaran: string }) =>
          item.kd_pengeluaran.toString()
        );
        this.nama_pengeluaran = res.data.map((item: { nama_pengeluaran: string }) =>
          item.nama_pengeluaran.toString()
        );
        

        // Memanggil metode untuk menampilkan grafik
        this.showChartData();
      } else if (res.msg === 'notFound') {
        console.log('Data not found');
      } else {
        console.error('Error fetching data:', res.err);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }

  showChartData() {
    // Menyiapkan objek untuk menyimpan data kd_pengeluaran per bulan
    const dataPerMonth: { [monthYear: string]: number } = {};

    // Menghitung jumlah kd_pengeluaran per bulan
    this.tanggal_keluar.forEach((date: string, index: number) => {
      const monthYear = new Date(date).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      dataPerMonth[monthYear] = (dataPerMonth[monthYear] || 0) + Number(this.kd_pengeluaran[index]);
    });

    // Membuat array dari objek data kd_pengeluaran per bulan
    const chartData1 = {
      labels: Object.keys(dataPerMonth),
      datasets: [
        {
          label: 'Uang Keluar',
          data: Object.values(dataPerMonth),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor:   [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Diagram kedua
    const uniqueKdPengeluaran = [...new Set(this.kd_pengeluaran)];
    const dataPerKdPengeluaran = uniqueKdPengeluaran.map((kdPengeluaran) =>
      this.kd_pengeluaran.filter((kd) => kd === kdPengeluaran).length
    );

    const chartData2 = {
      labels: uniqueKdPengeluaran,
      datasets: [
        {
          label: 'Uang Keluar',
          data: dataPerKdPengeluaran,
          backgroundColor:  [
            'rgba(255, 99, 132, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            ' rgba(221, 232, 185)',
            'rgba(255, 201, 95)',
            // Tambahkan warna sesuai kebutuhan
          ],
          hoverOffset: 4,
        },
      ],
    };

    // Memanggil Chart untuk menampilkan diagram pertama
    new Chart('myChart', {
      type: 'bar',
      data: chartData1,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Bulan dan Tahun',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Uang Keluar',
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Memanggil Chart untuk menampilkan diagram kedua
    new Chart('mySecondChart', {
      type: 'doughnut',
      data: chartData2,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}