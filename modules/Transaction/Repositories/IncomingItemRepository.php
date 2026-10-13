<?php

namespace Modules\Transaction\Repositories;

use Modules\Transaction\Models\IncomingItem;

class IncomingItemRepository
{
    public function paginate(array $filters)
    {
        return IncomingItem::query()
            ->with('incoming:id,incoming_from')
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
        $item = new IncomingItem();

        $item->fill($array);
        $item->save();

        return $item;
    }

    public function getFromId($id)
    {
        return IncomingItem::findOrFail($id);
    }

    public function updated($id, array $array)
    {
        $item = IncomingItem::findOrFail($id);

        $item->fill($array);
        $item->save();

        return $item;
    }

    public function deleted($id)
    {
        $item = IncomingItem::findOrFail($id);

        return $item->delete();
    }

    public function deleteByIncomingId($incomingId)
    {
        return IncomingItem::where('incoming_id', $incomingId)
            ->delete();
    }
}
