import React, { useState } from "react";
import { MdArrowDropDown, MdChevronLeft, MdChevronRight } from "react-icons/md";

import { ACCEPTED, CANCELED, COMPLETED, PENDING } from "../utils/status";

const ITEMS_PER_PAGE = 5; // Number of items to display per page

function DtoTableList(props) {
  const [sortedRequest, setSortedRequest] = useState();
  const [ascending, setAscending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortRequestList = (item) => {
    const sortedList = [...getCurrentPageItems()].sort((a, b) => {
      if (typeof (a[item] && b[item]) == "string") {
        return ascending
          ? a[item] < b[item]
            ? -1
            : 1
          : a[item] < b[item]
          ? 1
          : -1;
      } else {
        return ascending
          ? b[item].seconds - a[item].seconds
          : a[item].seconds - b[item].seconds;
      }
    });
    return setSortedRequest(sortedList);
  };

  const convertCreatedDate = (unixValue) => {
    const convert = new Date(unixValue * 1000);

    return convert.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const headerItems = [
    {
      type: props.requestId,
      data: "requestId",
      label: "Request Id",
    },
    {
      type: props.name,
      data: "name",
      label: "Name",
    },
    {
      type: props.email,
      data: "email",
      label: "Email",
    },
    {
      type: props.position,
      data: "position",
      label: "Position",
    },
    {
      type: props.office,
      data: "office",
      label: "Office",
    },
    {
      type: props.device,
      data: "device",
      label: "Device",
    },
    {
      type: props.brand,
      data: "brand",
      label: "Brand",
    },
    {
      type: props.model,
      data: "model",
      label: "Model",
    },
    {
      type: props.serial,
      data: "serial",
      label: "Serial No.",
    },
    {
      type: props.property,
      data: "property",
      label: "Property No.",
    },
    {
      type: props.status,
      data: "status",
      label: "Status",
    },
    {
      type: props.created,
      data: "createdAt",
      label: "Created",
    },
  ];

  const tableHeader = (item, index) => {
    if (item.type) {
      return (
        <th
          className={`p-4 text-center max-sm:hidden ${
            !props.list && "border-b "
          }`}
          key={index}
        >
          <div
            className="flex cursor-pointer items-center justify-center duration-300 hover:text-cyan-500"
            onClick={() => {
              sortRequestList(item.data);
              setAscending(!ascending);
            }}
          >
            {item.label}
            <MdArrowDropDown size={18} />
          </div>
        </th>
      );
    }
  };

  const tableData = (item, request, index) => {
    if (item.type) {
      return (
        <td
          cell={`${item.label}: `}
          className={`px-2 py-4 text-center before:text-gray-500 ${
            item.data != "status"
              ? ""
              : (request[item.data] === PENDING && "text-yellow-500") ||
                (request[item.data] === ACCEPTED && "text-green-500") ||
                (request[item.data] === COMPLETED && "text-cyan-500")
          } before:font-bold max-sm:flex max-sm:justify-between max-sm:px-0 max-sm:py-1 max-sm:before:content-[attr(cell)]`}
          key={index}
        >
          {item.data != "createdAt"
            ? item.data === "requestId"
              ? request[item.data].toUpperCase()
              : request[item.data]
            : convertCreatedDate(request[item.data]?.seconds)}
        </td>
      );
    }
  };

  const handleListDisplay = () => {
    if (!sortedRequest) {
      return getCurrentPageItems();
    } else {
      return sortedRequest;
    }
  };

  const getCurrentPageItems = () => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return props.list.slice(start, end);
  };

  const handlePaginationPrev = () => {
    setSortedRequest();
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePaginationNext = () => {
    setSortedRequest();
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(props.list.length / ITEMS_PER_PAGE))
    );
  };

  return (
    <div className="flex min-w-fit flex-col">
      <table className="table-auto border-collapse rounded-md">
        <thead>
          <tr className="border-b max-sm:border-0">
            {/* Header Items */}
            {headerItems.map((item, index) => tableHeader(item, index))}
          </tr>
        </thead>

        <tbody className="max-sm:flex max-sm:flex-col max-sm:gap-4">
          {handleListDisplay().length != 0 ? (
            <>
              {handleListDisplay().map((request, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-b duration-150 hover:bg-gray-500/10 max-sm:block max-sm:rounded-2xl max-sm:border max-sm:p-4 max-sm:last:border"
                  onClick={() => props.onClick(request)}
                >
                  {headerItems.map((item, index) =>
                    tableData(item, request, index)
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr className="text-center max-sm:flex">
              <td className="p-4 max-sm:flex-1" colSpan="100%">
                There are no repair requests to display
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex w-full justify-end gap-2 rounded-lg p-2 max-sm:mt-4 max-sm:border">
        <p className="px-4 py-2 text-xs">
          Page{" "}
          {currentPage === 1 && !Object.keys(props.list).length
            ? currentPage - 1
            : currentPage}{" "}
          of {Math.ceil(props.list.length / ITEMS_PER_PAGE)}
        </p>
        <button
          className="rounded-md p-2 duration-300 hover:bg-gray-200 disabled:text-gray-300"
          onClick={handlePaginationPrev}
          disabled={currentPage === 1}
        >
          <MdChevronLeft size={18} />
        </button>
        <button
          className="rounded-md p-2 duration-300 hover:bg-gray-200 disabled:text-gray-300"
          onClick={handlePaginationNext}
          disabled={
            currentPage > props.list.length ||
            currentPage === Math.ceil(props.list.length / ITEMS_PER_PAGE)
          }
        >
          <MdChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default DtoTableList;
