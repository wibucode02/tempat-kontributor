---
author: Ezra Khairan Permana
title: Instalasi osu!lazer di linux
description: Cara menginstall osu!lazer di linux dengan benar.
draft: false
---

Game osu! adalah game ritme yang menggunakan musik dalam permainannya. Osu ini terbagi dalam 4 mode yaitu mode normal (circle), mode taiko (drum), mode catch (menangkap buah-buahan), dan mode mania (piano). Game yang satu ini memiliki sistem skor SS, S, A, B, C, dan D tergantung dari tingkat keakuratan yang dicapai. Game ini bisa dimainkan secara multiplayer. Source code dari game ini juga tersedia di [Github](https://github.com/ppy/osu).

<br />

Lantas osu!lazer ini apa ? apakah berbeda dengan osu! biasa. Bedasarkan [video percakapan tentang osu!lazer](https://www.youtube.com/watch?v=Tsjx5SkHsfE) oleh pembuatnya Dean Herbert 'peppy', osu!lazer adalah game osu! yang ditulis ulang untuk mengatasi kompabilitas, dan lazer ini bisa dimainkan di berbagai perangkat. Sebenarnya jika osu! yang berada di [website resmi](https://osu.ppy.sh) game ini sendiri belum support linux sama sekali.

<br />

## Install di linux

Cara yang kali ini akan dilakukan lewat command line, buka CLI dan lakukan cara-cara berikut ini.

1. ### Download file AppImage

Download file osu!lazer AppImage, tunggu sampai selesai.

```sh
cd /tmp
wget https://github.com/ppy/osu/releases/latest/download/osu.AppImage
```

2. ### Buat File osu!lazer Executable

> File ini bisa dijalankan diseluruh linux. Jika mengalami masalah, kunjungi [halaman ini](https://docs.appimage.org/user-guide/troubleshooting/index.html).

Supaya bisa dijalankan, ubah permission file menjadi executable.

```sh
chmod +x ./osu.AppImage
```

3. ### Buat Folder Penampung

Buat folder untuk menampung file AppImage untuk dipindahkan ke folder `/opt` dan ubah permission folder menjadi root.

```sh
mkdir Osu
mv ./osu.AppImage ../Osu
sudo chown -R root:root ./Osu
sudo mv ./Osu /opt
```

4. ### Tambahkan osu!lazer ke System Path

Buat symbolic link supaya bisa diakses dimana saja dalam komputer.

```sh
sudo ln -s /opt/Osu/osu.AppImage /usr/bin/osu
```

5. ### Menjalankannya

Untuk menjalankannya tinggal mengetikkan osu dan tunggu clientnya terbuka.

```sh
osu
```

## Download Beatmap

Beatmap adalah lagu ritme yang didownload untuk dimainkan. Di lazer ini bisa di download di dalam game, tetapi harus login terlebih dahulu. Untuk register akun bisa dalam game dan setelah itu aktivasi lewat email yang sudah dikirim.

<br />

## Screenshot

![Screenshot Game osu!lazer](./screenshot.png)

<br/><br/>

Jadi begitulah install osu!lazer di linux, jika ada pertanyaan bisa komen di kolom komentar di bawah :) Terimakasih.
