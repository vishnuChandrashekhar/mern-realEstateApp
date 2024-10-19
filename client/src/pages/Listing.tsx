import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingSchema } from "../../../API/src/Models/listing.model";
import { ErrorObject } from "../../../API/src/utils/error.handler";
// For Slider
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing: React.FC = () => {
  //Slider initialization
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState<ListingSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);

  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/listing/getListingById/${params.listingId}`,
          {
            method: "GET",
          }
        );
        const data: ListingSchema | ErrorObject = await res.json();

        if ("success" in data && data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }

        setListing(data as ListingSchema);
        setLoading(false);
        setError(false);
      } catch (error: any) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading....</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-700">{error}</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageURLs.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
