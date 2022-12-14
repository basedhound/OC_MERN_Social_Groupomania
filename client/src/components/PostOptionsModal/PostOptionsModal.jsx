import { useState, useEffect } from "react";
// Style
import { optionsIcon } from "../../assets";
import "./postoptionsmodal.css";

const PostOptionsModal = ({ options }) => {
   const [isOptionsVisible, setIsOptionsVisible] = useState(false);

   const handleOutsideClick = (e) => {
      if (
         !e.target.classList.contains("options") &&
         !e.target.classList.contains("options__icon")
      ) {
         setIsOptionsVisible(false);
      }
   };

   useEffect(() => {
      document.body.addEventListener("click", handleOutsideClick);
      return () =>
         document.body.removeEventListener("click", handleOutsideClick);
   });

   const handleClick = (handler) => {
      setIsOptionsVisible(true);
      handler();
   };

   return (
      <div
         className="options"
         onClick={() => setIsOptionsVisible((val) => !val)}>
         <img src={optionsIcon} alt="options" className="options__icon" />
         <ul className={isOptionsVisible ? "show" : ""}>
            {Object.entries(options).map(([title, handler], i) => (
               <li onClick={() => handleClick(handler)} key={i}>
                  {title}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PostOptionsModal;
