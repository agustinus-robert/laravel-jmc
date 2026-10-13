<?php

namespace Modules\Account\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Modules\Account\Models\Role;
use App\Models\User;
use Modules\Account\Services\UserService;
use Modules\Account\Requests\UserRequests;
use Inertia\Inertia;

class UserController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected UserService $userService) {}

    public function index(Request $request)
    {
        //Gate::authorize('create', User::class);
        //$this->authorize('permission', ['user', 'create']);

        $users = $this->userService->paginate(
            $request->only([
                'name',
                'dateFrom',
                'dateTo',
                'archived',
            ])
        );

        return Inertia::render('account/user/index', [
            'user' => $users
        ]);
    }

    public function create(Request $request)
    {
        // $this->authorize('permission', ['dashboard', 'create']);

        $roles = Role::get();

        return Inertia::render('account/user/form', [
            'roles' => $roles,
        ]);
    }

    public function store(UserRequests $request)
    {
        $data = $request->validated();

        try {
            $this->userService->form(null, $data);
        } catch (\Throwable $e) {
            dd($e->getMessage());
            return back()
                ->withErrors([
                    'message' => $e->getMessage(),
                ])
                ->withInput();
        }
    }

    public function edit(User $user)
    {
        $roles = Role::get();

        $user->load('roles');

        return Inertia::render('account/user/form', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->roles->first()?->id ?? 0,
            ],
            'roles' => $roles,
        ]);
    }

    public function update(User $user, UserRequests $request)
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        try {
            $this->userService->form($user->id, $data);
        } catch (\Throwable $e) {
            return back()
                ->withErrors([
                    'message' => $e->getMessage(),
                ])
                ->withInput();
        }
    }

    public function destroy(User $user)
    {
        try {
            $this->userService->deletion($user->id);
        } catch (\Throwable $e) {
            return back()
                ->withErrors([
                    'message' => $e->getMessage(),
                ])
                ->withInput();
        }
    }
}
