<?php

namespace Modules\Master\Repositories;

use Modules\Master\Models\SubCategory;

class SubCategoryRepository
{
    public function paginate(array $filters)
    {
        return SubCategory::query()
            ->with('creator:id,name')
            ->name($filters['name'] ?? null)
            ->range(
                $filters['dateFrom'] ?? null,
                $filters['dateTo'] ?? null
            )
            ->archived($filters['archived'] ?? null)
            ->paginate(10);
    }

    public function stored($array)
    {
        $category = new SubCategory();

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function getFromId($id)
    {
        return SubCategory::where('id', $id)->get();
    }

    public function updated($id, $array)
    {
        $category = SubCategory::findOrFail($id);

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function deleted($id)
    {
        $category = SubCategory::findOrFail($id);

        return $category->delete();
    }
}
