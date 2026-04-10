import { useState, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Coffee, Clock, CalendarDays, Users, Plus, Edit2, Trash2, AlertTriangle, X } from 'lucide-react';
import { useGallery, GalleryImage } from '../context/GalleryContext';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { GalleryImageForm } from '../components/gallery/GalleryImageForm';
import { Link } from 'react-router-dom';
import cakeDisplay from '../assets/cake-display.jpg';
import flowerArrangement from '../assets/flower-arrangement.jpg';

const defaultGalleryImages = [
  { id: 'default-1', image_url: cakeDisplay, label: 'Cake display', display_order: 1, created_at: '', grid_size: 'large' as const },
  { id: 'default-2', image_url: flowerArrangement, label: 'Flower arrangement', display_order: 2, created_at: '', grid_size: 'normal' as const },
  {
    id: 'default-3',
    image_url: 'https://images.unsplash.com/photo-1559630854-e3615c5f4e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYSUyMHNwb25nZSUyMGNha2V8ZW58MXx8fHwxNzY0NjA2MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    label: 'Victoria sponge', display_order: 3, created_at: '', grid_size: 'normal' as const
  },
  {
    id: 'default-4',
    image_url: 'https://images.unsplash.com/photo-1692324161119-9df5ca75973f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMGRyaXp6bGUlMjBjYWtlfGVufDF8fHx8MTc2NDYwNjIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    label: 'Lemon drizzle', display_order: 4, created_at: '', grid_size: 'normal' as const
  },
  {
    id: 'default-5',
    image_url: 'https://images.unsplash.com/photo-1703876086193-5d29f099205c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBmdWRnZSUyMGNha2V8ZW58MXx8fHwxNzY0NjA2MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    label: 'Chocolate fudge', display_order: 5, created_at: '', grid_size: 'large' as const
  },
  {
    id: 'default-6',
    image_url: 'https://images.unsplash.com/photo-1622926421334-6829deee4b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3QlMjBjYWtlfGVufDF8fHx8MTc2NDYwNjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    label: 'Carrot cake', display_order: 6, created_at: '', grid_size: 'normal' as const
  },
  {
    id: 'default-7',
    image_url: 'https://images.unsplash.com/photo-1681711092882-b1b2ac383705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB3YWxudXQlMjBjYWtlfGVufDF8fHx8MTc2NDYwNjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    label: 'Coffee & walnut', display_order: 7, created_at: '', grid_size: 'normal' as const
  },
  {
    id: 'default-8',
    image_url: 'https://images.unsplash.com/photo-1590869173972-7868b37913ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxzaCUyMGJhcmElMjBicml0aCUyMGNha2V8ZW58MXx8fHwxNzY0NjA2MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    label: 'Welsh bara brith', display_order: 8, created_at: '', grid_size: 'normal' as const
  }
];

export function CoffeeMorning() {
  const { galleryImages, loading: galleryLoading, deleteGalleryImage, reorderGalleryImages } = useGallery();
  const { isAdmin } = useAuth();

  const [mode, setMode] = useState<'view' | 'edit' | 'delete'>('view');
  const [showImageForm, setShowImageForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | undefined>(undefined);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [draggedImage, setDraggedImage] = useState<GalleryImage | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const displayImages = (isAdmin || galleryImages.length > 0) ? galleryImages : defaultGalleryImages;

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, image: GalleryImage) => {
    setDraggedImage(image);
    e.dataTransfer.effectAllowed = 'move';
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedImage(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (!draggedImage || !isAdmin) return;
    const dragIndex = displayImages.findIndex(img => img.id === draggedImage.id);
    if (dragIndex === dropIndex) return;
    const newImages = [...displayImages];
    newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    if (!draggedImage.id.startsWith('default-')) {
      await reorderGalleryImages(newImages);
    }
  };

  const handleAddImage = () => {
    setMode('view');
    setEditingImage(undefined);
    setShowImageForm(true);
    setTimeout(() => {
      document.getElementById('gallery-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setShowImageForm(true);
    setTimeout(() => {
      document.getElementById('gallery-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormClose = () => {
    setShowImageForm(false);
    setEditingImage(undefined);
  };

  const handleDeleteClick = (image: GalleryImage) => {
    setImageToDelete(image);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (imageToDelete) {
      try {
        setIsDeleting(true);
        await deleteGalleryImage(imageToDelete.id, imageToDelete.image_url);
        setIsDeleting(false);
        setDeleteConfirmOpen(false);
        setImageToDelete(null);
        setMode('view');
      } catch (error) {
        console.error('Failed to delete image:', error);
        setIsDeleting(false);
        alert('Failed to delete image. Please check the console for details.');
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setImageToDelete(null);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-primary-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
              <Coffee className="w-10 h-10 text-primary-600" />
            </div>
            <div>
              <p className="text-primary-600 font-medium mb-2 uppercase tracking-widest text-sm">Village Hall</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Monthly Coffee Mornings
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Join us for our friendly village coffee mornings — a cherished community tradition
                held every first Saturday of the month. Enjoy homemade cakes, warm conversation,
                and the company of neighbours old and new.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-primary-50 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <CalendarDays className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">When</p>
                <p className="text-gray-600 text-sm">First Saturday of every month</p>
              </div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Clock className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Time</p>
                <p className="text-gray-600 text-sm">10:30 – 12:30</p>
              </div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Open to</p>
                <p className="text-gray-600 text-sm">Everyone — all are welcome</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-2">Gallery</h2>
              <p className="text-gray-600 text-lg">Delicious homemade cakes by our local bakers</p>
              {isAdmin && mode !== 'view' && (
                <p className="text-sm font-medium mt-2 animate-in fade-in slide-in-from-top-1 duration-200 text-primary-600">
                  {mode === 'edit' ? 'Select an image to edit' : 'Select an image to delete'}
                </p>
              )}
            </div>

            {isAdmin && (
              <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                <button
                  onClick={() => setMode('view')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'view' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  View
                </button>
                <button
                  onClick={handleAddImage}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
                <div className="w-px bg-gray-200 my-1 mx-1" />
                <button
                  onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${mode === 'edit' ? 'bg-primary-100 text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setMode(mode === 'delete' ? 'view' : 'delete')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${mode === 'delete' ? 'bg-red-100 text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {galleryLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayImages.map((image, index) => (
                <div
                  key={image.id}
                  draggable={isAdmin && !image.id.startsWith('default-')}
                  onDragStart={(e) => handleDragStart(e, image)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`group cursor-pointer relative overflow-hidden shadow-md rounded-lg transition-all duration-300 ${
                    image.grid_size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
                  } ${dragOverIndex === index ? 'ring-4 ring-primary-500 ring-offset-2 scale-[1.02]' : ''
                  } ${isAdmin && !image.id.startsWith('default-') ? 'cursor-grab active:cursor-grabbing' : ''}`}
                >
                  <ImageWithFallback
                    src={image.image_url}
                    alt={image.label}
                    className={`w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 ${
                      image.grid_size === 'large' ? 'aspect-square' : 'aspect-[4/3]'
                    }`}
                    loading="lazy"
                  />

                  {isAdmin && mode !== 'view' && (
                    <div
                      className={`absolute inset-0 z-40 transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                        mode === 'edit'
                          ? 'hover:bg-primary-900/20 active:bg-primary-900/30 ring-inset hover:ring-4 ring-primary-500'
                          : 'hover:bg-red-900/20 active:bg-red-900/30 ring-inset hover:ring-4 ring-red-500'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (mode === 'edit') handleEditImage(image);
                        if (mode === 'delete') handleDeleteClick(image);
                      }}
                    >
                      <div className={`p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-200 ${
                        mode === 'edit' ? 'bg-white text-primary-600' : 'bg-white text-red-600'
                      }`}>
                        {mode === 'edit' ? <Edit2 className="w-6 h-6" /> : <Trash2 className="w-6 h-6" />}
                      </div>
                    </div>
                  )}

                  {isAdmin && (
                    <div className="absolute top-2 left-2 p-1.5 bg-white/80 text-gray-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                      </svg>
                    </div>
                  )}

                  {image.label && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">{image.label}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {showImageForm && (
            <div id="gallery-form-section" className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <GalleryImageForm
                initialData={editingImage}
                onSuccess={handleFormClose}
                onCancel={handleFormClose}
              />
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Come and join us</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            No need to book — just turn up on the first Saturday of the month.
            Looking to hire the hall for your own event?
          </p>
          <Link
            to="/hall#booking"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Book the Hall
          </Link>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleDeleteCancel} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-80 mx-auto animate-in fade-in zoom-in-95 duration-200 border border-gray-300">
            <button
              onClick={handleDeleteCancel}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-2">Delete Image?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-900">"{imageToDelete?.label}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                style={{ backgroundColor: '#dc2626' }}
                className="flex-1 px-4 py-3 text-white font-medium rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2 text-sm"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
