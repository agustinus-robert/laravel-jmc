import type { FormDataConvertible } from '@inertiajs/core';

interface Operator {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface SubCategory {
    id: number;
    category_id: number;
    name: string;
    price: string;
}

interface Props {
    data: {
        operator_id: number;
        incoming_from: string;
        referenced: string;
        category_id: number;
        sub_category_id: number;
        file: File | null;
    };
    setData: (
        key: string,
        value: FormDataConvertible,
    ) => void;
    operators: Operator[];
    categories: Category[];
    subCategories: SubCategory[];
    errors: Record<string, string>;
    currentFile?: string | null;
}

const inputClass =
    'w-full rounded-md border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none focus:border-primary';

export default function IncomingFormGeneral({
    data,
    setData,
    operators,
    categories,
    subCategories,
    errors,
    currentFile,
}: Props) {
    const filteredSubCategories = subCategories.filter(
        (subCategory) =>
            subCategory.category_id === Number(data.category_id),
    );

    const selectedSubCategory = filteredSubCategories.find(
        (subCategory) =>
            subCategory.id === Number(data.sub_category_id),
    );

    const formattedPrice =
        selectedSubCategory?.price != null
            ? new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
              }).format(Number(selectedSubCategory.price))
            : '';

    return (
        <section className="border-b border-slate-800 p-6">
            <h3 className="mb-4 text-base font-semibold text-slate-100">
                Informasi Transaksi
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="operator_id"
                        className="mb-1 block text-sm"
                    >
                        Operator
                    </label>

                    <select
                        id="operator_id"
                        value={data.operator_id}
                        onChange={(e) =>
                            setData('operator_id', Number(e.target.value))
                        }
                        className={inputClass}
                    >
                        <option value={0}>Pilih Operator</option>

                        {operators.map((operator) => (
                            <option key={operator.id} value={operator.id}>
                                {operator.name}
                            </option>
                        ))}
                    </select>

                    {errors.operator_id && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.operator_id}
                        </p>
                    )}
                </div>

                {/* Asal Barang */}
                <div>
                    <label
                        htmlFor="incoming_from"
                        className="mb-1 block text-sm"
                    >
                        Asal Barang
                    </label>

                    <input
                        id="incoming_from"
                        value={data.incoming_from}
                        onChange={(e) =>
                            setData('incoming_from', e.target.value)
                        }
                        className={inputClass}
                    />

                    {errors.incoming_from && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.incoming_from}
                        </p>
                    )}
                </div>

                {/* Referensi */}
                <div>
                    <label
                        htmlFor="referenced"
                        className="mb-1 block text-sm"
                    >
                        Referensi
                    </label>

                    <input
                        id="referenced"
                        value={data.referenced}
                        onChange={(e) =>
                            setData('referenced', e.target.value)
                        }
                        className={inputClass}
                    />

                    {errors.referenced && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.referenced}
                        </p>
                    )}
                </div>

                {/* Kategori */}
                <div>
                    <label
                        htmlFor="category_id"
                        className="mb-1 block text-sm"
                    >
                        Kategori
                    </label>

                    <select
                        id="category_id"
                        value={data.category_id}
                        onChange={(e) => {
                            setData('category_id', Number(e.target.value));
                            setData('sub_category_id', 0);
                        }}
                        className={inputClass}
                    >
                        <option value={0}>Pilih Kategori</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {errors.category_id && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.category_id}
                        </p>
                    )}
                </div>

                {/* Subkategori dan Harga */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="sub_category_id"
                            className="mb-1 block text-sm"
                        >
                            Subkategori
                        </label>

                        <select
                            id="sub_category_id"
                            value={data.sub_category_id}
                            onChange={(e) =>
                                setData(
                                    'sub_category_id',
                                    Number(e.target.value),
                                )
                            }
                            disabled={!data.category_id}
                            className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                            <option value={0}>
                                {data.category_id
                                    ? 'Pilih Subkategori'
                                    : 'Pilih Kategori Dahulu'}
                            </option>

                            {filteredSubCategories.map((subCategory) => (
                                <option
                                    key={subCategory.id}
                                    value={subCategory.id}
                                >
                                    {subCategory.name}
                                </option>
                            ))}
                        </select>

                        {errors.sub_category_id && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.sub_category_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="price"
                            className="mb-1 block text-sm"
                        >
                            Harga Subkategori
                        </label>

                        <input
                            id="price"
                            type="text"
                            readOnly
                            value={formattedPrice}
                            placeholder="Harga otomatis"
                            className={`${inputClass} cursor-not-allowed opacity-70`}
                        />
                    </div>
                </div>

                {/* Lampiran */}
                <div className="md:col-span-2">
                    <label htmlFor="file" className="mb-1 block text-sm">
                        Lampiran
                    </label>

                    <input
                        id="file"
                        type="file"
                        onChange={(e) =>
                            setData('file', e.target.files?.[0] ?? null)
                        }
                        className={inputClass}
                    />

                    {currentFile && (
                        <p className="mt-1 text-xs text-slate-400">
                            File saat ini: {currentFile}
                        </p>
                    )}

                    {errors.file && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.file}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
