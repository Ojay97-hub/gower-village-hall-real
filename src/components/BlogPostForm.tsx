import { useState, useRef } from "react";
import { X, ImagePlus, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPostRow } from "../context/BlogContext";

type BlogPostFormProps = {
    post?: BlogPostRow;
    onSubmit: (values: Omit<BlogPostRow, "id" | "created_at" | "updated_at" | "created_by" | "updated_by">, newImageFile: File | null) => Promise<void>;
    onClose: () => void;
};

export function BlogPostForm({ post, onSubmit, onClose }: BlogPostFormProps) {
    const [title, setTitle] = useState(post?.title || "");
    const [slug, setSlug] = useState(post?.slug || "");
    const [excerpt, setExcerpt] = useState(post?.excerpt || "");
    const [contentMarkdown, setContentMarkdown] = useState(post?.content_markdown || "");
    const [category, setCategory] = useState<BlogPostRow["category"]>(post?.category || "Community");
    const [published, setPublished] = useState(post?.published || false);
    const [featured, setFeatured] = useState(post?.featured || false);
    const [heroImageUrl, setHeroImageUrl] = useState(post?.hero_image_url || "");
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(post?.hero_image_url || null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-generate slug from title if it's a new post and slug is untouched
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!post) {
            setSlug(
                newTitle
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "")
            );
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImageFile(file);
            setHeroImageUrl(""); // Will be replaced by upload
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setNewImageFile(null);
        setHeroImageUrl("");
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit(
                {
                    title,
                    slug,
                    excerpt,
                    content_markdown: contentMarkdown,
                    category,
                    published,
                    featured,
                    published_at: published && !post?.published_at ? new Date().toISOString() : post?.published_at || null,
                    hero_image_url: heroImageUrl, // This might be overwritten if newImageFile exists
                },
                newImageFile
            );
        } catch (error) {
            console.error("Failed to submit post:", error);
            // In a real app, you'd show a toast here
            alert("Failed to save post. Please check the slug is unique and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-full">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                    <h2 className="text-xl font-bold font-serif text-gray-900">
                        {post ? "Edit Post" : "New Post"}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                type="button"
                                onClick={() => setIsPreviewMode(false)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${!isPreviewMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsPreviewMode(true)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${isPreviewMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Preview
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isPreviewMode ? (
                        <div className="prose prose-primary max-w-none">
                            <h1 className="font-serif text-3xl font-bold mb-4">{title || "Untitled Post"}</h1>
                            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                                <span className="px-2.5 py-1 bg-gray-100 rounded-full text-gray-700">{category}</span>
                                <span>•</span>
                                <span>{published ? "Published" : "Draft"}</span>
                            </div>
                            {imagePreview && (
                                <img src={imagePreview} alt="Hero" className="w-full h-64 object-cover rounded-xl mb-8" />
                            )}
                            <p className="text-xl text-gray-600 border-l-4 border-gray-200 pl-4 mb-8">
                                {excerpt || "No excerpt provided"}
                            </p>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {contentMarkdown || "*No content provided*"}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <form id="blog-post-form" onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Title & Slug */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={handleTitleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Summer Fête Returns"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL friendly)</label>
                                    <input
                                        type="text"
                                        required
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. summer-fete-returns"
                                    />
                                </div>
                            </div>

                            {/* Category & Status */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value as BlogPostRow["category"])}
                                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    >
                                        <option value="Community">Community</option>
                                        <option value="Events">Events</option>
                                        <option value="Nature">Nature</option>
                                        <option value="Heritage">Heritage</option>
                                    </select>
                                </div>
                                
                                <div className="flex flex-col justify-center pt-6">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={published}
                                            onChange={(e) => setPublished(e.target.checked)}
                                            className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">Publish Post</span>
                                            <span className="text-xs text-gray-500">Make visible to public</span>
                                        </div>
                                    </label>
                                </div>

                                <div className="flex flex-col justify-center pt-6">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={featured}
                                            onChange={(e) => setFeatured(e.target.checked)}
                                            className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">Featured</span>
                                            <span className="text-xs text-gray-500">Show larger on blog page</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                                {imagePreview ? (
                                    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group h-48 w-full sm:w-80">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={handleClearImage}
                                                className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors shadow-sm"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center text-gray-500 h-48 w-full sm:w-80"
                                    >
                                        <ImagePlus className="w-8 h-8 mb-2 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                                        <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short description)</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="A brief summary of the article..."
                                />
                            </div>

                            {/* Markdown Content */}
                            <div className="flex flex-col flex-1 min-h-[400px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Markdown Content</label>
                                <textarea
                                    required
                                    value={contentMarkdown}
                                    onChange={(e) => setContentMarkdown(e.target.value)}
                                    className="w-full flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-mono text-sm resize-y min-h-[400px]"
                                    placeholder="# Heading 1\n\nWrite your article content here using Markdown..."
                                />
                            </div>

                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="blog-post-form"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all disabled:opacity-70"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            post ? "Save Changes" : "Create Post"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
