import React, { forwardRef } from "react";
import Logo from "../../src/assets/nemsu-logo.jpg";

const DtoPrintDoc = forwardRef((props, ref) => {
  const getFormattedDate = (unixValue) => {
    const convert = new Date(unixValue * 1000);

    return convert
      .toLocaleString("en-PH", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      })
      .replaceAll("/", "-")
      .replace(",", "");
  };

  const headerRight = [
    {
      item: "Document Code:",
      value: "FM-ICTO-002",
    },
    {
      item: "Revision No:",
      value: "001",
    },
    {
      item: "Effective Date:",
      value: "January 26, 2023",
    },
    {
      item: "Page:",
      value: "1 of 1",
    },
  ];
  const requestorDetails = [
    {
      fieldName: "Date:",
      value: getFormattedDate(props.request.createdAt.seconds),
    },
    {
      fieldName: "Office:",
      value: props.request.office,
    },
    {
      fieldName: "End-user:",
      value: props.request.name,
    },
    {
      fieldName: "Position:",
      value: props.request.position,
    },
  ];
  const deviceDetails = [
    {
      fieldName: "Equipment Type:",
      value: props.request.device,
    },
    {
      fieldName: "Brand:",
      value: props.request.brand,
    },
    {
      fieldName: "Model:",
      value: props.request.model,
    },
    {
      fieldName: "Serial No.",
      value: props.request.serial,
    },
    {
      fieldName: "Property No.",
      value: props.request.property,
    },
    {
      fieldName: "Defects/Complaints",
      value: props.request.complaints,
    },
  ];
  const actionTakenDetails = [
    {
      fieldName: "Action Taken",
      value: props.request.actionTaken,
    },
    {
      fieldName: "Recommendation",
      value: !props.request.recommendation
        ? "N/A"
        : props.request.recommendation,
    },
    {
      fieldName: "Equipment Type",
      value: props.request.equipment,
    },
  ];
  return (
    <div className="relative h-screen p-12" ref={ref}>
      <div className="mb-10 border border-black">
        <div className="flex items-stretch">
          <div className="border-b border-r border-black p-2">
            <img src={Logo} alt="" width={110} height={110} />
          </div>
          <div className="flex flex-grow flex-col items-center justify-center border-b border-r border-black text-[10px] ">
            <p>Republic of the Philippines</p>
            <h1 className="font-custom text-[20px] font-bold">
              North Eastern Mindanao State University
            </h1>
            <p>Tagbina Campus</p>
            <p>Tagbina, Surigao del Sur, 8308</p>
            <p>Website: www.nemsu.edu.ph</p>
          </div>
          <div className="flex flex-col text-[8px]">
            {headerRight.map((block, index) => (
              <div key={index} className="flex-grow grid grid-cols-2">
                <div className="flex w-24 items-center justify-end border-b border-r border-black p-1">
                  {block.item}
                </div>
                <div className="flex w-24 items-center justify-end border-b border-black p-1">
                  {block.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-center text-[18px] font-bold">
            REPAIRS REQUISITION AND ACCOMPLISHMENT FORM
          </h1>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {requestorDetails.map((item, index) => (
          <div key={index} className="flex gap-2 text-sm">
            <p>{item.fieldName}</p>
            <p className="flex-grow border-b text-center">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 bg-gray-200 p-1 text-sm">
        Part I. Equipment Details
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {deviceDetails.map((item, index) => (
          <div
            key={index}
            className={`flex gap-2 text-sm ${index === 0 ? "col-span-2" : ""} ${
              index === 5 ? "col-span-2 flex-col" : ""
            }`}
          >
            <p>{item.fieldName}</p>
            <p
              className={`flex-grow border-b ${
                index === 5 ? "text-justify" : "text-center"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4 bg-gray-200 p-1 text-sm">
        Part II. Action Taken (to be filled by the ICT Unit)
      </div>

      <div className="mb-4">
        {actionTakenDetails.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 text-sm">
            <p>{item.fieldName}</p>
            <p className="flex-grow border-b text-center">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mb-10 text-sm">Assisted by</div>
      <div className="flex justify-center gap-10">
        <div className="w-56 text-center text-sm">
          <hr />
          <p>Name & Signature</p>
          <div className="mt-2 flex gap-2">
            <p>Date: </p>
            <div className="flex-grow border-b"></div>
          </div>
        </div>
        <div className="w-56 text-center text-sm">
          <hr />
          <p>Name & Signature</p>
          <div className="mt-2 flex gap-2">
            <p>Date: </p>
            <div className="flex-grow border-b"></div>
          </div>
        </div>
      </div>
      <div className="float-right font-sans p-12 text-xs text-gray-500">FM-ICTO-002/Rev 001/01-26-23/1 of 1</div>
    </div>
  );
});

export default DtoPrintDoc;
