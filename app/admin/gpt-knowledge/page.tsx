"use client";

import { useState, useMemo } from "react";
import { Upload, FileText, Image as ImageIcon, Book, File, Trash2, Eye, ExternalLink, FolderOpen, Download } from "lucide-react";
import Link from "next/link";
import { getAllKnowledgeSources, getPDFsAndBooks } from "@/lib/portfolio-gpt";

type KnowledgeItem = {
  id: string;
  name: string;
  type: "pdf" | "image" | "book" | "article" | "research";
  uploadedAt: string;
  size: string;
  status: "processing" | "ready" | "error";
};

export default function GPTKnowledgePage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const existingSources = useMemo(() => getAllKnowledgeSources(), []);
  const { pdfs, books } = useMemo(() => getPDFsAndBooks(), []);
  
  // Group sources by category
  const groupedSources = useMemo(() => {
    const groups: Record<string, typeof existingSources> = {
      project: [],
      bio: [],
      process: [],
      other: [],
    };
    
    existingSources.forEach((source) => {
      const category = source.category || "other";
      if (groups[category]) {
        groups[category].push(source);
      } else {
        groups.other.push(source);
      }
    });
    
    return groups;
  }, [existingSources]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    setIsUploading(true);
    
    // Simulate upload - in production, upload to your storage
    for (const file of files) {
      const newItem: KnowledgeItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: getFileType(file),
        uploadedAt: new Date().toISOString(),
        size: formatFileSize(file.size),
        status: "processing",
      };

      setItems((prev) => [...prev, newItem]);

      // Simulate processing
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) =>
            item.id === newItem.id ? { ...item, status: "ready" } : item
          )
        );
      }, 2000);
    }

    setIsUploading(false);
  };

  const getFileType = (file: File): KnowledgeItem["type"] => {
    if (file.type === "application/pdf") return "pdf";
    if (file.type.startsWith("image/")) return "image";
    if (file.name.toLowerCase().includes("book")) return "book";
    if (file.name.toLowerCase().includes("research") || file.name.toLowerCase().includes("paper")) return "research";
    return "article";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getIcon = (type: KnowledgeItem["type"]) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5" />;
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "book":
        return <Book className="w-5 h-5" />;
      case "research":
        return <File className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: KnowledgeItem["type"]) => {
    switch (type) {
      case "pdf":
        return "PDF Document";
      case "image":
        return "Image";
      case "book":
        return "Book";
      case "research":
        return "Research Paper";
      default:
        return "Article";
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-linen)]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-light text-[var(--color-charcoal)] mb-2">
                GPT Knowledge Base
              </h1>
              <p className="text-sm text-[rgba(23,26,26,0.7)]">
                Upload and manage materials that train your GPT Mode responses
              </p>
            </div>
            <Link
              href="/gpt-mode"
              className="text-sm text-[var(--color-basil)] hover:text-[var(--color-coral)]"
            >
              ← Back to GPT Mode
            </Link>
          </div>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              dragActive
                ? "border-[var(--color-coral)] bg-[rgba(243,90,48,0.05)]"
                : "border-[rgba(15,91,70,0.2)] bg-white"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-[var(--color-basil)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--color-charcoal)] mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-sm text-[rgba(23,26,26,0.6)] mb-4">
              Upload PDFs, images, books, research papers, or articles
            </p>
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileInput}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
            />
            <label
              htmlFor="file-upload"
              className="primary-button inline-flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Choose Files
            </label>
          </div>
        </div>

        {/* Knowledge Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[rgba(15,91,70,0.12)] rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-[var(--color-basil)]">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[var(--color-charcoal)] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[rgba(23,26,26,0.6)]">
                      {getTypeLabel(item.type)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-[rgba(23,26,26,0.4)] hover:text-[var(--color-coral)] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[rgba(23,26,26,0.6)]">
                <span>{item.size}</span>
                <span
                  className={`px-2 py-1 rounded ${
                    item.status === "ready"
                      ? "bg-[rgba(15,91,70,0.1)] text-[var(--color-basil)]"
                      : item.status === "processing"
                      ? "bg-[rgba(243,90,48,0.1)] text-[var(--color-coral)]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status === "ready"
                    ? "Ready"
                    : item.status === "processing"
                    ? "Processing..."
                    : "Error"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 bg-white border border-[rgba(15,91,70,0.12)] rounded-xl">
            <FileText className="w-12 h-12 text-[rgba(23,26,26,0.3)] mx-auto mb-4" />
            <p className="text-sm text-[rgba(23,26,26,0.6)]">
              No additional knowledge materials uploaded yet
            </p>
            <p className="text-xs text-[rgba(23,26,26,0.5)] mt-1">
              Upload PDFs, images, books, or research papers to train your GPT
            </p>
          </div>
        )}

        {/* PDFs and Books */}
        <div className="mt-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[var(--color-basil)]" />
            <h2 className="text-xl font-medium text-[var(--color-charcoal)]">
              PDFs & Books
            </h2>
          </div>
          
          {pdfs.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--color-charcoal)] mb-3 uppercase tracking-wide">
                PDF Documents ({pdfs.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {pdfs.map((pdf, index) => (
                  <a
                    key={index}
                    href={pdf.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-[rgba(15,91,70,0.12)] rounded-lg p-4 hover:shadow-md hover:border-[var(--color-basil)] transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="text-[var(--color-basil)] flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-basil)] transition-colors truncate">
                            {pdf.name}
                          </h4>
                          <p className="text-xs text-[rgba(23,26,26,0.6)] mt-1">
                            PDF Document
                          </p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-[rgba(23,26,26,0.4)] group-hover:text-[var(--color-basil)] transition-colors flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {books.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--color-charcoal)] mb-3 uppercase tracking-wide">
                Book References ({books.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {books.map((book, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[rgba(15,91,70,0.12)] rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-[var(--color-basil)] flex-shrink-0">
                        <Book className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-[var(--color-charcoal)] truncate">
                          {book.name}
                        </h4>
                        {book.author && (
                          <p className="text-xs text-[rgba(23,26,26,0.6)] mt-1">
                            by {book.author}
                          </p>
                        )}
                        {book.link && (
                          <a
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--color-basil)] hover:text-[var(--color-coral)] mt-2 inline-flex items-center gap-1"
                          >
                            View reference
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {pdfs.length === 0 && books.length === 0 && (
            <div className="text-center py-8 bg-white border border-[rgba(15,91,70,0.12)] rounded-xl">
              <FileText className="w-10 h-10 text-[rgba(23,26,26,0.3)] mx-auto mb-3" />
              <p className="text-sm text-[rgba(23,26,26,0.6)]">
                No PDFs or books added yet
              </p>
              <p className="text-xs text-[rgba(23,26,26,0.5)] mt-2">
                Add your master's project PDF and book references in lib/portfolio-gpt.ts
              </p>
            </div>
          )}
        </div>

        {/* Existing Knowledge Sources */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen className="w-5 h-5 text-[var(--color-basil)]" />
            <h2 className="text-xl font-medium text-[var(--color-charcoal)]">
              Existing Knowledge Base
            </h2>
            <span className="text-xs text-[rgba(23,26,26,0.6)] bg-[rgba(15,91,70,0.1)] px-2 py-1 rounded-full">
              {existingSources.length} sources
            </span>
          </div>
          <p className="text-sm text-[rgba(23,26,26,0.7)] mb-6">
            These are the documents, pages, and references currently used by GPT Mode
          </p>

          <div className="space-y-6">
            {/* Projects */}
            {groupedSources.project.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-charcoal)] mb-3 uppercase tracking-wide">
                  Projects ({groupedSources.project.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupedSources.project.map((source, index) => (
                    <Link
                      key={index}
                      href={source.href}
                      target={source.href.startsWith("http") ? "_blank" : undefined}
                      className="bg-white border border-[rgba(15,91,70,0.12)] rounded-lg p-3 hover:shadow-md hover:border-[var(--color-basil)] transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-basil)] transition-colors truncate">
                            {source.title}
                          </h4>
                          <p className="text-xs text-[rgba(23,26,26,0.6)] mt-1 truncate">
                            {source.source}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[rgba(23,26,26,0.4)] group-hover:text-[var(--color-basil)] transition-colors flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bio & Process */}
            {(groupedSources.bio.length > 0 || groupedSources.process.length > 0) && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-charcoal)] mb-3 uppercase tracking-wide">
                  About & Process ({groupedSources.bio.length + groupedSources.process.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[...groupedSources.bio, ...groupedSources.process].map((source, index) => (
                    <Link
                      key={index}
                      href={source.href}
                      className="bg-white border border-[rgba(15,91,70,0.12)] rounded-lg p-3 hover:shadow-md hover:border-[var(--color-basil)] transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-basil)] transition-colors truncate">
                            {source.title}
                          </h4>
                          <p className="text-xs text-[rgba(23,26,26,0.6)] mt-1 truncate">
                            {source.source}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[rgba(23,26,26,0.4)] group-hover:text-[var(--color-basil)] transition-colors flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other Sources */}
            {groupedSources.other.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-charcoal)] mb-3 uppercase tracking-wide">
                  Other References ({groupedSources.other.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupedSources.other.map((source, index) => (
                    <div
                      key={index}
                      className="bg-white border border-[rgba(15,91,70,0.12)] rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[var(--color-charcoal)] truncate">
                            {source.label}
                          </h4>
                          <p className="text-xs text-[rgba(23,26,26,0.6)] mt-1 truncate">
                            {source.source}
                          </p>
                        </div>
                        {source.href !== "#" && (
                          <Link
                            href={source.href}
                            className="text-[rgba(23,26,26,0.4)] hover:text-[var(--color-basil)] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white border border-[rgba(15,91,70,0.12)] rounded-xl p-6">
          <h3 className="text-lg font-medium text-[var(--color-charcoal)] mb-4">
            How it works
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-[rgba(23,26,26,0.7)]">
            <div>
              <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                Supported Formats
              </h4>
              <ul className="space-y-1">
                <li>• PDF documents (books, research papers)</li>
                <li>• Images (project screenshots, design work)</li>
                <li>• Articles and blog posts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                What happens next
              </h4>
              <ul className="space-y-1">
                <li>• Files are processed and indexed</li>
                <li>• Content becomes available to GPT Mode</li>
                <li>• GPT responses improve with more context</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

