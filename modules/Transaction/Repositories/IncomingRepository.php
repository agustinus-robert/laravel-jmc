<?php

namespace Modules\Transaction\Repositories;

use Modules\Transaction\Models\Incoming;

class IncomingRepository
{
    public function paginate(array $filters)
    {
        return Incoming::query()
            ->with([
                'creator:id,name',
                'category:id,name',
                'subCategory:id,name',
            ])
            ->name($filters['name'] ?? null)
            ->range(
                $filters['dateFrom'] ?? null,
                $filters['dateTo'] ?? null
            )
            ->archived($filters['archived'] ?? null)
            ->paginate(10);
    }

    public function stored(array $array)
    {
        $incoming = new Incoming();

        $incoming->fill($array);
        $incoming->save();

        return $incoming;
    }

    public function getFromId($id)
    {
        return Incoming::query()
            ->with([
                'items',
                'category',
                'subCategory',
                'creator',
            ])
            ->findOrFail($id);
    }

    public function updated($id, array $array)
    {
        $incoming = Incoming::findOrFail($id);

        $incoming->fill($array);
        $incoming->save();

        return $incoming;
    }

    public function deleted($id)
    {
        $incoming = Incoming::findOrFail($id);

        return $incoming->delete();
    }
}
