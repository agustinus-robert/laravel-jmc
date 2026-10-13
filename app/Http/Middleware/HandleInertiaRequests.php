<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Modules\Builder\Models\Menu;
use Modules\Cms\Models\TransactionPost;
use Modules\Master\Models\Category;
use Modules\Master\Models\Tag;
use Modules\Master\Models\CoreCategory;
use Modules\Master\Models\CoreTag;
use Modules\Master\Models\Language;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            'name' => config('app.name'),
            'languages' => $this->languages(),

            'auth' => [
                'user' => $request->user(),
            ],

            'can' => $request->user()?->permissionMap() ?? [],

            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
        ];
    }

    private function prepareMenuItems(
        $items,
        array $categories,
        array $tags
    ): void {
        foreach ($items as $item) {
            $item->itemTaxonomies->each(
                function ($taxonomy) use ($categories, $tags) {
                    $type = $taxonomy->modelable_type;

                    if ($type === CoreCategory::class) {
                        $taxonomy->setAttribute(
                            'options',
                            $categories
                        );
                    } elseif ($type === CoreTag::class) {
                        $taxonomy->setAttribute(
                            'options',
                            $tags
                        );
                    } else {
                        $taxonomy->setAttribute(
                            'options',
                            []
                        );
                    }

                    $taxonomy->setAttribute(
                        'value',
                        $taxonomy->modelable_id
                    );
                }
            );

            if ($item->childrenRecursive->isNotEmpty()) {
                $this->prepareMenuItems(
                    $item->childrenRecursive,
                    $categories,
                    $tags
                );
            }
        }
    }

    private function languages()
    {
        return Language::query()
            ->select([
                'id',
                'name',
                'slug',
            ])
            ->orderBy('id')
            ->get()
            ->map(fn($language) => [
                'id' => $language->id,
                'name' => $language->name,
                'slug' => $language->slug,
            ])
            ->values()
            ->all();
    }
}
