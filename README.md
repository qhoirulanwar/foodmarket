# Simple Foodmarket App

Aplikasi Simple Foodmarket adalah sebuah aplikasi web mobile yang dikembangkan menggunakan Angular Framework. Aplikasi ini dirancang untuk memudahkan pengguna dalam memesan makanan secara online.

## Fitur Utama

- Autentikasi: Login dan Registrasi pengguna
- Beranda: Menampilkan daftar produk makanan
- Keranjang: Mengelola item yang akan dibeli
- Pemesanan: Proses checkout dan melihat riwayat pesanan

## Struktur Proyek

Proyek ini menggunakan arsitektur modular dengan pembagian fitur sebagai berikut:

- `src/app/features/`: Berisi modul-modul utama aplikasi (auth, home, cart, orders, dll)
- `src/app/services/`: Layanan-layanan untuk manajemen data dan logika bisnis
- `src/app/interfaces/`: Definisi tipe data dan interface
- `src/environments/`: Konfigurasi environment (production dan development)

## Teknologi yang Digunakan

- Angular Framework
- Ionic Framework
- TypeScript
- SCSS untuk styling
- Capacitor untuk build native mobile app

## Cara Menjalankan Proyek

1. Pastikan Anda telah menginstal Node.js dan npm
2. Clone repositori ini
3. Jalankan `npm install` untuk menginstal dependensi
4. Gunakan `ionic serve` untuk menjalankan aplikasi di browser
5. Untuk build ke platform mobile, gunakan perintah Ionic CLI yang sesuai

## Pengembangan

Proyek ini menggunakan Angular CLI. Anda dapat menggunakan perintah-perintah Angular CLI untuk generate komponen, service, dan modul baru.
