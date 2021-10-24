---
author: FathRa
title: Laravel Test dengan TestCase CRUD Sederhana.
description: Tutorial melakukan laravel test dengan kasus CRUD sederhana.
---

![Screenshot Game osu!lazer](./laravel.png)

# Laravel Test dengan Test Case CRUD Sederhana.

Disini saya akan mencoba memberikan contoh penggunaan Unit Test pada Laravel, di sini saya menggunakan Laravel versi 8. Disini saya akan menggunakan Test Case sederhana, yaitu CRUD User.

Disini saya asumsikan teman-teman telah menginstall project Laravel yang masih *fresh*.

Karena pada saat menginstall project laravel `Model,Migration dan UserFactory` sudah otomatis terbuat, jadi kita hanya perlu membuat Controller, Test dan View nya saja.

1. Buat UserController dengan mengetikan `php artisan make:controller -r` pada command line. Flag -r atau --resource digunakan untuk membuat method CRUD (index, create, store, show, edit, update, destroy) secara otomatis.
2. Buat UserTest dengan mengetikan `php artisan make:test UserTest` pada command line.
3.  Buat View untuk page CRUD kita dengan menambahkan folder `user` pada directory `resourse/views` dan mengisi folder tersebut dengan file :
    * index.blade.php
    * create.blade.php
    * edit.blade.php
    * show.blade.php

Seletah itu, buka file `routes/web.php`. Pada `web.php`, tambahkan route resource untuk mengakses UserController.
`Route::resource('user', UserController::class);`
dan pastikan teman teman meng-import namespace nya
`use App/Http/Controller/UserController`.

### 1. Index Method
Buka file UserController.php yang ada pada `app/Http/Controller/UserController.php`

Pada method `index()` ketikan kode berikut
```
$users = User::get();

return view('user.index', compact('users'));
```
Seletah itu buka file `resources/views/user/index,blade.php` dan ketikan kode berikut:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Index Page</title>
</head>
<body>
    Index Page
    <br>
    <br>

    @if ($message = Session::get('destroyed'))
        
        <p>{{ $message }}</p>
    @endif

    <a href="{{ route('user.create') }}">Create</a>
    
    <br>
    <br>

    <table border="1">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @php
                $no = 0;
            @endphp

            @forelse ($users as  $item)
                <tr>
                    <td>{{ $no++ }}</td>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->email }}</td>
                    <td>
                        <form action="{{ route('user.destroy',$item->id) }}" method="POST">
                            <a href="{{ route('user.edit', $item->id) }}">Edit</a>

                            @csrf
                            @method('DELETE')

                            <button type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            @empty
                
            @endforelse
        </tbody>
    </table>
</body>
</html>
```

Kemudian buka file UserTest yang ada pada `tests/Feature/UserTest`. Ubah method `test_example()`
menjadi `test_user_index()` dan ketikan kode berikut :
```
$response = $this->get(route('user.index'));

$response->assertStatus(200)
->assertSee('Index Page');
```
Assert disini merupakan ekspektasi teman-teman ketika berhasil mengakses page tersebut.
`AssertStatus(200)` merupakan ekspektasi ketika berhasil mengakses page dengan status code 200 yang berarti `OK` atau dikanel juga dengan `HTTP_OK`.

`AssertSee('Index Page')` merupakan ekspektasi yang ingin kita lihat ketika berhasil mengakses page tersebut. Disini kita ber ekspektasi ketika kita berhasil mengakses Index page, kita melihat text `Index Page`. Oleh karena itu, buka file index.blade.php yang sudah kita buat sebelum nya yang berada pada `resources/views/user/index.blade.php` dan ketikan `'Index Page'` jika tidak, test akan gagal ketika di jalankan.

Masih banyak assertion yang dapat teman-teman gunakan, untuk informasi kebih lanjut
**[Klik Disini](https://laravel.com/docs/8.x/http-tests#available-assertions)**.

### 2. Create Method
Kembali ke UserController, kemudian pada method `create()` tambahkan kode berikut :
```
return view('user.create');
```

kemudian buka file `create.blade.php` yand berada pada `resources/views/user/create.blade.php`, kemudian ketikan text berikut: 
```
Create Page
```

Setelah itu buka kembali file UserTest dan tambahkan method dengan nama `test_user_create()` lalu ketukan kode berikut
```
$response = $this->get(route('user.create'));
$response->assertStatus(200)
->assertSee('Create Page');
```

### 3. Store Method
Buka kembali UserController, pada method `store()` ketikan kode berikut :
```
 User::create([
    'name'      => $request->name,
    'email'     => $request->email,
    'password'  => Hash::make($request->password),
]);

return redirect()->route('user.index');
```

Pastikan teman-teman mengimport `namespace` dari Model User, `use App\Models\User;` dan juga pastikan teman-teman mengimport `use Illuminate\Support\Facades\Hash;` untuk membuatkan *Hashing* untuk password kita.

Seletah itu buka file `resources/views/user/create.blade.php` dan tambahkan kode berikut :
```
<form action="{{ route('user.store') }}" method="POST">
    @csrf

    <input type="text" name="name" id="">

    <input type="email" name="email" id="">

    <input type="password" name="password" id="">

    <button type="submit">Submit</button>
</form>
```

Kemudian kita kembali ke UserTest dan buat method baru dengan nama `test_user_store()` dan ketikan kode berikut:

```
$user = User::factory()->create();

$response = $this->post(route('user.store'), $user->toArray());

$response->assertStatus(302)
->assertRedirect(route('user.index'));
```

Jika pada saat melakukan test teman-teman mengalami error, teman-teman dapat mencoba kode berikut :
```
 $response = $this->post(route('user.store'), [
    'name'      => $this->faker->name(),
    'email'     => $this->faker->unique()->safeEmail(),
    'password'  => Hash::make('password'),
]);

$response->assertStatus(302)
->assertRedirect(route('user.index'));
```
Pastikan teman-teman mengimport namespace pada Model User dan juga pengimport Hash nya dan jangan lupa untuk menggunakan `use WithFaker` pada `Class UserTest` nya.

### 4. Show Method
Kembali lagi ke UserController, pada method `show($id)` dan ketikan kode berikut:
```
$user = User::find($id);
return view('user.show', compact('user'));
```
Seletah itu buka file `show.blade.php` dan ketikan kode berikut:
```
{{ $user->name }}
```

Kemudian kembali ke UserTest dan buat method `test_user_show()` dan ketikan kode berikut : 
```
$user = User::factory()->create();
$user = User::find($user->id);

$response = $this->get(route('user.show', $user->id));

$response->assertStatus(200)
->assertSee($user->name);
```

### 5. Edit Method
Buka fild UserController, pada method edit($id) ketikan kode berikut:
```
$user = User::find($id);
return view('user.edit', compact('user'));
```

Buka file `edit.blade.php` dan ketikan kode berikut:
```
Edit {{ $user->name }}
```

Buka file `UserTest` dan buat method `test_user_edit()`, serta ketikan kode berikut:
```
$user = User::factory()->create();
$user = User::find($user->id);

$response = $this->get(route('user.edit', $user->id));

$response->assertStatus(200)
->assertSee($user->name);
```

### 6. Update Method
Buka file `UserController`, pada method `update(Request $request, $id)` ketikan kode berikut:
```
User::find($id)->update([
   'name'      => $request->name,
   'email'     => $request->email,
   'password'  => Hash::make($request->password),
]);

return redirect()->route('user.index');
```

Pastikan teman-teman mengimport namespace Model User dan juga Hash-nya.

Kemudian buka fild `edit.blade.php` dan tambahkan kode berikut:
```
<form action="{{ route('user.update', $user->id) }}" method="POST">
    @csrf
    @method('PUT')

    <input type="text" name="name" value="{{ old('name') ?? $user->name }}" id="">

    <input type="email" name="email" value="{{ old('email') ?? $user->email }}" id="">

    <input type="password" name="password" id="">

    <button type="submit">Update</button>
</form>
```
Setelah itu buka file UserTest dan buat method baru dengan nama `test_user_update` dan ketikan kode berikut:
```
$user = User::factory()->create();
$user = User::find($user->id);

$response = $this->put(route('user.update', $user->id), $user->toArray(),[
  'name'      => 'updated name',
  'email'     => 'updated@email.com',
  'password'  => Hash::make('updated_password')
]);

$response->assertStatus(302)
->assertRedirect(route('user.index'));
```

### 7. Destroy Method
Buka UserController, pada method `destroy($id)`, ketikan kode berikut:
```
User::find($id)->delete();

return redirect()->back()->with('destroyed',"Data telah dihapus");
```

Kemudian buka file UserTest lalu buat method baru dengan nama `test_user_destroy()`, lalu ketikan kode berikut:
```
$user = User::factory()->create();
$user = User::find($user->id);

$response = $this->delete(route('user.destroy', $user->id));

$response->assertStatus(302)
->assertSessionHas('destroyed','Data telah dihapus');
```

Jika teman-teman telah menyelesaikan semua instruksi diatas, teman-teman dapat melakukan test dengan cara mengetikan perintah `php artisan test`.

Teman-teman dapat mengaktifkan fitur `RefreshDatabase` dengan mengetikan `use RefreshDatabase;` agar data yang dibuat oleh Faker tidak tersimpan di database.

## Overview UserController.php
```
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $users = User::get();

        return view('user.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('user.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
        ]);

        return redirect()->route('user.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        return view('user.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);

        return view('user.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        User::find($id)->update([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
        ]);

        return redirect()->route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::find($id)->delete();

        return redirect()->back()->with('destroyed',"Data telah dihapus");
    }
}
```
## Overview UserTest.php
```
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    /**
     * A basic feature test example.
     *s
     * @return void
     */
    public function test_user_index()
    {
        $response = $this->get(route('user.index'));

        $response->assertStatus(200)
            ->assertSee('Index Page');
    }

    public function test_user_create()
    {
        $response = $this->get(route('user.create'));

        $response->assertStatus(200)
            ->assertSee('Create Page');
    }

    public function test_user_store()
    {
        $response = $this->post(route('user.store'), [
            'name'      => $this->faker->name(),
            'email'     => $this->faker->unique()->safeEmail(),
            'password'  => Hash::make('password'),

        ]);

        $response->assertStatus(302)
            ->assertRedirect(route('user.index'));
    }

    public function test_user_show()
    {
        $user = User::factory()->create();
        $user = User::find($user->id);

        $response = $this->get(route('user.show', $user->id));

        $response->assertStatus(200)
            ->assertSee($user->name);
    }

    public function test_user_edit()
    {
        $user = User::factory()->create();
        $user = User::find($user->id);

        $response = $this->get(route('user.edit', $user->id));

        $response->assertStatus(200)
            ->assertSee($user->name);
    }

    public function test_user_update()
    {
        $user = User::factory()->create();
        $user = User::find($user->id);

        $response = $this->put(route('user.update', $user->id), $user->toArray(),[
            'name'      => 'updated name',
            'email'     => 'updated@email.com',
            'password'  => Hash::make('updated_password')
        ]);

        $response->assertStatus(302)
        ->assertRedirect(route('user.index'));
    }

    public function test_user_destroy()
    {
        $user = User::factory()->create();
        $user = User::find($user->id);

        $response = $this->delete(route('user.destroy', $user->id));

        $response->assertStatus(302)
        ->assertSessionHas('destroyed','Data telah dihapus');
    }
}
```
Teman-teman juga dapat melakukan crud manual dengan cara mengakses `route('user.index')`, untuk info lebih lanjut, teman-teman dapat info route dengan mengetikan perintah `php artisan route:list`.

Sekian sedikit penjelasan dari saya, mohon maaf bila ada kekurangan, sekian dan terimakasih ✌.