<?php

namespace Modules\Transaction\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Modules\Master\Models\Category;
use Modules\Master\Models\SubCategory;
use Modules\Transaction\Exports\IncomingExport;
use Modules\Transaction\Models\Incoming;
use Modules\Transaction\Requests\IncomingRequests;
use Modules\Transaction\Services\IncomingService;

class IncomingController extends Controller
{
    public function __construct(
        protected IncomingService $incomingService
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only([
            'category_id',
            'sub_category_id',
            'year',
            'search',
            'sort',
            'direction',
            'dateFrom',
            'dateTo',
            'archived',
        ]);

        $incomings = $this->incomingService->paginate($filters);

        return Inertia::render('transaction/incoming/index', [
            'incomings' => $incomings,
            'filters' => $filters,

            'categories' => Category::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),

            'subCategories' => SubCategory::query()
                ->select('id', 'category_id', 'name')
                ->orderBy('name')
                ->get(),

            'years' => Incoming::query()
                ->selectRaw('YEAR(created_at) as year')
                ->distinct()
                ->orderByDesc('year')
                ->pluck('year'),
        ]);
    }

    public function create()
    {
        return Inertia::render('transaction/incoming/form', [
            'categories' => $this->getCategories(),
            'subCategories' => $this->getSubCategories(),
            'operators' => $this->getOperators(),
            'isAdmin' => $this->isAdmin(),
            'currentOperatorId' => Auth::id(),
        ]);
    }

    public function edit(Incoming $incoming)
    {
        if (! $this->isAdmin()) {
            abort_unless(
                (int) $incoming->operator_id === (int) Auth::id(),
                403
            );
        }

        $incoming->load('items');

        return Inertia::render('transaction/incoming/form', [
            'incoming' => $incoming,
            'categories' => $this->getCategories(),
            'subCategories' => $this->getSubCategories(),
            'operators' => $this->getOperators(),
            'isAdmin' => $this->isAdmin(),
            'currentOperatorId' => Auth::id(),
        ]);
    }

    public function export(Request $request)
    {
        $filters = $request->only([
            'category_id',
            'sub_category_id',
            'year',
            'search',
            'sort',
            'direction',
            'dateFrom',
            'dateTo',
            'archived',
        ]);

        return Excel::download(
            new IncomingExport($filters),
            'data-pemasukan-' . now()->format('Y-m-d-His') . '.xlsx'
        );
    }

    public function store(IncomingRequests $request)
    {
        try {
            $data = $request->validated();

            if (! $this->isAdmin()) {
                $data['operator_id'] = Auth::id();
            }

            $this->incomingService->form(null, $data);

            return to_route('transaction.incoming.index')
                ->with('success', 'Data pemasukan berhasil ditambahkan.');
        } catch (\Throwable $e) {
            Log::error('Gagal menyimpan transaksi masuk', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()
                ->withErrors([
                    'message' => 'Gagal menyimpan transaksi masuk.',
                ])
                ->withInput();
        }
    }

    public function update(
        IncomingRequests $request,
        Incoming $incoming
    ) {
        if (! $this->isAdmin()) {
            abort_unless(
                (int) $incoming->operator_id === (int) Auth::id(),
                403
            );
        }

        try {
            $data = $request->validated();

            if (! $this->isAdmin()) {
                $data['operator_id'] = Auth::id();
            }

            $this->incomingService->form($incoming->id, $data);

            return to_route('transaction.incoming.index')
                ->with('success', 'Data pemasukan berhasil diperbarui.');
        } catch (\Throwable $e) {
            Log::error('Gagal memperbarui transaksi masuk', [
                'incoming_id' => $incoming->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()
                ->withErrors([
                    'message' => 'Gagal memperbarui transaksi masuk.',
                ])
                ->withInput();
        }
    }

    public function destroy(Incoming $incoming)
    {
        if (! $this->isAdmin()) {
            abort_unless(
                (int) $incoming->operator_id === (int) Auth::id(),
                403
            );
        }

        try {
            $this->incomingService->deletion($incoming->id);

            return to_route('transaction.incoming.index')
                ->with('success', 'Data pemasukan berhasil dihapus.');
        } catch (\Throwable $e) {
            Log::error('Gagal menghapus transaksi masuk', [
                'incoming_id' => $incoming->id,
                'message' => $e->getMessage(),
            ]);

            return back()
                ->withErrors([
                    'message' => 'Gagal menghapus transaksi masuk.',
                ]);
        }
    }

    private function isAdmin(): bool
    {
        $user = Auth::user();

        if (! $user instanceof User) {
            return false;
        }

        return $user->roles()
            ->where('slug', 'admin')
            ->exists();
    }

    private function getCategories()
    {
        return Category::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    private function getSubCategories()
    {
        return SubCategory::query()
            ->select('id', 'category_id', 'name', 'price')
            ->orderBy('name')
            ->get();
    }

    private function getOperators()
    {
        $query = User::query()
            ->select('id', 'name')
            ->whereHas('roles', function ($query) {
                $query->where('slug', 'operator');
            });

        if (! $this->isAdmin()) {
            $query->where('id', Auth::id());
        }

        return $query->orderBy('name')->get();
    }
}

