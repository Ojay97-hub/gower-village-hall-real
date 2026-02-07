import { useState, useRef, useEffect } from 'react';
import { useGallery, GalleryImage } from '../../context/GalleryContext';
import { Upload, X, Image as ImageIcon, Grid2x2, Grid3x3 } from 'lucide-react';

interface GalleryImageFormProps {
    initialData?: GalleryImage;
    onSuccess: () => void;
    onCancel: () => void;
}

export function GalleryImageForm({ initialData, onSuccess, onCancel }: GalleryImageFormProps) {
    const { addGalleryImage, updateGalleryImage } = useGallery();
    const [label, setLabel] = useState(initialData?.label || '');
    const [gridSize, setGridSize] = useState<'normal' | 'large'>(initialData?.grid_size || 'normal');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialData?.image_url || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isEditing = !!initialData;

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!label.trim()) {
            setError('Please enter a label for the image');
            return;
        }


        if (!isEditing && !file) {
            setError('Please select an image to upload');
            return;
        }

        setLoading(true);

        try {
            if (isEditing) {
                await updateGalleryImage(initialData.id, label, gridSize, file || undefined);
            } else {
                await addGalleryImage(label, file!, gridSize);
            }
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                    {isEditing ? 'Edit Image' : 'Add New Image'}
                </h3>
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Label Input */}
            <div>
                <label htmlFor="image-label" className="block text-sm font-medium text-gray-700 mb-2">
                    Image Label <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="image-label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="e.g., Victoria sponge"
                />
            </div>

            {/* Grid Size Toggle */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Size
                </label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setGridSize('normal')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${gridSize === 'normal'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                            }`}
                    >
                        <Grid3x3 className="w-5 h-5" />
                        <span className="font-medium">Normal</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setGridSize('large')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${gridSize === 'large'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                            }`}
                    >
                        <Grid2x2 className="w-5 h-5" />
                        <span className="font-medium">Large (2×2)</span>
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">Large images span 2 columns and 2 rows in the gallery grid</p>
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image {!isEditing && <span className="text-red-500">*</span>}
                    {isEditing && <span className="text-gray-400 font-normal"> (optional - leave empty to keep current)</span>}
                </label>

                <div
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {preview ? (
                        <div className="space-y-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-h-48 max-w-md mx-auto rounded-lg object-cover shadow-md"
                            />
                            <p className="text-sm text-gray-500">
                                {file ? file.name : 'Current image'}
                            </p>
                            <button
                                type="button"
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Click to change image
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">Click to upload an image</p>
                                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {isEditing ? 'Saving...' : 'Uploading...'}
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" />
                            {isEditing ? 'Save Changes' : 'Upload Image'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
