import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="py-8 px-4 mx-auto container items-center lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm flex flex-col items-center text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-text md:text-4xl">
          Nešto nedostaje.
        </p>
        <p className="mb-4 text-lg font-light text-text">
          Izvinjavamo se, ne možemo pronaći tu stranicu. Na početnoj stranici
          ćete pronaći puno zanimljivih sadržaja.
        </p>
        <div className="flex justify-center gap-4 text-center items-center">
          <Link to={-1 as any} replace className="btn btn-outline btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Nazad
          </Link>
          <Link to={"/"} replace={true} className="btn btn-primary">
            Povratak na početnu stranicu
          </Link>
        </div>
      </div>
    </div>
  );
};
