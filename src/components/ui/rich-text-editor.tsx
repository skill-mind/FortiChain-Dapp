"use client";

import React, { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import "./rich-text-editor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image as TiptapImage } from "@tiptap/extension-image";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  Underline as UnderlineIcon,
  Bold,
  TextAa,
  AUnderline,
  Italic,
  TextAlignLeft,
  TextAlignRight,
  TextAlignJustify,
  TextAlignCenter,
  TextColumns,
  TextIndent,
  TextOutdent,
  ArticleNyTimes,
  LinkSimpleHorizontal,
  File,
  FileText,
} from "@/app/dashboard/researcher/my-reports/components/icons/RichIcons";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

// Client-side only editor component
export const TiptapEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter your text...",
  className = "",
  minHeight = "500px",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-400 underline",
        },
      }),
      TiptapImage,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none text-[#E2E2E2]",
        style: `min-height: ${minHeight}`,
        "data-placeholder": placeholder,
      },
    },
    immediatelyRender: false,
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Create object URL and insert image
    const imageUrl = URL.createObjectURL(file);
    editor?.chain().focus().setImage({ src: imageUrl }).run();

    toast({
      title: "Image uploaded",
      description: "Image has been successfully added to your document",
    });
  };

  // Handle link creation
  const handleLinkCreation = () => {
    const { from, to } = editor?.state.selection || {};

    // Check if text is selected
    if (!from || !to || from === to) {
      toast({
        title: "No text selected",
        description:
          "Please select some text first, then click the link button",
        variant: "destructive",
      });
      return;
    }

    setShowLinkInput(true);
  };

  // Handle link submission
  const handleLinkSubmit = () => {
    if (!linkUrl.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    // Validate URL
    try {
      new URL(linkUrl);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    editor?.chain().focus().setLink({ href: linkUrl }).run();
    setShowLinkInput(false);
    setLinkUrl("");

    toast({
      title: "Link created",
      description: "Link has been successfully added to the selected text",
    });
  };

  // Handle link cancellation
  const handleLinkCancel = () => {
    setShowLinkInput(false);
    setLinkUrl("");
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Rich Text Editor Toolbar */}
      <div className="p-4 border-[1px] rounded-[4px] rounded-b-none border-[#1F1F1F]">
        {/* Link Input (shown when creating a link) */}
        {showLinkInput && (
          <div className="mb-4 p-3 bg-[#1C1C1C] border border-[#1F1F1F] rounded-lg">
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (e.g., https://example.com)"
                className="flex-1 px-3 py-2 bg-[#2A2A2A] border border-[#1F1F1F] rounded text-[#E2E2E2] placeholder-[#6C6C6C] focus:outline-none focus:border-[#3B82F6]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLinkSubmit();
                  } else if (e.key === "Escape") {
                    handleLinkCancel();
                  }
                }}
              />
              <Button
                onClick={handleLinkSubmit}
                size="sm"
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                Add Link
              </Button>
              <Button
                onClick={handleLinkCancel}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-[#E2E2E2]"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:flex items-center flex-wrap gap-x-6 gap-y-3">
          {/* Undo/Redo */}
          <div className="flex items-center bg-[#1C1C1C] border-[#1F1F1F] rounded-[8px] h-full">
            <Button
              variant="ghost"
              size="sm"
              className="py-3 mr-0 pr-[4px] h-full hover:bg-transparent"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <Image
                width={16}
                height={16}
                src="/researcherIcon/ArrowUUpLeft.svg"
                alt="arrow-left"
                style={{
                  filter: editor.can().chain().focus().undo().run()
                    ? "brightness(0) saturate(100%) invert(100%)"
                    : "brightness(0) saturate(100%) invert(61%) sepia(4%) saturate(1204%) hue-rotate(201deg) brightness(96%) contrast(86%)",
                }}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="py-3  ml-0 pl-[4px] h-full hover:bg-transparent"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <Image
                width={16}
                height={16}
                src="/researcherIcon/ArrowUUpRight.svg"
                alt="arrow-right"
                style={{
                  filter: editor.can().chain().focus().redo().run()
                    ? "brightness(0) saturate(100%) invert(100%)"
                    : "brightness(0) saturate(100%) invert(61%) sepia(4%) saturate(1204%) hue-rotate(201deg) brightness(96%) contrast(86%)",
                }}
              />
            </Button>
          </div>

          {/* Heading Select */}
          <Select
            value={
              editor.isActive("heading", { level: 1 })
                ? "heading1"
                : editor.isActive("heading", { level: 2 })
                ? "heading2"
                : "paragraph"
            }
            onValueChange={(value) => {
              if (value === "heading1") {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              } else if (value === "heading2") {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              } else {
                editor.chain().focus().setParagraph().run();
              }
            }}
          >
            <SelectTrigger className="w-32 bg-[#1C1C1C] border-[#1F1F1F] border-[1px] text-[#6C6C6C]">
              <SelectValue className="text-[#6C6C6C]" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C1C] border-[#1F1F1F]">
              <SelectItem value="heading1" className="text-[#E2E2E2]">
                Heading 1
              </SelectItem>
              <SelectItem value="heading2" className="text-[#E2E2E2]">
                Heading 2
              </SelectItem>
              <SelectItem value="paragraph" className="text-[#E2E2E2]">
                Paragraph
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Font Family Select */}
          <Select defaultValue="inter">
            <SelectTrigger className="w-24 bg-[#1C1C1C] border-[#1F1F1F] border-[1px] text-[#6C6C6C]">
              <SelectValue className="text-[#6C6C6C]" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C1C] border-[#1F1F1F]">
              <SelectItem value="inter" className="text-[#E2E2E2]">
                Inter
              </SelectItem>
              <SelectItem value="arial" className="text-[#E2E2E2]">
                Arial
              </SelectItem>
              <SelectItem value="helvetica" className="text-[#E2E2E2]">
                Helvetica
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Text Formatting */}
          <div className="bg-[#1C1C1C] border-[#1F1F1F] border-[1px] px-3 flex rounded-[8px] h-full">
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 flex items-end hover:bg-transparent"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <AUnderline
                color={editor.isActive("strike") ? "#fff" : "#9CA3AF"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 flex items-end hover:bg-transparent"
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <TextAa color={editor.isActive("code") ? "#fff" : "#9CA3AF"} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 flex items-end hover:bg-transparent"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon
                color={editor.isActive("underline") ? "#fff" : "#9CA3AF"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 flex items-end hover:bg-transparent"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold color={editor.isActive("bold") ? "#fff" : "#9CA3AF"} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 flex items-end hover:bg-transparent"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic color={editor.isActive("italic") ? "#fff" : "#9CA3AF"} />
            </Button>
          </div>

          {/* Text Alignment */}
          <div className="bg-[#1C1C1C] border-[#1F1F1F] border-[1px] px-3 rounded-[8px] h-full">
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 hover:bg-transparent"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <TextAlignLeft
                color={
                  editor.isActive({ textAlign: "left" }) ? "#fff" : "#9CA3AF"
                }
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <TextAlignCenter
                color={
                  editor.isActive({ textAlign: "center" }) ? "#fff" : "#9CA3AF"
                }
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 hover:bg-transparent"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <TextAlignRight
                color={
                  editor.isActive({ textAlign: "right" }) ? "#fff" : "#9CA3AF"
                }
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            >
              <TextAlignJustify
                color={
                  editor.isActive({ textAlign: "justify" }) ? "#fff" : "#9CA3AF"
                }
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
            >
              <TextColumns
                color={editor.isActive("table") ? "#fff" : "#9CA3AF"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() =>
                editor.chain().focus().sinkListItem("listItem").run()
              }
            >
              <TextIndent
                color={editor.isActive("bulletList") ? "#fff" : "#9CA3AF"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() =>
                editor.chain().focus().liftListItem("listItem").run()
              }
            >
              <TextOutdent
                color={editor.isActive("bulletList") ? "#fff" : "#9CA3AF"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <ArticleNyTimes
                color={editor.isActive("bulletList") ? "#fff" : "#9CA3AF"}
              />
            </Button>
          </div>

          {/* Additional Tools */}
          <div className="bg-[#1C1C1C] border-[#1F1F1F] border-[1px] px-3 rounded-[8px] h-full">
            <Button
              variant="ghost"
              size="sm"
              className="h-full py-3 hover:bg-transparent"
              onClick={handleLinkCreation}
            >
              <LinkSimpleHorizontal
                color={editor.isActive("link") ? "#fff" : "#9CA3AF"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() => fileInputRef.current?.click()}
            >
              <File color="#9CA3AF" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <FileText
                color={editor.isActive("codeBlock") ? "#fff" : "#9CA3AF"}
              />
            </Button>
          </div>
        </div>

        {/* Mobile Layout - Only visible on mobile */}
        <div className="md:hidden flex flex-col gap-3">
          <div className="flex gap-2">
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                width: "100%",
                maxWidth: "100vw",
              }}
              onScroll={(e) => {
                const scrollContainer = e.currentTarget;
                const scrollLeft = scrollContainer.scrollLeft;
                const scrollWidth = scrollContainer.scrollWidth;
                const clientWidth = scrollContainer.clientWidth;
                const scrollPercentage =
                  scrollLeft / (scrollWidth - clientWidth);

                // Update progress indicators based on scroll position
                const indicators = document.querySelectorAll(
                  ".progress-indicator"
                );
                indicators.forEach((indicator, index) => {
                  const threshold = (index + 1) / 3;
                  if (scrollPercentage >= threshold - 0.33) {
                    indicator.classList.remove("bg-[#6C6C6C]");
                    indicator.classList.add("bg-[#E2E2E2]");
                  } else {
                    indicator.classList.remove("bg-[#E2E2E2]");
                    indicator.classList.add("bg-[#6C6C6C]");
                  }
                });
              }}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Undo/Redo */}
                <div className="flex items-center h-8 w-12 bg-[#1C1C1C] border-[#1F1F1F] rounded-[8px]">
                  <Button
                    variant="ghost"
                    // size="sm"
                    className="pl-2 pr-0 m-0 hover:bg-transparent"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                  >
                    <Image
                      width={16}
                      height={16}
                      src="/researcherIcon/ArrowUUpLeft.svg"
                      alt="arrow-left"
                      className="m-0  p-0 w-[16px] h-[16px]"
                      style={{
                        filter: editor.can().chain().focus().undo().run()
                          ? "brightness(0) saturate(100%) invert(100%)"
                          : "brightness(0) saturate(100%) invert(61%) sepia(4%) saturate(1204%) hue-rotate(201deg) brightness(96%) contrast(86%)",
                      }}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    // size="sm"
                    className="pl-0 pr-2 m-0 hover:bg-transparent"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                  >
                    <Image
                      width={16}
                      height={16}
                      src="/researcherIcon/ArrowUUpRight.svg"
                      alt="arrow-right"
                      className="m-0  p-0 w-[16px] h-[16px]"
                      style={{
                        filter: editor.can().chain().focus().redo().run()
                          ? "brightness(0) saturate(100%) invert(100%)"
                          : "brightness(0) saturate(100%) invert(61%) sepia(4%) saturate(1204%) hue-rotate(201deg) brightness(96%) contrast(86%)",
                      }}
                    />
                  </Button>
                </div>
                {/* Heading Select */}
                <Select
                  value={
                    editor.isActive("heading", { level: 1 })
                      ? "heading1"
                      : editor.isActive("heading", { level: 2 })
                      ? "heading2"
                      : "paragraph"
                  }
                  onValueChange={(value) => {
                    if (value === "heading1") {
                      editor.chain().focus().toggleHeading({ level: 1 }).run();
                    } else if (value === "heading2") {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                    } else {
                      editor.chain().focus().setParagraph().run();
                    }
                  }}
                >
                  <SelectTrigger className="w-28 bg-[#1C1C1C] border-[#1F1F1F] border-[1px] text-[#6C6C6C] h-8">
                    <SelectValue className="text-[#6C6C6C]" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1C1C] border-[#1F1F1F]">
                    <SelectItem value="heading1" className="text-[#E2E2E2]">
                      Heading 1
                    </SelectItem>
                    <SelectItem value="heading2" className="text-[#E2E2E2]">
                      Heading 2
                    </SelectItem>
                    <SelectItem value="paragraph" className="text-[#E2E2E2]">
                      Paragraph
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* Font Family Select */}
                <Select defaultValue="inter">
                  <SelectTrigger className="w-20 bg-[#1C1C1C] border-[#1F1F1F] border-[1px] text-[#6C6C6C] h-8">
                    <SelectValue className="text-[#6C6C6C]" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1C1C] border-[#1F1F1F]">
                    <SelectItem value="inter" className="text-[#E2E2E2]">
                      Inter
                    </SelectItem>
                    <SelectItem value="arial" className="text-[#E2E2E2]">
                      Arial
                    </SelectItem>
                    <SelectItem value="helvetica" className="text-[#E2E2E2]">
                      Helvetica
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Text Formatting */}
              <div className="bg-[#1C1C1C] border-[#1F1F1F] border-[1px] px-2 flex rounded-[8px] flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold color={editor.isActive("bold") ? "#fff" : "#9CA3AF"} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic
                    color={editor.isActive("italic") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon
                    color={editor.isActive("underline") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <AUnderline
                    color={editor.isActive("strike") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                >
                  <TextAa
                    color={editor.isActive("code") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
              </div>
              {/* Text Alignment */}
              <div className="bg-[#1C1C1C] border-[#1F1F1F] border-[1px] px-2 rounded-[8px] flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                >
                  <TextAlignLeft
                    color={
                      editor.isActive({ textAlign: "left" })
                        ? "#fff"
                        : "#9CA3AF"
                    }
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                >
                  <TextAlignCenter
                    color={
                      editor.isActive({ textAlign: "center" })
                        ? "#fff"
                        : "#9CA3AF"
                    }
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                >
                  <TextAlignRight
                    color={
                      editor.isActive({ textAlign: "right" })
                        ? "#fff"
                        : "#9CA3AF"
                    }
                  />
                </Button>
              </div>
              {/* Lists and Tables */}
              <div className="bg-[#1C1C1C] border-[#1F1F1F] border-[1px] px-2 rounded-[8px] flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <ArticleNyTimes
                    color={editor.isActive("bulletList") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                >
                  <TextColumns
                    color={editor.isActive("table") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
              </div>
              {/* Additional Tools */}
              <div className="bg-[#1C1C1C] border-[#1F1F1F] border-[1px] px-2 rounded-[8px] flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={handleLinkCreation}
                >
                  <LinkSimpleHorizontal
                    color={editor.isActive("link") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <File color="#9CA3AF" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-2 px-2 hover:bg-transparent"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  <FileText
                    color={editor.isActive("codeBlock") ? "#fff" : "#9CA3AF"}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Progress Indicators */}
          <div className="flex justify-center gap-1">
            <div className="w-6 h-1 bg-[#E2E2E2] rounded-full progress-indicator"></div>
            <div className="w-6 h-1 bg-[#6C6C6C] rounded-full progress-indicator"></div>
            <div className="w-6 h-1 bg-[#6C6C6C] rounded-full progress-indicator"></div>
          </div>
        </div>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Content Area */}
      <div
        className="flex-1 border-[1px] rounded-[4px] rounded-t-none border-[#1F1F1F] p-6"
        style={{ minHeight }}
      >
        <EditorContent
          editor={editor}
          className="w-full bg-transparent text-[#E2E2E2] resize-none outline-none"
        />
      </div>
    </div>
  );
};

// Main component with SSR protection
export const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`flex flex-col ${props.className || ""}`}>
        <div className="p-4 border-[1px] rounded-[4px] rounded-b-none border-[#1F1F1F]">
          <div className="flex items-center flex-wrap gap-x-6 gap-y-3">
            <div className="text-[#6C6C6C] text-sm">Loading editor...</div>
          </div>
        </div>
        <div
          className="flex-1 border-[1px] rounded-[4px] rounded-t-none border-[#1F1F1F] p-6"
          style={{ minHeight: props.minHeight || "500px" }}
        >
          <div className="text-[#6C6C6C]">Loading...</div>
        </div>
      </div>
    );
  }

  return <TiptapEditor {...props} />;
};
