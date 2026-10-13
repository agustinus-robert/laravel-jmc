<?php

namespace Modules\Master\Services;

use Modules\Master\Repositories\CoreCategoryRepository;

class CoreCategoryService
{
    public function __construct(
        protected CoreCategoryRepository $coreCategoryRepository
    ) {}

    public function paginate(array $filters)
    {
        return $this->coreCategoryRepository->paginate($filters);
    }

    public function form($id = null, array $data = [])
    {
        if (empty($id)) {
            return $this->coreCategoryRepository->stored($data);
        }

        return $this->coreCategoryRepository->updated($id, $data);
    }

    public function deletion($id)
    {
        return $this->coreCategoryRepository->deleted($id);
    }
}
