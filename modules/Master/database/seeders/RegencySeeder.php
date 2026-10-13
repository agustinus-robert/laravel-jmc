<?php

namespace Modules\Master\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Modules\Master\Models\Province;
use Modules\Master\Models\Regency;

class RegencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinceIds = Province::pluck('id')->toArray();
        if (empty($provinceIds)) {
            $this->command->warn('Tabel ref_provinces masih kosong. Jalankan ProvinceSeeder terlebih dahulu!');
            return;
        }

        $regencies = [
            'Kabupaten Bogor',
            'Kabupaten Bandung',
            'Kota Bandung',
            'Kota Surabaya',
            'Kabupaten Sidoarjo',
            'Kota Semarang',
            'Kabupaten Banyumas',
            'Kota Medan',
            'Kabupaten Deli Serdang',
            'Kota Makassar',
            'Kota Denpasar',
            'Kabupaten Badung',
            'Kota Yogyakarta',
            'Kabupaten Sleman',
            'Kota Palembang',
            'Kota Balikpapan',
            'Kota Samarinda',
            'Kota Banjarmasin',
            'Kota Manado',
            'Kota Padang',
        ];

        foreach ($regencies as $regencyName) {
            Regency::firstOrCreate([
                'name' => $regencyName,
                'slug' => Str::slug($regencyName),
            ], [
                'province_id' => $provinceIds[array_rand($provinceIds)],
            ]);
        }
    }
}
