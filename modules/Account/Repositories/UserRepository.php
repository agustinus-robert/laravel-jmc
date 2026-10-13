<?php

namespace Modules\Account\Repositories;

use App\Models\User;

class UserRepository
{
    public function paginate(array $filters)
    {
        return User::query()
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
        $roleId = $array['role_id'];
        unset($array['role_id']);

        $user = new User();

        $user->fill($array);
        $user->save();

        $user->roles()->sync([$roleId]);

        return $user;
    }

    public function getFromId($id)
    {
        return User::where('id', $id)->get();
    }

    public function updated($id, $array)
    {
        $roleId = $array['role_id'] ?? null;
        unset($array['role_id']);

        $user = User::findOrFail($id);

        $user->fill($array);
        $user->save();

        if ($roleId) {
            $user->roles()->sync([$roleId]);
        }

        return $user;
    }

    public function deleted($id)
    {
        $user = User::findOrFail($id);

        return $user->delete();
    }
}
