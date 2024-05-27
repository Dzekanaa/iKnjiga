import React, { FC, useState, useEffect } from "react";
import { BookData } from "../data";

export const Book: FC<BookData> = ({
  Naslov,
  className,
  GodinaIzdanja,
  Zanr,
  ISBN,
  AutorID,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  const SizeList = [
    { w: "w-[8%]", h: "h-[85%]" },
    { w: "w-[8%]", h: "h-[95%]" },
    { w: "w-[8%]", h: "h-[97%]" },
    { w: "w-[8%]", h: "h-[90%]" },
  ];
  const colorList = [
    "bg-[#262f75]",
    "bg-[#1b2f63]",
    "bg-[#28367d]",
    "bg-[#3367a3]",
    "bg-[#352e78]",
    "bg-[#27445c]",
    "bg-[#355182]",
    "bg-[#594194]",
    // "bg-[#a11f0d]",
    // "bg-[#a13a15]",
    // "bg-[#b54124]",
    // "bg-[#7a222f]",
    // "bg-[#75392a]",
    // "bg-[#752640]",
  ];

  const randomSizeIndex = Math.floor(Math.random() * SizeList.length);
  const randomColorIndex = Math.floor(Math.random() * colorList.length);
  const [randomSize, setRandomSize] = useState(SizeList[randomSizeIndex]);
  const [randomColor, setRandomColor] = useState(colorList[randomColorIndex]);

  useEffect(() => {
    const randomSizeIndex = Math.floor(Math.random() * SizeList.length);
    const randomColorIndex = Math.floor(Math.random() * colorList.length);
    setRandomSize(SizeList[randomSizeIndex]);
    setRandomColor(colorList[randomColorIndex]);
  }, []);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setIsBeingDragged(true);
    // Postavite podatke koji se prenose tokom drag operacije
    event.dataTransfer.setData("text/plain", Naslov);
  };

  const handleDragEnd = () => {
    setIsBeingDragged(false);
  };

  return (
    <>
      <div
        onClick={() => setIsHovered(!isHovered)}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`${randomSize.h} ${
          randomSize.w
        } ${randomColor} ${className} ${
          isBeingDragged ? "being-dragged" : ""
        } text-base-200 border border-background p-2 absolute bottom-0 [writing-mode:vertical-rl] flex items-center text-center justify-center text-base rounded-t-md`}
      >
        {Naslov}
      </div>
      {isHovered && (
        <div className="card w-64 bg-base-100 shadow-xl z-30">
          <div className="card-body">
            <div className="card-actions -mt-4 -mr-6 justify-end">
              <button
                onClick={() => setIsHovered(false)}
                className="btn btn-square btn-ghost btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-base mt-2 text-text">ISBN: {ISBN}</p>
            <p className="text-primary text-2xl justify-between">{Naslov}</p>
            <div className="card-actions mt-2 justify-end">
              <div className="badge badge-accent badge-outline">{Zanr}</div>
              <div className="badge badge-secondary">{GodinaIzdanja} god.</div>
            </div>
            {/* <p className="text-text text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            </p> */}
          </div>
        </div>
      )}
    </>
  );
};
