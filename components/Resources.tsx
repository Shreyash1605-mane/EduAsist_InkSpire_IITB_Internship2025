import React, { useState, useMemo } from 'react';
import { User } from 'firebase/auth';
import Card from './common/Card';
import { mockResources } from '../constants';
import type { Resource } from '../types';

const ResourceViewerModal: React.FC<{ resource: Resource; onClose: () => void; }> = ({ resource, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 w-full max-w-3xl shadow-xl relative" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute -top-4 -right-4 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">&times;</button>
                 <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
                 {resource.type === 'Image' && (
                     <img src={resource.url} alt={resource.title} className="max-w-full max-h-[80vh] rounded-lg mx-auto" />
                 )}
                 {resource.type === 'Video' && (
                     <div className="aspect-video w-full">
                         <iframe
                            src={resource.url}
                            title={resource.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        ></iframe>
                     </div>
                 )}
            </div>
        </div>
    );
};


const ResourceCard: React.FC<{ resource: Resource; onAccess: (resource: Resource) => void }> = ({ resource, onAccess }) => {
    const typeColors = {
        PDF: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        Video: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        Image: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        File: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    };

    const isDirectLink = resource.type === 'PDF' || resource.type === 'File';

    const cardContent = (
         <>
            <img className="h-40 w-full object-cover" src={resource.thumbnail} alt={resource.title} />
            <div className="p-4">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${typeColors[resource.type]}`}>{resource.type}</span>
                <h3 className="text-lg font-bold mt-2 text-slate-800 dark:text-white">{resource.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{resource.description}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">Uploaded by {resource.uploader}</p>
            </div>
        </>
    );

    if (isDirectLink) {
        return (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="h-full">{cardContent}</Card>
            </a>
        );
    }
    
    return (
        <div className="h-full" onClick={() => onAccess(resource)}>
            <Card className="h-full">{cardContent}</Card>
        </div>
    );
};

const UploadModal: React.FC<{ user: User | null; onClose: () => void; onUpload: (resource: Omit<Resource, 'id' | 'thumbnail' | 'url'>) => void; }> = ({ user, onClose, onUpload }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'PDF' | 'Video' | 'Image' | 'File'>('File');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title || !description || !file) {
            alert('Please fill all fields and select a file.');
            return;
        }
        onUpload({ title, description, type, uploader: user?.displayName || 'Anonymous' });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">Upload a New Resource</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md border border-slate-300 dark:border-slate-600"/>
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md border border-slate-300 dark:border-slate-600 h-24"/>
                    <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md border border-slate-300 dark:border-slate-600">
                        <option value="File">File</option>
                        <option value="PDF">PDF</option>
                        <option value="Video">Video</option>
                        <option value="Image">Image</option>
                    </select>
                    <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


const Resources: React.FC<{ user: User | null }> = ({ user }) => {
    const [resources, setResources] = useState<Resource[]>(mockResources);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [viewingResource, setViewingResource] = useState<Resource | null>(null);

    const handleUpload = (newResourceData: Omit<Resource, 'id' | 'thumbnail' | 'url'>) => {
        const newResource: Resource = {
            id: resources.length + 1,
            ...newResourceData,
            thumbnail: `https://picsum.photos/seed/new${resources.length + 1}/300/200`,
            url: `https://picsum.photos/seed/new${resources.length + 1}/800/600`
        };
        setResources([newResource, ...resources]);
        setIsUploadModalOpen(false);
    };
    
    const handleAccessResource = (resource: Resource) => {
        if (resource.type === 'Video' || resource.type === 'Image') {
            setViewingResource(resource);
        }
    };


    const filteredResources = useMemo(() => {
        if (!searchTerm) return resources;
        return resources.filter(r =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.uploader.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, resources]);


  return (
    <div className="space-y-6">
        {isUploadModalOpen && <UploadModal user={user} onClose={() => setIsUploadModalOpen(false)} onUpload={handleUpload} />}
        {viewingResource && <ResourceViewerModal resource={viewingResource} onClose={() => setViewingResource(null)} />}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                 <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Shared Resources</h2>
                 <p className="text-slate-500 dark:text-slate-400 mt-1">Access PDFs, files, videos, and images shared by peers.</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                 <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-auto bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button onClick={() => setIsUploadModalOpen(true)} className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
                    Upload File
                </button>
            </div>
        </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} onAccess={handleAccessResource} />
            ))}
        </div>
    </div>
  );
};

export default Resources;
