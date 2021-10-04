
Haloo aku fleetime.

Ahhirnya bisa nulis buat blog pertamaku, berhubung aku lagi re-learning git.
Aku mau share catetanku nih untuk yang (hopefully) baca blog ku hehe..

Okay langsung aja ya semoga bermanfaat untuk kalian dan untukku juga dimasa depan kalo aku lupa git bisa kesini.


## Instalasi 
Jangan lupa *install* git nya terlebih dahulu agar bisa ketik "git" di *command prompt*

Software git bisa di donwload di sini :

🖥 | https://git-scm.com/download/win
🍎 | https://git-scm.com/download/mac
🐧 | https://git-scm.com/download/linux

terus installnya tinggal next next aja seperti install software pada umumnya.

## Inisialisasi

Untuk buat repository baru (repository itu folder yang di git), Klik kanan new folder trus navigasikan ke folder tersebut
Kemudian buka cmd untuk menginisialisasi dengan git gunakan command :

Untuk membuat folder baru:
```sh
mkdir <directory>
```

Lalu untuk pindah ke folder tersebut:
```sh
cd <directory>
```

Kemudian inisialisasi dengan git:
```sh
git init
```

## Menambahkan file

Seiring kalian menambah dan mengedit file yang berada di dalam repository, perubahan yang kalian buat belum tersimpan ke repo, untuk menambahkan file ke dalam repo gunakan:
```sh
git add .
```

kalo untuk menghapus gunakan:
```sh
git remove <filename>
```

## Menyimpan perubahan
Untuk mencommit file atau menyimpan perubahan yang ada di dalam repository :
```sh
git commit -m "commit message"
```
simpan beserta dengan commit message yang readable dan jelas agar memudahkan 
maintainer lain untuk membaca apa saja yang berubah. 

P.S Ikuti prosedur standar penulisan commit message yang baik (*best practice*) di sini : *[Conventional Commits Message](https://www.conventionalcommits.org/en/v1.0.0/)*

## Mengirim ke remote repository
Untuk mengirim kode yang sudah di commit tadi ke remote repository seperti Github, Gitlab, Bitbucket gunakan:
```sh
git push origin master
```

## Mengganti Branch
Branch merupakan fitur percabangan pada repository yang biasanya digunakan untuk mencoba fitur fitur sebelum di push ke master branch.

Ketika kamu meng-init pada repository *head* branchnya adalah "master/default". 

Untuk mendevelop fitur tanpa mengubah commit pada branch master, buat branch baru:
```sh
git checkout -b <branch>
```
Pastikan push untuk mengubah perubahan di remote repository

<br>

Jika tidak suka dengan perubahannya bisa di rollback dan dihapus dengan menggunakan:
```sh
git checkout ℎ𝑒𝑎𝑑
git branch -d <branch>
```

Jika suka dengan perubahan dan ingin menggabungkan ke master branch gunakan:
```sh
git checkout ℎ𝑒𝑎𝑑
git merge <branch>
```

## Sinkronkan repo
Kalian bisa sinkronkan di local machine dengan remote repository dengan:
```sh
git pull
```

## Penutup
Masih banyak perintah perintah git yang ada yang dapat membantu dan mengorganisir projek kalian, saya sarankan untuk membaca dokumentasi git yang bisa dibaca disini : 

git-scm.com/doc