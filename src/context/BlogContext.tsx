import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

export type BlogPostRow = {
    id: string;
    created_at: string;
    updated_at: string;
    created_by: string | null;
    updated_by: string | null;
    title: string;
    slug: string;
    excerpt: string;
    content_markdown: string;
    category: 'Community' | 'Events' | 'Nature' | 'Heritage';
    hero_image_url: string | null;
    published: boolean;
    published_at: string | null;
    featured: boolean;
};

type BlogContextType = {
    posts: BlogPostRow[];
    loading: boolean;
    error: Error | null;
    refreshPosts: (opts?: { includeDrafts?: boolean }) => Promise<void>;
    createPost: (post: Omit<BlogPostRow, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>) => Promise<BlogPostRow>;
    updatePost: (id: string, updates: Partial<BlogPostRow>) => Promise<void>;
    deletePost: (id: string, imageUrl?: string | null) => Promise<void>;
    uploadHeroImage: (file: File) => Promise<string>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<BlogPostRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { isAdmin, isAuthenticated } = useAuth();

    const refreshPosts = async (opts?: { includeDrafts?: boolean }) => {
        try {
            setLoading(true);
            setError(null);
            
            // For public users without session, we rely on RLS (published = true only)
            // For admins, we fetch all.
            let query = supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            // If explicitly told not to include drafts (e.g. public view), or user is not admin
            if (opts?.includeDrafts === false || !isAdmin) {
                query = query.eq('published', true);
            }

            const { data, error } = await query;

            if (error) throw error;
            setPosts(data as BlogPostRow[]);
        } catch (err: any) {
            console.error('Error fetching blog posts:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (post: Omit<BlogPostRow, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>) => {
        try {
            // Strip out empty slugs to let DB or logic handle it if needed
            // Actually, we require slug in the UI so just pass it
            const { data, error } = await supabase
                .from('blog_posts')
                .insert([post])
                .select()
                .single();

            if (error) throw error;
            await refreshPosts({ includeDrafts: isAdmin });
            return data as BlogPostRow;
        } catch (err) {
            console.error('Error creating post:', err);
            throw err;
        }
    };

    const updatePost = async (id: string, updates: Partial<BlogPostRow>) => {
        try {
            // Note: updated_at is handled by the DB trigger
            // updated_by could be set here, but the DB also defaults to auth.uid()
            const { error } = await supabase
                .from('blog_posts')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            await refreshPosts({ includeDrafts: isAdmin });
        } catch (err) {
            console.error('Error updating post:', err);
            throw err;
        }
    };

    const deletePost = async (id: string, imageUrl?: string | null) => {
        try {
            // 1. Delete image from storage if it exists and is hosted on our Supabase bucket
            if (imageUrl && imageUrl.includes('blog-images')) {
                // Extract file path from URL
                // e.g. https://.../storage/v1/object/public/blog-images/1234.jpg
                const urlParts = imageUrl.split('blog-images/');
                if (urlParts.length === 2) {
                    const filePath = urlParts[1];
                    const { error: storageError } = await supabase.storage
                        .from('blog-images')
                        .remove([filePath]);
                    
                    if (storageError) {
                        console.error('Failed to delete image from storage:', storageError);
                        // Continue to delete post even if image deletion fails
                    }
                }
            }

            // 2. Delete the record
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await refreshPosts({ includeDrafts: isAdmin });
        } catch (err) {
            console.error('Error deleting post:', err);
            throw err;
        }
    };

    const uploadHeroImage = async (file: File): Promise<string> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (err) {
            console.error('Error uploading image:', err);
            throw err;
        }
    };

    // Auto-refresh when auth state changes
    useEffect(() => {
        // give auth state a tiny moment to settle before fetching
        const timer = setTimeout(() => {
            refreshPosts({ includeDrafts: isAdmin });
        }, 50);
        return () => clearTimeout(timer);
    }, [isAdmin, isAuthenticated]);

    return (
        <BlogContext.Provider
            value={{
                posts,
                loading,
                error,
                refreshPosts,
                createPost,
                updatePost,
                deletePost,
                uploadHeroImage,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
}

export function useBlog() {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
}
