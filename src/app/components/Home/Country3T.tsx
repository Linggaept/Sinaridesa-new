import Image from "next/image";

const Country3T = () => {
  return (
    <>
      <section className="md:p-20 p-8">
        <Image 
          src={"/img/Daerah_3T.png"}
          alt="Daerah 3T"
          width={1200}
          height={1200}
          className=" object-cover w-full md:w-7/12 mx-auto hover:scale-110 cursor-pointer duration-300"
        />
      </section>
    </>
  );
};

export default Country3T;
