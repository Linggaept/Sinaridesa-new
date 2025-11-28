"use client";

const PHOTOS = (i: number = 0) => [
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/1.png`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/2.png`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/3.png`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/4.png`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/5.png`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/6.png`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/7.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/8.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/9.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/10.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/11.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/12.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/13.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/14.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/15.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/16.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/17.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/18.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/19.jpg`,
  },
  {
    id: `photo-${i}`,
    title: `Photo ${i + 1}`,
    url: `img/galeri/20.jpg`,
  },
];

export function CollapsibleGallery() {
  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="w-3/4 md:w-1/2 flex flex-col mx-auto text-center mt-10">
          <h1 className="text-gray-800 font-bold text-4xl">
            Dokumentasi Galeri SinariDesa
          </h1>
          <p className="text-sm font-normal text-gray-700 py-4">
            Dokumentasi ini berisi rangkuman kegiatan dan momen berharga yang
            berlangsung di SinariDesa. Setiap foto dan catatan menggambarkan
            suasana, kolaborasi, dan perjalanan tim selama pelaksanaan program.
            Melalui dokumentasi ini, seluruh proses dapat dilihat kembali dan
            menjadi referensi untuk kegiatan berikutnya.
          </p>
        </div>

        {/* Single Collapsible Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {PHOTOS(0).map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg aspect-square bg-muted"
            >
              <img
                src={photo.url || "/placeholder.svg"}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay on hover */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
