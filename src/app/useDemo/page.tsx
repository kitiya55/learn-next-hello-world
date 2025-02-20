"use client";

import { useEffect, useMemo, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}
export default function UseMemoPage() {
  const [user, setUser] = useState<User>({
    firstName: "John",
    lastName: "Doe",
    age: 20,
    email: "john@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [email, setEmail] = useState(user.email);
  //อยากให้โชว์ค่าออกมาเฉยๆ
  const fullName = useMemo(
    () => user.firstName + " " + user.lastName,
    [user.firstName, user.lastName] //dependencyarry ค่าไหนที่เปลี่ยนค่านั้นจะโดนรีเทินใหม่ลงไปที่ตัวแปรใหม่
  );

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    setUser({ firstName, lastName, age, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    setEmail(user.email);
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleCancel();
    } else {
      setIsEditing(!isEditing);
    }
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <div className="flex flex-col items-start justify-start gap-4 p-2">
        <p>full name: {fullName}</p>
        <p>first name: {user.firstName}</p>
        <p>last name: {user.lastName}</p>
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
            className="border-2 border-gray-300 rounded-md p-2"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            type="number"
            value={age}
            onChange={handleAgeChange}
          />
          <input
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
