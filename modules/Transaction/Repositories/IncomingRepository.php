<?php

namespace Modules\Transaction\Repositories;

use Modules\Transaction\Models\Incoming;

class IncomingRepository
{
    public function paginate(array $filters)
    {
        return Incoming::query()
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
        $category = new Incoming();

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function getFromId($id)
    {
        return Incoming::where('id', $id)->get();
    }

    public function updated($id, $array)
    {
        $category = Incoming::findOrFail($id);

        $category->fill($array);
        $category->save();

        return $category;
    }

    public function deleted($id)
    {
        $category = Incoming::findOrFail($id);

        return $category->delete();
    }
}
