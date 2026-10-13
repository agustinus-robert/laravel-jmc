import { Link, Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Pencil, Trash, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

interface IncomingItem {
    id: number;
    name: string;
    harga: number | string;
    qty: number;
    uom: string;
    total: number | string;
    expired: string | null;
}

interface Incoming {
    id: number;
    operator_id: number | null;
    incoming_from: string;
    referenced: string | null;
    grand_total: number | string;
    category?: {
        id: number;
        name: string;
    } | null;
    sub_category?: {
        id: number;
        name: string;
    } | null;
    creator?: {
        id: number;
        name: string;
    } | null;
    items?: IncomingItem[];
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    incomings?: {
        data: Incoming[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
}

export default function IncomingIndex({ incomings }: Props) {
    const data = incomings?.data ?? [];
    const links = incomings?.links ?? [];

    function handleDelete(id: number) {
        if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
            return;
        }

        router.delete(
            route('transaction.incoming.destroy', { incoming: id }),
            {
                onSuccess: () => {
                    toast.success('Transaksi berhasil dihapus.');
                },
                onError: () => {
                    toast.error('Gagal menghapus transaksi.');
                },
            },
        );
    }

    return (
        <>
            <Head title="Barang Masuk" />

            <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-background shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                        <h2 className="text-lg font-semibold text-slate-100">
                            Daftar Barang Masuk
                        </h2>

                        <Link
                            href={route('transaction.incoming.create')}
                            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white"
                        >
                            Tambah
                        </Link>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="border-b border-slate-800 text-xs tracking-wider text-slate-400 uppercase">
                                <tr>
                                    <th className="px-6 py-3.5 font-medium">
                                        Asal Barang
                                    </th>
                                    <th className="px-6 py-3.5 font-medium">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3.5 font-medium">
                                        Subkategori
                                    </th>
                                    <th className="px-6 py-3.5 font-medium">
                                        Operator ID
                                    </th>
                                    <th className="px-6 py-3.5 font-medium">
                                        Total
                                    </th>
                                    <th className="px-6 py-3.5 font-medium">
                                        Dibuat Oleh
                                    </th>
                                    <th className="px-6 py-3.5 text-right font-medium">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800">
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition-colors hover:bg-slate-800/50"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-100">
                                                {item.incoming_from}
                                            </td>

                                            <td className="px-6 py-4">
                                                {item.category?.name ?? '-'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {item.sub_category?.name ?? '-'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {item.operator_id ?? '-'}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Intl.NumberFormat(
                                                    'id-ID',
                                                    {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        maximumFractionDigits: 0,
                                                    },
                                                ).format(
                                                    Number(item.grand_total),
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                {item.creator?.name ?? '-'}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={route(
                                                            'transaction.incoming.edit',
                                                            { incoming: item.id },
                                                        )}
                                                        className="text-indigo-400 hover:text-indigo-300"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(item.id)
                                                        }
                                                        className="text-rose-400 hover:text-rose-300"
                                                        title="Hapus"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                                                    <FolderOpen className="h-6 w-6" />
                                                </div>

                                                <p className="text-base font-medium text-slate-300">
                                                    Belum Ada Data
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Data barang masuk masih kosong.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {data.length > 0 && (
                        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/50 px-6 py-4">
                            <p className="text-sm text-slate-400">
                                Halaman {incomings?.current_page ?? 1} dari{' '}
                                {incomings?.last_page ?? 1} · Total{' '}
                                {incomings?.total ?? data.length} transaksi
                            </p>

                            <div className="flex flex-wrap gap-1">
                                {links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : link.url
                                                  ? 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                                                  : 'cursor-not-allowed border border-slate-800 bg-slate-900 text-slate-600'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
