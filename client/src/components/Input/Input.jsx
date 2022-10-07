// Style
import { sendIcon } from "../../assets";
import "./input.css";

const Input = () => {


   return (
      <form className="input__box" /* onSubmit={} */>
         <input
            type="text"
            placeholder="[Non fonctionnel] Ecrire un commentaire..."
            /* value={} */
            /* onChange={} */
            /* onFocus={} */
         />
         <button type="submit" aria-label="submit">
            <img src={sendIcon} alt="send" />
         </button>
      </form>
   );
};

export default Input;
