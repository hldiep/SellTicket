import React, { useState } from 'react'
const movies = [
    { id: 1, title: "NHÀ GIA TIÊN", author: "Huỳnh Lập", description: "Nhà Gia Tiên xoay quanh câu chuyện đa góc nhìn về các thế hệ khác nhau trong một gia đình, có hai nhân vật chính là Gia Minh (Huỳnh Lập) và Mỹ Tiên (Phương Mỹ Chi). Trở về căn nhà gia tiên để quay các video “triệu view” trên mạng xã hội, Mỹ Tiên - một nhà sáng tạo nội dung thuộc thế hệ Z vốn không tin vào chuyện tâm linh, hoàn toàn mất kết nối với gia đình, bất ngờ nhìn thấy Gia Minh - người anh trai đã mất từ lâu. Để hồn ma của Gia Minh có thể siêu thoát và không tiếp tục làm phiền mình, Mỹ Tiên bắt tay cùng Gia Minh lên kế hoạch giữ lấy căn nhà gia tiên đang bị họ hàng tranh chấp, đòi ông nội chia tài sản. Đứng trước hàng loạt bí mật động trời trong căn nhà gia tiên, liệu Mỹ Tiên có vượt qua được tất cả để hoàn thành di nguyện của Gia Minh?", genre: "Gia đình, Hài", actor: "Huỳnh Lập, Phương Mỹ Chi, NSƯT Hạnh Thuý, NSƯT Huỳnh Đông, Puka, Đào Anh Tuấn, Trung Dân, Kiều Linh, Lê Nam, Chí Tâm, Thanh Thức, Trác Thuý Miêu, Mai Thế Hiệp, NS Mạnh Dung, NSƯT Thanh Dậu, NS Thanh Hiền, Nguyễn Anh Tú,…", image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/p/a/payoff_poster_ngt_master_1_.jpg" },
    { id: 2, title: "QUỶ NHẬP TRÀNG", author: "Pom Nguyễn", description: "Phim lấy cảm hứng từ câu chuyện có thật và “truyền thuyết kinh dị nhất về người chết sống lại” - Ở một ngôi làng vùng cao, cặp vợ chồng Quang và Như sống bằng nghề mai táng. Cuộc sống yên bình của họ bị xáo trộn khi phát hiện một cỗ quan tài vô chủ trên mảnh đất nhà mình. Từ đây, những hiện tượng kỳ lạ bắt đầu xảy ra và ám ảnh cả ngôi làng.", genre: "Kinh Dị", actor: "Khả Như, Quang Tuấn, Vân Dung, Trung Ruồi, Tân Trề, Phú Đôn, …", image: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F03_2025%2Fquy-nhap-trang-poster.jpg&w=1920&q=75" },
    { id: 3, title: "CƯỚI MA", author: "Azhar Kinoi Lubis", description: "Mỗi ngày trong cuộc sống Ranti đều xoay quanh bởi sự cay nghiệt của mẹ chồng cùng những lời vu cáo của em dâu khiến cô vô cùng thống khổ. Mọi việc trở nên bùng nổ khi họ lần lượt phớt lờ việc cứu lấy cô con gái gặp tai nạn, thúc đẩy Ranti phải “ tiến thêm bước nữa” với ác quỷ ,mà từ đó lần lượt những người đối xử tệ với cô đều phải trả giá bằng mạng sống.", genre: "Kinh Dị", actor: "Taskya Namya, Wafda Saifan Lubis, Arla Ailani", image: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F03_2025%2Fhien-me-cho-quy_1.jpg&w=1920&q=75" },
];

const MovieList = () => {
    const [selectedMovie, setSelectedMovie] = useState(movies[0]);
    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='container'>
                <div className=" ml-[220px] flex flex-1 p-10">
                    <aside className="w-1/4 bg-white shadow-md p-4">
                        {movies.map((movie) => (
                            <button
                                key={movie.id}
                                onClick={() => setSelectedMovie(movie)}
                                className={`block w-full text-left p-3 mb-2 rounded-md transition ${selectedMovie.id === movie.id ? "bg-blue-600 text-white" : "bg-gray-200"
                                    }`}>
                                {movie.title}
                            </button>
                        ))}
                    </aside>

                    <main className="w-3/4 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">{selectedMovie.title}</h1>
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                                Sửa
                            </button>
                        </div>
                        <img src={selectedMovie.image} alt={selectedMovie.title} className="w-52 mb-4" />
                        <p><strong>Đạo diễn:</strong> {selectedMovie.author}</p>
                        <p><strong>Diễn viên:</strong> {selectedMovie.actor}</p>
                        <p><strong>Thể loại:</strong> {selectedMovie.genre}</p>
                        <p><strong>Miêu tả:</strong> {selectedMovie.description}</p>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default MovieList