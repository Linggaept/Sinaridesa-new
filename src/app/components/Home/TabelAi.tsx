

const TabelAi = () => {
  
  return (
    <div className="w-full mx-auto p-10 md:px-44 md:py-16">
      <table className="max-w-screen-xl border-collapse">
        <thead className="invisible md:visible">
          <tr className="bg-gray-200 block md:table-row">
            <th className="p-2 text-left text-black">Model</th>
            <th className="p-2 text-left text-black">Upload dan Jawaban</th>
            <th className="p-2 text-left text-black">Tanggapan Chatbot</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b block md:table-row border-gray-200">
            <td className="p-2 font-bold block md:table-cell bg-gray-400 text-lg text-center text-white w-36">SD-1.1</td>
            <td className="p-2 block md:table-cell">
              <div className="flex items-start space-x-2">
                {/* <Upload size={20} className="text-green-600 mt-1" /> */}
                <div>
                  <div className="font-semibold text-black">Versi 1.1</div>
                  <p className="text-sm text-black">
                    Memiliki efisiensi tinggi dalam hal pemrosesan,
                    menjadikannya ideal untuk tugas-tugas pembelajaran yang
                    memerlukan respons cepat dan hemat sumber daya.
                  </p>
                </div>
              </div>
            </td>
            <td className="p-2 block md:table-cell">
              <div className="flex items-start space-x-2">
                {/* <MessageSquare size={20} className="text-blue-600 mt-1" /> */}
                <div>
                  <div className="font-semibold text-black">Kelebihan</div>
                  <p className="text-sm text-black">
                    Dengan kemampuannya yang sudah teruji di berbagai skenario,
                    model ini sangat cocok untuk membantu dalam pembelajaran
                    sehari-hari, seperti menjawab pertanyaan umum, memberikan
                    penjelasan materi, dan membantu dalam penyusunan tugas
                    dengan baik.
                  </p>
                </div>
              </div>
            </td>
          </tr>
          <tr className="border-b border-gray-200 block md:table-row">
            <td className="p-2 font-bold block md:table-cell bg-gray-400 text-lg text-center text-white w-36">SD-1.2</td>
            <td className="p-2 block md:table-cell">
              <div className="flex items-start space-x-2">
                {/* <Upload size={20} className="text-green-600 mt-1" /> */}
                <div>
                  <div className="font-semibold text-black">Versi 1.2</div>
                  <p className="text-sm text-black">
                    Merupakan versi yang lebih ringan, dirancang untuk
                    memberikan kecepatan dan efisiensi dalam pembelajaran,
                    terutama di perangkat dengan kapasitas komputasi yang lebih
                    rendah.
                  </p>
                </div>
              </div>
            </td>
            <td className="p-2 block md:table-cell">
              <div className="flex items-start space-x-2">
                {/* <MessageSquare size={20} className="text-blue-600 mt-1" /> */}
                <div>
                  <div className="font-semibold text-black">Kelebihan</div>
                  <p className="text-sm text-black">
                    Model ini cocok untuk menyediakan materi pembelajaran yang
                    lebih fokus dan responsif, memungkinkan pembelajaran yang
                    lebih dinamis dan real-time, tanpa memerlukan banyak sumber
                    daya.
                  </p>
                </div>
              </div>
            </td>
          </tr>
          <tr className="block md:table-row">
            <td className="p-2 font-bold block md:table-cell bg-gray-400 text-lg text-center text-white w-36">SD-2</td>
            <td className="p-2 block md:table-cell">
              <div className="flex items-start space-x-2">
                {/* <Upload size={20} className="text-green-600 mt-1" /> */}
                <div>
                  <div className="font-semibold text-black">Versi 2</div>
                  <p className="text-sm text-black">
                    Menawarkan kemampuan pemahaman bahasa yang lebih canggih,
                    menjadikannya pilihan yang kuat untuk pembelajaran tingkat
                    lanjut dan tugas yang lebih kompleks.
                  </p>
                </div>
              </div>
            </td>
            <td className="p-2 block md:table-cell">
              <div className="flex items-start space-x-2">
                {/* <MessageSquare size={20} className="text-blue-600 mt-1" /> */}
                <div>
                  <div className="font-semibold text-black">Kelebihan</div>
                  <p className="text-sm text-black">
                    AI ini mampu memberikan analisis yang mendalam dan solusi
                    yang lebih akurat, membantu pelajar dalam memahami konsep
                    yang sulit dan memberikan konten yang lebih kaya dan
                    bervariasi, sehingga sangat efektif untuk penyusunan laporan
                    atau penelitian.
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TabelAi;
