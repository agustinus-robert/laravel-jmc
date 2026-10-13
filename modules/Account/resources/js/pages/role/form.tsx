import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import { ListTree } from 'lucide-react';

interface Role {
    id: number;
    name: string;
}

interface Props {
    role?: Role;
}

interface FormData {
    name: string;
}

export default function RoleForm({ role }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        name: role?.name ?? '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (role) {
            put(
                route('account.role.update', {
                    role: role.id,
                }),
                {
                    onSuccess: () => {
                        toast.success('Role berhasil masuk');
                    },

                    onError: () => {
                        toast.error('Gagal memperbarui role.');
                    },
                },
            );
        } else {
            post(route('account.role.store'), {
                onSuccess: () => {
                    toast.success('Role berhasil ditambahkan.');
                },

                onError: () => {
                    toast.error('Gagal menambahkan role.');
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
                        {role ? 'Pembaruan Role' : 'Buat Role'}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        {role
                            ? 'Perbarui data role yang sudah ada.'
                            : 'Tambahkan role baru ke dalam sistem.'}
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
                                });
                            }}
                            placeholder="Masukkan nama role"
                            className="w-full rounded-md border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none focus:border-primary"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.name}
                            </p>
                        )}
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
                        ? role
                            ? 'Memperbarui...'
                            : 'Menyimpan...'
                        : role
                          ? 'Perbarui'
                          : 'Simpan'}
                </button>
            </div>
        </form>
    );
}
