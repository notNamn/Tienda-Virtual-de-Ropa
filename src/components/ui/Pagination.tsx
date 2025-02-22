import React from 'react';
import Link from 'next/link';

interface Props {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: Props) {
    // Función para generar los números de la paginación con "..."
    const getPaginationRange = () => {
        const range = [];
        const delta = 2; // Cuántos números mostrar antes y después del actual

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Siempre mostrar el primer y último número
        range.push(1);
        if (currentPage > delta + 2) {
            range.push("...");
        }

        // Rango de páginas cercanas a la actual
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage < totalPages - delta - 1) {
            range.push("...");
        }
        range.push(totalPages);

        return range;
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="flex justify-center items-center mt-6">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Botón Anterior */}
                <Link
                    href={`?page=${currentPage - 1}`}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-disabled={currentPage === 1}
                >
                    <span className="sr-only">Previous</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                    </svg>
                </Link>

                {/* Números de página */}
                {paginationRange.map((page, index) =>
                    page === "..." ? (
                        <span key={index} className="px-4 py-2 text-gray-500">...</span>
                    ) : (
                        <Link
                            key={page}
                            href={`?page=${page}`}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === page
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </Link>
                    )
                )}

                {/* Botón Siguiente */}
                <Link
                    href={`?page=${currentPage + 1}`}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                        currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-disabled={currentPage === totalPages}
                >
                    <span className="sr-only">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                </Link>
            </nav>
        </div>
    );
}
