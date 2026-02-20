import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", cancelText = "Cancel" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm bg-[#282828] rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform animate-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
                >
                    <FaTimes size={16} />
                </button>

                <div className="p-8">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <FaExclamationTriangle className="text-red-500 text-2xl" />
                    </div>

                    <div className="text-center mb-10">
                        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-all active:scale-95 shadow-lg shadow-red-600/20"
                        >
                            {confirmText}
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-transparent hover:bg-white/5 text-white font-bold rounded-full transition-all active:scale-95 border border-white/10"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
