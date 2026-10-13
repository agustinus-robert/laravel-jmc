<?php

namespace Modules\Transaction\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IncomingRequests extends FormRequest
{
    public function rules(): array
    {
        return [
            'operator_id' => ['required', 'integer', 'exists:users,id'],
            'incoming_from' => ['required', 'string', 'max:255'],
            'referenced' => ['nullable', 'string', 'max:255'],
            'category_id' => ['required', 'integer', 'exists:mst_categories,id'],
            'sub_category_id' => [
                'required',
                'integer',
                'exists:mst_sub_categories,id',
            ],
            'file' => ['nullable', 'file', 'max:5120'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.id' => ['nullable', 'integer'],
            'items.*.name' => ['required', 'string', 'max:255'],
            'items.*.harga' => ['required', 'numeric', 'min:0'],
            'items.*.qty' => ['required', 'numeric', 'min:1'],
            'items.*.uom' => ['required', 'string', 'max:50'],
            'items.*.total' => ['required', 'numeric', 'min:0'],
            'items.*.expired' => ['nullable', 'date'],
        ];
    }
}
