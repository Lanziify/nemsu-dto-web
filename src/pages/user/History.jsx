import React, { useEffect, useState} from "react";
import DtoSearchBar from "../../components/DtoSearchBar";
import DtoTableList from "../../components/DtoTableList";
import { filterItems } from "../../utils/filterItems";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [searchedRequest, setSearchedRequest] = useState();

  const { requests } = useSelector((state) => state.requests);

  const [activeItems, setActiveItems] = useState({
    requestId: true,
    name: true,
    email: true,
    position: true,
    office: true,
    device: true,
    brand: false,
    model: false,
    serial: false,
    property: false,
    status: true,
    created: true,
  });

  const filteredList = (searchedRequest ? searchedRequest : requests).filter(
    (item) => {
      return item.status.toLowerCase().includes("completed", "canceled");
    }
  );

  const handleRequestSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const result = filteredList.filter((item) => {
      return (
        item.requestId.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.device.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
      );
    });
    console.log(result);
    e.target.value ? setSearchedRequest(result) : setSearchedRequest();
  };

  const handleFilterHeader = (e) => {
    setActiveItems({
      ...activeItems,
      [e.target.name]: !activeItems[e.target.name],
    });
  };

  const handleRequestClick = (request) => {
    navigate(`${request.status.toLowerCase()}/${request.requestId}`);
  };

  useEffect(() => {
    const data = window.localStorage.getItem("filteredTable");
    if (data) {
      setActiveItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("filteredTable", JSON.stringify(activeItems));
  }, [activeItems]);

  useEffect(() => {
    window.localStorage.setItem("filteredTable", JSON.stringify(activeItems));
  }, [activeItems]);
  return (
    <div>
      <div className="mb-4">
        <DtoSearchBar
          filterEnable={true}
          filterItems={filterItems(activeItems)}
          onFilterChange={handleFilterHeader}
          onSearchChange={handleRequestSearch}
        />
      </div>

      <div className="rounded-2xl border bg-white text-sm max-sm:border-none">
        <div className="overflow-x-auto rounded-md">
          <DtoTableList
            list={filteredList}
            {...activeItems}
            onClick={handleRequestClick}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
