import EventClientPage from "./eventClientPage";
const EventsPage = () => {
  return (
    <section
      className="p-10 md:py-20 lg:px-60 xl:px-72 scroll-mt-14 md:scroll-mt-0 text-black"
      id="Events"
    >
      <EventClientPage grid={1} />
    </section>
  );
};

export default EventsPage;