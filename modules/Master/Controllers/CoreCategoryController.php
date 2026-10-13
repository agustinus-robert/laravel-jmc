<?php

namespace Modules\Master\Controllers;

use Illuminate\Http\Request;
use Modules\Master\Models\CoreCategory;
use Illuminate\Routing\Controller;
use Modules\Master\Requests\CoreCategoryRequests;
use Modules\Master\Services\CoreCategoryService;
use Inertia\Inertia;

class CoreCategoryController extends Controller
{
    public function __construct(
        protected CoreCategoryService $coreCategoryService
    ) {}

    public function index(Request $request)
    {
        $coreCategories = $this->coreCategoryService->paginate(
            $request->only([
                'name',
                'dateFrom',
                'dateTo',
                'archived',
            ])
        );

        return Inertia::render('master/ccategory/index', [
            'ccategories' => $coreCategories
        ]);
    }

    public function create()
    {
        return Inertia::render('master/ccategory/form');
    }

    public function edit(CoreCategory $core_category)
    {
        return Inertia::render('master/ccategory/form', [
            'ccategory' => $core_category
        ]);
    }

    public function store(CoreCategoryRequests $request)
    {
        $data = $request->validated();

        try {
            $this->coreCategoryService->form(null, $data);
        } catch (\Throwable $e) {
            dd($e->getMessage());
            return back()
                ->withErrors([
                    'message' => $e->getMessage(),
                ])
                ->withInput();
        }
    }

    public function update(CoreCategory $coreCategory, CoreCategoryRequests $request)
    {
        $data = $request->validated();

        try {
            $this->coreCategoryService->form($coreCategory->id, $data);
        } catch (\Throwable $e) {
            return back()
                ->withErrors([
                    'message' => $e->getMessage(),
                ])
                ->withInput();
        }
    }

    public function destroy(CoreCategory $coreCategory)
    {
        try {
            $this->coreCategoryService->deletion($coreCategory->id);
        } catch (\Throwable $e) {
            return back()
                ->withErrors([
                    'message' => $e->getMessage(),
                ])
                ->withInput();
        }
    }
}
