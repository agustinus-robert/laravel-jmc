# Laravel Modular System

Sistem modular Laravel dengan auto discovery module menggunakan `ModuleServiceProvider`.

Setiap module berdiri sendiri dan dapat digunakan kembali pada project Laravel lain tanpa registrasi manual.

## Struktur Project

```text
app/
└── Providers/
    └── ModuleServiceProvider.php

modules/
└── Account/
    ├── module.json
    ├── Providers/
    │   └── AccountServiceProvider.php
    ├── Controllers/
    ├── Models/
    ├── Routes/
    │   ├── web.php
    │   └── api.php
    ├── Resources/
    │   └── views/
    ├── Database/
    │   └── migrations/
    └── Config/
```

## Instalasi

1. Tambahkan autoload module pada `composer.json`:

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Modules\\": "modules/"
        }
    }
}
```

2. Jalankan command:

```bash
composer dump-autoload
```

3. Tambahkan provider di `bootstrap/providers.php`:

```php
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\ModuleServiceProvider::class,
];
```

## Membuat Module

Gunakan command:

```bash
php artisan module:make Account
```

Hasil:
```text
modules/Account
```

## Module Configuration

Setiap module memiliki file konfigurasi di `modules/Account/module.json`:

```json
{
    "name": "Account",
    "enabled": true,
    "namespace": "Modules\\Account",
    "provider": "Modules\\Account\\Providers\\AccountServiceProvider"
}
```

## Module Provider

Lokasi: `modules/Account/Providers/AccountServiceProvider.php`

Provider bertugas melakukan load:
- Routes
- Views
- Migration
- Config

Contoh:

```php
<?php

namespace Modules\Account\Providers;

use Illuminate\Support\ServiceProvider;

class AccountServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        $modulePath = realpath(__DIR__.'/..');

        if (is_file($modulePath.'/Routes/web.php')) {
            $this->loadRoutesFrom(
                $modulePath.'/Routes/web.php'
            );
        }

        if (is_file($modulePath.'/Routes/api.php')) {
            $this->loadRoutesFrom(
                $modulePath.'/Routes/api.php'
            );
        }

        if (is_dir($modulePath.'/Resources/views')) {
            $this->loadViewsFrom(
                $modulePath.'/Resources/views',
                'account'
            );
        }

        if (is_dir($modulePath.'/Database/migrations')) {
            $this->loadMigrationsFrom(
                $modulePath.'/Database/migrations'
            );
        }

        if (is_file($modulePath.'/Config/config.php')) {
            $this->mergeConfigFrom(
                $modulePath.'/Config/config.php',
                'account'
            );
        }
    }
}
```

## Membuat Route Module

Lokasi: `modules/Account/Routes/web.php`

Contoh:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::prefix('account')
    ->as('account.')
    ->group(function () {

        Route::get('/account-test', function () {
            return 'Account Module';
        })->name('index');

    });
```

Cek route:

```bash
php artisan route:list
```

Hasil:
```text
GET account/account-test account.index
```

Pemanggilan:

```php
route('account.index')
```

## Controller Module

Lokasi: `modules/Account/Controllers/`

Contoh:

```php
<?php

namespace Modules\Account\Controllers;

use Illuminate\Routing\Controller;

class AccountController extends Controller
{
    public function index()
    {
        return 'Account';
    }
}
```

## Model Module

Lokasi: `modules/Account/Models/`

Contoh:

```php
<?php

namespace Modules\Account\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{

}
```

## View Module

Lokasi: `modules/Account/Resources/views`

Pemanggilan:

```php
return view('account::index');
```

## Migration Module

Lokasi: `modules/Account/Database/migrations`

Jalankan:

```bash
php artisan migrate
```

## Config Module

Lokasi: `modules/Account/Config/config.php`

Akses:

```php
config('account.key');
```

## Menonaktifkan Module

Edit `modules/Account/module.json` dan ubah:

```json
{
    "enabled": false
}
```

Module tidak akan dimuat.

## Membuat Module Baru

Contoh struktur direktori:

```text
modules/
├── Account
├── Product
├── Order
└── Blog
```

Struktur setiap module:

```text
ModuleName/
├── module.json
├── Providers/
├── Controllers/
├── Models/
├── Routes/
├── Resources/
├── Database/
└── Config/
```

## Clear Cache

Setelah menambah atau mengubah module:

```bash
composer dump-autoload
php artisan route:clear
php artisan config:clear
```

## Namespace Standard

Contoh module: `modules/Product`

- Namespace: `Modules\Product`
- Controller: `Modules\Product\Controllers\ProductController`
- Model: `Modules\Product\Models\Product`
- Provider: `Modules\Product\Providers\ProductServiceProvider`

## Tujuan

Sistem ini dibuat agar:
- Module dapat dipindahkan antar project Laravel.
- Module tidak tergantung versi Laravel tertentu.
- Module dapat aktif atau nonaktif melalui konfigurasi.
- Tidak perlu registrasi provider secara manual.
- Setiap fitur memiliki struktur kode sendiri.
