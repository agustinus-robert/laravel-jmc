<?php

namespace Modules\Master\Repositories;

use Modules\Master\Models\CoreCategory;

class CoreCategoryRepository
{
    public function paginate(array $filters)
    {
        return CoreCategory::query()
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
        $category = new CoreCategory();

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function getFromId($id)
    {
        return CoreCategory::where('id', $id)->get();
    }

    public function updated($id, $array)
    {
        $category = CoreCategory::findOrFail($id);

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function deleted($id)
    {
        $category = CoreCategory::findOrFail($id);

        return $category->delete();
    }
}
