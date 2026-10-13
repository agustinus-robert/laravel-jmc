import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import IncomingFormGeneral from './general';
import IncomingItemsForm, {
    type IncomingItem,
} from './items';

interface Category {
    id: number;
    name: string;
}

interface SubCategory {
    id: number;
    name: string;
}

interface Operator {
    id: number;
    name: string;
}

interface Incoming {
    id: number;
    operator_id: number | null;
    category_id: number | null;
    sub_category_id: number | null;
    incoming_from: string;
    referenced: string | null;
    file: string | null;
    items: IncomingItem[];
}

interface Props {
    incoming?: Incoming;
    categories: Category[];
    subCategories: SubCategory[];
    operators: Operator[];
}

interface FormData {
    operator_id: number;
    category_id: number;
    sub_category_id: number;
    incoming_from: string;
    referenced: string;
    file: File | null;
    items: IncomingItem[];
}

export default function Form({
    incoming,
    categories,
    subCategories,
    operators,
}: Props) {
    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
    } = useForm<FormData>({
        operator_id: incoming?.operator_id ?? 0,
        category_id: incoming?.category_id ?? 0,
        sub_category_id: incoming?.sub_category_id ?? 0,
        incoming_from: incoming?.incoming_from ?? '',
        referenced: incoming?.referenced ?? '',
        file: null,
        items: incoming?.items?.map((item) => ({
            ...item,
            harga: Number(item.harga),
            qty: Number(item.qty),
            total: Number(item.total),
            expired: item.expired?.slice(0, 10) ?? '',
        })) ?? [
            {
                name: '',
                harga: 0,
                qty: 1,
                uom: '',
                total: 0,
                expired: '',
            },
        ],
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (incoming) {
            transform((formData) => ({
                ...formData,
                _method: 'put',
            }));
        }

        post(
            incoming
                ? route('transaction.incoming.update', {
                      incoming: incoming.id,
                  })
                : route('transaction.incoming.store'),
            {
                forceFormData: true,
                onSuccess: () => {
                    toast.success(
                        incoming
                            ? 'Transaksi berhasil diperbarui.'
                            : 'Transaksi berhasil ditambahkan.',
                    );
                },
                onError: () => {
                    toast.error('Gagal menyimpan transaksi.');
                },
            },
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={processing}>
                <IncomingFormGeneral
                    data={data}
                    setData={setData}
                    categories={categories}
                    subCategories={subCategories}
                    operators={operators}
                    errors={errors}
                    currentFile={incoming?.file}
                />

                <IncomingItemsForm
                    items={data.items}
                    onChange={(items) => setData('items', items)}
                    errors={errors as Record<string, string>}
                />
            </fieldset>

            <div className="flex justify-end gap-2 border-t border-slate-800 px-6 py-4">
                <button
                    type="button"
                    disabled={processing}
                    onClick={() => window.history.back()}
                    className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300"
                >
                    Kembali
                </button>

                <button
                    type="submit"
                    disabled={processing || data.items.length === 0}
                    className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                    {processing
                        ? 'Menyimpan...'
                        : incoming
                          ? 'Perbarui'
                          : 'Simpan'}
                </button>
            </div>
        </form>
    );
}
