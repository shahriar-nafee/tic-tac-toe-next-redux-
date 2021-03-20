import * as React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleNameAction } from "../_redux/gameAction";

export default function Player() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  const handleNameInput = (name, value) => {
    dispatch(handleNameAction(name, value));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Player</label>
      <input
        name="firstPlayer"
        ref={register}
        onChange={(e) => handleNameInput("firstPlayer", e.target.value)}
      />
      <label>Second Player</label>
      <input
        name="secondPlayer"
        ref={register}
        onChange={(e) => handleNameInput("secondPlayer", e.target.value)}
      />
      {errors.secondPlayer && "Last name is required."}

      <Link href="/game">
        <button type="submit">START GAME</button>
      </Link>
    </form>
  );
}
