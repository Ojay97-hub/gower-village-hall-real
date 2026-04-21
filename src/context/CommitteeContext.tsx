import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export type CommitteeMember = {
    id: string;
    name: string;
    role: string;
    display_order: number;
    created_at: string;
};

type CommitteeContextType = {
    members: CommitteeMember[];
    loading: boolean;
    error: Error | null;
    refreshMembers: () => Promise<void>;
    addMember: (data: { name: string; role: string; display_order: number }) => Promise<void>;
    updateMember: (id: string, data: { name: string; role: string; display_order: number }) => Promise<void>;
    deleteMember: (id: string) => Promise<void>;
};

const CommitteeContext = createContext<CommitteeContextType | undefined>(undefined);

export function CommitteeProvider({ children }: { children: React.ReactNode }) {
    const [members, setMembers] = useState<CommitteeMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refreshMembers = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from('committee_members')
                .select('*')
                .order('display_order', { ascending: true });
            if (error) throw error;
            setMembers(data ?? []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to load committee members'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { refreshMembers(); }, []);

    const addMember = async (data: { name: string; role: string; display_order: number }) => {
        const { error } = await supabase.from('committee_members').insert([data]);
        if (error) throw error;
        await refreshMembers();
    };

    const updateMember = async (id: string, data: { name: string; role: string; display_order: number }) => {
        const { error } = await supabase.from('committee_members').update(data).eq('id', id);
        if (error) throw error;
        await refreshMembers();
    };

    const deleteMember = async (id: string) => {
        const { error } = await supabase.from('committee_members').delete().eq('id', id);
        if (error) throw error;
        await refreshMembers();
    };

    return (
        <CommitteeContext.Provider value={{ members, loading, error, refreshMembers, addMember, updateMember, deleteMember }}>
            {children}
        </CommitteeContext.Provider>
    );
}

export function useCommittee() {
    const ctx = useContext(CommitteeContext);
    if (!ctx) throw new Error('useCommittee must be used within CommitteeProvider');
    return ctx;
}
