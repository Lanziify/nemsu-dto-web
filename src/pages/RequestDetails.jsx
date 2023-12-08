import React, { useRef, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import RequestProgress from "../components/RequestProgress";
import {
  convertCreatedDate,
  getTimeAgo,
  getFormattedDate,
} from "../utils/timeUtils";
import DtoButton from "../components/DtoButton";
import Swal from "sweetalert2";
import ApiService from "../api/apiService";
import ResponseForm from "../components/ResponseForm";
import Notfound from "./Notfound";
import { AnimatePresence, motion } from "framer-motion";
import { fadeDefault, popUpItem } from "../animations/variants";
import ResizablePanel from "../components/ResizablePanel";
import { PENDING, ACCEPTED, COMPLETED, CANCELED } from "../utils/status";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../config/firebase-config";
import { doc } from "firebase/firestore";
import Preloader from "../components/Preloader";
import ReactToPrint from "react-to-print";
import DtoPrintDoc from "../components/DtoPrintDoc";

export default function RequestDetails() {
  const { isAdmin } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const printableRef = useRef(null);
  const printButtonRef = useRef();

  const currentRequestId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const dtoRequestsDocRef = doc(firestore, "requests", currentRequestId);
  const [request, fetching, error] = useDocumentData(dtoRequestsDocRef);

  const stringyfiedRequest = JSON.stringify({ request });
  const parsedRequest = JSON.parse(stringyfiedRequest);
  const currentRequest = parsedRequest.request;

  const [isResponding, setIsResponding] = useState(false);
  const [tuple, setTuple] = useState([null, isResponding]);
  const [loading, setLoading] = useState(false);

  const requestDetails = [
    {
      cell: "Request Id",
      data: request?.requestId.toUpperCase(),
    },
    {
      cell: "User Id",
      data: currentRequest?.uid.toUpperCase(),
    },
    {
      cell: "Name",
      data: currentRequest?.name,
    },
    {
      cell: "Email",
      data: currentRequest?.email,
    },
    {
      cell: "Position",
      data: currentRequest?.position,
    },
    {
      cell: "Office",
      data: currentRequest?.office,
    },
    {
      cell: "Device Type",
      data: currentRequest?.device,
    },
    {
      cell: "Brand",
      data: currentRequest?.brand,
    },
    {
      cell: "Brand Model",
      data: currentRequest?.model,
    },
    {
      cell: "Serial Number",
      data: currentRequest?.serial,
    },
    {
      cell: "Property Number",
      data: currentRequest?.property,
    },
    {
      cell: "Status",
      data: currentRequest?.status,
    },
    {
      cell: "Updated",
      data: currentRequest?.updatedAt?.seconds
        ? getTimeAgo(currentRequest?.updatedAt?.seconds)
        : "---",
    },
    {
      cell: "Date Requested",
      data: convertCreatedDate(currentRequest?.createdAt?.seconds),
    },
    {
      cell: "Defects/Complaints",
      data: currentRequest?.complaints,
    },
  ];

  const requestResponse = [
    {
      cell: "Action taken",
      data: currentRequest?.actionTaken,
    },
    {
      cell: "Recommendation",
      data: currentRequest?.recommendation
        ? currentRequest?.recommendation
        : "N/A",
    },
    {
      cell: "Date completed",
      data: convertCreatedDate(currentRequest?.completedAt?.seconds),
    },
  ];

  const handleResponse = async (requestId, status) => {
    try {
      if (status === "Canceled") {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonColor: "#ef4444",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Cancel Request",
          cancelButtonText: "Return",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(true);
            ApiService.createResponse(requestId, status).then(() => {
              setLoading(false);
              navigate(-1);
            });
          }
          if (result.isDismissed) {
            setLoading(false);
          }
        });
        return;
      }

      setLoading(true);
      await ApiService.createResponse(requestId, status);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintDownloadClick = () => {};

  if (tuple[1] != isResponding) {
    setTuple([tuple[1], isResponding]);
  }

  const direction = isResponding > tuple[0] ? 1 : -1;

  if (currentRequest?.status != ACCEPTED && isResponding) {
    setIsResponding(false);
  }

  return (
    <>
      {currentRequest ? (
        <div className="flex flex-col gap-4">
          <motion.div
            variants={fadeDefault}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`flex items-center justify-between gap-4 rounded-2xl border bg-white p-4 text-sm ${
              loading ? "[&>*]:animate-pulse" : ""
            }`}
          >
            <div
              className="flex w-fit cursor-pointer items-center whitespace-nowrap text-gray-400 duration-300 hover:text-black"
              onClick={() =>
                !loading
                  ? navigate(
                      location.pathname.includes("notification")
                        ? "/notifications"
                        : -1
                    )
                  : null
              }
            >
              <MdChevronLeft size={24} />
              <p>Request Lists</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeDefault}
            className={`overflow-hidden rounded-2xl border bg-white text-sm ${
              loading ? "[&>*]:animate-pulse" : ""
            }`}
          >
            <ResizablePanel direction={direction}>
              {((!isResponding && currentRequest?.status != CANCELED) ||
                (isResponding && currentRequest?.status != ACCEPTED)) && (
                <motion.div className="p-6">
                  <RequestProgress request={currentRequest} />
                </motion.div>
              )}

              {currentRequest.status === ACCEPTED && isResponding && (
                <ResponseForm
                  requestId={currentRequest.requestId}
                  activeForm={setIsResponding}
                  setLoading={setLoading}
                />
              )}
            </ResizablePanel>
          </motion.div>

          <AnimatePresence>
            {!isResponding && (
              <motion.div
                variants={fadeDefault}
                className={`rounded-2xl border bg-white p-6 text-sm ${
                  loading ? "[&>*]:animate-pulse" : ""
                }`}
              >
                <div className="mb-4 flex h-9 items-center justify-between text-xs">
                  {isAdmin &&
                  currentRequest?.status === ACCEPTED &&
                  !isResponding ? (
                    <>
                      <h1 className="text-xl font-bold">Request Details</h1>
                      <DtoButton
                        outlinePrimary
                        rounded="xl"
                        iconStart={<FaPencilAlt />}
                        buttonText="Action taken"
                        onClick={() => setIsResponding(true)}
                      />
                    </>
                  ) : (
                    <h1 className="text-xl font-bold">Request Details</h1>
                  )}
                </div>

                {requestDetails.map((item, index) => (
                  <div
                    cell={item.cell}
                    className={`flex w-full justify-between text-gray-400 before:font-semibold before:text-black before:content-[attr(cell)] ${
                      item.cell === "Defects/Complaints"
                        ? "flex-col gap-1"
                        : "mb-1"
                    }`}
                    key={index}
                  >
                    {item.data}
                  </div>
                ))}

                {isAdmin && currentRequest?.status === PENDING && (
                  <div className="mt-4 flex justify-between gap-4">
                    <DtoButton
                      secondary
                      rounded="xl"
                      width="full"
                      buttonText="Cancel Request"
                      onClick={() =>
                        handleResponse(currentRequest?.requestId, CANCELED)
                      }
                      disabled={loading}
                    />
                    <DtoButton
                      success
                      rounded="xl"
                      width="full"
                      buttonText="Accept Request"
                      onClick={() =>
                        handleResponse(currentRequest?.requestId, ACCEPTED)
                      }
                      disabled={loading}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {currentRequest?.status === COMPLETED ? (
              <>
                <motion.div
                  variants={popUpItem}
                  className="rounded-2xl bg-cyan-500 p-6 text-sm text-white shadow-sm"
                >
                  <h1 className="mb-2 text-xl font-bold">Action Details</h1>
                  {requestResponse.map((item, index) => (
                    <div
                      cell={item.cell}
                      className={`flex w-full justify-between text-white before:font-semibold before:text-white before:content-[attr(cell)] ${
                        item.cell === "Defects/Complaints"
                          ? "flex-col gap-1"
                          : "mb-1"
                      }`}
                      key={index}
                    >
                      {item.data}
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  variants={popUpItem}
                  type="button"
                  onClick={handlePrintDownloadClick}
                  className="w-full"
                >
                  <ReactToPrint
                    // pageStyle="@page { magin: 0; size: auto; }"
                    trigger={() => {
                      return (
                        <button
                          className="w-full rounded-lg bg-cyan-500 p-2 text-sm font-bold text-white transition-all duration-300 hover:bg-cyan-600"
                          type="button"
                          ref={printButtonRef}
                        >
                          Print / Download Record
                        </button>
                      );
                    }}
                    content={() => printableRef.current}
                  />
                </motion.div>
              </>
            ) : (
              ""
            )}
          </AnimatePresence>
          <div className="invisible hidden">
            <DtoPrintDoc request={request} ref={printableRef} />
          </div>
        </div>
      ) : fetching && !error ? (
        <Preloader />
      ) : (
        <Notfound />
      )}
    </>
  );
}
