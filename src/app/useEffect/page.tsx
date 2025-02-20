"use client"; // ในฟังก์ชั่นเข้าไปในฟังก์ชั่นอีกที การใส่callback function จะทำงานเมื่อมีการrender

import { useState, useEffect } from "react"; //เก้บคืน อัพเดทค่า

interface User {
  //ต้องการจะบอกว่าข้อมูลที่เราจะทำไม่ให้ผิดพลาดของtype กำหนดข้อมูลบนobjact

  name: string;
  age: number;
  email: string;
}

export default function UseEffectPage() {
  const [user, setUser] = useState<User>({
    name: "Kititan",
    age: 22,
    email: "shtontan2002@gmail.com",
  });
  const [isEditing, setIsEditing] = useState(false); //ฟอร์มedit

  //สร้างstate สำรองไว้
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [email, setEmail] = useState(user.email);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value); //ถ้ามีการเปลี่ยนค่าตัวแปรก้จะเอาไปเก้บที่setNameก่อน พอกดsaveจะกลับไปที่อยู่user
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    setUser({ name, age, email });
    setIsEditing(false); //บันทึก
  };

  const handleCancel = () => {
    //พอยกเลิกค่าจะกลับไปที่ตั้งเริ่มต้นไว้
    setIsEditing(false);
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
  };

  const toggleEdit = () => {
    //
    if (isEditing) {
      handleCancel();
    } else {
      setIsEditing(!isEditing); //เปลี่ยนเป็นtrue
    }
  };

  //ดูค่าที่เปลี่ยนไปเพื่อที่จะได้นำไปใช้ถูก
  useEffect(() => {
    if (isEditing) {
      console.log("user", user);
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
        onClick={() => toggleEdit()}
        className="bg-black text-white p-2 rounded-md"
      >
        {isEditing ? "Cancel" : "Edit User"}
        {/* false true */}
      </button>

      {isEditing && ( //ถ้าเป้นtrueจะโชว์อันนี้
        <div className="flex flex-col items-start justify-start gap-4 p-2">
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            type="text"
            value={name}
            onChange={handleNameChange}
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
