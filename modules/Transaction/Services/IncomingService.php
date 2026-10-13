<?php

namespace Modules\Transaction\Services;

use Modules\Transaction\Repositories\IncomingRepository;

class IncomingService
{
    public function __construct(
        protected IncomingRepository $incomingRepository
    ) {}

    public function paginate(array $filters)
    {
        return $this->incomingRepository->paginate($filters);
    }

    public function form($id = null, array $data = [])
    {
        if (empty($id)) {
            return $this->incomingRepository->stored($data);
        }

        return $this->incomingRepository->updated($id, $data);
    }

    public function deletion($id)
    {
        return $this->incomingRepository->deleted($id);
    }
}
