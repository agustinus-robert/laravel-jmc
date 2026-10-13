import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import {
    FileText,
    Layers,
    Building2,
    Sparkles,
    Zap,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    Database,
    Feather,
    Menu,
    X,
} from 'lucide-react';

import EditableBlock from '../../../../../../resources/js/components/builder/EditableBlock';

import type { PostPreview } from '../../../../../../resources/js/components/preview/PostPreview';

import useBuilderPreview from '../../../../../../resources/js/components/builder/useBuilderPreview';

interface AuthUser {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    user: AuthUser | null;
}

interface AppPageProps {
    auth: AuthProps;
    [key: string]: any;
}

interface HomeProps {
    postId?: number | string | null;
    post?: PostPreview | null;
    isEditable?: boolean;
    selectedMenuItemId?: number | string | null;
    onSelectBlock?: (id: number | string) => void;
}

export default function Home({
    postId = 10,
    post = null,
    isEditable = true,
    selectedMenuItemId = null,
    onSelectBlock,
}: HomeProps) {
    const { auth } = usePage<AppPageProps>().props;

    const [activeTab, setActiveTab] = useState<'content' | 'blog' | 'dynamic'>(
        'content',
    );

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        currentPost,
        resolvedPost,
        previewData,
        resolvedProperties,
        resolvedTaxonomies,
        handlePreviewChange,
    } = useBuilderPreview(postId);

    const effectivePost = resolvedPost ?? post;

    const {
        text: post10Text,
        blockNoteText: post10BlockNoteText,
        image: post10Image,
        properties: post10Properties,
        taxonomies: post10Taxonomies,
    } = previewData;

    const heroBadge = post10Text(
        2,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    );

    const heroTitle = post10Text(2, 'Lorem Ipsum');

    const heroTitleHighlight = post10Text(3, 'Dolor Sit Amet');

    const heroDescription = post10BlockNoteText(
        2,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    );

    const heroButton = post10Text(3, 'Lorem Ipsum');

    const heroSecondaryButton = post10Text(3, 'Dolor Sit Amet');

    const desktopImage = post10Image('desktop');

    const advantageLabel = 'Lorem Ipsum Dolor';

    const advantageTitle = 'Lorem Ipsum Dolor Sit Amet';

    const advantageDescription =
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';

    const advantageStatOne = '100';

    const advantageStatOneLabel = 'Lorem Ipsum';

    const advantageStatTwo = '100%';

    const advantageStatTwoLabel = 'Dolor Sit';

    const buildersTitle = 'Lorem Ipsum Dolor';

    const buildersDescription =
        'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

    const contentTitle = 'Lorem Ipsum';

    const contentDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const blogTitle = 'Dolor Sit Amet';

    const blogDescription =
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';

    const dynamicTitle = 'Amet Consectetur';

    const dynamicDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const solutionTitle = 'Lorem Ipsum Dolor Sit Amet';

    const solutionDescription =
        'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

    const solutionOneTitle = 'Lorem Ipsum';

    const solutionOneDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const solutionTwoTitle = 'Dolor Sit Amet';

    const solutionTwoDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const solutionThreeTitle = 'Consectetur Adipiscing';

    const solutionThreeDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);

        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    const handleSelectBlock = (id: number | string) => {
        onSelectBlock?.(id);
    };

    return (
        <div className="min-h-screen scroll-smooth bg-slate-950 font-sans text-slate-100 antialiased">
            <header className="fixed top-0 right-0 left-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => scrollToSection('hero')}
                            className="cursor-pointer rounded-lg bg-indigo-600 p-2 text-white"
                        >
                            <Building2 className="h-6 w-6" />
                        </button>

                        <div className="flex items-center">
                            <span className="text-lg font-bold tracking-wide text-white">
                                CMS
                            </span>

                            <span className="ml-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-400">
                                System
                            </span>
                        </div>
                    </div>

                    <nav className="mx-auto hidden gap-8 text-sm font-medium text-slate-400 md:flex">
                        <button
                            type="button"
                            onClick={() => scrollToSection('hero')}
                            className="transition-colors hover:text-indigo-400"
                        >
                            Hero
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection('keunggulan')}
                            className="transition-colors hover:text-indigo-400"
                        >
                            Keunggulan
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection('builders')}
                            className="transition-colors hover:text-indigo-400"
                        >
                            Builder
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection('solusi')}
                            className="transition-colors hover:text-indigo-400"
                        >
                            Solusi
                        </button>
                    </nav>

                    <div className="ml-auto hidden md:flex">
                        <Link
                            href={auth.user ? '/dashboard' : '/login'}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
                        >
                            {auth.user ? 'Dashboard' : 'Login'}
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((value) => !value)}
                        className="ml-auto text-slate-400 hover:text-white md:hidden"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="space-y-3 border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-6 md:hidden">
                        <button
                            type="button"
                            onClick={() => scrollToSection('hero')}
                            className="block w-full py-2 text-left font-medium text-slate-300 hover:text-indigo-400"
                        >
                            Hero
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection('keunggulan')}
                            className="block w-full py-2 text-left font-medium text-slate-300 hover:text-indigo-400"
                        >
                            Keunggulan
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection('builders')}
                            className="block w-full py-2 text-left font-medium text-slate-300 hover:text-indigo-400"
                        >
                            Builder
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection('solusi')}
                            className="block w-full py-2 text-left font-medium text-slate-300 hover:text-indigo-400"
                        >
                            Solusi
                        </button>

                        <Link
                            href={auth.user ? '/dashboard' : '/login'}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white"
                        >
                            {auth.user ? 'Dashboard' : 'Login'}
                        </Link>
                    </div>
                )}
            </header>

            <main className="pt-16">
                <EditableBlock
                    postId={10}
                    isEditable={isEditable}
                    isSelected={selectedMenuItemId === 10}
                    onSelect={handleSelectBlock}
                    onPreviewChange={handlePreviewChange}
                >
                    <section
                        id="hero"
                        className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-20 text-center sm:px-6 lg:px-8"
                    >
                        {desktopImage && (
                            <img
                                src={desktopImage}
                                alt=""
                                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
                            />
                        )}

                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300 sm:text-sm">
                            <Sparkles className="h-4 w-4 text-amber-400" />
                            <span>{heroBadge}</span>
                        </div>

                        <h1 className="max-w-5xl text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl">
                            {heroTitle}
                            <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                                {heroTitleHighlight}
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                            {heroDescription}
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => scrollToSection('builders')}
                                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
                            >
                                {heroButton}
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection('solusi')}
                                className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-slate-800"
                            >
                                {heroSecondaryButton}
                            </button>
                        </div>
                    </section>
                </EditableBlock>

                <EditableBlock
                    postId={11}
                    isEditable={isEditable}
                    isSelected={selectedMenuItemId === 11}
                    onSelect={handleSelectBlock}
                >
                    <section
                        id="keunggulan"
                        className="border-t border-slate-900 bg-slate-950 py-20"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-slate-900 p-8 sm:p-12">
                                <div className="grid items-center gap-8 md:grid-cols-3">
                                    <div className="space-y-4 md:col-span-2">
                                        <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400">
                                            <ShieldCheck className="h-5 w-5" />
                                            <span>{advantageLabel}</span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                            {advantageTitle}
                                        </h2>

                                        <div
                                            className="text-sm leading-relaxed text-slate-400 sm:text-base"
                                            dangerouslySetInnerHTML={{
                                                __html: advantageDescription,
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center">
                                            <span className="block text-3xl font-extrabold text-emerald-400">
                                                {advantageStatOne}
                                            </span>

                                            <span className="mt-1 block text-xs font-medium text-slate-400">
                                                {advantageStatOneLabel}
                                            </span>
                                        </div>

                                        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center">
                                            <span className="block text-3xl font-extrabold text-indigo-400">
                                                {advantageStatTwo}
                                            </span>

                                            <span className="mt-1 block text-xs font-medium text-slate-400">
                                                {advantageStatTwoLabel}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </EditableBlock>

                <EditableBlock
                    postId={0}
                    isEditable={isEditable}
                    isSelected={selectedMenuItemId === 0}
                    onSelect={handleSelectBlock}
                >
                    <section
                        id="builders"
                        className="border-t border-slate-900 bg-slate-900/30 py-20"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto mb-12 max-w-3xl text-center">
                                <h2 className="text-3xl font-bold text-white">
                                    {buildersTitle}
                                </h2>

                                <p className="mt-3 text-slate-400">
                                    {buildersDescription}
                                </p>
                            </div>

                            <div className="mx-auto mb-8 flex max-w-xl justify-center border-b border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('content')}
                                    className={`flex items-center gap-2 border-b-2 px-4 pb-4 text-sm font-medium transition sm:px-6 ${
                                        activeTab === 'content'
                                            ? 'border-indigo-500 text-indigo-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    <FileText className="h-4 w-4" />
                                    {contentTitle}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('blog')}
                                    className={`flex items-center gap-2 border-b-2 px-4 pb-4 text-sm font-medium transition sm:px-6 ${
                                        activeTab === 'blog'
                                            ? 'border-indigo-500 text-indigo-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    <Feather className="h-4 w-4" />
                                    {blogTitle}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('dynamic')}
                                    className={`flex items-center gap-2 border-b-2 px-4 pb-4 text-sm font-medium transition sm:px-6 ${
                                        activeTab === 'dynamic'
                                            ? 'border-indigo-500 text-indigo-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    <Layers className="h-4 w-4" />
                                    {dynamicTitle}
                                </button>
                            </div>

                            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-10">
                                {activeTab === 'content' && (
                                    <div className="grid items-center gap-8 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <div className="w-fit rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                                                <FileText className="h-6 w-6" />
                                            </div>

                                            <h3 className="text-2xl font-bold text-white">
                                                {contentTitle}
                                            </h3>

                                            <p className="text-sm leading-relaxed text-slate-400">
                                                {contentDescription}
                                            </p>

                                            <ul className="space-y-2 text-sm text-slate-300">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                                    {heroBadge}
                                                </li>

                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                                    {buildersDescription}
                                                </li>

                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                                    {solutionDescription}
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-400">
                                            <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-500">
                                                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                                                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                                                <span className="ml-2">
                                                    post_10.json
                                                </span>
                                            </div>

                                            <pre className="overflow-x-auto text-emerald-400">
                                                {JSON.stringify(
                                                    post10Properties,
                                                    null,
                                                    2,
                                                )}
                                            </pre>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'blog' && (
                                    <div className="grid items-center gap-8 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <div className="w-fit rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                                                <Feather className="h-6 w-6" />
                                            </div>

                                            <h3 className="text-2xl font-bold text-white">
                                                {blogTitle}
                                            </h3>

                                            <div
                                                className="text-sm leading-relaxed text-slate-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: blogDescription,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'dynamic' && (
                                    <div className="grid items-center gap-8 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <div className="w-fit rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                                                <Layers className="h-6 w-6" />
                                            </div>

                                            <h3 className="text-2xl font-bold text-white">
                                                {dynamicTitle}
                                            </h3>

                                            <p className="text-sm leading-relaxed text-slate-400">
                                                {dynamicDescription}
                                            </p>
                                        </div>

                                        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                                            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3 text-xs">
                                                <span className="font-medium text-slate-300">
                                                    Post ID
                                                </span>

                                                <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-indigo-400">
                                                    {postId}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-2.5">
                                                    <span className="block text-slate-500">
                                                        Properties
                                                    </span>

                                                    <span className="font-mono text-slate-300">
                                                        {
                                                            Object.keys(
                                                                post10Properties,
                                                            ).length
                                                        }
                                                    </span>
                                                </div>

                                                <div className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-2.5">
                                                    <span className="block text-slate-500">
                                                        Taxonomies
                                                    </span>

                                                    <span className="font-mono text-slate-300">
                                                        {
                                                            Object.keys(
                                                                post10Taxonomies,
                                                            ).length
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </EditableBlock>

                <EditableBlock
                    postId={0}
                    isEditable={isEditable}
                    isSelected={selectedMenuItemId === 0}
                    onSelect={handleSelectBlock}
                >
                    <section
                        id="solusi"
                        className="border-t border-slate-900 bg-slate-950 py-20"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto mb-16 max-w-3xl text-center">
                                <h2 className="text-3xl font-bold text-white">
                                    {solutionTitle}
                                </h2>

                                <div
                                    className="mt-3 text-slate-400"
                                    dangerouslySetInnerHTML={{
                                        __html: solutionDescription,
                                    }}
                                />
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
                                    <Zap className="mb-6 h-10 w-10 text-amber-400" />

                                    <h3 className="mb-3 text-xl font-bold text-white">
                                        {solutionOneTitle}
                                    </h3>

                                    <p className="text-sm leading-relaxed text-slate-400">
                                        {solutionOneDescription}
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
                                    <Database className="mb-6 h-10 w-10 text-indigo-400" />

                                    <h3 className="mb-3 text-xl font-bold text-white">
                                        {solutionTwoTitle}
                                    </h3>

                                    <p className="text-sm leading-relaxed text-slate-400">
                                        {solutionTwoDescription}
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
                                    <ShieldCheck className="mb-6 h-10 w-10 text-emerald-400" />

                                    <h3 className="mb-3 text-xl font-bold text-white">
                                        {solutionThreeTitle}
                                    </h3>

                                    <p className="text-sm leading-relaxed text-slate-400">
                                        {solutionThreeDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </EditableBlock>
            </main>
        </div>
    );
}
