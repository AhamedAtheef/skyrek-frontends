import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/0750943802" 
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
}
