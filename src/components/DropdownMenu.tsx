import React, { useState, useRef, useEffect } from 'react';
import { Edit, EyeOff, Trash, EllipsisVertical } from 'lucide-react';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleDelete = () => {
    alert('Xóa');
    setIsOpen(false);
  };

  const handleEdit = () => {
    alert('Sửa');
    setIsOpen(false);
  };

  const handleHide = () => {
    alert('Em chưa code chức năng này anh ơi.');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    // Toàn bộ component được định vị tại góc phải trên cùng của container cha (HouseInfo)
    <div ref={dropdownRef} className="absolute top-0 right-0 m-4">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="p-2 bg-white shadow-md rounded-full text-black"
      >
        <EllipsisVertical />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 pt-3 w-24 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1" role="menu" aria-orientation="vertical">
            <li>
              <button
                className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleDelete}
              >
                <span>Xóa</span>
                <Trash size={20} />
              </button>
            </li>
            <li>
              <button
                className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleEdit}
              >
                <span>Sửa</span>
                <Edit size={20} />
              </button>
            </li>
            <li>
              <button
                className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleHide}
              >
                <span>Ẩn</span>
                <EyeOff size={20} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
