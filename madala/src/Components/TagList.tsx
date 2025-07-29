"use client";
import React from "react";

interface TagListProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTag, onSelectTag }) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full text-sm transition ${
              selectedTag === tag
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;
