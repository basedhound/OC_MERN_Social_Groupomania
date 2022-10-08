import "./profiledetailsmodal.css";

import { Modal, useMantineTheme } from "@mantine/core";

function ProfileDetailsModal({ modalDetails, setModalDetails }) {
   const theme = useMantineTheme();


   

   return (
      <Modal
         overlayColor={
            theme.colorScheme === "dark"
               ? theme.colors.dark[6]
               : theme.colors.gray[2]
         }
         overlayOpacity={0.55}
         overlayBlur={3}         
         background-color="white"
         opened={modalDetails}
         onClose={() => setModalDetails(false)}>

         <form className="modal-details">            
            <input type="text" className="modal-details__input" name="firstname" placeholder="Prénom"/>
            <input type="text" className="modal-details__input" name="lastname" placeholder="Nom"/>
            <input type="text" className="modal-details__input" name="about" placeholder="Secteur"/>
            <input type="text" className="modal-details__input" name="email" placeholder="Email"/>            
            <button>Confirmer</button>
         </form>

      </Modal>
   );
}

export default ProfileDetailsModal;
