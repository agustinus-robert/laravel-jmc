<?php

namespace Modules\Transaction\Controllers;

use Illuminate\Http\Request;
use Modules\Transaction\Services\IncomingService;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class IncomingController extends Controller
{
    public function __construct(
        protected IncomingService $incomingService
    ) {}

    public function index(Request $request)
    {
        $categories = $this->incomingService->paginate(
            $request->only([
                'name',
                'dateFrom',
                'dateTo',
                'archived',
            ])
        );

        return Inertia::render('master/transaction/index', [
            'categories' => $categories
        ]);
    }
}