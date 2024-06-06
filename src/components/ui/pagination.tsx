import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Pagination({
  page,
  onChange,
  count,
}: {
  page: number;
  onChange: (page: number) => void;
  count?: number;
}) {
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (!!count) {
      const totalPage = Math.floor(count / 10);
      setTotalPage(totalPage > 100 ? 100 : totalPage);
    }
  }, [count]);
  const generatePages = () => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (page > totalPage - 3) {
      return [
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
    }

    return [page - 2, page - 1, page, page + 1, page + 2];
  };
  const pages = generatePages();

  return (
    <div className="flex items-center text-sm justify-center text-center overflow-hidden">
      <div
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
        onClick={() => onChange(page > 1 ? page - 1 : 1)}
      >
        <BiChevronLeft size={20} />
      </div>
      {totalPage > 5 && page > 3 && (
        <div
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
          onClick={() => onChange(1)}
        >
          1
        </div>
      )}
      {totalPage > 5 && page > 4 && (
        <div className="w-8 h-8 flex items-center justify-center">...</div>
      )}
      {pages.map((p) => (
        <div
          key={p}
          className={`w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 ${
            page === p ? "bg-gray-100" : ""
          }`}
          onClick={() => onChange(p)}
        >
          {p}
        </div>
      ))}
      {totalPage > 5 && page < totalPage - 3 && (
        <div className="w-8 h-8 flex items-center justify-center">...</div>
      )}
      {totalPage > 5 && page < totalPage - 2 && (
        <div
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
          onClick={() => onChange(totalPage)}
        >
          {totalPage}
        </div>
      )}
      <div
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
        onClick={() => onChange(page < totalPage ? page + 1 : totalPage)}
      >
        <BiChevronRight size={20} />
      </div>
    </div>
  );
}
