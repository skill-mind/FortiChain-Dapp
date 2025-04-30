import React from 'react';

interface Image {
    src: string;
    alt: string;
}

interface ImageGalleryProps {
    images: Image[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
            <div key={index} className="bg-[#110D0F] border border-[#464043] rounded-lg p-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
            <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-auto object-contain" 
            />
            </div>
        ))}
        </div>
    );
};
