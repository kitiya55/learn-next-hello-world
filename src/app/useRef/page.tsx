"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "../user";

export default function UseRefPage() {
  const [user, setUser] = useState<User>({
    name: "John",
    age: 20,
    email: "john@example.com",
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [email, setEmail] = useState(user.email);

  const countRef = useRef(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    setUser({ name, age, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleCancel();
    } else {
      handleEdit();
    }
  };

  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus();
      const width = nameInputRef.current?.clientWidth;
      const height = nameInputRef.current?.clientHeight;
      console.log("width", width);
      console.log("height", height);
    }
  }, [isEditing]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <div className="flex flex-col items-start justify-start gap-4 p-2">
        <p>name: {user.name}</p>
        <p>age: {user.age}</p>
        <p>email: {user.email}</p>
      </div>

      <button
        onClick={toggleEdit}
        className="bg-black text-white p-2 rounded-md"
      >
        {isEditing ? "Cancel" : "Edit User"}
      </button>

      {isEditing && (
        <div className="flex flex-col items-start justify-start gap-4 p-2">
          <input
            ref={nameInputRef}
            className="border-2 border-gray-300 rounded-md p-2"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <input
            ref={ageInputRef}
            className="border-2 border-gray-300 rounded-md p-2"
            type="number"
            value={age}
            onChange={handleAgeChange}
          />
          <input
            ref={emailInputRef}
            className="border-2 border-gray-300 rounded-md p-2"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            onClick={handleSave}
            className="bg-black text-white p-2 rounded-md w-full"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
