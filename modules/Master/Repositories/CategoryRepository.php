<?php

namespace Modules\Master\Repositories;

use Modules\Master\Models\Category;

class CategoryRepository
{
    public function paginate(array $filters)
    {
        return Category::query()
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
        $category = new Category();

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function getFromId($id)
    {
        return Category::where('id', $id)->get();
    }

    public function updated($id, $array)
    {
        $category = Category::findOrFail($id);

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function deleted($id)
    {
        $category = Category::findOrFail($id);

        return $category->delete();
    }
}
