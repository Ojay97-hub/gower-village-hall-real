import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export type GalleryImage = {
    id: string;
    created_at: string;
    label: string;
    image_url: string;
    display_order: number;
    grid_size: 'normal' | 'large';
};

type GalleryContextType = {
    galleryImages: GalleryImage[];
    loading: boolean;
    addGalleryImage: (label: string, file: File, gridSize?: 'normal' | 'large') => Promise<void>;
    updateGalleryImage: (id: string, label: string, gridSize: 'normal' | 'large', file?: File) => Promise<void>;
    deleteGalleryImage: (id: string, imageUrl: string) => Promise<void>;
    reorderGalleryImages: (reorderedImages: GalleryImage[]) => Promise<void>;
    refreshGalleryImages: () => Promise<void>;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

const STORAGE_BUCKET = 'gallery-images';

export function GalleryProvider({ children }: { children: React.ReactNode }) {
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGalleryImages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('gallery_images')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setGalleryImages(data || []);
        } catch (error) {
            console.error('Error fetching gallery images:', error);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const deleteImageFromStorage = async (imageUrl: string) => {
        try {
            console.log('Attempting to delete image from storage:', imageUrl);
            // Extract file path from URL
            const urlParts = imageUrl.split(`${STORAGE_BUCKET}/`);
            if (urlParts.length > 1) {
                const filePath = urlParts[1];
                console.log('Extracted file path:', filePath);
                const { error } = await supabase.storage
                    .from(STORAGE_BUCKET)
                    .remove([filePath]);

                if (error) {
                    console.error('Supabase storage delete error:', error);
                    throw error;
                }
                console.log('Image deleted from storage successfully');
            } else {
                console.warn('Could not extract file path from URL:', imageUrl);
            }
        } catch (error) {
            console.error('Error deleting image from storage:', error);
            // We verify if we should throw here or just log, usually storage deletion failure shouldn't block DB deletion if possible
            // but for now let's rethrow to see it
            throw error;
        }
    };

    const addGalleryImage = async (label: string, file: File, gridSize: 'normal' | 'large' = 'normal') => {
        try {
            const imageUrl = await uploadImage(file);

            // Get the highest display_order
            const maxOrder = galleryImages.reduce((max, img) =>
                Math.max(max, img.display_order), 0);

            const { error } = await supabase
                .from('gallery_images')
                .insert([{
                    label,
                    image_url: imageUrl,
                    display_order: maxOrder + 1,
                    grid_size: gridSize
                }]);

            if (error) throw error;
            await fetchGalleryImages();
        } catch (error) {
            console.error('Error adding gallery image:', error);
            throw error;
        }
    };

    const updateGalleryImage = async (id: string, label: string, gridSize: 'normal' | 'large', file?: File) => {
        try {
            let imageUrl: string | undefined;

            if (file) {
                // Find existing image to delete old file
                const existing = galleryImages.find(img => img.id === id);
                if (existing) {
                    await deleteImageFromStorage(existing.image_url);
                }
                imageUrl = await uploadImage(file);
            }

            const updates: Partial<GalleryImage> = { label, grid_size: gridSize };
            if (imageUrl) {
                updates.image_url = imageUrl;
            }

            const { error } = await supabase
                .from('gallery_images')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            await fetchGalleryImages();
        } catch (error) {
            console.error('Error updating gallery image:', error);
            throw error;
        }
    };

    const deleteGalleryImage = async (id: string, imageUrl: string) => {
        try {
            console.log(`Deleting gallery image: id=${id}, url=${imageUrl}`);
            // Delete from storage first
            await deleteImageFromStorage(imageUrl);

            // Then delete from database
            console.log('Deleting image record from database...');
            const { error } = await supabase
                .from('gallery_images')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Supabase DB delete error:', error);
                throw error;
            }
            console.log('Image record deleted from database');
            await fetchGalleryImages();
            console.log('Gallery images refreshed');
        } catch (error) {
            console.error('Error deleting gallery image:', error);
            throw error;
        }
    };

    const reorderGalleryImages = async (reorderedImages: GalleryImage[]) => {
        try {
            // Optimistically update local state
            setGalleryImages(reorderedImages);

            // Update display_order for each image in the database
            const updates = reorderedImages.map((image, index) => ({
                id: image.id,
                display_order: index + 1,
            }));

            for (const update of updates) {
                const { error } = await supabase
                    .from('gallery_images')
                    .update({ display_order: update.display_order })
                    .eq('id', update.id);

                if (error) throw error;
            }
        } catch (error) {
            console.error('Error reordering gallery images:', error);
            // Revert on error
            await fetchGalleryImages();
            throw error;
        }
    };

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    return (
        <GalleryContext.Provider
            value={{
                galleryImages,
                loading,
                addGalleryImage,
                updateGalleryImage,
                deleteGalleryImage,
                reorderGalleryImages,
                refreshGalleryImages: fetchGalleryImages,
            }}
        >
            {children}
        </GalleryContext.Provider>
    );
}

export function useGallery() {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
}
