import React from "react";
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../context/api/userApi";
import "./cards.scss";

const Cards = () => {
  const { data } = useGetUsersQuery();
  const [deleteUsers, { data: del }] = useDeleteUsersMutation();

  const userData = data?.payload?.map((el) => (
    <div key={el._id} className="user__card">
      <div className="user__card__img">
        <img src={el?.url} alt="" />
      </div>
      <div className="user__card__info">
        <h3>
          {el?.fname} {el?.lname}
        </h3>
        <p>{el?.username}</p>
      </div>
      <div className="user__card__btns">
        <button onClick={() => deleteUsers(el?._id)}>delete</button>
        <button>edit</button>
      </div>
    </div>
  ));

  return (
    <div className="user container">
      <div className="user__cards">{userData}</div>
    </div>
  );
};

export default Cards;
