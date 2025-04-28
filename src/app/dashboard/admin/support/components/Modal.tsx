'use client';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#161113] border border-neutral-800 rounded-lg p-6 w-full max-w-lg relative">
        
        {children}
      </div>
    </div>
  );
}