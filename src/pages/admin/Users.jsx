import React, { useEffect, useState } from "react";
import RegistrationForm from "../../components/RegistrationForm";
import { useAuth } from "../../contexts/AuthContext";
import UserTableList from "../../components/UserTableList";
import DtoButton from "../../components/DtoButton";
import DtoSearchBar from "../../components/DtoSearchBar";
import ApiService from "../../api/apiService";
import { MdPeople } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/usersListSlice";

const Users = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.usersList);
  const [registerUser, setRegisterUser] = useState(false);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (users.length === 0) {
          const response = await ApiService.getUsers();
          const stringyfiedList = JSON.stringify(response.data.users);
          if (stringyfiedList) {
            const parsedList = JSON.parse(stringyfiedList);
            dispatch(getUsers(parsedList));
          }
          setSearch(response.data.users);
        } else {
          setSearch(users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearch(
      users.filter(
        (user) =>
          user.uid.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.office.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  if (loading) return <SkeletonLoading />;

  return (
    <div className="flex flex-col gap-4">
      {registerUser ? (
        <RegistrationForm
          user={user}
          onCancelClick={() => setRegisterUser(false)}
        />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <MdPeople size={42} />
            <h1 className="text-2xl font-black">DTO Users</h1>
          </div>
          <DtoSearchBar onSearchChange={handleSearch} />
          <div>
            <UserTableList data={search} onRowClicked={() => {}} />
          </div>

          <DtoButton
            primary
            buttonText="Register User"
            onClick={() => setRegisterUser(true)}
          />
        </>
      )}
    </div>
  );
};

function SkeletonLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 flex items-center gap-4">
        <div className=" h-10 w-12 rounded bg-gray-200"></div>
        <div className="h-10 w-36 rounded bg-gray-200"></div>
      </div>
      <div className="mb-4 h-10 animate-pulse rounded-full bg-gray-200"></div>
      <div className="mb-1 flex animate-pulse items-center gap-4 opacity-50">
        <div className="h-5 flex-1 rounded bg-gray-200"></div>
        <div className="h-5 flex-1 rounded bg-gray-200"></div>
        <div className="h-5 flex-1 rounded bg-gray-200"></div>
        <div className="h-5 flex-1 rounded bg-gray-200"></div>
      </div>
      <div className="">
        <div className="mb-1 h-10 animate-pulse rounded bg-gray-200 opacity-30"></div>
        <div className="mb-1 h-10 animate-pulse rounded bg-gray-200 opacity-20"></div>
        <div className="mb-4 h-10 animate-pulse rounded bg-gray-200 opacity-10"></div>
      </div>
      <div className="h-10 animate-pulse rounded-xl bg-gray-200 opacity-0"></div>
    </div>
  );
}

export default Users;
