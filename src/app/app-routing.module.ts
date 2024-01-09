import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'penduduk',
    loadChildren: () =>
      import('./penduduk/penduduk.module').then((m) => m.PendudukPageModule),
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./info/info.module').then((m) => m.InfoPageModule),
  },
  {
    path: 'iuran',
    loadChildren: () =>
      import('./iuran/iuran.module').then((m) => m.IuranPageModule),
  },
  {
    path: 'blok',
    loadChildren: () =>
      import('./blok/blok.module').then((m) => m.BlokPageModule),
  },
  {
    path: 'pesan',
    loadChildren: () =>
      import('./pesan/pesan.module').then((m) => m.PesanPageModule),
  },
  {
    path: 'tambah-penduduk',
    loadChildren: () =>
      import('./tambah-penduduk/tambah-penduduk.module').then(
        (m) => m.TambahPendudukPageModule
      ),
  },
  {
    path: 'e-penduduk',
    loadChildren: () =>
      import('./e-penduduk/e-penduduk.module').then(
        (m) => m.EPendudukPageModule
      ),
  },
  {
    path: 'e-info',
    loadChildren: () =>
      import('./e-info/e-info.module').then((m) => m.EInfoPageModule),
  },
  {
    path: 't-info',
    loadChildren: () =>
      import('./t-info/t-info.module').then((m) => m.TInfoPageModule),
  },
  {
    path: 'b-pesan',
    loadChildren: () =>
      import('./b-pesan/b-pesan.module').then((m) => m.BPesanPageModule),
  },
  {
    path: 't-pesan',
    loadChildren: () =>
      import('./t-pesan/t-pesan.module').then((m) => m.TPesanPageModule),
  },
  {
    path: 't-blok',
    loadChildren: () =>
      import('./t-blok/t-blok.module').then((m) => m.TBlokPageModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: 't-user',
    loadChildren: () =>
      import('./t-user/t-user.module').then((m) => m.TUserPageModule),
  },
  {
    path: 'e-user',
    loadChildren: () =>
      import('./e-user/e-user.module').then((m) => m.EUserPageModule),
  },
  {
    path: 'surat-masuk',
    loadChildren: () =>
      import('./surat-masuk/surat-masuk.module').then(
        (m) => m.SuratMasukPageModule
      ),
  },
  {
    path: 't-surat',
    loadChildren: () =>
      import('./t-surat/t-surat.module').then((m) => m.TSuratPageModule),
  },
  {
    path: 'e-surat',
    loadChildren: () =>
      import('./e-surat/e-surat.module').then((m) => m.ESuratPageModule),
  },
  {
    path: 'e-iuran',
    loadChildren: () =>
      import('./e-iuran/e-iuran.module').then((m) => m.EIuranPageModule),
  },
  {
    path: 't-iuran',
    loadChildren: () =>
      import('./t-iuran/t-iuran.module').then((m) => m.TIuranPageModule),
  },
  {
    path: 'e-blok',
    loadChildren: () =>
      import('./e-blok/e-blok.module').then((m) => m.EBlokPageModule),
  },
  {
    path: 'e-pesan',
    loadChildren: () =>
      import('./e-pesan/e-pesan.module').then((m) => m.EPesanPageModule),
  },
  {
    path: 'pengeluaran',
    loadChildren: () =>
      import('./pengeluaran/pengeluaran.module').then(
        (m) => m.PengeluaranPageModule
      ),
  },
  {
    path: 'uang-keluar',
    loadChildren: () =>
      import('./uang-keluar/uang-keluar.module').then(
        (m) => m.UangKeluarPageModule
      ),
  },
  {
    path: 't-uang',
    loadChildren: () =>
      import('./t-uang/t-uang.module').then((m) => m.TUangPageModule),
  },
  {
    path: 't-pengeluaran',
    loadChildren: () =>
      import('./t-pengeluaran/t-pengeluaran.module').then(
        (m) => m.TPengeluaranPageModule
      ),
  },
  {
    path: 'e-pengeluaran',
    loadChildren: () =>
      import('./e-pengeluaran/e-pengeluaran.module').then(
        (m) => m.EPengeluaranPageModule
      ),
  },
  {
    path: 'e-uang',
    loadChildren: () =>
      import('./e-uang/e-uang.module').then((m) => m.EUangPageModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./report/report.module').then((m) => m.ReportPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

