import { useState, useEffect, useMemo } from 'react';
import { Mail, Loader2, Inbox, Trash2, Search } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

type SubscriberStatus = 'active' | 'unsubscribed';
type GroupFilter = 'all' | 'hall' | 'churches';

interface Subscriber {
    id: string;
    name: string | null;
    email: string;
    group_name: 'hall' | 'churches';
    status: SubscriberStatus;
    created_at: string;
}

const STATUS_STYLES: Record<SubscriberStatus, string> = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    unsubscribed: 'bg-gray-50 text-gray-500 border-gray-200',
};

const STATUS_DOT: Record<SubscriberStatus, string> = {
    active: 'bg-emerald-500',
    unsubscribed: 'bg-gray-400',
};

const GROUP_LABEL: Record<'hall' | 'churches', string> = {
    hall: 'Friends of Gower Village Hall',
    churches: "Friends of St. John's & St. Nicholas",
};

export function AdminSubscribers() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [groupFilter, setGroupFilter] = useState<GroupFilter>('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchSubscribers();
    }, []);

    async function fetchSubscribers() {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('created_at', { ascending: false });

        if (fetchError) {
            setError(fetchError.message);
        } else {
            setSubscribers(data ?? []);
        }
        setLoading(false);
    }

    async function updateStatus(id: string, status: SubscriberStatus) {
        setUpdatingId(id);
        const { error: updateError } = await supabase
            .from('newsletter_subscribers')
            .update({ status })
            .eq('id', id);

        if (!updateError) {
            setSubscribers(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        }
        setUpdatingId(null);
    }

    async function deleteSubscriber(id: string) {
        setDeletingId(id);
        const { error: deleteError } = await supabase
            .from('newsletter_subscribers')
            .delete()
            .eq('id', id);

        if (!deleteError) {
            setSubscribers(prev => prev.filter(s => s.id !== id));
        }
        setDeletingId(null);
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return subscribers.filter(s => {
            const matchesGroup = groupFilter === 'all' || s.group_name === groupFilter;
            const matchesSearch = !q ||
                (s.name ?? '').toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q);
            return matchesGroup && matchesSearch;
        });
    }, [subscribers, groupFilter, search]);

    const activeCount = subscribers.filter(s => s.status === 'active').length;
    const hallCount = subscribers.filter(s => s.group_name === 'hall').length;
    const churchesCount = subscribers.filter(s => s.group_name === 'churches').length;

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 max-w-4xl mx-auto mt-10 bg-red-50 text-red-600 rounded-2xl border border-red-200">
                <h2 className="text-xl font-bold mb-2">Error Loading Subscribers</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Subscribers</h1>
                    <p className="text-gray-500">Newsletter sign-ups, ordered by most recent.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
                    <Mail className="w-4 h-4 text-primary-500" />
                    {activeCount} active
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total', value: subscribers.length },
                    { label: 'Active', value: activeCount },
                    { label: 'Hall', value: hallCount },
                    { label: 'Churches', value: churchesCount },
                ].map(stat => (
                    <div key={stat.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm text-center">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                    {(['all', 'hall', 'churches'] as GroupFilter[]).map(g => (
                        <button
                            key={g}
                            onClick={() => setGroupFilter(g)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                groupFilter === g
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {g === 'all' ? 'All' : g === 'hall' ? 'Hall' : 'Churches'}
                        </button>
                    ))}
                </div>
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search name or email…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Inbox className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No subscribers found</h3>
                    <p className="text-gray-500">Sign-ups via the website forms will appear here.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                                    <th className="p-4 pl-6 font-medium">Name &amp; Email</th>
                                    <th className="p-4 font-medium">Group</th>
                                    <th className="p-4 font-medium">Joined</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 pr-6 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map(sub => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        {/* Name & Email */}
                                        <td className="p-4 pl-6">
                                            <p className="font-bold text-gray-900">{sub.name ?? '—'}</p>
                                            <a
                                                href={`mailto:${sub.email}`}
                                                className="text-sm text-primary-600 hover:underline"
                                            >
                                                {sub.email}
                                            </a>
                                        </td>

                                        {/* Group */}
                                        <td className="p-4 text-sm text-gray-600 max-w-[180px]">
                                            {GROUP_LABEL[sub.group_name]}
                                        </td>

                                        {/* Joined */}
                                        <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>

                                        {/* Status toggle */}
                                        <td className="p-4">
                                            {updatingId === sub.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                            ) : (
                                                <div className="flex flex-col gap-1.5">
                                                    {(['active', 'unsubscribed'] as SubscriberStatus[]).map(s => (
                                                        <button
                                                            key={s}
                                                            onClick={() => { if (sub.status !== s) updateStatus(sub.id, s); }}
                                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                                                                sub.status === s
                                                                    ? STATUS_STYLES[s]
                                                                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'
                                                            }`}
                                                        >
                                                            <span className={`w-1.5 h-1.5 rounded-full ${sub.status === s ? STATUS_DOT[s] : 'bg-gray-300'}`} />
                                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </td>

                                        {/* Delete */}
                                        <td className="p-4 pr-6 text-right">
                                            {deletingId === sub.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-auto" />
                                            ) : (
                                                <button
                                                    onClick={() => deleteSubscriber(sub.id)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                                                    title="Remove subscriber"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
