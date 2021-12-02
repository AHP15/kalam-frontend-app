import "../styles/Contacts.css";
import Skeleton from "./Skeleton.js";
import { selectContacts} from '../slices/contact.slice.js';
import { useSelector } from 'react-redux';

function Contacts(){

    const contacts = useSelector(selectContacts);
    return (
        <div className="contact_content">
            {contacts === null && <Skeleton large={false} />}
           {
               contacts?.map(contact =>(
                   <div className="contact" key={contact.id}>
                       <h3>{contact.username}</h3>
                       <p>{contact.email}</p>
                   </div>
               ))
           }
        </div>
    );
}

export default Contacts;