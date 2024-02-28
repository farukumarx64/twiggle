import { Avatar } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

export const Preview = () => {
  const [scaleFactor, setScaleFactor] = useState(100);

  useEffect(() => {
    function updateScaleFactor() {
      const screenHeight = window.innerHeight;
      console.log(Math.round(screenHeight * 1.033));
      // Define your logic to calculate scale factor based on screen height
      let newScaleFactor = Math.round(screenHeight * 1.033) / 1000; // 1000 is an arbitrary value, adjust it as needed
      setScaleFactor(newScaleFactor);
    }

    // Update scale factor initially
    updateScaleFactor();

    // Add event listener for resize to update scale factor when screen size changes
    window.addEventListener("resize", updateScaleFactor);
    return () => {
      window.removeEventListener("resize", updateScaleFactor);
    };
  }, []); // empty dependency array ensures the effect runs only once after mount

  const scaledStyle = {
    transform: `scale(${scaleFactor})`,
  };
  return (
    <>
      <section className="hidden md:flex w-1/3 h-[80vh] justify-center items-start mt-20">
        <div
          className="border-[15px] border-slate-800 w-[296px] h-[610px] bg-white px-4 pt-16 pb-8 rounded-[50px] flex flex-col items-center"
          style={scaledStyle}
        >
          <div className="w-full">
            <div className="flex flex-col justify-center items-center w-full">
              <Avatar
                name="@"
                className="w-20 h-20 text-3xl text-white bg-black mb-2"
              />
              <span className="text-black font-bold">@username</span>
            </div>
            {/* Content */}
          </div>
        </div>
      </section>
    </>
  );
};
