<?php

namespace Modules\Transaction\Services;

use Illuminate\Support\Facades\DB;
use Modules\Transaction\Repositories\IncomingRepository;
use Modules\Transaction\Repositories\IncomingItemRepository;

class IncomingService
{
    public function __construct(
        protected IncomingRepository $incomingRepository,
        protected IncomingItemRepository $incomingItemRepository
    ) {}

    public function paginate(array $filters)
    {
        return $this->incomingRepository->paginate($filters);
    }

    public function getFromId($id)
    {
        return $this->incomingRepository->getFromId($id);
    }

    public function form($id = null, array $data = [])
    {
        return DB::transaction(function () use ($id, $data) {
            $items = $data['items'] ?? [];

            unset($data['items']);

            $grandTotal = 0;

            foreach ($items as &$item) {
                $item['harga'] = (int) ($item['harga'] ?? 0);
                $item['qty'] = (int) ($item['qty'] ?? 0);
                $item['total'] = $item['harga'] * $item['qty'];

                $grandTotal += $item['total'];
            }

            unset($item);

            $data['grand_total'] = $grandTotal;

            if (empty($id)) {
                $incoming = $this->incomingRepository->stored($data);
            } else {
                $incoming = $this->incomingRepository->updated(
                    $id,
                    $data
                );
            }

            if (! empty($id)) {
                $this->incomingItemRepository
                    ->deleteByIncomingId($incoming->id);
            }

            foreach ($items as $item) {
                unset($item['id']);

                $item['incoming_id'] = $incoming->id;

                $this->incomingItemRepository->stored($item);
            }

            return $incoming->load('items');
        });
    }

    public function deletion($id)
    {
        return DB::transaction(function () use ($id) {
            $this->incomingItemRepository->deleteByIncomingId($id);

            return $this->incomingRepository->deleted($id);
        });
    }
}
