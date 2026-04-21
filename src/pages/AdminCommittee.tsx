import { useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2, GripVertical } from "lucide-react";
import { useCommittee, CommitteeMember } from "../context/CommitteeContext";

const ROLE_SUGGESTIONS = ["Chair", "Trustee", "Secretary", "Treasurer", "Vice Chair"];

type FormState = { name: string; role: string; display_order: number };
const EMPTY_FORM: FormState = { name: "", role: "Trustee", display_order: 0 };

export function AdminCommittee() {
    const { members, loading, error, addMember, updateMember, deleteMember } = useCommittee();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<CommitteeMember | undefined>(undefined);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const openAdd = () => {
        const nextOrder = members.length > 0
            ? Math.max(...members.map(m => m.display_order)) + 1
            : 0;
        setForm({ ...EMPTY_FORM, display_order: nextOrder });
        setEditingMember(undefined);
        setFormError("");
        setIsFormOpen(true);
    };

    const openEdit = (member: CommitteeMember) => {
        setForm({ name: member.name, role: member.role, display_order: member.display_order });
        setEditingMember(member);
        setFormError("");
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingMember(undefined);
        setForm(EMPTY_FORM);
        setFormError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { setFormError("Name is required."); return; }
        if (!form.role.trim()) { setFormError("Role is required."); return; }

        setSubmitting(true);
        setFormError("");
        try {
            if (editingMember) {
                await updateMember(editingMember.id, { name: form.name.trim(), role: form.role.trim(), display_order: form.display_order });
            } else {
                await addMember({ name: form.name.trim(), role: form.role.trim(), display_order: form.display_order });
            }
            closeForm();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteMember(id);
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    };

    if (loading && members.length === 0) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 max-w-4xl mx-auto mt-10 bg-red-50 text-red-600 rounded-2xl border border-red-200">
                <h2 className="text-xl font-bold mb-2">Error Loading Members</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-serif text-gray-900">Committee Members</h1>
                    <p className="text-sm text-gray-500 mt-1">{members.length} member{members.length !== 1 ? "s" : ""} · changes appear immediately on the public page</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Member
                </button>
            </div>

            {/* Members List */}
            {members.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 mb-4">No committee members yet.</p>
                    <button
                        onClick={openAdd}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add First Member
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-8"></th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Role</th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-20">Order</th>
                                <th className="px-6 py-3 w-28"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-4 py-4 text-gray-300">
                                        <GripVertical className="w-4 h-4" />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                                            member.role === "Chair"
                                                ? "bg-primary-100 text-primary-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{member.display_order}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                                            <button
                                                onClick={() => openEdit(member)}
                                                className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            {confirmDeleteId === member.id ? (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs text-red-600 font-medium">Delete?</span>
                                                    <button
                                                        onClick={() => handleDelete(member.id)}
                                                        disabled={deletingId === member.id}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                        title="Confirm delete"
                                                    >
                                                        {deletingId === member.id
                                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                                            : <Trash2 className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmDeleteId(null)}
                                                        className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setConfirmDeleteId(member.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add / Edit Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold font-serif text-gray-900">
                                {editingMember ? "Edit Member" : "Add Member"}
                            </h2>
                            <button
                                onClick={closeForm}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="e.g. Jane Smith"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <input
                                    type="text"
                                    required
                                    list="role-suggestions"
                                    value={form.role}
                                    onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))}
                                    placeholder="e.g. Trustee"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                                <datalist id="role-suggestions">
                                    {ROLE_SUGGESTIONS.map(r => <option key={r} value={r} />)}
                                </datalist>
                                <p className="mt-1 text-xs text-gray-400">Type freely or pick a suggestion</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={form.display_order}
                                    onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                                <p className="mt-1 text-xs text-gray-400">Lower numbers appear first (0 = top)</p>
                            </div>

                            {formError && (
                                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{formError}</p>
                            )}

                            <div className="flex gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    disabled={submitting}
                                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-70"
                                >
                                    {submitting
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                                        : editingMember ? "Save Changes" : "Add Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
