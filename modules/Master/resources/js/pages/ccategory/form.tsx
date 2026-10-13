import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import { ListTree } from 'lucide-react';

interface CoreCategory {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    ccategory?: CoreCategory;
}

interface FormData {
    name: string;
    slug: string;
}

export default function CategoryForm({ ccategory }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        name: ccategory?.name ?? '',
        slug: ccategory?.slug ?? '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (ccategory) {
            put(
                route('master.core-category.update', {
                    core_category: ccategory.id,
                }),
                {
                    onSuccess: () => {
                        toast.success('Core Kategori berhasil masuk');
                    },

                    onError: () => {
                        toast.error('Gagal memperbarui Core kategori.');
                    },
                },
            );
        } else {
            post(route('master.core-category.store'), {
                onSuccess: () => {
                    toast.success('Core Kategori berhasil ditambahkan.');
                },

                onError: () => {
                    toast.error('Gagal menambahkan core kategori.');
                },
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={processing}>
                <div className="border-b border-slate-800 px-6 py-4">
                    <h2 className="flex gap-3 text-lg font-semibold text-slate-100">
                        <ListTree></ListTree>
                        {ccategory
                            ? 'Pembaruan Core Kategori'
                            : 'Buat Core Kategori'}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        {ccategory
                            ? 'Perbarui data core kategori yang sudah ada.'
                            : 'Tambahkan core kategori baru ke dalam sistem.'}
                    </p>
                </div>

                <div className="space-y-4 p-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium"
                        >
                            Nama
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => {
                                const name = e.target.value;

                                setData({
                                    name,
                                    slug: name
                                        .toLowerCase()
                                        .trim()
                                        .replace(/\s+/g, '-')
                                        .replace(/[^\w-]/g, ''),
                                });
                            }}
                            placeholder="Masukkan nama core kategori"
                            className="w-full rounded-md border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none focus:border-primary"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="slug"
                            className="mb-1 block text-sm font-medium"
                        >
                            Slug
                        </label>

                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={data.slug}
                            readOnly
                            className="w-full rounded-md border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none"
                        />
                    </div>
                </div>
            </fieldset>

            <div className="flex justify-end gap-2 border-t border-slate-800 px-6 py-4">
                <button
                    type="button"
                    disabled={processing}
                    className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Kembali
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing
                        ? ccategory
                            ? 'Memperbarui...'
                            : 'Menyimpan...'
                        : ccategory
                          ? 'Perbarui'
                          : 'Simpan'}
                </button>
            </div>
        </form>
    );
}
