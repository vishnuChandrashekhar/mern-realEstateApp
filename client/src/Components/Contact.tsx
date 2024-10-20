import React, { useEffect, useState } from "react";
import { ListingSchema } from "../../../API/src/Models/listing.model";
import { UserSchema } from "../../../API/src/Models/user.model";
import { ErrorObject } from "../../../API/src/utils/error.handler";
import { Link } from "react-router-dom";

interface ContactProps {
  listing: ListingSchema;
}

const Contact: React.FC<ContactProps> = ({ listing }) => {
  const [landlord, setLandlord] = useState<Partial<UserSchema> | null>(null);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`, {
          method: "GET",
        });
        const data: Partial<UserSchema> | ErrorObject = await res.json();

        // if ("success" in data && data.success === false) {
        //   console.log(data.message);
        //   return;
        // }
        setLandlord(data as UserSchema);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleTextAre = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-3">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            about{" "}
            <span className="font-semibold">{listing.title.toLowerCase()}</span>
          </p>
          <textarea
            name="Message"
            id="message"
            rows={2}
            value={message}
            onChange={handleTextAre}
            placeholder="Type your message"
            className="w-full border border-slate-400 p-3 rounded-lg text-lg"
          />
          <Link
            to={`mailto:${landlord.email}?subject=Regarding${listing.title}&body=${message}`}
            className="w-full bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
