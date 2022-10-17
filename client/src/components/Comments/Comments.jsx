// Style
import { sendIcon } from "../../assets";
import "./comments.css";

const Comments = () => {


   return (
      <form className="input__box" /* onSubmit={} */>
         <input
            type="text"
            placeholder="Ecrire un commentaire..."
            aria-label="Ecrire un commentaire ici"
            /* value={} */
            /* onChange={} */
            /* onFocus={} */
         />
         <button disabled type="submit" aria-label="confirmer commentaire" title="Fonction désactivée">
            <img src={sendIcon} alt="send comment" />
         </button>
      </form>
   );
};

export default Comments;
